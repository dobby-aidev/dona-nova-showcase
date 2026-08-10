"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, Database, Eye } from "lucide-react";

import { PublicHeader } from "@/components/layout/PublicHeader";

export default function PrivacyPage() {
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
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            GDPR & KVKK Uyumlu
          </div>
          <h1 className="text-3xl font-black text-white sm:text-4xl">
            Gizlilik Politikası (Privacy Policy)
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Son Güncelleme: 7 Ağustos 2026 · Yürürlük Tarihi: 1 Ağustos 2026
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-400" /> Toplanan Veriler
            </h2>
            <p>
              DONA NOVA, kullanıcıların gizliliğine yüksek seviyede saygı gösterir. Platform üzerinde toplanan veriler şunlardır:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Hesap Kayıt Verileri: E-posta adresi, ad-soyad, kurumsal unvan.</li>
              <li>Kullanım İstatistikleri: Seçilen filtreler, favorilenen tesisler, API çağrı sayıları.</li>
              <li>Teknik Veriler: IP adresi, tarayıcı türü, oturum süreleri.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-400" /> Verilerin Kullanım Amacı
            </h2>
            <p>
              Kullanıcı verileri yalnızca aşağıdaki amaçlar doğrultusunda işlenmektedir:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Abonelik yönetimi ve faturalandırma.</li>
              <li>API rate limiting ve güvenlik kontrolü.</li>
              <li>DONA CODEX AI sorgu motorunu kişiselleştirilmiş sonuçlarla iyileştirme.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="h-4 w-4 text-violet-400" /> Üçüncü Taraflarla Veri Paylaşımı
            </h2>
            <p>
              Kullanıcı verileri hiçbir şart altında reklam ajanslarına veya veri tüccarlarına satılmaz. Yalnızca zorunlu altyapı sağlayıcılarımız (Cloudflare, ödeme işlemcileri) ile şifrelenmiş olarak paylaşılır.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-400" /> Haklarınız (GDPR / KVKK)
            </h2>
            <p>
              Dilediğiniz an verilerinizin dökümünü talep edebilir, hesabınızı ve tüm geçmişinizi silmemizi isteyebilirsiniz: <span className="font-mono text-emerald-400">privacy@donacodex.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
