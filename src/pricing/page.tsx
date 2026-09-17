"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Globe2, ShieldCheck, Heart, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
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
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col select-none">
      <PublicHeader />

      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-12 sm:py-16 w-full max-w-4xl mx-auto">
        {/* Centered Document Navigation Tabs */}
        <DocNavTabs />

        {/* Hero Title Section */}
        <div className="w-full text-center mb-10 space-y-3.5 mt-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-950/40 px-4 py-1.5 text-xs font-mono font-bold text-pink-300 shadow-[0_0_12px_rgba(236,72,153,0.2)]">
            <Heart className="h-4 w-4 fill-pink-500 text-pink-400" />
            <span>%100 Açık Kaynak • Tüm İnsanlığa Ücretsiz</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans mt-4">
            Açık Kaynak & Erişim Manifestosu
          </h1>

          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed mt-4">
            DONA NOVA'da ücretli planlar, kilitli özellikler veya üyelik zorunluluğu yoktur. Dünya üzerindeki enerji ve su altyapısı kamu malıdır ve herkese şeffaf olmalıdır.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-zinc-500 pt-4">
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-zinc-300">Lisans: MIT</span>
            <span>•</span>
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-zinc-300">Maliyet: $0 / Sonsuza Kadar</span>
            <span>•</span>
            <span className="rounded-md border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 font-bold px-2 py-1">Kayıtsız Doğrudan Erişim</span>
          </div>
        </div>

        {/* 3 Value Propositions */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 text-center space-y-3 shadow-xl backdrop-blur-xl transition-all hover:border-cyan-500/40 hover:bg-zinc-900/80">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <Globe2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white font-sans">35.000+ Tesis</h3>
            <p className="text-[12px] text-zinc-400 leading-relaxed">
              Dünya genelindeki tüm elektrik santralleri, su barajları ve veri merkezlerine sınırsız ve engelsiz erişim.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 text-center space-y-3 shadow-xl backdrop-blur-xl transition-all hover:border-emerald-500/40 hover:bg-zinc-900/80">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white font-sans">Kayıtsız Erişim</h3>
            <p className="text-[12px] text-zinc-400 leading-relaxed">
              Hesap açma, e-posta onaylama veya kredi kartı girme zorunluluğu yok. Sayfayı açın ve anında keşfedin.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 text-center space-y-3 shadow-xl backdrop-blur-xl transition-all hover:border-indigo-500/40 hover:bg-zinc-900/80">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white font-sans">Açık Kaynak & Kod</h3>
            <p className="text-[12px] text-zinc-400 leading-relaxed">
              Tüm kaynak kodları GitHub üzerinde MIT lisansıyla sunulur. Kendi sunucunuzda özgürce çalıştırabilirsiniz.
            </p>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="w-full flex flex-wrap items-center justify-center gap-3.5 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            <span>Radarı Keşfet</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href="https://github.com/dobby-aidev/dona-nova-showcase"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold px-5 py-2.5 text-sm transition-all shadow-md"
          >
            <GithubIcon className="h-4 w-4 text-amber-400" />
            <span>GitHub'da İncele</span>
          </a>

          <a
            href="https://donacodex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2.5 text-sm font-bold text-zinc-300 hover:text-white transition-all shadow-md"
          >
            <span>donacodex.com</span>
            <ArrowUpRight className="h-4 w-4 text-zinc-500" />
          </a>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-16 pb-8 text-xs font-mono text-zinc-500 space-y-2">
          <p>DONA NOVA • An Open Source Initiative by Dona Codex & dobby</p>
          <div className="flex items-center justify-center gap-4 text-zinc-400">
            <a href="https://donacodex.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 hover:underline inline-flex items-center gap-1 font-semibold transition-colors">
              <span>donacodex.com</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <span className="text-zinc-700">•</span>
            <a href="https://dobby.donacodex.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 hover:underline inline-flex items-center gap-1 font-semibold transition-colors">
              <span>dobby.donacodex.com</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
