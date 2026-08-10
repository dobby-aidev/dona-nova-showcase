/**
 * DONA NOVA — EIA (U.S. Energy Information Administration) API Client
 * 
 * API Referans: https://www.eia.gov/opendata/
 * API Key Alma: https://www.eia.gov/opendata/ → "Register"
 * 
 * Ücretsiz, kayıt gerektiriyor.
 * Saatlik elektrik talep, üretim ve karbon verisi sağlar.
 */

import type { GridData } from "@/types/infrastructure";

// ─── Konfigürasyon ───────────────────────────────────────────────────────────

const EIA_BASE_URL = "https://api.eia.gov/v2";

/**
 * API Key Environment Variable'dan okunur.
 * .env.local dosyasına: EIA_API_KEY=your_key_here
 * Cloudflare Workers'ta: wrangler secret put EIA_API_KEY
 */
function getApiKey(): string {
  const key = process.env.EIA_API_KEY ?? process.env.NEXT_PUBLIC_EIA_API_KEY ?? "";
  return key;
}

// ─── EIA Balancing Authority Kodları (ABD Enerji Bölgeleri) ─────────────────

export const EIA_REGIONS = {
  CALI: { code: "CISO",  name: "California ISO",       countryCode: "US" },
  TEXAS: { code: "ERCO", name: "Electric Reliability Council of Texas", countryCode: "US" },
  MISO: { code: "MISO",  name: "Midcontinent ISO",     countryCode: "US" },
  PJM:  { code: "PJM",   name: "PJM Interconnection",  countryCode: "US" },
  NEISO: { code: "ISNE", name: "ISO New England",      countryCode: "US" },
  NYISO: { code: "NYIS", name: "New York ISO",         countryCode: "US" },
  SPP:  { code: "SWPP",  name: "Southwest Power Pool", countryCode: "US" },
  NW:   { code: "NWMT",  name: "Northwestern Energy",  countryCode: "US" },
} as const;

// ─── EIA API Yanıt Tipleri ───────────────────────────────────────────────────

interface EiaSeriesValue {
  period: string; // "2026-08-07T14:00" formatında
  value: number | null;
  "value-units": string;
}

interface EiaSeriesData {
  total: number;
  data: EiaSeriesValue[];
}

interface EiaResponse {
  response: EiaSeriesData;
  request: {
    command: string;
    params: Record<string, string>;
  };
}

// ─── Elektrik Talebi Verisi ──────────────────────────────────────────────────

/**
 * EIA'dan belirtilen bölge için saatlik elektrik talep verisi çeker.
 * @param regionCode - EIA balancing authority kodu (örn: "CISO", "ERCO")
 * @param hours - Kaç saatlik geçmiş veri (varsayılan: 24)
 */
export async function fetchEiaHourlyDemand(
  regionCode: string,
  hours: number = 24
): Promise<GridData | null> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn("[EIA] API key bulunamadı. EIA_API_KEY environment variable'ını set edin.");
    return null;
  }

  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - hours * 60 * 60 * 1000);

  const params = new URLSearchParams({
    api_key: apiKey,
    frequency: "hourly",
    "data[0]": "value",
    "facets[respondent][]": regionCode,
    "facets[type][]": "D",
    start: formatEiaDate(startDate),
    end: formatEiaDate(endDate),
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    length: "1",
    offset: "0",
  });

  try {
    const url = `${EIA_BASE_URL}/electricity/rto/region-data/data/?${params}`;
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }, // Next.js ISR: saatte bir yenile
    });

    if (!response.ok) {
      console.error(`[EIA] HTTP ${response.status}: ${response.statusText}`);
      return null;
    }

    const json: EiaResponse = await response.json();
    const latestValue = json.response?.data?.[0];

    if (!latestValue || latestValue.value === null) {
      console.warn(`[EIA] ${regionCode} için veri bulunamadı.`);
      return null;
    }

    const regionInfo = Object.values(EIA_REGIONS).find(r => r.code === regionCode);

    return {
      regionCode,
      regionName: regionInfo?.name ?? regionCode,
      countryCode: regionInfo?.countryCode ?? "US",
      totalDemandMW: Math.round(latestValue.value),
      generation: {}, // Üretim verisi ayrı endpoint ile çekilir
      timestamp: latestValue.period,
      source: "eia",
    };
  } catch (error) {
    console.error("[EIA] Veri çekme hatası:", error);
    return null;
  }
}

/**
 * Birden fazla ABD bölgesi için toplu elektrik talebi çeker.
 * Globe'da ABD'yi gerçek veriyle göstermek için kullanılır.
 */
export async function fetchAllEiaRegions(): Promise<GridData[]> {
  const results = await Promise.allSettled(
    Object.values(EIA_REGIONS).map(region =>
      fetchEiaHourlyDemand(region.code)
    )
  );

  return results
    .filter((r): r is PromiseFulfilledResult<GridData> =>
      r.status === "fulfilled" && r.value !== null
    )
    .map(r => r.value);
}

// ─── Üretim Tipi Verisi ──────────────────────────────────────────────────────

/**
 * EIA'dan kaynak tipine göre üretim dağılımı çeker.
 * Güneş/rüzgar/nükleer/gaz/kömür paylarını verir.
 */
export async function fetchEiaGenerationMix(
  regionCode: string
): Promise<Record<string, number> | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const params = new URLSearchParams({
    api_key: apiKey,
    frequency: "hourly",
    "data[0]": "value",
    "facets[respondent][]": regionCode,
    "facets[type][]": "NG", // NG = Net Generation
    sort: JSON.stringify([{ column: "period", direction: "desc" }]),
    length: "20",
    offset: "0",
  });

  try {
    const url = `${EIA_BASE_URL}/electricity/rto/fuel-type-data/data/?${params}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const json: EiaResponse = await response.json();
    const mix: Record<string, number> = {};

    for (const item of json.response?.data ?? []) {
      if (item.value !== null) {
        mix[String(item["value-units"] ?? "unknown")] = item.value;
      }
    }

    return mix;
  } catch {
    return null;
  }
}

// ─── Yardımcı Fonksiyonlar ───────────────────────────────────────────────────

function formatEiaDate(date: Date): string {
  // EIA formatı: "2026-08-07T14"
  return date.toISOString().slice(0, 13);
}

/**
 * EIA'dan son veriyi çekip API bağlantısını test eder.
 */
export async function testEiaConnection(): Promise<{ success: boolean; message: string }> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return {
      success: false,
      message: "EIA_API_KEY bulunamadı. .env.local dosyasına ekleyin.",
    };
  }

  try {
    // PJM bölgesi ile test — büyük ve stabil bir şebeke
    const data = await fetchEiaHourlyDemand("PJM", 48);
    if (data && data.totalDemandMW > 0) {
      return {
        success: true,
        message: `✅ EIA bağlantısı başarılı. PJM talebi: ${data.totalDemandMW.toLocaleString()} MW (${data.timestamp})`,
      };
    }
    // ERCO ile tekrar dene
    const texasData = await fetchEiaHourlyDemand("ERCO", 48);
    if (texasData && texasData.totalDemandMW > 0) {
      return {
        success: true,
        message: `✅ EIA bağlantısı başarılı. Texas (ERCO) talebi: ${texasData.totalDemandMW.toLocaleString()} MW`,
      };
    }
    return {
      success: false,
      message: `EIA key aktif (${apiKey.substring(0, 8)}...) ama veri alınamadı. API gecikme veya bölge kodu sorunu olabilir.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Hata: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
