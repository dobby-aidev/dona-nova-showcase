/**
 * DONA NOVA — Global Power Plant Database Client
 * 
 * Kaynak: World Resources Institute (WRI)
 * GitHub: https://github.com/wri/global-power-plant-database
 * Lisans: Creative Commons CC-BY 4.0 (ticari kullanım dahil, atıf zorunlu)
 * 
 * 35.000+ güç santralinin konum, kapasite ve sahiplik verisi.
 * Ücretsiz, kayıt gerektirmiyor.
 * Cloudflare R2'ye yüklenip cache'lenir.
 */

import type { InfrastructureAsset, EnergySubtype } from "@/types/infrastructure";

// ─── Veri Kaynağı ─────────────────────────────────────────────────────────────

/**
 * WRI Global Power Plant Database CSV'nin hosted versiyonu.
 * Bu URL'yi projenin Cloudflare R2 bucket'ına yüklemeniz önerilir.
 * Geliştirme sırasında doğrudan WRI kaynak URL'si kullanılabilir.
 */
const GPPD_DATA_URL =
  process.env.GPPD_DATA_URL ??
  "https://raw.githubusercontent.com/wri/global-power-plant-database/master/output_database/global_power_plant_database.csv";

// ─── CSV Satır Tipi ───────────────────────────────────────────────────────────

interface GppdRow {
  country: string;           // ISO 3166-1 alpha-3 (TUR, USA, DEU...)
  country_long: string;      // "Turkey"
  name: string;              // Santral adı
  gppd_idnr: string;         // Benzersiz ID
  capacity_mw: string;       // Kapasite (MW)
  latitude: string;
  longitude: string;
  primary_fuel: string;      // Solar, Wind, Nuclear, Gas, Coal...
  secondary_fuel: string;
  commissioning_year: string;
  owner: string;
  source: string;            // Veri kaynağı
  url: string;
  geolocation_source: string;
  wepp_id: string;
  year_of_capacity_data: string;
  generation_gwh_2019: string;
  generation_gwh_2020: string;
  estimated_generation_gwh_2017: string;
}

// ─── WRI Yakıt Tipi → EnergySubtype Mapping ──────────────────────────────────

const FUEL_TYPE_MAP: Record<string, EnergySubtype> = {
  Solar: "solar",
  Wind: "wind",
  Nuclear: "nuclear",
  Hydro: "hydro",
  Gas: "thermal_gas",
  "Natural Gas": "thermal_gas",
  Coal: "thermal_coal",
  "Hard Coal": "thermal_coal",
  Lignite: "thermal_coal",
  Oil: "oil",
  Geothermal: "geothermal",
  Biomass: "biomass",
  Waste: "biomass",
  "Petcoke": "oil",
  Storage: "unknown",
  Wave: "unknown",
  Other: "unknown",
};

// ─── Country Code Dönüşümü (ISO Alpha-3 → Alpha-2) ──────────────────────────

const ALPHA3_TO_ALPHA2: Record<string, string> = {
  TUR: "TR", USA: "US", DEU: "DE", FRA: "FR", GBR: "GB",
  CHN: "CN", IND: "IN", JPN: "JP", RUS: "RU", BRA: "BR",
  ESP: "ES", ITA: "IT", POL: "PL", NLD: "NL", BEL: "BE",
  SWE: "SE", NOR: "NO", DNK: "DK", AUT: "AT", CHE: "CH",
  SAU: "SA", ARE: "AE", KOR: "KR", AUS: "AU", CAN: "CA",
  MEX: "MX", ARG: "AR", ZAF: "ZA", NGA: "NG", EGY: "EG",
};

const FLAG_EMOJIS: Record<string, string> = {
  TR: "🇹🇷", US: "🇺🇸", DE: "🇩🇪", FR: "🇫🇷", GB: "🇬🇧",
  CN: "🇨🇳", IN: "🇮🇳", JP: "🇯🇵", RU: "🇷🇺", BR: "🇧🇷",
  ES: "🇪🇸", IT: "🇮🇹", PL: "🇵🇱", NL: "🇳🇱", BE: "🇧🇪",
  SE: "🇸🇪", NO: "🇳🇴", DK: "🇩🇰", AT: "🇦🇹", CH: "🇨🇭",
  SA: "🇸🇦", AE: "🇦🇪", KR: "🇰🇷", AU: "🇦🇺", CA: "🇨🇦",
};

// ─── CSV Parser ───────────────────────────────────────────────────────────────

function parseCsvRow(line: string, headers: string[]): Record<string, string> {
  const values: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (const char of line) {
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current.trim());

  const row: Record<string, string> = {};
  headers.forEach((header, i) => {
    row[header] = values[i] ?? "";
  });
  return row;
}

// ─── Ana Veri Yükleme Fonksiyonu ─────────────────────────────────────────────

let _cachedPlants: InfrastructureAsset[] | null = null;
let _cacheTime: number = 0;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 saat

/**
 * Global Power Plant Database'i indirir ve InfrastructureAsset dizisine dönüştürür.
 * Sonuçlar 24 saat bellekte önbelleğe alınır.
 * 
 * @param filters - Filtreleme seçenekleri
 */
export async function fetchGlobalPowerPlants(filters?: {
  countryCode?: string;           // ISO alpha-2
  fuelType?: EnergySubtype[];
  minCapacityMW?: number;
  limit?: number;
}): Promise<InfrastructureAsset[]> {
  // Cache kontrolü
  if (_cachedPlants && Date.now() - _cacheTime < CACHE_TTL_MS) {
    return applyFilters(_cachedPlants, filters);
  }

  try {
    const response = await fetch(GPPD_DATA_URL, {
      next: { revalidate: 86400 }, // 24 saat
    });

    if (!response.ok) {
      console.error(`[GPPD] CSV indirilemedi: HTTP ${response.status}`);
      return [];
    }

    const csvText = await response.text();
    const lines = csvText.split("\n").filter(l => l.trim());
    
    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, ""));
    const plants: InfrastructureAsset[] = [];

    for (let i = 1; i < lines.length; i++) {
      const row = parseCsvRow(lines[i], headers) as unknown as GppdRow;
      
      const lat = parseFloat(row.latitude);
      const lng = parseFloat(row.longitude);
      const capacityMW = parseFloat(row.capacity_mw);

      // Geçersiz koordinat veya kapasite kontrolü
      if (isNaN(lat) || isNaN(lng) || isNaN(capacityMW) || capacityMW <= 0) continue;

      const countryCode2 = ALPHA3_TO_ALPHA2[row.country] ?? row.country.substring(0, 2);
      const subtype = FUEL_TYPE_MAP[row.primary_fuel] ?? "unknown";

      plants.push({
        id: `gppd_${row.gppd_idnr}`,
        name: row.name || `${row.primary_fuel} Plant`,
        category: "energy",
        subtype,
        status: "operational",
        lat,
        lng,
        country: row.country_long,
        countryCode: countryCode2,
        capacity: `${capacityMW.toFixed(0)} MW`,
        capacityMW,
        owner: row.owner || undefined,
        completionYear: row.commissioning_year ? parseInt(row.commissioning_year) : undefined,
        flagEmoji: FLAG_EMOJIS[countryCode2] ?? "🏭",
        tags: [row.primary_fuel, countryCode2].filter(Boolean),
        dataMeta: {
          source: "global_power_plant_db",
          sourceName: "WRI Global Power Plant Database",
          lastUpdated: "2023-01-01T00:00:00Z",
          reliability: "high",
          updateFrequency: "static",
          sourceUrl: "https://github.com/wri/global-power-plant-database",
        },
      });
    }

    _cachedPlants = plants;
    _cacheTime = Date.now();
    
    console.log(`[GPPD] ${plants.length} santral yüklendi.`);
    return applyFilters(plants, filters);

  } catch (error) {
    console.error("[GPPD] Veri yükleme hatası:", error);
    return [];
  }
}

function applyFilters(
  plants: InfrastructureAsset[],
  filters?: {
    countryCode?: string;
    fuelType?: EnergySubtype[];
    minCapacityMW?: number;
    limit?: number;
  }
): InfrastructureAsset[] {
  if (!filters) return plants;

  let result = plants;

  if (filters.countryCode) {
    result = result.filter(p => p.countryCode === filters.countryCode);
  }

  if (filters.fuelType?.length) {
    result = result.filter(p => filters.fuelType!.includes(p.subtype as EnergySubtype));
  }

  if (filters.minCapacityMW) {
    result = result.filter(p => (p.capacityMW ?? 0) >= filters.minCapacityMW!);
  }

  if (filters.limit) {
    result = result.slice(0, filters.limit);
  }

  return result;
}

// ─── İstatistiksel Özetler ────────────────────────────────────────────────────

/**
 * Ülke bazında toplam kapasite ve santral sayısı özeti.
 * Dashboard istatistikleri için kullanılır.
 */
export async function getCountryCapacitySummary(): Promise<
  Array<{ countryCode: string; country: string; totalMW: number; plantCount: number; flagEmoji: string }>
> {
  const plants = await fetchGlobalPowerPlants({ minCapacityMW: 10 });
  
  const summary = new Map<string, { country: string; totalMW: number; count: number; flag: string }>();

  for (const plant of plants) {
    const existing = summary.get(plant.countryCode) ?? {
      country: plant.country,
      totalMW: 0,
      count: 0,
      flag: plant.flagEmoji ?? "🏭",
    };
    existing.totalMW += plant.capacityMW ?? 0;
    existing.count += 1;
    summary.set(plant.countryCode, existing);
  }

  return Array.from(summary.entries())
    .map(([code, data]) => ({
      countryCode: code,
      country: data.country,
      totalMW: Math.round(data.totalMW),
      plantCount: data.count,
      flagEmoji: data.flag,
    }))
    .sort((a, b) => b.totalMW - a.totalMW);
}

/**
 * Küresel üretim tipi dağılımı.
 * "Dünyada enerjinin %X'i güneşten geliyor" gibi istatistikler için.
 */
export async function getGlobalFuelMix(): Promise<
  Array<{ subtype: EnergySubtype; totalMW: number; percentage: number; plantCount: number }>
> {
  const plants = await fetchGlobalPowerPlants({ minCapacityMW: 1 });
  
  const byType = new Map<string, { mw: number; count: number }>();
  let totalMW = 0;

  for (const plant of plants) {
    const type = plant.subtype ?? "unknown";
    const existing = byType.get(type) ?? { mw: 0, count: 0 };
    existing.mw += plant.capacityMW ?? 0;
    existing.count += 1;
    byType.set(type, existing);
    totalMW += plant.capacityMW ?? 0;
  }

  return Array.from(byType.entries())
    .map(([type, data]) => ({
      subtype: type as EnergySubtype,
      totalMW: Math.round(data.mw),
      percentage: totalMW > 0 ? Math.round((data.mw / totalMW) * 1000) / 10 : 0,
      plantCount: data.count,
    }))
    .sort((a, b) => b.totalMW - a.totalMW);
}
