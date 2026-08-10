/**
 * DONA NOVA — Core Infrastructure Types
 * Tüm veri kaynakları bu ortak tiplere normalize edilir.
 * Mock data'dan gerçek veriye geçiş bu katman üzerinden yapılır.
 */

// ─── Temel Kategori Tipleri ─────────────────────────────────────────────────

export type InfraCategory =
  | "energy"      // Elektrik üretim & şebeke
  | "water"       // Su kaynakları, baraj, arıtma
  | "datacenter"  // Veri merkezleri, AI compute
  | "fiber"       // Fiber optik ağlar
  | "transport"   // Ulaşım: liman, havalimanı, demiryolu
  | "telecom";    // Telekomünikasyon altyapısı

export type EnergySubtype =
  | "nuclear"
  | "solar"
  | "wind"
  | "hydro"
  | "thermal_coal"
  | "thermal_gas"
  | "geothermal"
  | "biomass"
  | "oil"
  | "unknown";

export type OperationalStatus =
  | "operational"
  | "construction"
  | "planned"
  | "decommissioned"
  | "offline"
  | "maintenance";

// ─── Veri Kaynağı Metadata ──────────────────────────────────────────────────

export type DataSourceId =
  | "eia"               // U.S. Energy Information Administration
  | "entsoe"            // European Network of Transmission System Operators
  | "electricity_maps"  // Electricity Maps (carbon intensity)
  | "global_power_plant_db" // WRI Global Power Plant Database
  | "wri_aqueduct"      // WRI Water Risk Atlas
  | "peeringdb"         // Internet Exchange / Datacenter locations
  | "telegeography"     // Submarine cable / fiber maps
  | "openstreetmap"     // OSM infrastructure
  | "manual"            // El ile girilen veri
  | "unknown";

export type DataReliability = "high" | "medium" | "low" | "estimated";

export interface DataSourceMeta {
  /** Verinin geldiği kaynak */
  source: DataSourceId;
  /** Kaynağın okunabilir adı */
  sourceName: string;
  /** Verinin son güncellenme zamanı (ISO string) */
  lastUpdated: string;
  /** Güvenilirlik skoru */
  reliability: DataReliability;
  /** Verinin gerçek zamanlı mı, batch mi, tahminsel mi olduğu */
  updateFrequency: "realtime" | "hourly" | "daily" | "weekly" | "static" | "estimated";
  /** Kaynak URL */
  sourceUrl?: string;
}

// ─── Ana Altyapı Varlığı ────────────────────────────────────────────────────

export interface InfrastructureAsset {
  /** Benzersiz kimlik (slug formatında) */
  id: string;
  /** Görüntülenecek isim */
  name: string;
  /** Kısa açıklama */
  description?: string;
  /** Kategori */
  category: InfraCategory;
  /** Kategori içi alt tip (energy için) */
  subtype?: EnergySubtype;
  /** Operasyonel durum */
  status: OperationalStatus;

  // ── Konum ──
  lat: number;
  lng: number;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2 (TR, US, DE...)
  region?: string;
  city?: string;

  // ── Kapasite & Metrikler ──
  /** MW, m³, Gbps gibi birimle birlikte string */
  capacity?: string;
  /** Sayısal kapasite (hesaplamalar için) */
  capacityMW?: number;
  /** Yıllık üretim/tüketim (enerji için MWh, su için m³) */
  annualOutput?: number;

  // ── Sahiplik & Ekonomi ──
  owner?: string;
  operator?: string;
  investment?: string;
  completionYear?: number;

  // ── Görseller & UI ──
  flagEmoji?: string;
  tags?: string[];

  // ── Gerçek Zamanlı Metrikler (dinamik, sık değişir) ──
  liveMetrics?: LiveMetrics;

  // ── Veri Kaynağı ──
  dataMeta: DataSourceMeta;
}

// ─── Canlı/Gerçek Zamanlı Metrikler ────────────────────────────────────────

export interface LiveMetrics {
  /** Anlık güç çıkışı (MW) — enerji için */
  currentOutputMW?: number;
  /** Kapasite kullanım oranı (0–100) */
  utilizationPercent?: number;
  /** Karbon yoğunluğu (gCO2/kWh) — Electricity Maps'ten */
  carbonIntensity?: number;
  /** Su doluluk oranı (0–100) — barajlar için */
  waterFillPercent?: number;
  /** PUE değeri — veri merkezleri için */
  pue?: number;
  /** Anlık tüketim (MW) — DC için */
  currentConsumptionMW?: number;
  /** Son güncelleme zamanı */
  timestamp: string;
}

// ─── Enerji Şebeke Verisi (ENTSO-E / EIA) ──────────────────────────────────

export interface GridData {
  /** Bölge kodu (ENTSO-E: "DE", EIA: "CISO") */
  regionCode: string;
  /** Okunabilir bölge adı */
  regionName: string;
  /** Ülke kodu */
  countryCode: string;
  /** Toplam talep (MW) */
  totalDemandMW: number;
  /** Üretim tipine göre dağılım */
  generation: Partial<Record<EnergySubtype, number>>;
  /** Net ihracat (pozitif = ihracatçı, negatif = ithalatçı) */
  netExportMW?: number;
  /** Karbon yoğunluğu (gCO2/kWh) */
  carbonIntensity?: number;
  /** Veri zamanı (ISO string) */
  timestamp: string;
  /** Kaynak */
  source: DataSourceId;
}

// ─── Su Stresi Verisi (WRI Aqueduct) ────────────────────────────────────────

export interface WaterStressData {
  /** Bölge/havza kodu */
  basinId: string;
  /** Su stresi seviyesi (0–5: Low → Extremely High) */
  stressLevel: 0 | 1 | 2 | 3 | 4 | 5;
  /** Okunabilir seviye etiketi */
  stressLabel: "Low" | "Low-Medium" | "Medium-High" | "High" | "Extremely High" | "Arid & Low Water Use";
  /** Yıllık su çekimi / yenilenebilir arz oranı */
  withdrawalRatio?: number;
  /** Zaman damgası */
  year: number;
}

// ─── API Yanıt Sarmalayıcı ──────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  meta: {
    source: DataSourceId;
    fetchedAt: string;
    cacheHit: boolean;
    nextRefreshAt?: string;
  };
  error?: string;
}

// ─── Eski Tip Uyumu (GlobeCanvas ile geriye dönük uyum) ────────────────────

/**
 * GlobeCanvas'ın kullandığı eski HotspotLocation tipini
 * yeni InfrastructureAsset'e dönüştüren yardımcı fonksiyon.
 */
export function legacyToInfraAsset(legacy: {
  id: string;
  name: string;
  category: string;
  type: string;
  capacity: string;
  country: string;
  status: string;
  owner: string;
  flagEmoji: string;
  lat: number;
  lng: number;
  coordinates: string;
  completionYear?: string;
  investment?: string;
  description?: string;
  tags?: string[];
}): InfrastructureAsset {
  const categoryMap: Record<string, InfraCategory> = {
    elektrik: "energy",
    su: "water",
    ulasim: "transport",
    datacenter: "datacenter",
  };

  return {
    id: legacy.id,
    name: legacy.name,
    description: legacy.description,
    category: categoryMap[legacy.category] ?? "energy",
    status: (legacy.status as OperationalStatus) ?? "operational",
    lat: legacy.lat,
    lng: legacy.lng,
    country: legacy.country,
    countryCode: "XX", // Bilinmiyor, sonra zenginleştirilecek
    capacity: legacy.capacity,
    owner: legacy.owner,
    investment: legacy.investment,
    completionYear: legacy.completionYear ? parseInt(legacy.completionYear) : undefined,
    flagEmoji: legacy.flagEmoji,
    tags: legacy.tags,
    dataMeta: {
      source: "manual",
      sourceName: "DONA NOVA Manual Entry",
      lastUpdated: new Date().toISOString(),
      reliability: "medium",
      updateFrequency: "static",
    },
  };
}
