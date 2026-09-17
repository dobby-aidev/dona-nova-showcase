"use client";

import React from "react";
import { Scale, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col select-none">
      <PublicHeader />

      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-10 sm:py-14 w-full max-w-3xl mx-auto text-center">
        {/* Centered Document Navigation Tabs */}
        <DocNavTabs />

        {/* Hero Title Section */}
        <div className="w-full text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-mono font-bold text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            <Scale className="h-4 w-4" />
            <span>Resmi Açık Kaynak Lisansı & Koşulları</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans">
            Kullanım Koşulları
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed text-center">
            DONA NOVA, küresel enerji ve kritik altyapı verilerini tüm insanlığın şeffaf erişimine sunmak amacıyla MIT Lisansı altında geliştirilen bir açık istihbarat platformudur.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[11px] font-mono text-zinc-500 pt-1">
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-zinc-300">Yürürlük: 2026</span>
            <span className="text-zinc-600">•</span>
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-zinc-300">Sürüm: v1.0 Production</span>
            <span className="text-zinc-600">•</span>
            <span className="rounded-md border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 font-bold px-2.5 py-1">%100 Açık Veri</span>
          </div>
        </div>

        {/* Content Cards - Centered Text */}
        <div className="w-full space-y-4 text-center">
          {/* Section 1 */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 shadow-2xl backdrop-blur-2xl space-y-3 transition-all hover:border-cyan-500/40 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2.5 pb-2 border-b border-white/[0.08] w-full">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-black">
                01
              </span>
              <h2 className="text-base font-bold text-white font-sans">
                Hizmetin Niteliği ve Kapsamı
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-zinc-300 max-w-xl text-center">
              DONA NOVA ("Platform"), dünya üzerindeki 35.000+ elektrik santrali, baraj ve veri merkezini 3D küre üzerinde interaktif görselleştiren açık kaynak bir sistemdir.
            </p>
            <p className="leading-relaxed text-xs text-zinc-400 max-w-xl text-center">
              Veriler U.S. EIA, ENTSO-E, WRI Global Power Plant Database ve Electricity Maps kamu API'larından doğrudan derlenmektedir.
            </p>
          </div>

          {/* Section 2 */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 shadow-2xl backdrop-blur-2xl space-y-3 transition-all hover:border-amber-500/40 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2.5 pb-2 border-b border-white/[0.08] w-full">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-xs font-black">
                02
              </span>
              <h2 className="text-base font-bold text-white font-sans">
                Açık Kaynak Lisansı (MIT License)
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-zinc-300 max-w-xl text-center">
              DONA NOVA'nın kaynak kodları ve arayüz bileşenleri GitHub üzerinde MIT lisansı ile kamuya açıktır:
            </p>
            <ul className="space-y-2 pt-1 text-xs text-zinc-300 text-center max-w-md">
              <li className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Akademik araştırmalarda ve ticari analizlerde serbestçe kullanılabilir.</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Kullanıcı hesabı veya ücret zorunluluğu kesinlikle yoktur.</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Kodu dilediğiniz gibi fork edebilir ve yerelinizde çalıştırabilirsiniz.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 shadow-2xl backdrop-blur-2xl space-y-3 transition-all hover:border-indigo-500/40 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2.5 pb-2 border-b border-white/[0.08] w-full">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-black">
                03
              </span>
              <h2 className="text-base font-bold text-white font-sans">
                Veri Doğruluğu & İletişim
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-zinc-300 max-w-xl text-center">
              Veriler kamu kurumlarından sağlanmaktadır. Güvenlik bildirimleri ve sorularınız için:
            </p>
            <a
              href="mailto:info@donacodex.com"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-mono font-semibold text-zinc-200 hover:bg-white/[0.08] hover:text-white transition-all shadow-md mt-1"
            >
              <Mail className="h-3.5 w-3.5 text-cyan-400" />
              <span>info@donacodex.com</span>
            </a>
          </div>
        </div>

        {/* Minimal Clean Footer */}
        <div className="text-center pt-16 pb-8 text-xs font-mono text-zinc-500">
          <p>DONA NOVA • Terms of Service • Dona Codex</p>
        </div>
      </main>
    </div>
  );
}
