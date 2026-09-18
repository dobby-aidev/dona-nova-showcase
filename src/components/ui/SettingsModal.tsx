"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sliders, ShieldCheck, Database, Cpu, CheckCircle2 } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "tr" | "en";
}

const GOLD = "var(--gold-primary)";
const GOLD_BRIGHT = "var(--gold-bright)";
const GOLD_BORDER = "var(--gold-border)";
const GOLD_DIM = "var(--gold-dim)";

export function SettingsModal({ isOpen, onClose, lang }: SettingsModalProps) {
  const [quality, setQuality] = React.useState("high");
  const [refreshInterval, setRefreshInterval] = React.useState("10");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        userSelect: "none",
      }}>
        {/* Click Outside (NO blur, crystal clear background per user request) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "absolute",
            inset: 0,
            background: "transparent",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
          }}
        />

        {/* Floating Right Glass Rail Panel — Fully Transparent Glass */}
        <motion.aside
          initial={{ opacity: 0, x: 60, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 60, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          style={{
            position: "relative",
            marginRight: 20,
            width: "100%",
            maxWidth: 420,
            height: "calc(100vh - 40px)",
            borderRadius: 20,
            border: `1px solid ${GOLD_BORDER}`,
            background: "rgba(6, 7, 12, 0.32)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 24px 70px rgba(0,0,0,0.6), 0 0 32px rgba(212,175,55,0.08)",
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
            boxSizing: "border-box",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 14,
            borderBottom: `1px solid ${GOLD_BORDER}`,
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                display: "flex",
                width: 32,
                height: 32,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                background: GOLD_DIM,
                border: `1px solid ${GOLD_BORDER}`,
              }}>
                <Sliders style={{ width: 16, height: 16, color: GOLD }} />
              </div>
              <div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-main)",
                  margin: 0,
                }}>
                  {lang === "tr" ? "Radar Tercihleri" : "Radar Preferences"}
                </h3>
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  color: "var(--text-muted)",
                  margin: "2px 0 0 0",
                  letterSpacing: "0.06em",
                }}>
                  {lang === "tr" ? "3D Motor & Canlı Şebeke Parametreleri" : "3D Engine & Telemetry Parameters"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: 8,
                border: `1px solid ${GOLD_BORDER}`,
                background: "rgba(212,175,55,0.04)",
                color: "var(--text-muted)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              aria-label="Close"
            >
              <X style={{ width: 14, height: 14 }} />
            </button>
          </div>

          {/* Body Content */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            paddingTop: 16,
            paddingBottom: 16,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}>
            {/* 1: Connected Live Streams */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: GOLD_BRIGHT,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                <Database style={{ width: 12, height: 12, color: GOLD }} />
                {lang === "tr" ? "Bağlı Canlı Veri Akışları" : "Connected Telemetry Streams"}
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { name: "US EIA Open API", desc: "Amerika Saatlik Üretim & Tüketim", status: "CANLI" },
                  { name: "ENTSO-E Transparency", desc: "Avrupa İletim Şebekesi Yükü", status: "CANLI" },
                  { name: "WRI GPPD Database", desc: "34.936 Santral Konum Matrisi", status: "AKTİF" },
                ].map((stream) => (
                  <div
                    key={stream.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: 10,
                      border: `1px solid ${GOLD_BORDER}`,
                      background: "rgba(212,175,55,0.03)",
                      padding: "8px 12px",
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.74rem", fontWeight: 700, color: "var(--text-main)" }}>
                        {stream.name}
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--text-muted)" }}>
                        {stream.desc}
                      </div>
                    </div>
                    <span style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      borderRadius: 9999,
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.35)",
                      padding: "2px 7px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.54rem",
                      fontWeight: 700,
                      color: "#34d399",
                    }}>
                      <CheckCircle2 style={{ width: 10, height: 10 }} />
                      {stream.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2: 3D Render Quality */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: GOLD_BRIGHT,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                <Cpu style={{ width: 12, height: 12, color: GOLD }} />
                {lang === "tr" ? "3D Grafik & Küre Çözünürlüğü" : "3D Globe Quality"}
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { id: "ultra", label: "Ultra" },
                  { id: "high", label: "Yüksek" },
                  { id: "performance", label: "Performans" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setQuality(item.id)}
                    style={{
                      borderRadius: 8,
                      border: `1px solid ${quality === item.id ? GOLD : GOLD_BORDER}`,
                      background: quality === item.id ? GOLD_DIM : "rgba(0,0,0,0.4)",
                      padding: "8px 6px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: quality === item.id ? GOLD_BRIGHT : "var(--text-muted)",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                      boxShadow: quality === item.id ? "0 0 12px rgba(212,175,55,0.2)" : "none",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3: Refresh Rate */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: GOLD_BRIGHT,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                <Sliders style={{ width: 12, height: 12, color: GOLD }} />
                {lang === "tr" ? "Telemetri Yenileme Sıklığı" : "Telemetry Refresh Rate"}
              </label>

              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  border: `1px solid ${GOLD_BORDER}`,
                  background: "rgba(10,11,18,0.9)",
                  padding: "8px 12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--text-main)",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="5" style={{ background: "#0a0b12" }}>
                  5 {lang === "tr" ? "Saniye (Ultra Canlı)" : "Seconds (Ultra Live)"}
                </option>
                <option value="10" style={{ background: "#0a0b12" }}>
                  10 {lang === "tr" ? "Saniye (Varsayılan)" : "Seconds (Default)"}
                </option>
                <option value="30" style={{ background: "#0a0b12" }}>
                  30 {lang === "tr" ? "Saniye (Tasarruf Modu)" : "Seconds (Eco Mode)"}
                </option>
              </select>
            </div>

            {/* 4: Security Compliance */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              borderRadius: 10,
              border: `1px solid ${GOLD_BORDER}`,
              background: "rgba(0,0,0,0.3)",
              padding: "10px 12px",
            }}>
              <ShieldCheck style={{ width: 18, height: 18, color: "#34d399", flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>
                  TLS 1.3 & Sıfır Takip Standardı
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.58rem", color: "var(--text-muted)", margin: "2px 0 0 0" }}>
                  Tüm telemetri bağlantıları uçtan uca şifreli ve çerezsizdir.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Save Action */}
          <div style={{
            paddingTop: 14,
            borderTop: `1px solid ${GOLD_BORDER}`,
            flexShrink: 0,
          }}>
            <button
              onClick={onClose}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg, #d4af37 0%, #f3dfa2 50%, #d4af37 100%)",
                padding: "10px 16px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#07080e",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(212,175,55,0.4)",
                transition: "all 0.2s ease",
              }}
            >
              {lang === "tr" ? "Tercihleri Uygula" : "Apply Preferences"}
            </button>
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}
