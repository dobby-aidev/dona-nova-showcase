"use client";

import React from "react";
import { Database, ExternalLink, ShieldCheck, CheckCircle2, Globe2, ArrowUpRight } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { DocNavTabs } from "@/components/layout/DocNavTabs";

const SOURCES = [
  {
    id: "wri_gppd",
    name: "World Resources Institute (WRI) GPPD",
    category: "Güç Santralleri",
    coverage: "Küresel (34.936 Santral)",
    frequency: "Günlük / Statik",
    reliability: "Yüksek (%99.8)",
    license: "Creative Commons Attribution 4.0 (CC-BY 4.0)",
    url: "https://github.com/wri/global-power-plant-database",
    desc: "Dünyadaki nükleer, güneş, rüzgar, hidroelektrik, termik ve jeotermal santrallerin hassas coğrafi konum, kurulu güç (MW) ve sahibi bilgisi.",
  },
  {
    id: "eia",
    name: "U.S. Energy Information Administration (EIA)",
    category: "Elektrik Şebekesi & Üretim",
    coverage: "Amerika Birleşik Devletleri (15 Şebeke Bölgesi)",
    frequency: "Saatlik Canlı",
    reliability: "Resmi Devlet Kaynağı",
    license: "Kamu Malı (US Government Public Domain)",
    url: "https://www.eia.gov/opendata/",
    desc: "ABD elektrik şebekesinin saatlik talep, net üretim ve yakıt türü bazlı enerji dağılım telemetrisi.",
  },
  {
    id: "entsoe",
    name: "ENTSO-E Transparency Platform",
    category: "Avrupa İletim Şebekesi",
    coverage: "Avrupa (22+ Ülke)",
    frequency: "Saatlik Canlı",
    reliability: "Yüksek",
    license: "Açık Veri Lisansı (ENTSO-E Terms)",
    url: "https://transparency.entsoe.eu/",
    desc: "Avrupa İletim Sistemi İşleticileri Ağı resmi şebeke yükü ve gerçekleşen saatlik üretim verisi.",
  },
  {
    id: "electricity_maps",
    name: "Electricity Maps Open Engine",
    category: "Karbon Yoğunluğu & Emisyon",
    coverage: "Küresel (160+ Bölge)",
    frequency: "15 Dakika",
    reliability: "Yüksek",
    license: "Open Data Tier",
    url: "https://electricitymaps.com/",
    desc: "Dünya ülkelerinin anlık elektrik üretimine bağlı gCO2eq/kWh cinsinden karbon yoğunluğu ve yenilenebilir enerji payı.",
  },
  {
    id: "peeringdb",
    name: "PeeringDB Global Registry",
    category: "AI Veri Merkezleri & IXP",
    coverage: "Küresel IXP ve Veri Merkezleri",
    frequency: "Günlük Güncelleme",
    reliability: "Yüksek",
    license: "Public Domain / Open Database",
    url: "https://www.peeringdb.com/",
    desc: "Küresel internet değişim noktaları (IXP), yapay zeka hesaplama tesisleri ve fiber optik omurga düğümleri.",
  },
];

export default function DataSourcesPage() {
  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col select-none">
      <PublicHeader />

      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-12 sm:py-16 w-full max-w-4xl mx-auto">
        {/* Centered Document Navigation Tabs */}
        <DocNavTabs />

        {/* Hero Title Section */}
        <div className="w-full text-center mb-10 space-y-3.5 mt-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1 text-xs font-mono font-bold text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            <Database className="h-3.5 w-3.5" />
            <span>%100 Doğrulanmış Açık Kaynak Şeffaflığı</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans">
            Veri Kaynakları & Metodoloji
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            DONA NOVA üzerindeki hiçbir veri tahmini veya uydurma değildir. Her tesis ve şebeke düğümü kamuya açık, doğrulanabilir resmi kaynaklardan derlenir.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-zinc-500 pt-2">
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-zinc-300">3.160+ Haritalanmış Tesis</span>
            <span>•</span>
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-zinc-300">Sıfır Uydurma Veri</span>
            <span>•</span>
            <span className="rounded-md border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-bold px-2 py-0.5">Resmi Açık API</span>
          </div>
        </div>

        {/* 3 Metodoloji İlkesi */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
          <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5 text-center space-y-2 backdrop-blur-xl shadow-xl">
            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-black shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              1
            </div>
            <h3 className="text-xs font-bold text-white font-sans">Doğrudan Kamu API'si</h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Aracı şirket kullanılmaz. Veriler WRI, EIA ve ENTSO-E gibi resmi kamu kurumlarından doğrudan çekilir.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5 text-center space-y-2 backdrop-blur-xl shadow-xl">
            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-xs font-black shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              2
            </div>
            <h3 className="text-xs font-bold text-white font-sans">Standart Normalizasyon</h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Farklı ülkelerin birimleri (MW, GW, MWh) ortak altyapı veri şemasına dönüştürülerek haritada birleştirilir.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5 text-center space-y-2 backdrop-blur-xl shadow-xl">
            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-black shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              3
            </div>
            <h3 className="text-xs font-bold text-white font-sans">Açık Kaynak & Şeffaflık</h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Tüm veri işleme komut dosyaları projenin GitHub deposunda açık kaynak olarak incelenebilir.
            </p>
          </div>
        </div>

        {/* Kaynak Kartları */}
        <div className="w-full space-y-4">
          {SOURCES.map((source) => (
            <div
              key={source.id}
              className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 shadow-2xl backdrop-blur-2xl space-y-3.5 transition-all hover:border-cyan-500/40 hover:bg-zinc-900/80"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3.5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="rounded-md bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-bold font-mono text-cyan-300">
                      {source.category}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">• {source.coverage}</span>
                  </div>
                  <h2 className="text-base font-bold text-white font-sans">{source.name}</h2>
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/60 px-3 py-1.5 text-xs font-bold text-cyan-300 hover:text-white transition-all self-start sm:self-auto group shadow-md"
                >
                  <span>Kaynağı İncele</span>
                  <ExternalLink className="h-3.5 w-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {source.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 rounded-xl bg-black/40 border border-white/[0.06] p-3 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block text-[9.5px] font-bold uppercase tracking-wider">Güncelleme</span>
                  <span className="font-semibold text-emerald-400 text-[11px]">{source.frequency}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9.5px] font-bold uppercase tracking-wider">Güvenilirlik</span>
                  <span className="font-semibold text-cyan-300 text-[11px]">{source.reliability}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9.5px] font-bold uppercase tracking-wider">Lisans</span>
                  <span className="font-medium text-zinc-300 truncate block text-[11px]">{source.license}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center pt-12 pb-6 text-[11px] font-mono text-zinc-500 space-y-1">
          <p>DONA NOVA • Verified Infrastructure Dataset</p>
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
