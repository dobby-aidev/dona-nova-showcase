/**
 * DONA NOVA — ENTSO-E Transparency Platform API Client
 * 
 * API Referans: https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html
 * API Key Alma: https://transparency.entsoe.eu → Kayıt → "Restful API access" maili at
 * 
 * Avrupa'nın 35 ülkesini kapsayan gerçek zamanlı elektrik şebeke verisi.
 * Ücretsiz, kayıt gerektiriyor.
 */

import type { GridData, EnergySubtype } from "@/types/infrastructure";

// ─── Konfigürasyon ───────────────────────────────────────────────────────────

const ENTSOE_BASE_URL = "https://web-api.tp.entsoe.eu/api";

function getApiKey(): string {
  return process.env.ENTSOE_API_KEY ?? "";
}

// ─── ENTSO-E Bölge Kodları (EIC Kodları) ────────────────────────────────────

export const ENTSOE_AREAS = {
  // Büyük Avrupa şebekeleri
  DE: { code: "10Y1001A1001A83F", name: "Germany",         countryCode: "DE" },
  FR: { code: "10YFR-RTE------C", name: "France",          countryCode: "FR" },
  ES: { code: "10YES-REE------0", name: "Spain",           countryCode: "ES" },
  IT: { code: "10YIT-GRTN-----B", name: "Italy",           countryCode: "IT" },
  PL: { code: "10YPL-AREA-----S", name: "Poland",          countryCode: "PL" },
  NL: { code: "10YNL----------L", name: "Netherlands",     countryCode: "NL" },
  BE: { code: "10YBE----------2", name: "Belgium",         countryCode: "BE" },
  GB: { code: "10YGB----------A", name: "United Kingdom",  countryCode: "GB" },
  NO: { code: "10YNO-0--------C", name: "Norway",          countryCode: "NO" },
  SE: { code: "10YSE-1--------K", name: "Sweden",          countryCode: "SE" },
  FI: { code: "10YFI-1--------U", name: "Finland",         countryCode: "FI" },
  DK: { code: "10Y1001A1001A65H", name: "Denmark",         countryCode: "DK" },
  AT: { code: "10YAT-APG------L", name: "Austria",         countryCode: "AT" },
  CH: { code: "10YCH-SWISSGRIDZ", name: "Switzerland",    countryCode: "CH" },
  PT: { code: "10YPT-REN------W", name: "Portugal",        countryCode: "PT" },
  // Orta ve Doğu Avrupa
  CZ: { code: "10YCZ-CEPS-----N", name: "Czech Republic",  countryCode: "CZ" },
  SK: { code: "10YSK-SEPS-----K", name: "Slovakia",        countryCode: "SK" },
  HU: { code: "10YHU-MAVIR----U", name: "Hungary",         countryCode: "HU" },
  RO: { code: "10YRO-TEL------P", name: "Romania",         countryCode: "RO" },
  GR: { code: "10YGR-HTSO-----Y", name: "Greece",          countryCode: "GR" },
  HR: { code: "10YHR-HEP------M", name: "Croatia",         countryCode: "HR" },
  TR: { code: "10YTR-TEIAS----W", name: "Turkey",          countryCode: "TR" },
} as const;

// ─── ENTSO-E Üretim Tipi Kodları → InfraCategory Mapping ───────────────────

const ENTSOE_PSRTYPE_MAP: Record<string, EnergySubtype> = {
  B01: "biomass",
  B02: "thermal_coal",    // Lignite
  B03: "thermal_coal",    // Fossil peat  
  B04: "thermal_coal",    // Fossil hard coal
  B05: "thermal_gas",     // Fossil gas
  B06: "oil",             // Fossil oil
  B09: "geothermal",
  B10: "hydro",           // Hydro pumped storage
  B11: "hydro",           // Hydro run-of-river
  B12: "hydro",           // Hydro water reservoir
  B14: "nuclear",
  B15: "solar",
  B16: "solar",           // Solar thermal
  B17: "wind",            // Onshore wind
  B18: "wind",            // Offshore wind
  B19: "wind",            // Wind (general)
  B20: "unknown",         // Other renewable
  B24: "unknown",         // Other
};

// ─── XML Parser ──────────────────────────────────────────────────────────────

/**
 * ENTSO-E XML yanıtını parse eder.
 * ENTSO-E REST API, JSON yerine XML döndürür.
 */
function parseEntsoePeriod(xmlText: string): Record<string, number> {
  const generation: Record<string, number> = {};
  
  // Basit XML regex parser (server-side'da xml2js kullanılabilir)
  const timeSeriesMatches = xmlText.matchAll(
    /<TimeSeries>([\s\S]*?)<\/TimeSeries>/g
  );

  for (const tsMatch of timeSeriesMatches) {
    const tsContent = tsMatch[1];
    
    // Üretim tipi kodu
    const psrTypeMatch = tsContent.match(/<psrType>([^<]+)<\/psrType>/);
    const psrType = psrTypeMatch?.[1];
    
    // En son periyot değeri
    const lastPointMatch = [...tsContent.matchAll(/<quantity>([^<]+)<\/quantity>/g)].pop();
    const quantity = lastPointMatch ? parseFloat(lastPointMatch[1]) : 0;
    
    if (psrType && quantity > 0) {
      const energyType = ENTSOE_PSRTYPE_MAP[psrType] ?? "unknown";
      generation[energyType] = (generation[energyType] ?? 0) + quantity;
    }
  }

  return generation;
}

function parseTotalLoad(xmlText: string): number | null {
  const quantityMatch = xmlText.match(/<quantity>([^<]+)<\/quantity>/);
  return quantityMatch ? Math.round(parseFloat(quantityMatch[1])) : null;
}

// ─── Ana Veri Çekme Fonksiyonları ───────────────────────────────────────────

/**
 * ENTSO-E'den belirtilen ülke için şu anki elektrik talebi çeker.
 */
export async function fetchEntsoeTotalLoad(
  countryCode: keyof typeof ENTSOE_AREAS
): Promise<GridData | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("[ENTSO-E] ENTSOE_API_KEY bulunamadı.");
    return null;
  }

  const area = ENTSOE_AREAS[countryCode];
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  const params = new URLSearchParams({
    securityToken: apiKey,
    documentType: "A65",          // System total load
    processType: "A16",           // Realised
    outBiddingZone_Domain: area.code,
    periodStart: formatEntsoeDate(oneHourAgo),
    periodEnd: formatEntsoeDate(now),
  });

  try {
    const url = `${ENTSOE_BASE_URL}?${params}`;
    const response = await fetch(url, {
      headers: { Accept: "application/xml" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`[ENTSO-E] ${countryCode} HTTP ${response.status}`);
      return null;
    }

    const xmlText = await response.text();
    const totalDemandMW = parseTotalLoad(xmlText);

    if (!totalDemandMW) return null;

    return {
      regionCode: area.code,
      regionName: area.name,
      countryCode: area.countryCode,
      totalDemandMW,
      generation: {},
      timestamp: now.toISOString(),
      source: "entsoe",
    };
  } catch (error) {
    console.error(`[ENTSO-E] ${countryCode} veri hatası:`, error);
    return null;
  }
}

/**
 * ENTSO-E'den üretim tipi dağılımı çeker.
 * Hangi ülkede ne kadar güneş/rüzgar/nükleer üretiliyor?
 */
export async function fetchEntsoeGenerationMix(
  countryCode: keyof typeof ENTSOE_AREAS
): Promise<GridData | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const area = ENTSOE_AREAS[countryCode];
  const now = new Date();
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

  const params = new URLSearchParams({
    securityToken: apiKey,
    documentType: "A75",      // Actual generation per production type
    processType: "A16",       // Realised
    in_Domain: area.code,
    periodStart: formatEntsoeDate(twoHoursAgo),
    periodEnd: formatEntsoeDate(now),
  });

  try {
    const url = `${ENTSOE_BASE_URL}?${params}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const xmlText = await response.text();
    const generation = parseEntsoePeriod(xmlText) as Partial<Record<EnergySubtype, number>>;
    const totalDemandMW = Object.values(generation).reduce((sum, v) => sum + (v ?? 0), 0);

    return {
      regionCode: area.code,
      regionName: area.name,
      countryCode: area.countryCode,
      totalDemandMW: Math.round(totalDemandMW),
      generation,
      timestamp: now.toISOString(),
      source: "entsoe",
    };
  } catch (error) {
    console.error(`[ENTSO-E] Generation mix hatası:`, error);
    return null;
  }
}

/**
 * Birden fazla Avrupa ülkesi için toplu veri çeker.
 * Globe'da Avrupa'yı gerçek veriyle göstermek için kullanılır.
 */
export async function fetchAllEuropeGridData(
  countries: (keyof typeof ENTSOE_AREAS)[] = ["DE", "FR", "ES", "IT", "GB", "PL", "TR"]
): Promise<GridData[]> {
  const results = await Promise.allSettled(
    countries.map(code => fetchEntsoeGenerationMix(code))
  );

  return results
    .filter((r): r is PromiseFulfilledResult<GridData> =>
      r.status === "fulfilled" && r.value !== null
    )
    .map(r => r.value);
}

// ─── Yardımcı Fonksiyonlar ───────────────────────────────────────────────────

function formatEntsoeDate(date: Date): string {
  // ENTSO-E formatı: "202608071400" (YYYYMMDDHHmm)
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes())
  );
}

/**
 * ENTSO-E API bağlantısını test eder.
 */
export async function testEntsoeConnection(): Promise<{ success: boolean; message: string }> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      success: false,
      message:
        "ENTSOE_API_KEY bulunamadı. transparency@entsoe.eu'ya mail at, key al ve .env.local'a ekle.",
    };
  }

  try {
    const data = await fetchEntsoeTotalLoad("DE");
    if (data) {
      return {
        success: true,
        message: `✅ ENTSO-E bağlantısı başarılı. Almanya talebi: ${data.totalDemandMW} MW`,
      };
    }
    return { success: false, message: "Veri döndü ama boş. Bölge kodunu kontrol edin." };
  } catch (error) {
    return {
      success: false,
      message: `Hata: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
