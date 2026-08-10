"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, LogIn, LogOut, Shield, Database, CreditCard, FileText, Lock, Sparkles, Building2, CheckCircle2 } from "lucide-react";
import { DonaLogo } from "@/components/ui/DonaLogo";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  lang: "tr" | "en";
}

export function AuthModal({ isOpen, onClose, isLoggedIn, onToggleLogin, lang }: AuthModalProps) {
  const [email, setEmail] = useState("analyst@donanova.ai");
  const [password, setPassword] = useState("••••••••••••");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-blue-950/40 backdrop-blur-xl"
        />

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-blue-500/30 bg-slate-950/95 shadow-2xl p-6 text-slate-100 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <DonaLogo size="md" showText={true} />
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="py-5 space-y-5">
            {isLoggedIn ? (
              /* ── Logged In Session State ── */
              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm shadow-md">
                      DC
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-slate-100 truncate">DONA CODEX</h4>
                        <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-mono font-bold uppercase">
                          <CheckCircle2 className="h-2.5 w-2.5" /> Aktif Oturum
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">analyst@donanova.ai • Enterprise Tier</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onToggleLogin();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-600/10 py-3 text-xs font-extrabold text-red-400 hover:bg-red-600/20 transition-all shadow-lg active:scale-98"
                >
                  <LogOut className="h-4 w-4" />
                  {lang === "tr" ? "Hesaptan Çıkış Yap" : "Log Out of Account"}
                </button>
              </div>
            ) : (
              /* ── Logged Out / Login Form State ── */
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h4 className="text-base font-extrabold text-white">
                    {lang === "tr" ? "Platform Hesabınıza Giriş Yapın" : "Sign In to Your Account"}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {lang === "tr" ? "Kurumsal altyapı canlı veri akışları ve AI erişimi" : "Access enterprise infrastructure feeds and AI"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">E-Posta Adresi</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full mt-1 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Şifre</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full mt-1 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    onToggleLogin();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-xs font-extrabold text-white shadow-xl hover:from-blue-500 hover:to-indigo-500 transition-all active:scale-98"
                >
                  <LogIn className="h-4 w-4" />
                  {lang === "tr" ? "Kurumsal Giriş Yap (Demo)" : "Enterprise Login (Demo)"}
                </button>
              </div>
            )}

            {/* Public Links & Legal Pages */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {lang === "tr" ? "Genel Sayfalar & Hukuki Belgeler" : "Public & Legal Pages"}
              </label>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/data-sources"
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 p-2.5 text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all"
                >
                  <Database className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{lang === "tr" ? "Veri Kaynakları" : "Data Sources"}</span>
                </Link>

                <Link
                  href="/pricing"
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 p-2.5 text-slate-300 hover:text-white hover:border-purple-500/40 transition-all"
                >
                  <CreditCard className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">{lang === "tr" ? "Fiyatlandırma" : "Pricing"}</span>
                </Link>

                <Link
                  href="/terms"
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 p-2.5 text-slate-300 hover:text-white hover:border-amber-500/40 transition-all"
                >
                  <FileText className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{lang === "tr" ? "Kullanım Şartları" : "Terms of Service"}</span>
                </Link>

                <Link
                  href="/privacy"
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 p-2.5 text-slate-300 hover:text-white hover:border-sky-500/40 transition-all"
                >
                  <Shield className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">{lang === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
