"use client";

import React from "react";
import { Scale, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";
import { CosmicBackground } from "@/components/layout/CosmicBackground";

export default function TermsPage() {
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
              <Scale style={{ width: 14, height: 14 }} />
              <span>RESMİ AÇIK KAYNAK LİSANSI & KOŞULLARI</span>
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
              Kullanım Koşulları
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
              DONA NOVA, küresel enerji santralleri ve kritik altyapı verilerini insanlığın şeffaf erişimine sunmak amacıyla MIT Lisansı altında geliştirilen bir açık istihbarat platformudur.
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
                YÜRÜRLÜK: 2026
              </span>
              <span>•</span>
              <span style={{ borderRadius: "6px", border: "1px solid var(--gold-border)", background: "rgba(0,0,0,0.4)", padding: "3px 8px", color: "var(--text-main)" }}>
                SÜRÜM: v1.0 PRODUCTION
              </span>
              <span>•</span>
              <span style={{ borderRadius: "6px", border: "1px solid rgba(16,185,129,0.35)", background: "rgba(16,185,129,0.1)", padding: "3px 8px", color: "#34d399", fontWeight: 700 }}>
                %100 AÇIK VERİ
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
                Hizmetin Niteliği ve Kapsamı
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
                DONA NOVA ("Platform"), dünya üzerindeki 3.160+ kritik elektrik santrali, baraj, su iletim hattı ve AI veri merkezini 3D küre üzerinde interaktif görselleştiren açık kaynak bir sistemdir.
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
                Veriler U.S. EIA, ENTSO-E, WRI Global Power Plant Database ve Electricity Maps kamu API'larından doğrudan derlenmektedir.
              </p>
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
                Açık Kaynak Lisansı (MIT License)
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
                DONA NOVA'nın kaynak kodları ve arayüz bileşenleri GitHub üzerinde MIT lisansı ile tüm geliştiricilere ve araştırmacılara açıktır:
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
                {[
                  "Akademik araştırmalarda ve ticari analizlerde serbestçe kullanılabilir.",
                  "Kullanıcı hesabı, kayıt formu veya kredi kartı zorunluluğu kesinlikle yoktur.",
                  "Kaynak kodunu dilediğiniz gibi fork edebilir ve yerelinizde çalıştırabilirsiniz.",
                ].map((text, i) => (
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
                Veri Doğruluğu & İletişim
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
                Veriler kamu kurumlarından sağlanmaktadır. Güvenlik bildirimleri ve sorularınız için resmi iletişim adresi:
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
