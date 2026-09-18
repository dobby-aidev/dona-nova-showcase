"use client";

import React from "react";
import { ShieldCheck, Mail } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";
import { CosmicBackground } from "@/components/layout/CosmicBackground";

export default function PrivacyPage() {
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
              <ShieldCheck style={{ width: 14, height: 14 }} />
              <span>SIFIR TAKİP & SIFIR VERİ TOPLAMA PRENSİBİ</span>
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
              Gizlilik Politikası
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
              DONA NOVA'da gizlilik sonradan eklenen bir seçenek değil, mimarinin özüdür. Kişisel veri depolanmaz, reklam veya takip çerezi kullanılmaz.
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
                STANDART: ZERO-KNOWLEDGE
              </span>
              <span>•</span>
              <span style={{ borderRadius: "6px", border: "1px solid var(--gold-border)", background: "rgba(0,0,0,0.4)", padding: "3px 8px", color: "var(--text-main)" }}>
                ÇEREZSİZ: %100
              </span>
              <span>•</span>
              <span style={{ borderRadius: "6px", border: "1px solid rgba(16,185,129,0.35)", background: "rgba(16,185,129,0.1)", padding: "3px 8px", color: "#34d399", fontWeight: 700 }}>
                KAYITSIZ DOĞRUDAN ERİŞİM
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
              padding: "1.8rem 1.6rem",
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
                Kişisel Verilerin Toplanmaması
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
                Platformu ziyaret ettiğinizde adınız, e-postanız veya coğrafi GPS konumunuz hiçbir sunucuda veya veritabanında saklanmaz.
              </p>

              {/* 3 Metric Pills Centered */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "0.8rem",
                width: "100%",
                maxWidth: "580px",
                paddingTop: "0.5rem",
              }}>
                {[
                  { title: "0 Kayıt Formu", sub: "Üyelik veya giriş yok" },
                  { title: "0 İzleme Çerezi", sub: "Pazarlama pikseli yok" },
                  { title: "0 Profilleme", sub: "Kullanıcı verisi tutulmaz" },
                ].map((item, i) => (
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
              padding: "1.8rem 1.6rem",
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
                Yalnızca Yerel Tarayıcı Belleği
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
                DONA NOVA yalnızca arayüz dil seçiminiz (TR / EN) veya grafik kalitesi tercihlerinizi cihazınızın yerel depolama alanında (localStorage) tutar. Bu veriler hiçbir merkezi sunucuya aktarılmaz.
              </p>
            </div>

            {/* Section 03 */}
            <div style={{
              borderRadius: "16px",
              border: "1px solid var(--gold-border)",
              background: "rgba(6, 7, 12, 0.2)",
              padding: "1.8rem 1.6rem",
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
                Resmi İletişim & Güvenlik
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
                Gizlilik politikamız veya telemetri altyapısı hakkında her türlü soru için doğrudan kurucu ekibe ulaşabilirsiniz:
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
