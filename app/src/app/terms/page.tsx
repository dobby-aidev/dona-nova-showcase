"use client";

import React from "react";
import Link from "next/link";
import { Shield, ArrowLeft, FileText, Lock, Globe2 } from "lucide-react";

import { PublicHeader } from "@/components/layout/PublicHeader";

export default function TermsPage() {
  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: "hsl(222 47% 4%)" }}>
      <PublicHeader />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          DONA NOVA Ana Sayfasına Dön
        </Link>

        <div className="mb-10 border-b border-slate-800 pb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300">
            <FileText className="h-3.5 w-3.5" />
            Hukuki Belgeler
          </div>
          <h1 className="text-3xl font-black text-white sm:text-4xl">
            Kullanım Koşulları (Terms of Service)
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Son Güncelleme: 7 Ağustos 2026 · Yürürlük Tarihi: 1 Ağustos 2026
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-blue-400">1.</span> Hizmetin Tanımı ve Kapsamı
            </h2>
            <p>
              DONA NOVA ("Platform"), DONA CODEX tarafından işletilen ve küresel enerji, su, fiber, ulaşım ve veri merkezi altyapılarını görselleştiren, analiz eden bir **Altyapı İstihbarat Platformu (Infrastructure Intelligence Platform)** yazılımıdır.
            </p>
            <p>
              Platform üzerindeki tüm veriler resmi ve kamuya açık API kaynaklarından (U.S. EIA, ENTSO-E, WRI, Electricity Maps) derlenmektedir.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-blue-400">2.</span> Kullanım Hakları ve Lisans
            </h2>
            <p>
              DONA NOVA, kullanıcılara seçtikleri abonelik planına (Explorer, Analyst, Professional, Enterprise) göre dünya genelindeki altyapı verilerine erişim hakkı tanır.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Verilerin otomatik scraper veya izinsiz botlar ile çekilmesi yasaktır.</li>
              <li>API erişimi yalnızca yetkili Analyst, Professional ve Enterprise planlarında sağlanır.</li>
              <li>Elde edilen raporlar ve CSV/JSON verileri üçüncü şahıslara satılamaz.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-blue-400">3.</span> Veri Doğruluğu ve Sorumluluk Reddi
            </h2>
            <p>
              DONA NOVA ham verileri resmi kurumlardan doğrudan aktarır. Veri sağlayıcı kaynaklardaki (EIA, ENTSO-E vb.) olası kesinti, yanlış beyan veya gecikmelerden DONA CODEX sorumlu tutulamaz.
            </p>
            <p>
              Platform üzerinde sunulan AI analitiği, anomali tahminleri ve projeksiyonlar bilgilendirme amaçlıdır; yatırım tavsiyesi niteliği taşımaz.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-blue-400">4.</span> Fikri Mülkiyet Hakları
            </h2>
            <p>
              DONA NOVA markası, 3D Dünya görselleştirme motoru, arayüz tasarımları ve DONA CODEX AI modelleri telif hakkı yasalarıyla korunmaktadır.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-blue-400">5.</span> İletişim ve Hukuki Talepler
            </h2>
            <p>
              Kullanım koşulları ile ilgili sorularınız için: <span className="font-mono text-blue-300">legal@donacodex.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
