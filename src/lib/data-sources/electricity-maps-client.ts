/**
 * DONA NOVA — Electricity Maps API Client
 * 
 * API Referans: https://static.electricitymaps.com/api/docs/index.html
 * API Key: https://api-portal.electricitymaps.com/ → Ücretsiz tier mevcut
 * 
 * Küresel karbon yoğunluğu ve gerçek zamanlı enerji üretim verisi.
 * Dünyanın hangi bölgesinde temiz, hangi bölgesinde kirli elektrik üretiliyor?
 */

import type { GridData } from "@/types/infrastructure";

const EM_BASE_URL = "https://api.electricitymaps.com/v3";

function getApiKey(): string {
  return process.env.ELECTRICITY_MAPS_API_KEY ?? "";
}

// ─── Karbon Yoğunluğu Verisi ─────────────────────────────────────────────────

export interface CarbonIntensityData {
  /** Bölge kodu (ör: "DE", "US-CAL-CISO") */
  zone: string;
  /** Anlık karbon yoğunluğu (gCO2eq/kWh) */
  carbonIntensity: number;
  /** Fosil yakıt oranı (0–100) */
  fossilFuelPercentage?: number;
  /** Veri zamanı */
  datetime: string;
  /** Veri güncelliği */
  updatedAt: string;
}

export interface PowerBreakdownData {
  zone: string;
  datetime: string;
  /** Üretim kaynakları (MW) */
  powerProductionBreakdown: {
    nuclear?: number;
    solar?: number;
    wind?: number;
    hydro?: number;
    coal?: number;
    gas?: number;
    oil?: number;
    biomass?: number;
    geothermal?: number;
    unknown?: number;
  };
  /** Tüketim toplam (MW) */
  powerConsumptionTotal?: number;
  /** Üretim toplam (MW) */
  powerProductionTotal?: number;
  /** Net içe aktarım (MW) */
  powerImportTotal?: number;
  /** Karbon yoğunluğu */
  co2intensity?: number;
}

// ─── Bölge Kodları ───────────────────────────────────────────────────────────

/**
 * Electricity Maps'in desteklediği başlıca bölge kodları.
 * Tam liste: https://static.electricitymaps.com/api/docs/index.html#zones
 */
export const EM_ZONES = {
  // Avrupa
  DE: "DE",       FR: "FR",       ES: "ES",
  IT: "IT",       GB: "GB",       PL: "PL",
  NL: "NL",       BE: "BE",       SE: "SE",
  NO: "NO",       DK: "DK",       AT: "AT",
  CH: "CH",       PT: "PT",       TR: "TR",
  // Amerika
  US_CAL: "US-CAL-CISO",
  US_TEX: "US-TEX-ERCO",
  US_NY: "US-NY-NYIS",
  US_NE: "US-NE-ISNE",
  // Asya
  JP: "JP",       KR: "KR",       CN: "CN",
  IN: "IN",
  // Okyanusya
  AU: "AU",
} as const;

// ─── Karbon Yoğunluğu ────────────────────────────────────────────────────────

/**
 * Belirtilen bölge için anlık karbon yoğunluğu çeker.
 * Globe'da her ülkenin "kirli/temiz" renk gradyanı için kullanılır.
 */
export async function fetchCarbonIntensity(
  zone: string
): Promise<CarbonIntensityData | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  try {
    const response = await fetch(`${EM_BASE_URL}/carbon-intensity/latest?zone=${zone}`, {
      headers: {
        "auth-token": apiKey,
        Accept: "application/json",
      },
      next: { revalidate: 1800 }, // 30 dakikada bir yenile
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error(`[ElectricityMaps] HTTP ${response.status} (${response.statusText}): ${errText}`);
      return null;
    }

    const data = await response.json();

    return {
      zone,
      carbonIntensity: data.carbonIntensity ?? 0,
      fossilFuelPercentage: data.fossilFuelPercentage,
      datetime: data.datetime ?? new Date().toISOString(),
      updatedAt: data.updatedAt ?? new Date().toISOString(),
    };
  } catch (err) {
    console.error("[ElectricityMaps] Fetch error:", err);
    return null;
  }
}

/**
 * Birden fazla bölge için karbon yoğunluğu çeker.
 * Globe'da küresel "karbon haritası" katmanı için kullanılır.
 */
export async function fetchGlobalCarbonIntensity(
  zones: string[] = Object.values(EM_ZONES)
): Promise<Map<string, CarbonIntensityData>> {
  const results = await Promise.allSettled(
    zones.map(zone => fetchCarbonIntensity(zone).then(data => ({ zone, data })))
  );

  const map = new Map<string, CarbonIntensityData>();

  for (const result of results) {
    if (result.status === "fulfilled" && result.value.data) {
      map.set(result.value.zone, result.value.data);
    }
  }

  return map;
}

// ─── Güç Üretim Dağılımı ─────────────────────────────────────────────────────

/**
 * Belirtilen bölge için anlık üretim kaynağı dağılımı çeker.
 * Güneş/rüzgar/nükleer oranları ve toplam MW değerleri.
 */
export async function fetchPowerBreakdown(
  zone: string
): Promise<PowerBreakdownData | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  try {
    const response = await fetch(`${EM_BASE_URL}/power-breakdown/latest?zone=${zone}`, {
      headers: {
        "auth-token": apiKey,
        Accept: "application/json",
      },
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error(`[ElectricityMaps Breakdown] HTTP ${response.status} (${response.statusText}): ${errText}`);
      return null;
    }

    const data = await response.json();

    return {
      zone,
      datetime: data.datetime ?? new Date().toISOString(),
      powerProductionBreakdown: data.powerProductionBreakdown ?? {},
      powerConsumptionTotal: data.powerConsumptionTotal,
      powerProductionTotal: data.powerProductionTotal,
      powerImportTotal: data.powerImportTotal,
      co2intensity: data.co2intensity,
    };
  } catch {
    return null;
  }
}

/**
 * PowerBreakdown'ı GridData'ya normalize eder.
 */
export function powerBreakdownToGridData(pb: PowerBreakdownData): GridData {
  return {
    regionCode: pb.zone,
    regionName: pb.zone,
    countryCode: pb.zone.split("-")[0],
    totalDemandMW: pb.powerConsumptionTotal ?? pb.powerProductionTotal ?? 0,
    generation: {
      nuclear: pb.powerProductionBreakdown.nuclear ?? undefined,
      solar: pb.powerProductionBreakdown.solar ?? undefined,
      wind: pb.powerProductionBreakdown.wind ?? undefined,
      hydro: pb.powerProductionBreakdown.hydro ?? undefined,
      thermal_coal: pb.powerProductionBreakdown.coal ?? undefined,
      thermal_gas: pb.powerProductionBreakdown.gas ?? undefined,
      oil: pb.powerProductionBreakdown.oil ?? undefined,
      biomass: pb.powerProductionBreakdown.biomass ?? undefined,
      geothermal: pb.powerProductionBreakdown.geothermal ?? undefined,
    },
    carbonIntensity: pb.co2intensity,
    timestamp: pb.datetime,
    source: "electricity_maps",
  };
}

// ─── Karbon Rengi Yardımcı ───────────────────────────────────────────────────

/**
 * Karbon yoğunluğuna göre RGB renk döndürür.
 * Globe üzerinde ülkeleri boyamak için kullanılır.
 * Yeşil (temiz) → Sarı → Kırmızı (kirli)
 */
export function carbonIntensityToColor(gco2kwh: number): {
  r: number; g: number; b: number; label: string;
} {
  if (gco2kwh < 50)  return { r: 34, g: 197, b: 94,  label: "Çok Temiz" };      // Yeşil
  if (gco2kwh < 150) return { r: 134, g: 239, b: 172, label: "Temiz" };          // Açık yeşil
  if (gco2kwh < 300) return { r: 250, g: 204, b: 21,  label: "Orta" };           // Sarı
  if (gco2kwh < 500) return { r: 249, g: 115, b: 22,  label: "Yüksek" };         // Turuncu
  return { r: 239, g: 68, b: 68, label: "Çok Yüksek" };                          // Kırmızı
}

/**
 * Electricity Maps API bağlantısını test eder.
 */
export async function testElectricityMapsConnection(): Promise<{
  success: boolean;
  message: string;
}> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      success: false,
      message: "ELECTRICITY_MAPS_API_KEY bulunamadı. api-portal.electricitymaps.com'dan ücretsiz key al.",
    };
  }

  try {
    const data = await fetchCarbonIntensity("DE");
    if (data) {
      const color = carbonIntensityToColor(data.carbonIntensity);
      return {
        success: true,
        message: `✅ Electricity Maps bağlı. Almanya: ${data.carbonIntensity} gCO2/kWh (${color.label})`,
      };
    }
    return { success: false, message: "Veri döndü ama boş." };
  } catch (error) {
    return {
      success: false,
      message: `Hata: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
