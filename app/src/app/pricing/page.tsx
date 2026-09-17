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
    <div className="min-h-screen text-slate-800 flex flex-col bg-slate-50 select-none">
      <PublicHeader />

      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-12 sm:py-16 w-full max-w-3xl mx-auto">
        {/* Centered Document Navigation Tabs */}
        <DocNavTabs />

        {/* Hero Title Section - Perfectly Centered */}
        <div className="w-full text-center mb-10 space-y-3.5 mt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 text-xs font-mono font-bold text-pink-700 shadow-sm">
            <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
            <span>%100 Açık Kaynak • Tüm İnsanlığa Ücretsiz</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-sans mt-4">
            Açık Kaynak & Erişim Manifestosu
          </h1>

          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed mt-4">
            DONA NOVA'da ücretli planlar, kilitli özellikler veya üyelik zorunluluğu yoktur. Dünya üzerindeki enerji ve su altyapısı kamu malıdır ve herkese şeffaf olmalıdır.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-slate-500 pt-4">
            <span className="rounded-md border border-slate-200 bg-white px-2 py-1">Lisans: MIT</span>
            <span>•</span>
            <span className="rounded-md border border-slate-200 bg-white px-2 py-1">Maliyet: $0 / Sonsuza Kadar</span>
            <span>•</span>
            <span className="rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 font-bold px-2 py-1">Kayıtsız Doğrudan Erişim</span>
          </div>
        </div>

        {/* 3 Value Propositions - Centered Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center space-y-3 shadow-sm transition-shadow hover:shadow-md">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
              <Globe2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-sans">35.000+ Tesis</h3>
            <p className="text-[12px] text-slate-600 leading-relaxed">
              Dünya genelindeki tüm elektrik santralleri, su barajları ve veri merkezlerine sınırsız ve engelsiz erişim.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center space-y-3 shadow-sm transition-shadow hover:shadow-md">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-sans">Kayıtsız Erişim</h3>
            <p className="text-[12px] text-slate-600 leading-relaxed">
              Hesap açma, e-posta onaylama veya kredi kartı girme zorunluluğu yok. Sayfayı açın ve anında keşfedin.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center space-y-3 shadow-sm transition-shadow hover:shadow-md">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-sans">Açık Kaynak & Kod</h3>
            <p className="text-[12px] text-slate-600 leading-relaxed">
              Tüm kaynak kodları GitHub üzerinde MIT lisansıyla sunulur. Kendi sunucunuzda özgürce çalıştırabilirsiniz.
            </p>
          </div>
        </div>

        {/* Action Button Strip - Centered */}
        <div className="w-full flex flex-wrap items-center justify-center gap-3.5 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 text-sm transition-all shadow-md"
          >
            <span>Radarı Keşfet</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href="https://github.com/dobby-aidev/dona-nova-showcase"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-5 py-2.5 text-sm transition-all shadow-sm"
          >
            <GithubIcon className="h-4 w-4" />
            <span>GitHub'da İncele</span>
          </a>

          <a
            href="https://donacodex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all shadow-sm"
          >
            <span>donacodex.com</span>
            <ArrowUpRight className="h-4 w-4 text-slate-500" />
          </a>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-16 pb-8 text-xs font-mono text-slate-500 space-y-2">
          <p>DONA NOVA • An Open Source Initiative by Dona Codex & dobby</p>
          <div className="flex items-center justify-center gap-4 text-slate-700">
            <a href="https://donacodex.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold transition-colors">
              <span>donacodex.com</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <span className="text-slate-300">•</span>
            <a href="https://dobby.donacodex.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold transition-colors">
              <span>dobby.donacodex.com</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
