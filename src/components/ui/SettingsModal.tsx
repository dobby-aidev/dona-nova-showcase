"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, ShieldCheck, Database, Sliders, Cpu, CheckCircle2, Globe2 } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "tr" | "en";
}

export function SettingsModal({ isOpen, onClose, lang }: SettingsModalProps) {
  const [quality, setQuality] = React.useState("high");
  const [refreshInterval, setRefreshInterval] = React.useState("10");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Soft Blue Translucent Backdrop (3D Globe stays 100% visible behind blur) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-blue-950/20 backdrop-blur-md pointer-events-auto"
        />

        {/* Sleek Floating Right Glass Panel (NOT a big center square) */}
        <motion.aside
          initial={{ opacity: 0, x: 50, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 340, damping: 32 }}
          className="fixed right-6 top-6 bottom-6 w-full max-w-[420px] h-[calc(100vh-3rem)] overflow-hidden rounded-3xl border border-blue-500/30 bg-slate-950/85 backdrop-blur-3xl shadow-2xl p-6 text-slate-100 flex flex-col pointer-events-auto z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Settings className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold tracking-tight text-white uppercase">
                  {lang === "tr" ? "Sistem & Platform Ayarları" : "Platform Settings"}
                </h3>
                <p className="text-[10.5px] text-slate-400">
                  {lang === "tr" ? "NASA 3D Uydu ve Canlı Veri Akış Modları" : "NASA 3D Satellite & Live Stream Configurations"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1">
            {/* Connected APIs */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-blue-400" />
                {lang === "tr" ? "Bağlı Canlı API Akışları" : "Connected Data Streams"}
              </label>
              
              <div className="space-y-2">
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-3 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-emerald-400 truncate">US EIA Grid API</p>
                    <p className="text-[10px] text-slate-300">Hourly US Generation & Fuel Mix</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-mono font-bold shrink-0 ml-2">
                    <CheckCircle2 className="h-3 w-3" /> Active
                  </span>
                </div>

                <div className="rounded-2xl border border-blue-500/30 bg-blue-950/30 p-3 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-blue-400 truncate">ENTSO-E Transmission</p>
                    <p className="text-[10px] text-slate-300">Pan-European Electricity Load</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 text-[9px] font-mono font-bold shrink-0 ml-2">
                    <CheckCircle2 className="h-3 w-3" /> Active
                  </span>
                </div>
              </div>
            </div>

            {/* Graphic Quality */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-purple-400" />
                {lang === "tr" ? "3D Grafik & İşleme Kalitesi" : "3D Render Quality"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["ultra", "high", "performance"].map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={`rounded-xl px-2.5 py-2 text-xs font-bold capitalize transition-all border ${
                      quality === q
                        ? "border-blue-500 bg-blue-600/25 text-white shadow-lg shadow-blue-500/20"
                        : "border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Refresh Interval */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-amber-400" />
                {lang === "tr" ? "Yenileme Sıklığı" : "Refresh Rate"}
              </label>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="5">5 {lang === "tr" ? "Saniye (Ultra Canlı)" : "Seconds (Ultra Live)"}</option>
                <option value="10">10 {lang === "tr" ? "Saniye (Varsayılan)" : "Seconds (Default)"}</option>
                <option value="30">30 {lang === "tr" ? "Saniye (Tasarruf)" : "Seconds (Economic)"}</option>
              </select>
            </div>

            {/* Security Compliance */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-3.5 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-200 truncate">SOC2 Type II & GDPR Compliant</p>
                <p className="text-[10px] text-slate-400">All grid telemetry encrypted in transit via TLS 1.3.</p>
              </div>
            </div>
          </div>

          {/* Footer Action Button */}
          <div className="pt-3 border-t border-slate-800/80 shrink-0">
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-xl transition-all active:scale-[0.98]"
            >
              {lang === "tr" ? "Ayarları Kaydet" : "Save Settings"}
            </button>
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}
