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
    <div className="min-h-screen text-[#fcf8ee] flex flex-col bg-[#08090d] select-none">
      <PublicHeader />

      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-12 sm:py-16 w-full max-w-3xl mx-auto">
        {/* Centered Document Navigation Tabs */}
        <DocNavTabs />

        {/* Hero Title Section - Perfectly Centered */}
        <div className="w-full text-center mb-10 space-y-3.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-950/30 px-4 py-1 text-xs font-mono font-bold text-pink-300 shadow-sm">
            <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
            <span>%100 Açık Kaynak • Tüm İnsanlığa Ücretsiz</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#fcf8ee] tracking-tight font-sans">
            Açık Kaynak & Erişim Manifestosu
          </h1>

          <p className="text-xs sm:text-sm text-[#dad3c1] max-w-xl mx-auto leading-relaxed">
            DONA NOVA'da ücretli planlar, kilitli özellikler veya üyelik zorunluluğu yoktur. Dünya üzerindeki enerji ve su altyapısı kamu malıdır ve herkese şeffaf olmalıdır.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-[#a89f8d] pt-2">
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">Lisans: MIT</span>
            <span>•</span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">Maliyet: $0 / Sonsuza Kadar</span>
            <span>•</span>
            <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5">Kayıtsız Doğrudan Erişim</span>
          </div>
        </div>

        {/* 3 Value Propositions - Centered Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-5 text-center space-y-2.5 shadow-lg">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
              <Globe2 className="h-4 w-4" />
            </div>
            <h3 className="text-xs font-bold text-[#fcf8ee] font-sans">35.000+ Tesis</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Dünya genelindeki tüm elektrik santralleri, su barajları ve veri merkezlerine sınırsız ve engelsiz erişim.
            </p>
          </div>

          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-5 text-center space-y-2.5 shadow-lg">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="text-xs font-bold text-[#fcf8ee] font-sans">Kayıtsız Doğrudan Erişim</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Hesap açma, e-posta onaylama veya kredi kartı girme zorunluluğu yok. Sayfayı açın ve anında keşfedin.
            </p>
          </div>

          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-5 text-center space-y-2.5 shadow-lg">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400">
              <Terminal className="h-4 w-4" />
            </div>
            <h3 className="text-xs font-bold text-[#fcf8ee] font-sans">Açık Kaynak & Kod</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Tüm kaynak kodları GitHub üzerinde MIT lisansıyla sunulur. Kendi sunucunuzda özgürce çalıştırabilirsiniz.
            </p>
          </div>
        </div>

        {/* Action Button Strip - Centered */}
        <div className="w-full flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold px-5 py-2.5 text-xs transition-all shadow-lg shadow-cyan-500/20"
          >
            <span>Radarı Keşfet</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <a
            href="https://github.com/dobby-aidev/dona-nova-showcase"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#faebd7]/20 bg-[#141624] hover:bg-[#1f2235] text-white font-bold px-5 py-2.5 text-xs transition-all shadow-md"
          >
            <GithubIcon className="h-4 w-4" />
            <span>GitHub'da İncele</span>
          </a>

          <a
            href="https://donacodex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-black/40 hover:bg-black/60 px-4 py-2.5 text-xs font-mono text-slate-300 hover:text-white transition-all"
          >
            <span>donacodex.com</span>
            <ArrowUpRight className="h-3 w-3 text-slate-400" />
          </a>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-12 pb-6 text-[11px] font-mono text-[#a89f8d] space-y-1">
          <p>DONA NOVA • An Open Source Initiative by Dona Codex & dobby</p>
          <div className="flex items-center justify-center gap-3 text-cyan-400">
            <a href="https://donacodex.com" target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-0.5">
              <span>donacodex.com</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <span>•</span>
            <a href="https://dobby.donacodex.com" target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-0.5">
              <span>dobby.donacodex.com</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
