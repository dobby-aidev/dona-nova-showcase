"use client";

import React, { useState, useEffect } from "react";
import { Scale, CheckCircle2, Mail } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";
import { CosmicBackground } from "@/components/layout/CosmicBackground";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function TermsPage() {
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
              <Scale style={{ width: 14, height: 14, flexShrink: 0 }} />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lang === "tr" ? "RESMİ AÇIK KAYNAK LİSANSI & KOŞULLARI" : "OFFICIAL OPEN-SOURCE LICENSE & TERMS"}</span>
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
              {lang === "tr" ? "Kullanım Koşulları" : "Terms of Service"}
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
                ? "DONA NOVA, küresel enerji santralleri ve kritik altyapı verilerini insanlığın şeffaf erişimine sunmak amacıyla MIT Lisansı altında geliştirilen bir açık istihbarat platformudur."
                : "DONA NOVA is an open intelligence platform developed under the MIT License to make global power plants and critical infrastructure telemetry transparently accessible to humanity."}
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
                {lang === "tr" ? "YÜRÜRLÜK: 2026" : "EFFECTIVE: 2026"}
              </span>
              <span>•</span>
              <span style={{ borderRadius: "6px", border: "1px solid var(--gold-border)", background: "rgba(0,0,0,0.4)", padding: "3px 8px", color: "var(--text-main)" }}>
                {lang === "tr" ? "SÜRÜM: v1.0 PRODUCTION" : "VERSION: v1.0 PRODUCTION"}
              </span>
              <span>•</span>
              <span style={{ borderRadius: "6px", border: "1px solid rgba(16,185,129,0.35)", background: "rgba(16,185,129,0.1)", padding: "3px 8px", color: "#34d399", fontWeight: 700 }}>
                {lang === "tr" ? "%100 AÇIK VERİ" : "100% OPEN DATA"}
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
                {lang === "tr" ? "Hizmetin Niteliği ve Kapsamı" : "Nature and Scope of Service"}
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
                  ? "DONA NOVA (\"Platform\"), dünya üzerindeki 3.160+ kritik elektrik santrali, baraj, su iletim hattı ve AI veri merkezini 3D küre üzerinde interaktif görselleştiren açık kaynak bir sistemdir."
                  : "DONA NOVA (\"Platform\") is an open-source system providing interactive 3D planetary visualization of 3,160+ critical power stations, reservoirs, water aqueducts, and AI compute clusters worldwide."}
              </p>

              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.76rem",
                lineHeight: 1.6,
                color: "var(--text-muted)",
                maxWidth: "600px",
                margin: 0,
                textAlign: "center",
              }}>
                {lang === "tr"
                  ? "Veriler U.S. EIA, ENTSO-E, WRI Global Power Plant Database ve Electricity Maps kamu API'larından doğrudan derlenmektedir."
                  : "Telemetry feeds are directly aggregated from U.S. EIA, ENTSO-E, WRI Global Power Plant Database, and Electricity Maps public APIs."}
              </p>
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
                {lang === "tr" ? "Açık Kaynak Lisansı (MIT License)" : "Open Source License (MIT License)"}
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
                  ? "DONA NOVA'nın kaynak kodları ve arayüz bileşenleri GitHub üzerinde MIT lisansı ile tüm geliştiricilere ve araştırmacılara açıktır:"
                  : "DONA NOVA source code and UI architecture are freely open to all developers and researchers under the MIT License on GitHub:"}
              </p>

              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.6rem",
                maxWidth: "520px",
                width: "100%",
                paddingTop: "0.4rem",
              }}>
                {(lang === "tr"
                  ? [
                      "Akademik araştırmalarda ve ticari analizlerde serbestçe kullanılabilir.",
                      "Kullanıcı hesabı, kayıt formu veya kredi kartı zorunluluğu kesinlikle yoktur.",
                      "Kaynak kodunu dilediğiniz gibi fork edebilir ve yerelinizde çalıştırabilirsiniz.",
                    ]
                  : [
                      "Free for academic research, grid analysis, and commercial integrations.",
                      "Zero sign-up, zero registration forms, and zero credit card requirements.",
                      "Freely fork the source code and host your own instance locally or on edge.",
                    ]
                ).map((text, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.78rem",
                    color: "var(--text-main)",
                    textAlign: "center",
                  }}>
                    <CheckCircle2 style={{ width: 14, height: 14, color: "#34d399", flexShrink: 0 }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Star on GitHub Callout */}
              <div style={{
                marginTop: "1.2rem",
                borderRadius: "12px",
                border: "1px solid rgba(212, 175, 55, 0.35)",
                background: "linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0.02) 100%)",
                padding: "1rem 1.4rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.6rem",
                maxWidth: "540px",
                boxShadow: "0 0 24px rgba(212, 175, 55, 0.08)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1rem" }}>⭐</span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: "var(--gold-bright)",
                    textTransform: "uppercase",
                  }}>
                    {lang === "tr" ? "AÇIK KAYNAK DESTEĞİ & ATIF" : "OPEN-SOURCE SUPPORT & ATTRIBUTION"}
                  </span>
                </div>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  lineHeight: 1.6,
                  color: "rgba(210, 205, 195, 0.88)",
                  margin: 0,
                  textAlign: "center",
                }}>
                  {lang === "tr"
                    ? "MIT Lisansı kapsamında kodu çatallamakta ve kullanmakta tamamen özgürsünüz. Ancak projeyi desteklemek için GitHub depomuza bir yıldız (Star) bırakmanız ve Dona Codex ile Dobby B ismini referans göstermeniz bizi çok mutlu eder!"
                    : "You are 100% free to fork, build, and use this codebase under the MIT License. If you find value in Dona Nova, dropping a star on GitHub and giving attribution to Dona Codex & Dobby B is the kindest way to support us!"}
                </p>
                <a
                  href="https://github.com/dobby-aidev/dona-nova-showcase"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderRadius: "8px",
                    border: "1px solid var(--gold-border)",
                    background: "rgba(212, 175, 55, 0.15)",
                    padding: "0.4rem 1rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "var(--gold-bright)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    marginTop: "0.2rem",
                  }}
                >
                  <span>⭐ {lang === "tr" ? "GitHub'da Yıldız Ver" : "Star Us on GitHub"}</span>
                </a>
              </div>
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
                {lang === "tr" ? "Veri Doğruluğu & İletişim" : "Data Accuracy & Official Contact"}
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
                  ? "Veriler kamu kurumlarından sağlanmaktadır. Güvenlik bildirimleri ve sorularınız için resmi iletişim adresi:"
                  : "Telemetry feeds are verified against official authorities. For questions, security inquiries, or dataset updates, reach out to:"}
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
