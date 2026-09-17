"use client";

import React from "react";
import { ShieldCheck, Mail } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col select-none">
      <PublicHeader />

      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-10 sm:py-14 w-full max-w-3xl mx-auto text-center">
        {/* Centered Document Navigation Tabs */}
        <DocNavTabs />

        {/* Hero Title Section */}
        <div className="w-full text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-1.5 text-xs font-mono font-bold text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Sıfır Takip & Sıfır Veri Toplama Prensibi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans">
            Gizlilik Politikası
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed text-center">
            DONA NOVA'da gizlilik sonradan eklenen bir seçenek değil, mimarinin özüdür. Kişisel veri depolanmaz, reklam veya takip çerezi kullanılmaz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[11px] font-mono text-zinc-500 pt-1">
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-zinc-300">Standart: Zero-Knowledge</span>
            <span className="text-zinc-600">•</span>
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-zinc-300">Çerezsiz: %100</span>
            <span className="text-zinc-600">•</span>
            <span className="rounded-md border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 font-bold px-2.5 py-1">Kayıtsız Doğrudan Erişim</span>
          </div>
        </div>

        {/* Content Cards - Centered */}
        <div className="w-full space-y-4 text-center">
          {/* Card 1 */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 sm:p-7 backdrop-blur-2xl shadow-2xl space-y-4 transition-all hover:border-emerald-500/40 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2.5 pb-2 border-b border-white/[0.08] w-full">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-black shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                01
              </span>
              <h2 className="text-base font-bold text-white font-sans">
                Kişisel Verilerin Toplanmaması
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-zinc-300 max-w-xl text-center">
              Platformu ziyaret ettiğinizde adınız, e-postanız veya coğrafi GPS konumunuz hiçbir veritabanında depolanmaz.
            </p>
            <div className="pt-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              <div className="rounded-xl border border-white/[0.08] bg-black/40 p-3.5 text-center space-y-1">
                <p className="text-xs font-bold text-white font-mono">0 Kayıt Formu</p>
                <p className="text-[10.5px] text-zinc-400">Üyelik veya giriş yok</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-black/40 p-3.5 text-center space-y-1">
                <p className="text-xs font-bold text-white font-mono">0 İzleme Çerezi</p>
                <p className="text-[10.5px] text-zinc-400">Pazarlama pikseli yok</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-black/40 p-3.5 text-center space-y-1">
                <p className="text-xs font-bold text-white font-mono">0 Profilleme</p>
                <p className="text-[10.5px] text-zinc-400">Kullanıcı davranışı kaydedilmez</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 sm:p-7 backdrop-blur-2xl shadow-2xl space-y-3 transition-all hover:border-cyan-500/40 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2.5 pb-2 border-b border-white/[0.08] w-full">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-black shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                02
              </span>
              <h2 className="text-base font-bold text-white font-sans">
                Yalnızca Yerel Tarayıcı Belleği
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-zinc-300 max-w-xl text-center">
              DONA NOVA yalnızca arayüz dil seçiminiz (TR / EN) gibi basit tercihleri tarayıcınızın yerel depolama alanında (localStorage) tutar. Bu veriler sunucuya gönderilmez.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 sm:p-7 backdrop-blur-2xl shadow-2xl space-y-3 transition-all hover:border-indigo-500/40 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2.5 pb-2 border-b border-white/[0.08] w-full">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-black shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                03
              </span>
              <h2 className="text-base font-bold text-white font-sans">
                Resmi İletişim
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-zinc-300 max-w-xl text-center">
              Gizlilik politikamız veya veri güvenliği hakkında sorularınız için:
            </p>
            <a
              href="mailto:info@donacodex.com"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-2 text-xs font-mono font-bold text-emerald-300 hover:bg-emerald-900/50 hover:text-white transition-all shadow-md mt-1"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>info@donacodex.com</span>
            </a>
          </div>
        </div>

        {/* Minimal Clean Footer */}
        <div className="text-center pt-16 pb-8 text-xs font-mono text-zinc-500">
          <p>DONA NOVA • Zero-Knowledge Architecture • Dona Codex</p>
        </div>
      </main>
    </div>
  );
}
