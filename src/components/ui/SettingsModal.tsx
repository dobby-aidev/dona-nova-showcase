"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Settings, Database, Cpu, RotateCw, Sparkles,
  CheckCircle2, ShieldCheck, Activity
} from "lucide-react";

export interface RadarSettings {
  quality: "ultra" | "high" | "performance";
  autoRotate: boolean;
  showAtmosphere: boolean;
  refreshInterval: string;
}

const DEFAULT_SETTINGS: RadarSettings = {
  quality: "high",
  autoRotate: true,
  showAtmosphere: true,
  refreshInterval: "10",
};

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
  const [settings, setSettings] = useState<RadarSettings>(DEFAULT_SETTINGS);

  // Load from localStorage on open
  useEffect(() => {
    if (!isOpen) return;
    try {
      const saved = localStorage.getItem("dona_radar_settings");
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch {}
  }, [isOpen]);

  const updateSetting = <K extends keyof RadarSettings>(key: K, value: RadarSettings[K]) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    try {
      localStorage.setItem("dona_radar_settings", JSON.stringify(updated));
    } catch {}
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("dona:settings-change", { detail: updated }));
    }
  };

  const handleApply = () => {
    try {
      localStorage.setItem("dona_radar_settings", JSON.stringify(settings));
    } catch {}
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("dona:settings-change", { detail: settings }));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        userSelect: "none",
        pointerEvents: "auto",
      }}>
        {/* Crystal Clear Click-Away Backdrop (NO BLUR per user request, 3D globe stays 100% sharp) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.35)",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
          }}
        />

        {/* Minimal Transparent Glass Command Card */}
        <motion.aside
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 380,
            maxHeight: "min(540px, 86vh)",
            borderRadius: 14,
            border: `1px solid ${GOLD_BORDER}`,
            background: "rgba(7, 8, 14, 0.50)",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            padding: "14px 16px",
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 10,
            borderBottom: `1px solid ${GOLD_BORDER}`,
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                display: "flex",
                width: 26,
                height: 26,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 7,
                background: GOLD_DIM,
                border: `1px solid ${GOLD_BORDER}`,
              }}>
                <Settings style={{ width: 13, height: 13, color: GOLD }} />
              </div>
              <div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.80rem",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-main)",
                  margin: 0,
                  lineHeight: 1.2,
                }}>
                  {lang === "tr" ? "AYARLAR" : "SETTINGS"}
                </h3>
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.52rem",
                  color: "var(--text-muted)",
                  margin: "1px 0 0 0",
                  letterSpacing: "0.06em",
                }}>
                  {lang === "tr" ? "3D Motor & Canlı Şebeke" : "3D Engine & Telemetry"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 26,
                height: 26,
                borderRadius: 6,
                border: `1px solid ${GOLD_BORDER}`,
                background: "rgba(212,175,55,0.06)",
                color: "var(--text-muted)",
                cursor: "pointer",
                transition: "all 0.18s ease",
              }}
              aria-label="Kapat"
            >
              <X style={{ width: 13, height: 13 }} />
            </button>
          </div>

          {/* Body Content */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            paddingTop: 10,
            paddingBottom: 10,
            display: "flex",
            flexDirection: "column",
            gap: 11,
            scrollbarWidth: "none",
          }}>
            {/* 1: 3D Render Quality (Real-Time DPR Switch) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.56rem",
                  fontWeight: 700,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: GOLD_BRIGHT,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}>
                  <Cpu style={{ width: 11, height: 11, color: GOLD }} />
                  {lang === "tr" ? "3D Grafik Çözünürlüğü" : "3D Resolution"}
                </label>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.50rem", color: "#34d399", fontWeight: 700 }}>
                  {settings.quality === "ultra" ? "2.5x DPR" : settings.quality === "high" ? "1.75x DPR" : "1.0x DPR"}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                {[
                  { id: "ultra", labelTr: "Ultra", labelEn: "Ultra" },
                  { id: "high", labelTr: "Yüksek", labelEn: "High" },
                  { id: "performance", labelTr: "Hızlı", labelEn: "Eco" },
                ].map((item) => {
                  const isSel = settings.quality === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => updateSetting("quality", item.id as any)}
                      style={{
                        height: 26,
                        borderRadius: 6,
                        border: `1px solid ${isSel ? GOLD : GOLD_BORDER}`,
                        background: isSel ? GOLD_DIM : "rgba(0,0,0,0.4)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        color: isSel ? GOLD_BRIGHT : "var(--text-muted)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isSel ? "0 0 10px rgba(212,175,55,0.25)" : "none",
                      }}
                    >
                      {lang === "tr" ? item.labelTr : item.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2: 3D Dynamics Toggles (Auto-Rotate & Atmospheric Halo) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.56rem",
                fontWeight: 700,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: GOLD_BRIGHT,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}>
                <RotateCw style={{ width: 11, height: 11, color: GOLD }} />
                {lang === "tr" ? "Küre Dinamikleri" : "Globe Dynamics"}
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {/* Auto Rotate Toggle */}
                <button
                  onClick={() => updateSetting("autoRotate", !settings.autoRotate)}
                  style={{
                    height: 28,
                    borderRadius: 6,
                    border: `1px solid ${settings.autoRotate ? GOLD : GOLD_BORDER}`,
                    background: settings.autoRotate ? "rgba(212,175,55,0.12)" : "rgba(0,0,0,0.4)",
                    padding: "0 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.54rem", color: "var(--text-main)", fontWeight: 600 }}>
                    {lang === "tr" ? "Otomatik Dönüş" : "Auto-Rotate"}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.50rem", fontWeight: 800,
                    color: settings.autoRotate ? "#34d399" : "var(--text-muted)",
                  }}>
                    {settings.autoRotate ? (lang === "tr" ? "AÇIK" : "ON") : (lang === "tr" ? "KAPALI" : "OFF")}
                  </span>
                </button>

                {/* Atmosphere Glow Toggle */}
                <button
                  onClick={() => updateSetting("showAtmosphere", !settings.showAtmosphere)}
                  style={{
                    height: 28,
                    borderRadius: 6,
                    border: `1px solid ${settings.showAtmosphere ? GOLD : GOLD_BORDER}`,
                    background: settings.showAtmosphere ? "rgba(212,175,55,0.12)" : "rgba(0,0,0,0.4)",
                    padding: "0 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.54rem", color: "var(--text-main)", fontWeight: 600 }}>
                    {lang === "tr" ? "Atmosfer Işıması" : "Atmosphere"}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.50rem", fontWeight: 800,
                    color: settings.showAtmosphere ? "#34d399" : "var(--text-muted)",
                  }}>
                    {settings.showAtmosphere ? (lang === "tr" ? "AÇIK" : "ON") : (lang === "tr" ? "KAPALI" : "OFF")}
                  </span>
                </button>
              </div>
            </div>

            {/* 3: Telemetry Refresh Rate */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.56rem",
                fontWeight: 700,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: GOLD_BRIGHT,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}>
                <Activity style={{ width: 11, height: 11, color: GOLD }} />
                {lang === "tr" ? "Veri Yenileme Sıklığı" : "Telemetry Refresh"}
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                {[
                  { val: "5", label: "5s Live" },
                  { val: "10", label: "10s Standart" },
                  { val: "30", label: "30s Eko" },
                ].map(r => {
                  const isSel = settings.refreshInterval === r.val;
                  return (
                    <button
                      key={r.val}
                      onClick={() => updateSetting("refreshInterval", r.val)}
                      style={{
                        height: 26,
                        borderRadius: 6,
                        border: `1px solid ${isSel ? GOLD : GOLD_BORDER}`,
                        background: isSel ? GOLD_DIM : "rgba(0,0,0,0.4)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.56rem",
                        fontWeight: 700,
                        color: isSel ? GOLD_BRIGHT : "var(--text-muted)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4: Active Data Sources Status */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.54rem",
                fontWeight: 700,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}>
                <Database style={{ width: 10, height: 10, color: "var(--text-muted)" }} />
                {lang === "tr" ? "Bağlı Kaynaklar (Canlı)" : "Live Telemetry Feeds"}
              </label>

              <div style={{
                borderRadius: 8,
                border: `1px solid ${GOLD_BORDER}`,
                background: "rgba(0,0,0,0.3)",
                padding: "6px 8px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}>
                {[
                  { name: "US EIA Open API", sub: "Hourly Power Matrix", live: true },
                  { name: "ENTSO-E Transparency", sub: "European Grid Load", live: true },
                  { name: "WRI GPPD Database", sub: "34,936 Facility Locations", live: true },
                ].map(s => (
                  <div key={s.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.62rem", color: "var(--text-main)", fontWeight: 600 }}>
                      {s.name}
                    </span>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 3,
                      fontSize: "0.48rem", fontFamily: "var(--font-mono)", fontWeight: 700,
                      color: "#34d399", background: "rgba(16,185,129,0.1)", padding: "1px 5px", borderRadius: 4,
                    }}>
                      <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#34d399" }} />
                      ONLINE
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Apply Button */}
          <div style={{
            paddingTop: 8,
            borderTop: `1px solid ${GOLD_BORDER}`,
            flexShrink: 0,
          }}>
            <button
              onClick={handleApply}
              style={{
                display: "flex",
                width: "100%",
                height: 32,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
                border: "none",
                background: "linear-gradient(135deg, #d4af37 0%, #f3dfa2 50%, #d4af37 100%)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.66rem",
                fontWeight: 800,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "#07080e",
                cursor: "pointer",
                boxShadow: "0 3px 14px rgba(212,175,55,0.35)",
                transition: "all 0.18s ease",
              }}
            >
              {lang === "tr" ? "AYARLARI UYGULA" : "APPLY SETTINGS"}
            </button>
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}
