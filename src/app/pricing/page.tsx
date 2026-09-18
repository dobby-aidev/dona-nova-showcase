"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Globe2, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";
import { CosmicBackground } from "@/components/layout/CosmicBackground";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "transparent",
      color: "var(--text-main)",
      display: "flex",
      flexDirection: "column",
      userSelect: "none",
      position: "relative",
    }}>
      {/* 3D Photorealistic Earth & Starfield in Background */}
      <CosmicBackground />
      <div className="dn-grid-bg" style={{ position: "fixed", inset: 0, opacity: 0.25, pointerEvents: "none", zIndex: 1 }} />

      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <PublicHeader />

        <main style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "2.5rem 1.5rem 4rem 1.5rem",
          width: "100%",
          maxWidth: "760px",
          margin: "0 auto",
          textAlign: "center",
        }}>
          {/* Centered Document Navigation */}
          <DocNavTabs />

          {/* Hero Section */}
          <div style={{ width: "100%", textAlign: "center", marginBottom: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
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
              <span>%100 AÇIK KAYNAK • TÜM İNSANLIĞA ÜCRETSİZ</span>
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
              Erişim Manifestosu
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
              DONA NOVA'da ücretli planlar, kilitli abonelikler veya kurumsal duvarlar yoktur. Dünya üzerindeki enerji ve kritik altyapı verileri herkese eşit ve şeffaftır.
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
                LİSANS: MIT
              </span>
              <span>•</span>
              <span style={{ borderRadius: "6px", border: "1px solid var(--gold-border)", background: "rgba(0,0,0,0.4)", padding: "3px 8px", color: "var(--text-main)" }}>
                MALİYET: $0 / SONSUZA KADAR
              </span>
              <span>•</span>
              <span style={{ borderRadius: "6px", border: "1px solid rgba(16,185,129,0.35)", background: "rgba(16,185,129,0.1)", padding: "3px 8px", color: "#34d399", fontWeight: 700 }}>
                KAYITSIZ DOĞRUDAN ERİŞİM
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
                3.160+ Tesis
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                Küresel tüm santraller ve veri merkezlerine engelsiz doğrudan erişim.
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
                Sıfır Kayıt
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                Hesap açma, e-posta veya kart gerekmez. Sayfayı açın ve anında analiz yapın.
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
                Açık Kaynak
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                Tüm kaynak kodları GitHub üzerinde MIT lisansıyla özgürce sunulur.
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
              <span>3D Radara Dön</span>
              <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>

          {/* Minimal Centered Footer */}
          <div style={{
            textAlign: "center",
            paddingTop: "3.5rem",
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
    </div>
  );
}
