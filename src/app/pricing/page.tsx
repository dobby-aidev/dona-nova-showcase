"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Globe2, ShieldCheck, Heart, ArrowRight, Terminal } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";
import { CosmicBackground } from "@/components/layout/CosmicBackground";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function PricingPage() {
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
              padding: "0.35rem 1rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              fontWeight: 700,
              color: "var(--gold-bright)",
              boxShadow: "0 0 16px rgba(212,175,55,0.15)",
            }}>
              <Heart style={{ width: 14, height: 14, color: "var(--gold-bright)" }} />
              <span>{lang === "tr" ? "%100 AÇIK KAYNAK • TÜM İNSANLIĞA ÜCRETSİZ" : "100% OPEN SOURCE • FREE FOR ALL HUMANITY"}</span>
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.4rem",
              fontWeight: 900,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #ffffff 0%, #faeed9 30%, #f5d77f 60%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
              lineHeight: 1.2,
            }}>
              {lang === "tr" ? "Erişim Manifestosu" : "Access Manifesto"}
            </h1>

            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              lineHeight: 1.7,
              color: "var(--text-muted)",
              maxWidth: "560px",
              margin: "0 auto",
              textAlign: "center",
            }}>
              {lang === "tr"
                ? "DONA NOVA'da ücretli planlar, kilitli abonelikler veya kurumsal duvarlar yoktur. Dünya üzerindeki enerji ve kritik altyapı verileri herkese eşit ve şeffaftır."
                : "DONA NOVA has zero paywalls, zero gated subscriptions, and zero corporate barriers. Planetary energy and critical infrastructure telemetry belong to everyone equally."}
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
                {lang === "tr" ? "LİSANS: MIT" : "LICENSE: MIT"}
              </span>
              <span>•</span>
              <span style={{ borderRadius: "6px", border: "1px solid var(--gold-border)", background: "rgba(0,0,0,0.4)", padding: "3px 8px", color: "var(--text-main)" }}>
                {lang === "tr" ? "MALİYET: $0 / SONSUZA KADAR" : "COST: $0 / FOREVER"}
              </span>
              <span>•</span>
              <span style={{ borderRadius: "6px", border: "1px solid rgba(16,185,129,0.35)", background: "rgba(16,185,129,0.1)", padding: "3px 8px", color: "#34d399", fontWeight: 700 }}>
                {lang === "tr" ? "KAYITSIZ DOĞRUDAN ERİŞİM" : "DIRECT ACCESS WITHOUT SIGNUP"}
              </span>
            </div>
          </div>

          {/* 3 Core Pillars - Centered Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1rem",
            width: "100%",
            marginBottom: "2rem",
          }}>
            <div style={{
              borderRadius: "16px",
              border: "1px solid var(--gold-border)",
              background: "rgba(6, 7, 12, 0.2)",
              padding: "1.5rem 1rem",
              boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
              backdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.6rem",
            }}>
              <div style={{
                display: "flex",
                width: 36,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "rgba(212,175,55,0.12)",
                border: "1px solid var(--gold-border)",
                color: "var(--gold-bright)",
              }}>
                <Globe2 style={{ width: 18, height: 18 }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                {lang === "tr" ? "3.160+ Tesis" : "3,160+ Facilities"}
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                {lang === "tr"
                  ? "Küresel tüm santraller ve veri merkezlerine engelsiz doğrudan erişim."
                  : "Unrestricted planetary access to power plants, grids, and compute clusters."}
              </p>
            </div>

            <div style={{
              borderRadius: "16px",
              border: "1px solid var(--gold-border)",
              background: "rgba(6, 7, 12, 0.2)",
              padding: "1.5rem 1rem",
              boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
              backdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.6rem",
            }}>
              <div style={{
                display: "flex",
                width: 36,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.35)",
                color: "#34d399",
              }}>
                <ShieldCheck style={{ width: 18, height: 18 }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                {lang === "tr" ? "Sıfır Kayıt" : "Zero Sign-up"}
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                {lang === "tr"
                  ? "Hesap açma, e-posta veya kart gerekmez. Sayfayı açın ve anında analiz yapın."
                  : "No account, no passwords, no email needed. Instant browser analysis."}
              </p>
            </div>

            <div style={{
              borderRadius: "16px",
              border: "1px solid var(--gold-border)",
              background: "rgba(6, 7, 12, 0.2)",
              padding: "1.5rem 1rem",
              boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
              backdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.6rem",
            }}>
              <div style={{
                display: "flex",
                width: 36,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "rgba(212,175,55,0.12)",
                border: "1px solid var(--gold-border)",
                color: "var(--gold-bright)",
              }}>
                <Terminal style={{ width: 18, height: 18 }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                {lang === "tr" ? "Açık Kaynak" : "Open Source"}
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                {lang === "tr"
                  ? "Tüm kaynak kodları GitHub üzerinde MIT lisansıyla özgürce sunulur."
                  : "All frontend and MCP source codes are freely open under MIT license."}
              </p>
            </div>
          </div>

          {/* Focused Action Button */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", width: "100%" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #d4af37 0%, #f3dfa2 50%, #d4af37 100%)",
                padding: "0.7rem 1.6rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#07080e",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(212,175,55,0.35)",
                transition: "all 0.2s ease",
              }}
            >
              <span>{lang === "tr" ? "3D Radara Dön" : "Back to 3D Radar"}</span>
              <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
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
