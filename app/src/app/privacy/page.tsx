"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Mail } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";
import { CosmicBackground } from "@/components/layout/CosmicBackground";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function PrivacyPage() {
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
          padding: isMobile ? "1.5rem 1rem calc(80px + env(safe-area-inset-bottom, 0px)) 1rem" : "2.5rem 1.5rem 4rem 1.5rem",
          width: "100%",
          maxWidth: "760px",
          margin: "0 auto",
          textAlign: "center",
        }}>
          {/* Centered Document Navigation */}
          <DocNavTabs lang={lang} />

          {/* Hero Section */}
          <div style={{ width: "100%", textAlign: "center", marginBottom: isMobile ? "1.75rem" : "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              borderRadius: "9999px",
              border: "1px solid var(--gold-border)",
              background: "rgba(212, 175, 55, 0.08)",
              padding: isMobile ? "0.3rem 0.8rem" : "0.35rem 1rem",
              fontFamily: "var(--font-mono)",
              fontSize: isMobile ? "0.62rem" : "0.68rem",
              fontWeight: 700,
              color: "var(--gold-bright)",
              boxShadow: "0 0 16px rgba(212,175,55,0.15)",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}>
              <ShieldCheck style={{ width: 14, height: 14, flexShrink: 0 }} />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lang === "tr" ? "VERİ GÜVENLİĞİ & AÇIK KAYNAK GİZLİLİK POLİTİKASI" : "DATA SECURITY & OPEN-SOURCE PRIVACY POLICY"}</span>
            </div>

            <h1 style={{
              fontFamily: isMobile ? "var(--font-sans)" : "var(--font-display)",
              fontSize: isMobile ? "1.38rem" : "2.4rem",
              fontWeight: 800,
              letterSpacing: isMobile ? "0.02em" : "0.08em",
              textTransform: isMobile ? "capitalize" : "uppercase",
              background: "linear-gradient(135deg, #ffffff 0%, #faeed9 30%, #f5d77f 60%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
              lineHeight: 1.25,
            }}>
              {lang === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
            </h1>

            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: isMobile ? "0.78rem" : "0.85rem",
              lineHeight: isMobile ? 1.6 : 1.7,
              color: "rgba(210, 205, 195, 0.8)",
              maxWidth: "560px",
              margin: "0 auto",
              textAlign: "center",
              padding: isMobile ? "0 6px" : "0",
            }}>
              {lang === "tr"
                ? "DONA NOVA, sıfır-telemetri ve sıfır-kişisel veri toplama prensibiyle inşa edilmiştir. Kullanıcıların dijital ayak izi asla saklanmaz veya üçüncü taraflarla paylaşılmaz."
                : "DONA NOVA is built on a strict zero-telemetry and zero-personal-data collection architecture. User digital footprints are never stored or shared with third parties."}
            </p>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--text-muted)",
            }}>
              <span style={{ borderRadius: "6px", border: "1px solid var(--gold-border)", background: "rgba(0,0,0,0.4)", padding: "3px 8px", color: "var(--text-main)" }}>
                {lang === "tr" ? "STANDART: ZERO-KNOWLEDGE" : "STANDARD: ZERO-KNOWLEDGE"}
              </span>
              <span>•</span>
              <span style={{ borderRadius: "6px", border: "1px solid var(--gold-border)", background: "rgba(0,0,0,0.4)", padding: "3px 8px", color: "var(--text-main)" }}>
                {lang === "tr" ? "ÇEREZSİZ: %100" : "COOKIELESS: 100%"}
              </span>
              <span>•</span>
              <span style={{ borderRadius: "6px", border: "1px solid rgba(16,185,129,0.35)", background: "rgba(16,185,129,0.1)", padding: "3px 8px", color: "#34d399", fontWeight: 700 }}>
                {lang === "tr" ? "KAYITSIZ DOĞRUDAN ERİŞİM" : "DIRECT ACCESS WITHOUT SIGNUP"}
              </span>
            </div>
          </div>

          {/* Section Cards - Centered Column */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {/* Section 01 */}
            <div style={{
              borderRadius: "16px",
              border: "1px solid var(--gold-border)",
              background: "rgba(6, 7, 12, 0.2)",
              padding: isMobile ? "1.2rem 1rem" : "1.8rem 1.6rem",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(212,175,55,0.03)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.9rem",
            }}>
              <div style={{
                display: "inline-flex",
                width: 32,
                height: 32,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                background: "rgba(212, 175, 55, 0.12)",
                border: "1px solid var(--gold-border)",
                color: "var(--gold-bright)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 800,
              }}>
                01
              </div>

              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                color: "var(--text-main)",
                margin: 0,
                textAlign: "center",
              }}>
                {lang === "tr" ? "Kişisel Verilerin Toplanmaması" : "Zero Collection of Personal Data"}
              </h2>

              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem",
                lineHeight: 1.7,
                color: "rgba(210, 205, 195, 0.85)",
                maxWidth: "600px",
                margin: 0,
                textAlign: "center",
              }}>
                {lang === "tr"
                  ? "Platformu ziyaret ettiğinizde adınız, e-postanız veya coğrafi GPS konumunuz hiçbir sunucuda veya veritabanında saklanmaz."
                  : "When visiting DONA NOVA, your personal name, email, IP address profiling, or precise GPS location are never logged or stored in any database."}
              </p>

              {/* 3 Metric Pills Centered */}
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                gap: "0.8rem",
                width: "100%",
                maxWidth: "580px",
                paddingTop: "0.5rem",
              }}>
                {(lang === "tr"
                  ? [
                      { title: "0 Kayıt Formu", sub: "Üyelik veya giriş yok" },
                      { title: "0 İzleme Çerezi", sub: "Pazarlama pikseli yok" },
                      { title: "0 Profilleme", sub: "Kullanıcı verisi tutulmaz" },
                    ]
                  : [
                      { title: "0 Sign-up Forms", sub: "No accounts or passwords" },
                      { title: "0 Tracking Pixels", sub: "No marketing beacons" },
                      { title: "0 User Profiles", sub: "Zero behavioral logging" },
                    ]
                ).map((item, i) => (
                  <div key={i} style={{
                    borderRadius: "10px",
                    border: "1px solid var(--gold-border)",
                    background: "rgba(0,0,0,0.4)",
                    padding: "0.8rem 0.6rem",
                    textAlign: "center",
                  }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", fontWeight: 800, color: "var(--gold-bright)", margin: 0 }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", color: "var(--text-muted)", margin: "3px 0 0 0" }}>
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 02 */}
            <div style={{
              borderRadius: "16px",
              border: "1px solid var(--gold-border)",
              background: "rgba(6, 7, 12, 0.2)",
              padding: isMobile ? "1.2rem 1rem" : "1.8rem 1.6rem",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(212,175,55,0.03)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.8rem",
            }}>
              <div style={{
                display: "inline-flex",
                width: 32,
                height: 32,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                background: "rgba(212, 175, 55, 0.12)",
                border: "1px solid var(--gold-border)",
                color: "var(--gold-bright)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 800,
              }}>
                02
              </div>

              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                color: "var(--text-main)",
                margin: 0,
                textAlign: "center",
              }}>
                {lang === "tr" ? "Yalnızca Yerel Tarayıcı Belleği" : "Local Browser Storage Only"}
              </h2>

              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem",
                lineHeight: 1.7,
                color: "rgba(210, 205, 195, 0.85)",
                maxWidth: "600px",
                margin: 0,
                textAlign: "center",
              }}>
                {lang === "tr"
                  ? "DONA NOVA yalnızca arayüz dil seçiminiz (TR / EN) veya grafik kalitesi tercihlerinizi cihazınızın yerel depolama alanında (localStorage) tutar. Bu veriler hiçbir merkezi sunucuya aktarılmaz."
                  : "DONA NOVA solely stores your UI language selection (TR / EN) and 3D rendering preferences in your local browser storage (localStorage). This data never leaves your device."}
              </p>
            </div>

            {/* Section 03 */}
            <div style={{
              borderRadius: "16px",
              border: "1px solid var(--gold-border)",
              background: "rgba(6, 7, 12, 0.2)",
              padding: isMobile ? "1.2rem 1rem" : "1.8rem 1.6rem",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(212,175,55,0.03)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.8rem",
            }}>
              <div style={{
                display: "inline-flex",
                width: 32,
                height: 32,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                background: "rgba(212, 175, 55, 0.12)",
                border: "1px solid var(--gold-border)",
                color: "var(--gold-bright)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 800,
              }}>
                03
              </div>

              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                color: "var(--text-main)",
                margin: 0,
                textAlign: "center",
              }}>
                {lang === "tr" ? "Resmi İletişim & Güvenlik" : "Official Contact & Security"}
              </h2>

              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem",
                lineHeight: 1.7,
                color: "rgba(210, 205, 195, 0.85)",
                maxWidth: "600px",
                margin: 0,
                textAlign: "center",
              }}>
                {lang === "tr"
                  ? "Gizlilik politikamız veya telemetri altyapısı hakkında her türlü soru için doğrudan kurucu ekibe ulaşabilirsiniz:"
                  : "For security questions or details regarding the telemetry pipeline, contact the core team directly:"}
              </p>

              <a
                href="mailto:info@donacodex.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  borderRadius: "10px",
                  border: "1px solid var(--gold-border)",
                  background: "rgba(212, 175, 55, 0.08)",
                  padding: "0.5rem 1.2rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--gold-bright)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  marginTop: "0.3rem",
                }}
              >
                <Mail style={{ width: 14, height: 14 }} />
                <span>info@donacodex.com</span>
              </a>
            </div>
          </div>

          {/* Minimal Centered Footer */}
          <div style={{
            textAlign: "center",
            paddingTop: isMobile ? "2rem" : "3.5rem",
            paddingBottom: "2rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
          }}>
            <p style={{ letterSpacing: "0.08em" }}>© 2026 Dona Codex. All rights reserved.</p>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      {isMobile && <MobileBottomNav lang={lang} />}
    </div>
  );
}
