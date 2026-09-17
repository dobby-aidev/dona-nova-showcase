"use client";

import React from "react";
import { Scale, CheckCircle2, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col select-none">
      <PublicHeader />

      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-12 sm:py-16 w-full max-w-4xl mx-auto">
        {/* Centered Document Navigation Tabs */}
        <DocNavTabs />

        {/* Hero Title Section */}
        <div className="w-full text-center mb-10 space-y-3.5 mt-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-mono font-bold text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            <Scale className="h-4 w-4" />
            <span>Resmi Açık Kaynak Lisansı & Koşulları</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans mt-4">
            Kullanım Koşulları
          </h1>

          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed mt-4">
            DONA NOVA, küresel enerji ve kritik altyapı verilerini tüm insanlığın şeffaf erişimine sunmak amacıyla MIT Lisansı altında geliştirilen bir açık istihbarat platformudur.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-zinc-500 pt-4">
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-zinc-300">Yürürlük: 2026</span>
            <span>•</span>
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-zinc-300">Sürüm: v1.0 Production</span>
            <span>•</span>
            <span className="rounded-md border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 font-bold px-2 py-1">%100 Açık Veri</span>
          </div>
        </div>

        {/* Content Cards */}
        <div className="w-full space-y-5 text-sm text-zinc-300">
          {/* Section 1 */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl space-y-3 transition-all hover:border-cyan-500/40">
            <div className="flex items-center gap-3 pb-2 border-b border-white/[0.08]">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-black shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                01
              </span>
              <h2 className="text-lg font-bold text-white font-sans">
                Hizmetin Niteliği ve Kapsamı
              </h2>
            </div>
            <p className="leading-relaxed">
              DONA NOVA ("Platform"), dünya üzerindeki 35.000+ elektrik üretim santrali, baraj, veri merkezi ve şebeke düğümünü 3D küre üzerinde interaktif olarak görselleştiren bağımsız bir açık kaynak projesidir.
            </p>
            <p className="leading-relaxed">
              Platformda sunulan veriler U.S. EIA, ENTSO-E, WRI Global Power Plant Database ve Electricity Maps kamuya açık API'larından doğrudan ve şeffaf şekilde derlenmektedir.
            </p>
          </div>

          {/* Section 2 */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl space-y-3 transition-all hover:border-amber-500/40">
            <div className="flex items-center gap-3 pb-2 border-b border-white/[0.08]">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-xs font-black shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                02
              </span>
              <h2 className="text-lg font-bold text-white font-sans">
                Açık Kaynak Lisansı (MIT License)
              </h2>
            </div>
            <p className="leading-relaxed">
              DONA NOVA'nın tüm kaynak kodları ve arayüz bileşenleri GitHub üzerinde MIT lisansı ile kamuya açıktır:
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Akademik araştırmalarda, eğitimde ve ticari analizlerde serbestçe atıf yapılarak kullanılabilir.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Kullanıcı hesabı oluşturma, oturum açma veya ücret ödeme zorunluluğu kesinlikle yoktur.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Kodu dilediğiniz gibi fork edebilir, kendi yerel sunucunuzda özgürce çalıştırabilirsiniz.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl space-y-3 transition-all hover:border-indigo-500/40">
            <div className="flex items-center gap-3 pb-2 border-b border-white/[0.08]">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-black shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                03
              </span>
              <h2 className="text-lg font-bold text-white font-sans">
                Veri Doğruluğu & Sorumluluk Reddi
              </h2>
            </div>
            <p className="leading-relaxed">
              Veriler kamu kurumlarından ve resmi iletim şebekelerinden sağlanmaktadır. İletim gecikmeleri veya üçüncü taraf sağlayıcı arızalarından kaynaklanabilecek anlık tutarsızlıklarda DONA NOVA ve Dona Codex ekibi herhangi bir ticari yatırım taahhüdünde bulunmaz.
            </p>
          </div>

          {/* Section 4 */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl space-y-3 transition-all hover:border-emerald-500/40">
            <div className="flex items-center gap-3 pb-2 border-b border-white/[0.08]">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-black shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                04
              </span>
              <h2 className="text-lg font-bold text-white font-sans">
                Resmi İletişim & Güvenlik
              </h2>
            </div>
            <p className="leading-relaxed">
              Platformla ilgili tüm sorularınız, iş birliği teklifleriniz ve güvenlik bildirimleriniz için resmi e-posta adresimiz üzerinden bize ulaşabilirsiniz:
            </p>
            <div className="pt-3">
              <a
                href="mailto:info@donacodex.com"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-200 hover:bg-white/[0.08] hover:text-white transition-all shadow-md"
              >
                <Mail className="h-4 w-4 text-cyan-400" />
                <span>info@donacodex.com</span>
                <span className="text-zinc-500 ml-2">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-16 pb-8 text-xs font-mono text-zinc-500 space-y-2">
          <p>DONA NOVA • Open Source Global Infrastructure Radar</p>
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
