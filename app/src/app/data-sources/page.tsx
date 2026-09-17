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
    <div className="min-h-screen text-[#fcf8ee] flex flex-col bg-[#08090d] select-none">
      <PublicHeader />

      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-12 sm:py-16 w-full max-w-3xl mx-auto">
        {/* Centered Document Navigation Tabs */}
        <DocNavTabs />

        {/* Hero Title Section - Perfectly Centered */}
        <div className="w-full text-center mb-10 space-y-3.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1 text-xs font-mono font-bold text-cyan-300 shadow-sm">
            <Database className="h-3.5 w-3.5" />
            <span>%100 Doğrulanmış Açık Kaynak Şeffaflığı</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#fcf8ee] tracking-tight font-sans">
            Veri Kaynakları & Metodoloji
          </h1>

          <p className="text-xs sm:text-sm text-[#dad3c1] max-w-xl mx-auto leading-relaxed">
            DONA NOVA üzerindeki hiçbir veri tahmini veya uydurma değildir. Her tesis ve şebeke düğümü kamuya açık, doğrulanabilir resmi kaynaklardan derlenir.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-[#a89f8d] pt-2">
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">3.160+ Haritalanmış Tesis</span>
            <span>•</span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">Sıfır Uydurma Veri</span>
            <span>•</span>
            <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-bold px-2 py-0.5">Resmi Açık API</span>
          </div>
        </div>

        {/* 3 Metodoloji İlkesi - Centered Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-4 text-center space-y-2">
            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-black">
              1
            </div>
            <h3 className="text-xs font-bold text-[#fcf8ee] font-sans">Doğrudan Kamu API'si</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Aracı şirket kullanılmaz. Veriler WRI, EIA ve ENTSO-E gibi resmi kamu kurumlarından doğrudan çekilir.
            </p>
          </div>

          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-4 text-center space-y-2">
            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-xl bg-amber-950 border border-amber-500/30 text-amber-300 font-mono text-xs font-black">
              2
            </div>
            <h3 className="text-xs font-bold text-[#fcf8ee] font-sans">Standart Normalizasyon</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Farklı ülkelerin birimleri (MW, GW, MWh) ortak altyapı veri şemasına dönüştürülerek haritada birleştirilir.
            </p>
          </div>

          <div className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-4 text-center space-y-2">
            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-black">
              3
            </div>
            <h3 className="text-xs font-bold text-[#fcf8ee] font-sans">Açık Kaynak & Şeffaflık</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Tüm veri işleme komut dosyaları projenin GitHub deposunda açık kaynak olarak incelenebilir.
            </p>
          </div>
        </div>

        {/* Kaynak Kartları - Centered & Highly Polished */}
        <div className="w-full space-y-4">
          {SOURCES.map((source) => (
            <div
              key={source.id}
              className="rounded-2xl border border-[#faebd7]/15 bg-[#12141f]/85 p-6 backdrop-blur-xl shadow-xl space-y-3.5 transition-all hover:border-[#faebd7]/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3.5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-bold font-mono text-cyan-300">
                      {source.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">• {source.coverage}</span>
                  </div>
                  <h2 className="text-base font-bold text-[#fcf8ee] font-sans">{source.name}</h2>
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#faebd7]/20 bg-[#151824] hover:bg-[#1f2336] px-3 py-1.5 text-xs font-bold text-[#dad3c1] hover:text-white transition-all self-start sm:self-auto group shadow-sm"
                >
                  <span>Kaynağı İncele</span>
                  <ExternalLink className="h-3.5 w-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {source.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 rounded-xl bg-[#090b12] p-3 text-xs">
                <div>
                  <span className="text-[#a89f8d] block text-[9.5px] font-mono font-bold uppercase tracking-wider">Güncelleme</span>
                  <span className="font-semibold text-emerald-400 font-mono text-[11px]">{source.frequency}</span>
                </div>
                <div>
                  <span className="text-[#a89f8d] block text-[9.5px] font-mono font-bold uppercase tracking-wider">Güvenilirlik</span>
                  <span className="font-semibold text-cyan-300 font-mono text-[11px]">{source.reliability}</span>
                </div>
                <div>
                  <span className="text-[#a89f8d] block text-[9.5px] font-mono font-bold uppercase tracking-wider">Lisans</span>
                  <span className="font-medium text-slate-300 truncate block font-mono text-[11px]">{source.license}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center pt-12 pb-6 text-[11px] font-mono text-[#a89f8d] space-y-1">
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
