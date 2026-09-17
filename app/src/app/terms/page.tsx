"use client";

import React from "react";
import { Scale, CheckCircle2, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";

export default function TermsPage() {
  return (
    <div className="min-h-screen text-[#fcf8ee] flex flex-col bg-[#08090d] select-none">
      <PublicHeader />

      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-12 sm:py-16 w-full max-w-3xl mx-auto">
        {/* Centered Document Navigation Tabs */}
        <DocNavTabs />

        {/* Hero Title Section - Perfectly Centered */}
        <div className="w-full text-center mb-10 space-y-3.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1 text-xs font-mono font-bold text-cyan-300 shadow-sm">
            <Scale className="h-3.5 w-3.5" />
            <span>Resmi Açık Kaynak Lisansı & Koşulları</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#fcf8ee] tracking-tight font-sans">
            Kullanım Koşulları
          </h1>

          <p className="text-xs sm:text-sm text-[#dad3c1] max-w-xl mx-auto leading-relaxed">
            DONA NOVA, küresel enerji ve kritik altyapı verilerini tüm insanlığın şeffaf erişimine sunmak amacıyla MIT Lisansı altında geliştirilen bir açık istihbarat platformudur.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-[#a89f8d] pt-2">
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">Yürürlük: 2026</span>
            <span>•</span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">Sürüm: v1.0 Production</span>
            <span>•</span>
            <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5">%100 Açık Veri</span>
          </div>
        </div>

        {/* Content Cards - Centered & Highly Polished */}
        <div className="w-full space-y-5 text-sm text-[#dad3c1]">
          {/* Section 1 */}
          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-6 sm:p-7 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-black">
                01
              </span>
              <h2 className="text-base font-bold text-[#fcf8ee] font-sans">
                Hizmetin Niteliği ve Kapsamı
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
              DONA NOVA ("Platform"), dünya üzerindeki 35.000+ elektrik üretim santrali, baraj, veri merkezi ve şebeke düğümünü 3D küre üzerinde interaktif olarak görselleştiren bağımsız bir açık kaynak projesidir.
            </p>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
              Platformda sunulan veriler U.S. EIA, ENTSO-E, WRI Global Power Plant Database ve Electricity Maps kamuya açık API'larından doğrudan ve şeffaf şekilde derlenmektedir.
            </p>
          </div>

          {/* Section 2 */}
          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-6 sm:p-7 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-950 border border-amber-500/30 text-amber-300 font-mono text-xs font-black">
                02
              </span>
              <h2 className="text-base font-bold text-[#fcf8ee] font-sans">
                Açık Kaynak Lisansı (MIT License)
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
              DONA NOVA'nın tüm kaynak kodları ve arayüz bileşenleri GitHub üzerinde MIT lisansı ile kamuya açıktır:
            </p>
            <ul className="space-y-2 pt-1 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Akademik araştırmalarda, eğitimde ve ticari analizlerde serbestçe atıf yapılarak kullanılabilir.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Kullanıcı hesabı oluşturma, oturum açma veya ücret ödeme zorunluluğu kesinlikle yoktur.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Kodu dilediğiniz gibi fork edebilir, kendi yerel sunucunuzda özgürce çalıştırabilirsiniz.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-6 sm:p-7 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-950 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-black">
                03
              </span>
              <h2 className="text-base font-bold text-[#fcf8ee] font-sans">
                Veri Doğruluğu & Sorumluluk Reddi
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
              Veriler kamu kurumlarından ve resmi iletim şebekelerinden sağlanmaktadır. İletim gecikmeleri veya üçüncü taraf sağlayıcı arızalarından kaynaklanabilecek anlık tutarsızlıklarda DONA NOVA ve Dona Codex ekibi herhangi bir ticari yatırım taahhüdünde bulunmaz.
            </p>
          </div>

          {/* Section 4 */}
          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-6 sm:p-7 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-black">
                04
              </span>
              <h2 className="text-base font-bold text-[#fcf8ee] font-sans">
                Resmi İletişim & Güvenlik
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
              Platformla ilgili tüm sorularınız, iş birliği teklifleriniz ve güvenlik bildirimleriniz için resmi e-posta adresimiz üzerinden bize ulaşabilirsiniz:
            </p>
            <div className="pt-2">
              <a
                href="mailto:info@donacodex.com"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-4 py-2.5 text-xs font-mono font-bold text-cyan-300 hover:bg-cyan-900/50 hover:text-white transition-all shadow-sm"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>info@donacodex.com</span>
                <span className="text-slate-400 ml-1">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-12 pb-6 text-[11px] font-mono text-[#a89f8d] space-y-1">
          <p>DONA NOVA • Open Source Global Infrastructure Radar</p>
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
