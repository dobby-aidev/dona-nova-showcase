"use client";

import React, { useState, useEffect } from "react";
import { Database, ExternalLink } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";
import { CosmicBackground } from "@/components/layout/CosmicBackground";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useIsMobile } from "@/hooks/useIsMobile";

const SOURCES = [
  {
    id: "wri_gppd",
    name: "World Resources Institute (WRI) GPPD",
    category: { tr: "Güç Santralleri", en: "Power Plants" },
    coverage: { tr: "Küresel (34.936 Santral)", en: "Global (34,936 Plants)" },
    frequency: { tr: "Günlük / Statik", en: "Daily / Static" },
    reliability: { tr: "Yüksek (%99.8)", en: "High (99.8%)" },
    license: "Creative Commons Attribution 4.0 (CC-BY 4.0)",
    url: "https://github.com/wri/global-power-plant-database",
    desc: {
      tr: "Dünyadaki nükleer, güneş, rüzgar, hidroelektrik, termik ve jeotermal santrallerin hassas coğrafi konum, kurulu güç (MW) ve sahibi bilgisi.",
      en: "Precision geospatial coordinates, installed capacity (MW), and ownership data for global nuclear, solar, wind, hydro, thermal, and geothermal plants."
    },
  },
  {
    id: "eia",
    name: "U.S. Energy Information Administration (EIA)",
    category: { tr: "Elektrik Şebekesi & Üretim", en: "Power Grid & Generation" },
    coverage: { tr: "Amerika Birleşik Devletleri (15 Bölge)", en: "United States (15 Grid Regions)" },
    frequency: { tr: "Saatlik Canlı", en: "Hourly Live" },
    reliability: { tr: "Resmi Kamu Kaynağı", en: "Official Gov Source" },
    license: "US Government Public Domain",
    url: "https://www.eia.gov/opendata/",
    desc: {
      tr: "ABD elektrik şebekesinin saatlik talep, net üretim ve yakıt türü bazlı enerji dağılım telemetrisi.",
      en: "Hourly electricity demand, net generation, and energy source fuel-mix telemetry across US balancing authorities."
    },
  },
  {
    id: "entsoe",
    name: "ENTSO-E Transparency Platform",
    category: { tr: "Avrupa İletim Şebekesi", en: "European Transmission" },
    coverage: { tr: "Avrupa (22+ Ülke)", en: "Europe (22+ Countries)" },
    frequency: { tr: "Saatlik Canlı", en: "Hourly Live" },
    reliability: { tr: "Resmi İletim Sistemi", en: "Official TSO Network" },
    license: "Açık Veri Lisansı (ENTSO-E Terms)",
    url: "https://transparency.entsoe.eu/",
    desc: {
      tr: "Avrupa İletim Sistemi İşleticileri Ağı resmi şebeke yükü ve gerçekleşen saatlik üretim verisi.",
      en: "European Network of Transmission System Operators load and actual hourly generation telemetry."
    },
  },
  {
    id: "electricity_maps",
    name: "Electricity Maps Open Engine",
    category: { tr: "Karbon Yoğunluğu & Emisyon", en: "Carbon Intensity & Emissions" },
    coverage: { tr: "Küresel (160+ Bölge)", en: "Global (160+ Regions)" },
    frequency: { tr: "15 Dakika", en: "15 Minutes" },
    reliability: { tr: "Doğrulanmış Model", en: "Verified Model" },
    license: "Open Data Tier",
    url: "https://electricitymaps.com/",
    desc: {
      tr: "Dünya ülkelerinin anlık elektrik üretimine bağlı gCO2eq/kWh cinsinden karbon yoğunluğu ve yenilenebilir enerji payı.",
      en: "Real-time carbon intensity (gCO2eq/kWh) and renewable energy share across world electricity grids."
    },
  },
  {
    id: "peeringdb",
    name: "PeeringDB Global Registry",
    category: { tr: "AI Veri Merkezleri & IXP", en: "AI Data Centers & IXPs" },
    coverage: { tr: "Küresel IXP ve Veri Merkezleri", en: "Global IXPs & Facilities" },
    frequency: { tr: "Günlük Güncelleme", en: "Daily Update" },
    reliability: { tr: "Sektörel Konsorsiyum", en: "Industry Consortium" },
    license: "Public Domain / Open Database",
    url: "https://www.peeringdb.com/",
    desc: {
      tr: "Küresel internet değişim noktaları (IXP), yapay zeka hesaplama tesisleri ve fiber optik omurga düğümleri.",
      en: "Interconnection facilities, internet exchange points, and global AI hyperscale datacenter nodes."
    },
  },
];

export default function DataSourcesPage() {
  const [lang, setLang] = useState<"tr" | "en">("tr");
  const isMobile = useIsMobile();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dona_lang");
      if (stored === "tr" || stored === "en") setLang(stored);
    } catch {}

    const handleLangChange = (e: any) => {
      if (e.detail === "tr" || e.detail === "en") setLang(e.detail);
    };
    window.addEventListener("dona:lang-change", handleLangChange);
    return () => window.removeEventListener("dona:lang-change", handleLangChange);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      maxWidth: "100vw",
      overflowX: "hidden",
      background: "transparent",
      color: "var(--text-main)",
      display: "flex",
      flexDirection: "column",
      userSelect: "none",
      position: "relative",
      boxSizing: "border-box",
    }}>
      {/* 3D Photorealistic Earth & Starfield in Background */}
      <CosmicBackground />
      <div className="dn-grid-bg" style={{ position: "fixed", inset: 0, opacity: 0.25, pointerEvents: "none", zIndex: 1 }} />

      <div style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}>
        <PublicHeader lang={lang} setLang={setLang} />

        <main style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: isMobile ? "1.25rem 0.85rem calc(88px + env(safe-area-inset-bottom, 0px)) 0.85rem" : "2.5rem 1.5rem 4rem 1.5rem",
          width: "100%",
          maxWidth: "760px",
          margin: "0 auto",
          textAlign: "center",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}>
          {/* Centered Document Navigation */}
          <DocNavTabs lang={lang} />

          {/* Hero Section */}
          <div style={{
            width: "100%",
            textAlign: "center",
            marginBottom: isMobile ? "1.5rem" : "2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isMobile ? "0.75rem" : "1rem",
            boxSizing: "border-box",
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              borderRadius: "9999px",
              border: "1px solid var(--gold-border)",
              background: "rgba(212, 175, 55, 0.08)",
              padding: isMobile ? "0.3rem 0.75rem" : "0.35rem 1rem",
              fontFamily: "var(--font-mono)",
              fontSize: isMobile ? "0.58rem" : "0.68rem",
              fontWeight: 700,
              color: "var(--gold-bright)",
              boxShadow: "0 0 16px rgba(212,175,55,0.15)",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}>
              <Database style={{ width: 13, height: 13, flexShrink: 0 }} />
              <span style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                wordBreak: "break-word",
                lineHeight: 1.3,
              }}>
                {lang === "tr" ? "%100 DOĞRULANMIŞ KAMU VERİ ŞEFFAFLIĞI" : "100% VERIFIED PUBLIC DATA MATRIX"}
              </span>
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? "1.45rem" : "2.4rem",
              fontWeight: 900,
              letterSpacing: isMobile ? "0.04em" : "0.08em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #ffffff 0%, #faeed9 30%, #f5d77f 60%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
              lineHeight: 1.25,
              wordBreak: "break-word",
              maxWidth: "100%",
            }}>
              {lang === "tr" ? "Veri Kaynakları & Metodoloji" : "Data Sources & Methodology"}
            </h1>

            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: isMobile ? "0.78rem" : "0.85rem",
              lineHeight: 1.65,
              color: "var(--text-muted)",
              maxWidth: "560px",
              margin: "0 auto",
              textAlign: "center",
              boxSizing: "border-box",
            }}>
              {lang === "tr"
                ? "DONA NOVA üzerindeki hiçbir veri tahmini veya kurgusal değildir. Her tesis ve şebeke düğümü kamuya açık resmi otoritelerden doğrulanır."
                : "No telemetry on DONA NOVA is simulated or guessed. Every infrastructure node and facility is strictly verified against official open agencies."}
            </p>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: isMobile ? "0.4rem" : "0.6rem",
              fontFamily: "var(--font-mono)",
              fontSize: isMobile ? "0.55rem" : "0.62rem",
              color: "var(--text-muted)",
              boxSizing: "border-box",
              width: "100%",
            }}>
              <span style={{ borderRadius: "6px", border: "1px solid var(--gold-border)", background: "rgba(0,0,0,0.3)", padding: "3px 8px", color: "var(--text-main)" }}>
                {lang === "tr" ? "3.160+ HARİTALANMIŞ TESİS" : "3,160+ MAPPED ASSETS"}
              </span>
              {!isMobile && <span>•</span>}
              <span style={{ borderRadius: "6px", border: "1px solid var(--gold-border)", background: "rgba(0,0,0,0.3)", padding: "3px 8px", color: "var(--text-main)" }}>
                {lang === "tr" ? "SIFIR UYDURMA VERİ" : "ZERO SYNTHETIC DATA"}
              </span>
              {!isMobile && <span>•</span>}
              <span style={{ borderRadius: "6px", border: "1px solid rgba(16,185,129,0.35)", background: "rgba(16,185,129,0.1)", padding: "3px 8px", color: "#34d399", fontWeight: 700 }}>
                {lang === "tr" ? "RESMİ AÇIK API" : "OFFICIAL OPEN API"}
              </span>
            </div>
          </div>

          {/* 3 Principles - Responsive Grid (Single column on mobile, 3 cols on desktop) */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? "0.75rem" : "1rem",
            width: "100%",
            boxSizing: "border-box",
            marginBottom: isMobile ? "1.5rem" : "2rem",
          }}>
            {[
              {
                num: "1",
                title: lang === "tr" ? "Doğrudan Kamu API'si" : "Direct Public APIs",
                desc: lang === "tr" ? "Aracı şirket yok. Veriler WRI, EIA ve ENTSO-E kamu kurumlarından doğrudan çekilir." : "Zero intermediaries. Feeds pull directly from WRI, EIA, and ENTSO-E governmental endpoints."
              },
              {
                num: "2",
                title: lang === "tr" ? "Standart Normalizasyon" : "Schema Normalization",
                desc: lang === "tr" ? "Farklı birimler (MW, GW) ortak altyapı veri şemasına dönüştürülür." : "Multi-regional units (MW, MWh, GW) normalized into a unified geospatial telemetry schema."
              },
              {
                num: "3",
                title: lang === "tr" ? "Açık Kaynak Kodları" : "Auditable Open Code",
                desc: lang === "tr" ? "Tüm veri işleme komut dosyaları GitHub deposunda şeffafça incelenebilir." : "Every ETL parser and transform script is open-source and auditable on GitHub."
              },
            ].map((p) => (
              <div key={p.num} style={{
                borderRadius: "14px",
                border: "1px solid var(--gold-border)",
                background: "rgba(6, 7, 12, 0.4)",
                backdropFilter: "blur(14px)",
                padding: isMobile ? "1.1rem 0.9rem" : "1.4rem 1rem",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "0.45rem",
                boxSizing: "border-box",
                width: "100%",
              }}>
                <div style={{
                  display: "flex",
                  width: 26,
                  height: 26,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid var(--gold-border)",
                  color: "var(--gold-bright)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.70rem",
                  fontWeight: 800,
                  flexShrink: 0,
                }}>
                  {p.num}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? "0.80rem" : "0.82rem", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? "0.68rem" : "0.70rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Sources List - Translucent Centered Column */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: isMobile ? "1rem" : "1.2rem", boxSizing: "border-box" }}>
            {SOURCES.map((source) => (
              <div
                key={source.id}
                style={{
                  borderRadius: "16px",
                  border: "1px solid var(--gold-border)",
                  background: "rgba(6, 7, 12, 0.45)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  padding: isMobile ? "1.2rem 1rem" : "1.8rem 1.6rem",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(212,175,55,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: isMobile ? "0.65rem" : "0.8rem",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                  <span style={{
                    borderRadius: "6px",
                    background: "rgba(212, 175, 55, 0.12)",
                    border: "1px solid var(--gold-border)",
                    padding: "2px 8px",
                    fontFamily: "var(--font-mono)",
                    fontSize: isMobile ? "0.56rem" : "0.62rem",
                    fontWeight: 700,
                    color: "var(--gold-bright)",
                  }}>
                    {source.category[lang]}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: isMobile ? "0.56rem" : "0.62rem", color: "var(--text-muted)" }}>
                    • {source.coverage[lang]}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isMobile ? "0.96rem" : "1.05rem",
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  color: "var(--text-main)",
                  margin: 0,
                  textAlign: "center",
                  wordBreak: "break-word",
                  lineHeight: 1.3,
                }}>
                  {source.name}
                </h2>

                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: isMobile ? "0.76rem" : "0.82rem",
                  lineHeight: 1.6,
                  color: "rgba(210, 205, 195, 0.85)",
                  maxWidth: "600px",
                  margin: 0,
                  textAlign: "center",
                  boxSizing: "border-box",
                }}>
                  {source.desc[lang]}
                </p>

                {/* Key Spec Rows (Adaptive 2 cols top + full width license on mobile, 3 cols on desktop) */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
                  gap: isMobile ? "0.5rem" : "0.6rem",
                  borderRadius: "10px",
                  background: "rgba(0,0,0,0.35)",
                  border: "1px solid var(--gold-border)",
                  padding: isMobile ? "0.55rem 0.75rem" : "0.6rem 1rem",
                  width: "100%",
                  maxWidth: "580px",
                  boxSizing: "border-box",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  textAlign: "center",
                }}>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {lang === "tr" ? "GÜNCELLEME" : "FREQUENCY"}
                    </span>
                    <span style={{ fontWeight: 700, color: "#34d399", fontSize: isMobile ? "0.62rem" : "0.68rem" }}>
                      {source.frequency[lang]}
                    </span>
                  </div>

                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {lang === "tr" ? "GÜVENİLİRLİK" : "RELIABILITY"}
                    </span>
                    <span style={{ fontWeight: 700, color: "var(--gold-bright)", fontSize: isMobile ? "0.62rem" : "0.68rem" }}>
                      {source.reliability[lang]}
                    </span>
                  </div>

                  <div style={{ gridColumn: isMobile ? "span 2" : "auto", minWidth: 0, paddingTop: isMobile ? 3 : 0, borderTop: isMobile ? "1px solid rgba(212,175,55,0.12)" : "none" }}>
                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {lang === "tr" ? "LİSANS" : "LICENSE"}
                    </span>
                    <span style={{
                      fontWeight: 600,
                      color: "var(--text-main)",
                      fontSize: isMobile ? "0.58rem" : "0.66rem",
                      wordBreak: "break-word",
                      lineHeight: 1.3,
                      display: "block",
                    }}>
                      {source.license}
                    </span>
                  </div>
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: isMobile ? "0.64rem" : "0.68rem",
                    fontWeight: 700,
                    color: "var(--gold-bright)",
                    textDecoration: "none",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "6px",
                    border: "1px solid rgba(212,175,55,0.2)",
                    background: "rgba(212,175,55,0.04)",
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                    transition: "all 0.18s ease",
                  }}
                >
                  <span>{lang === "tr" ? "Resmi Açık Kaynağı İncele" : "Inspect Official Source Registry"}</span>
                  <ExternalLink style={{ width: 12, height: 12, flexShrink: 0 }} />
                </a>
              </div>
            ))}
          </div>

          {/* Requested Official Copyright Footer */}
          <div style={{
            textAlign: "center",
            paddingTop: isMobile ? "1.75rem" : "3.5rem",
            paddingBottom: "1.5rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
          }}>
            <p>© 2026 Dona Codex. All rights reserved.</p>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      {isMobile && <MobileBottomNav lang={lang} />}
    </div>
  );
}
