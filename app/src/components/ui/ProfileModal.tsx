"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Key, CreditCard, Building, CheckCircle, ExternalLink } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "tr" | "en";
}

export function ProfileModal({ isOpen, onClose, lang }: ProfileModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Soft Blue Translucent Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-blue-950/20 backdrop-blur-md pointer-events-auto"
        />

        {/* Sleek Floating Right Glass Panel */}
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
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm shadow-xl shrink-0">
                DC
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold tracking-tight truncate">DONA CODEX</h3>
                  <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 text-[9px] font-mono font-bold uppercase flex items-center gap-1 shrink-0">
                    <Crown className="h-2.5 w-2.5" /> Enterprise
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-400 truncate">
                  {lang === "tr" ? "Kurumsal Altyapı Hesabı" : "Enterprise Analyst Account"}
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

          {/* Account Details */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs gap-2">
                <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                  <Building className="h-3.5 w-3.5 text-blue-400" />
                  {lang === "tr" ? "Organizasyon:" : "Organization:"}
                </span>
                <span className="font-bold text-slate-100 truncate max-w-[180px]">Global Energy & Compute</span>
              </div>

              <div className="flex items-center justify-between text-xs gap-2">
                <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                  <Key className="h-3.5 w-3.5 text-emerald-400" />
                  {lang === "tr" ? "API Kotası:" : "API Quota:"}
                </span>
                <span className="font-mono text-emerald-400 font-bold truncate">1,000,000 req/mo</span>
              </div>

              <div className="flex items-center justify-between text-xs gap-2">
                <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                  <CreditCard className="h-3.5 w-3.5 text-purple-400" />
                  {lang === "tr" ? "Paket Tier:" : "Subscription:"}
                </span>
                <span className="font-bold text-purple-300 truncate">Enterprise Tier ($999/mo)</span>
              </div>
            </div>

            {/* Features Included */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {lang === "tr" ? "Aktif Lisans Hakları" : "Active Features"}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 rounded-xl bg-slate-900/40 p-2 border border-slate-800/60 min-w-0">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">35k+ Plants</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-slate-900/40 p-2 border border-slate-800/60 min-w-0">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">US EIA Grid</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-slate-900/40 p-2 border border-slate-800/60 min-w-0">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">EU ENTSO-E</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-slate-900/40 p-2 border border-slate-800/60 min-w-0">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">AI Codex</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-800/80 shrink-0 flex items-center justify-between gap-3">
            <a
              href="/pricing"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 shrink-0"
            >
              {lang === "tr" ? "Planı Yükselt" : "Upgrade"} <ExternalLink className="h-3 w-3" />
            </a>
            <button
              onClick={onClose}
              className="rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2 text-xs font-bold text-white shadow-lg transition-all"
            >
              {lang === "tr" ? "Kapat" : "Close"}
            </button>
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}
