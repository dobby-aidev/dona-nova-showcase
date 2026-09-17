"use client";

import React from "react";
import { ShieldCheck, Mail, ArrowUpRight } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen text-[#fcf8ee] flex flex-col bg-[#08090d] select-none">
      <PublicHeader />

      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-12 sm:py-16 w-full max-w-3xl mx-auto">
        {/* Centered Document Navigation Tabs */}
        <DocNavTabs />

        {/* Hero Title Section - Perfectly Centered */}
        <div className="w-full text-center mb-10 space-y-3.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-1 text-xs font-mono font-bold text-emerald-300 shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Sıfır Takip & Sıfır Veri Toplama Prensibi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#fcf8ee] tracking-tight font-sans">
            Gizlilik Politikası
          </h1>

          <p className="text-xs sm:text-sm text-[#dad3c1] max-w-xl mx-auto leading-relaxed">
            DONA NOVA'da gizlilik sonradan eklenen bir seçenek değil, mimarinin özüdür. Kişisel veri depolanmaz, reklam veya takip çerezi kullanılmaz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-[#a89f8d] pt-2">
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">Standart: Zero-Knowledge</span>
            <span>•</span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">Çerezsiz: %100</span>
            <span>•</span>
            <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5">Kayıtsız Doğrudan Erişim</span>
          </div>
        </div>

        {/* Content Cards - Centered & Highly Polished */}
        <div className="w-full space-y-5 text-sm text-[#dad3c1]">
          {/* Card 1 */}
          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-6 sm:p-7 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-black">
                01
              </span>
              <h2 className="text-base font-bold text-[#fcf8ee] font-sans">
                Kişisel Verilerin Toplanmaması
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
              Platformumuzu ziyaret ettiğinizde veya 3D küre üzerindeki tesisleri incelediğinizde adınız, e-postanız, telefonunuz veya coğrafi GPS konumunuz hiçbir veritabanında depolanmaz.
            </p>
            <div className="pt-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/[0.08] bg-[#090b12] p-3.5 text-center space-y-1">
                <p className="text-xs font-bold text-white font-mono">0 Kayıt Formu</p>
                <p className="text-[10.5px] text-slate-400">Üyelik veya giriş yok</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-[#090b12] p-3.5 text-center space-y-1">
                <p className="text-xs font-bold text-white font-mono">0 İzleme Çerezi</p>
                <p className="text-[10.5px] text-slate-400">Pazarlama pikseli yok</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-[#090b12] p-3.5 text-center space-y-1">
                <p className="text-xs font-bold text-white font-mono">0 Profilleme</p>
                <p className="text-[10.5px] text-slate-400">Kullanıcı davranışı kaydedilmez</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-6 sm:p-7 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-black">
                02
              </span>
              <h2 className="text-base font-bold text-[#fcf8ee] font-sans">
                Yalnızca Yerel Tarayıcı Belleği
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
              DONA NOVA yalnızca arayüz dil seçiminiz (TR / EN) ve harita kamera tercihleriniz gibi deneyiminizi kolaylaştıran verileri tarayıcınızın yerel depolama alanında (localStorage) tutar. Bu tercihler sunucuya gönderilmez.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-6 sm:p-7 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-950 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-black">
                03
              </span>
              <h2 className="text-base font-bold text-[#fcf8ee] font-sans">
                Üçüncü Taraf API İletişimi
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
              Harita üzerinde görüntülenen enerji santralleri ve kamu verileri statik ve açık kaynak API uç noktalarından (WRI, ENTSO-E, EIA) okunur. Bu sorgularda hiçbir kullanıcı kimliği veya özel belirteç iletilmez.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-6 sm:p-7 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-950 border border-amber-500/30 text-amber-300 font-mono text-xs font-black">
                04
              </span>
              <h2 className="text-base font-bold text-[#fcf8ee] font-sans">
                Resmi İletişim
              </h2>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
              Gizlilik politikamız veya veri güvenliği standartlarımız hakkında her türlü soru için resmi adresimiz:
            </p>
            <div className="pt-2">
              <a
                href="mailto:info@donacodex.com"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-2.5 text-xs font-mono font-bold text-emerald-300 hover:bg-emerald-900/50 hover:text-white transition-all shadow-sm"
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
          <p>DONA NOVA • Zero-Knowledge Architecture</p>
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
