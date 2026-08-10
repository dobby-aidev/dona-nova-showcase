"use client";

import React from "react";
import Link from "next/link";
import { Database, ExternalLink, ArrowLeft, ShieldCheck, Zap, Globe2, Waves, Server } from "lucide-react";
import { DataBadge } from "@/components/ui/DataBadge";

const SOURCES = [
  {
    id: "eia",
    name: "U.S. Energy Information Administration (EIA)",
    category: "Elektrik Şebekesi & Üretim",
    coverage: "Amerika Birleşik Devletleri (15 Şebeke Bölgesi)",
    frequency: "Saatlik",
    reliability: "Yüksek",
    license: "Kamu Malı (US Government Public Domain)",
    url: "https://www.eia.gov/opendata/",
    desc: "ABD elektrik şebekesinin saatlik talep, net üretim ve yakıt türü bazlı enerji dağılım verileri.",
  },
  {
    id: "entsoe",
    name: "ENTSO-E Transparency Platform",
    category: "Elektrik Şebekesi & Üretim",
    coverage: "Avrupa (22+ Ülke)",
    frequency: "Saatlik",
    reliability: "Yüksek",
    license: "Açık Veri Lisansı (ENTSO-E Terms of Use)",
    url: "https://transparency.entsoe.eu/",
    desc: "Avrupa İletim Sistemi İşleticileri Ağı resmi şebeke yükü ve gerçekleşen saatlik üretim verisi.",
  },
  {
    id: "electricity_maps",
    name: "Electricity Maps",
    category: "Karbon Yoğunluğu & Emisyon",
    coverage: "Küresel (160+ Bölge)",
    frequency: "15 Dakika",
    reliability: "Yüksek",
    license: "Commercial / Open Data Tier",
    url: "https://electricitymaps.com/",
    desc: "Dünya ülkelerinin anlık elektrik üretimine bağlı gCO2eq/kWh cinsinden karbon yoğunluğu ve yenilenebilir enerji oranı.",
  },
  {
    id: "global_power_plant_db",
    name: "World Resources Institute (WRI) GPPD",
    category: "Güç Santralleri",
    coverage: "Küresel (34.936 Santral)",
    frequency: "Günlük / Statik",
    reliability: "Yüksek",
    license: "Creative Commons Attribution 4.0 (CC-BY 4.0)",
    url: "https://github.com/wri/global-power-plant-database",
    desc: "Dünyadaki nükleer, güneş, rüzgar, hidroelektrik, termik ve jeotermal santrallerin hassas coğrafi konum, kurulu güç (MW) ve sahibi bilgisi.",
  },
  {
    id: "wri_aqueduct",
    name: "WRI Aqueduct Water Risk Atlas",
    category: "Su Stresi & Havzalar",
    coverage: "Küresel Su Havzaları",
    frequency: "Yıllık",
    reliability: "Yüksek",
    license: "Creative Commons Attribution 4.0",
    url: "https://www.wri.org/aqueduct",
    desc: "Bölgelerin kuraklık riski, su stresi ve hidroelektrik baraj doluluk potansiyellerini ölçen su atlası.",
  },
  {
    id: "peeringdb",
    name: "PeeringDB Registry",
    category: "Veri Merkezleri & İnternet Bağlantıları",
    coverage: "Küresel IXP ve Veri Merkezleri",
    frequency: "Günlük",
    reliability: "Yüksek",
    license: "Public Domain / Open Database",
    url: "https://www.peeringdb.com/",
    desc: "Küresel internet değişim noktaları (IXP), AI hesaplama tesisleri ve fiber omurga düğümleri.",
  },
];

import { PublicHeader } from "@/components/layout/PublicHeader";

export default function DataSourcesPage() {
  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: "hsl(222 47% 4%)" }}>
      <PublicHeader />
      <div className="mx-auto max-w-5xl px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          DONA NOVA Ana Sayfasına Dön
        </Link>

        <div className="mb-12 border-b border-slate-800 pb-8 text-center sm:text-left">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300">
            <Database className="h-3.5 w-3.5" />
            %100 Doğrulanmış Kaynak Şeffaflığı
          </div>
          <h1 className="text-3xl font-black text-white sm:text-5xl">
            Veri Kaynakları & Metodoloji
          </h1>
          <p className="mt-3 text-base text-slate-400 max-w-3xl">
            DONA NOVA üzerindeki hiçbir veri nokta tahmini veya uydurma değildir. Her tesis, üretim değeri ve grafik kaynağıyla şeffaf olarak aşağıda açıklandığı şekilde doğrulanır.
          </p>
        </div>

        {/* Metodoloji İlkesi */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-bold">
              1
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Doğrudan API Bağlantısı</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aracı şirket kullanılmaz. Veriler EIA ve ENTSO-E gibi resmi kamu kurumlarının API'lerinden doğrudan çekilir.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 font-bold">
              2
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Standart Normalizasyon</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Farklı ülkelerin birimleri (MWh, GW, gCO2/kWh) ortak `InfrastructureAsset` tipine dönüştürülerek haritada birleştirilir.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 font-bold">
              3
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Güvenilirlik Etiketi</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Her veri kartında kaynağın logosu, son güncelleme zamanı ve `DataBadge` güvenilirlik skoru yer alır.
            </p>
          </div>
        </div>

        {/* Kaynak Kartları */}
        <div className="space-y-4">
          {SOURCES.map((source) => (
            <div
              key={source.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm transition-all hover:border-slate-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold text-blue-400 border border-blue-500/20">
                      {source.category}
                    </span>
                    <span className="text-xs text-slate-500">• {source.coverage}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white">{source.name}</h2>
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors self-start sm:self-auto"
                >
                  Resmi Kaynağı Ziyaret Et
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                {source.desc}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-xl bg-slate-950/60 p-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Güncelleme Sıklığı</span>
                  <span className="font-semibold text-emerald-400">{source.frequency}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Güvenilirlik Skoru</span>
                  <span className="font-semibold text-blue-300">{source.reliability}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">Lisans / Veri Hakkı</span>
                  <span className="font-medium text-slate-300 truncate block">{source.license}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
