"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Zap,
  Globe2,
  Building2,
  ArrowRight,
  Shield,
  Database,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

// ─── Plan Verisi ──────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: "explorer",
    name: "Explorer",
    badge: "Ücretsiz",
    price: 0,
    priceLabel: "$0",
    period: "",
    description: "Temel altyapı görünümü ve kamu verisi.",
    color: "slate",
    borderClass: "border-slate-700/60",
    badgeClass: "bg-slate-800 text-slate-300 border-slate-700",
    ctaText: "Hemen Başla",
    ctaClass: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
    features: [
      "Küresel altyapı haritası (3D Globe)",
      "Kamu enerji verisi (EIA + ENTSO-E)",
      "Global Power Plant Database (35K+ santral)",
      "3 aylık tarihsel veri",
      "1 kullanıcı",
      "Watermark'lı PDF export",
    ],
    notIncluded: [
      "Gerçek zamanlı akışlar",
      "AI sorgu motoru",
      "API erişimi",
      "Özel dashboard",
    ],
  },
  {
    id: "analyst",
    name: "Analyst",
    badge: "En Popüler",
    price: 299,
    priceLabel: "$299",
    period: "/ay",
    description: "Profesyonel analistler ve araştırmacılar için.",
    color: "blue",
    borderClass: "border-blue-500/40",
    badgeClass: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    ctaText: "14 Gün Ücretsiz Dene",
    ctaClass: "bg-blue-600 hover:bg-blue-500 text-white",
    highlighted: true,
    features: [
      "Explorer'ın tüm özellikleri",
      "Gerçek zamanlı enerji akışları (15 dk. gecikme)",
      "Karbon yoğunluğu haritası (Electricity Maps)",
      "2 yıl tarihsel veri",
      "5 kullanıcı",
      "CSV / JSON export",
      "API erişimi (1M çağrı/ay)",
      "E-posta desteği",
    ],
    notIncluded: [
      "AI sorgu motoru",
      "Özel dashboard",
      "SLA garantisi",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    badge: "Kurumsal",
    price: 999,
    priceLabel: "$999",
    period: "/ay",
    description: "Hedge fonlar, danışmanlık firmaları ve enerji şirketleri.",
    color: "violet",
    borderClass: "border-violet-500/40",
    badgeClass: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    ctaText: "Demo Talep Et",
    ctaClass: "bg-violet-700 hover:bg-violet-600 text-white",
    features: [
      "Analyst'ın tüm özellikleri",
      "AI sorgu motoru (Doğal dil sorgulama)",
      "Anomali tespiti ve uyarılar",
      "5 yıl tarihsel veri",
      "25 kullanıcı",
      "Özel dashboard & rapor şablonları",
      "API erişimi (10M çağrı/ay)",
      "Öncelikli destek (4 sa. yanıt)",
      "%99.5 SLA",
    ],
    notIncluded: [],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: "Özel",
    price: null,
    priceLabel: "Özel Fiyat",
    period: "",
    description: "Büyük kurumlar ve özel entegrasyon ihtiyaçları.",
    color: "amber",
    borderClass: "border-amber-500/30",
    badgeClass: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    ctaText: "Satış Ekibiyle Konuş",
    ctaClass: "bg-amber-600 hover:bg-amber-500 text-white",
    features: [
      "Professional'ın tüm özellikleri",
      "Özel veri entegrasyonu",
      "Sınırsız kullanıcı",
      "Beyaz etiket seçeneği",
      "On-premise kurulum",
      "Özel AI model eğitimi",
      "Sınırsız API erişimi",
      "Dedicated destek mühendisi",
      "%99.9 SLA garantisi",
      "SOC2 + GDPR uyum raporları",
    ],
    notIncluded: [],
  },
];

// ─── Veri Kaynakları ──────────────────────────────────────────────────────────

const DATA_SOURCES = [
  { name: "EIA", desc: "U.S. Energy Information Administration", url: "https://www.eia.gov/opendata/" },
  { name: "ENTSO-E", desc: "European Network of Transmission System Operators", url: "https://transparency.entsoe.eu/" },
  { name: "Electricity Maps", desc: "Global carbon intensity & grid data", url: "https://electricitymaps.com/" },
  { name: "WRI GPPD", desc: "35,000+ global power plants", url: "https://github.com/wri/global-power-plant-database" },
  { name: "WRI Aqueduct", desc: "Global water stress atlas", url: "https://www.wri.org/aqueduct" },
  { name: "PeeringDB", desc: "Internet exchange & datacenter registry", url: "https://www.peeringdb.com/" },
];

// ─── SSS ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Veriler ne kadar güncel?",
    a: "Enerji şebeke verileri (EIA, ENTSO-E) saatlik olarak güncellenir. Karbon yoğunluğu verisi (Electricity Maps) her 15 dakikada bir yenilenir. Santral ve altyapı veritabanı ise günlük olarak güncellenir.",
  },
  {
    q: "API'ye nasıl erişirim?",
    a: "Analyst ve üzeri planlarda REST API + GraphQL erişimi sağlanır. API dökümantasyonuna dashboard üzerinden ulaşabilirsiniz. Rate limit plan bazında değişir: Analyst 1M, Professional 10M çağrı/ay.",
  },
  {
    q: "İptal edebilir miyim?",
    a: "Evet, istediğiniz zaman. Yıllık planlar için kullanılmayan süre iade edilir. İptal etmek için dashboard → Faturalama → Aboneliği İptal Et yeterlidir.",
  },
  {
    q: "Veriler kesinlikle doğru mu?",
    a: "Verilerimiz resmi kaynaklardan (EIA, ENTSO-E, WRI) doğrudan çekilmektedir. Her veri noktasında kaynak, güncelleme zamanı ve güvenilirlik skoru gösterilir. DONA NOVA, ham veriyi normalize eder; yorum ve tahminler için sorumluluk kullanıcıya aittir.",
  },
  {
    q: "Enterprise için hangi ödeme yöntemleri geçerli?",
    a: "Enterprise müşteriler için banka transferi, kurumsal kredi kartı ve fatura yöntemi desteklenir. Özel fiyatlandırma ve ödeme koşulları için satış ekibimizle iletişime geçin.",
  },
];

// ─── Pricing Page Bileşeni ────────────────────────────────────────────────────

import { PublicHeader } from "@/components/layout/PublicHeader";

// ─── Pricing Page Bileşeni ────────────────────────────────────────────────────

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{ background: "hsl(222 47% 4%)" }}
    >
      {/* ── Global Header Navigation ── */}
      <PublicHeader />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pt-16 pb-12 text-center">
        {/* Glow bg */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[400px] w-[600px] rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300 shadow-md">
            <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
            %100 Doğrulanmış Gerçek Veri & Kenar (Edge) Mimarisi
          </div>

          <h1 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Dünyanın Altyapısını
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              Zeka ve Canlı Akışla Yönetin
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-slate-300 leading-relaxed">
            EIA, ENTSO-E, Electricity Maps ve 35.000+ WRI küresel santral verisine dayanan enterprise altyapı zekası platformu.
          </p>

          {/* Billing Annual/Monthly Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold ${!isAnnual ? "text-white" : "text-slate-400"}`}>Aylık Faturalama</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative h-6 w-12 rounded-full bg-slate-800 p-1 border border-slate-700 transition-colors"
            >
              <motion.div
                animate={{ x: isAnnual ? 24 : 0 }}
                className="h-4 w-4 rounded-full bg-blue-500 shadow-md"
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-bold ${isAnnual ? "text-white" : "text-slate-400"}`}>Yıllık Faturalama</span>
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-extrabold uppercase">
                %20 İndirim
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Plan Kartları ── */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative flex flex-col rounded-2xl border p-6 backdrop-blur-sm ${plan.borderClass} ${
                  plan.highlighted
                    ? "bg-blue-950/30 shadow-2xl shadow-blue-500/10 ring-1 ring-blue-500/20"
                    : "bg-slate-900/40"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-blue-500 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-blue-500/30">
                      ★ En Popüler
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-5">
                  <div className={`mb-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${plan.badgeClass}`}>
                    {plan.badge}
                  </div>
                  <h2 className="text-xl font-black text-white">{plan.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">{plan.description}</p>
                </div>

                {/* Fiyat */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.priceLabel}</span>
                    {plan.period && (
                      <span className="text-sm text-slate-400">{plan.period}</span>
                    )}
                  </div>
                  {plan.price !== null && plan.price > 0 && (
                    <p className="mt-0.5 text-xs text-slate-500">
                      ${(plan.price * 12 * 0.85).toFixed(0)}/yıl ile yıllık %15 tasarruf
                    </p>
                  )}
                </div>

                {/* CTA */}
                <button
                  className={`mb-6 w-full rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 ${plan.ctaClass}`}
                  id={`pricing-cta-${plan.id}`}
                >
                  {plan.ctaText}
                  <ArrowRight className="ml-1.5 inline h-3.5 w-3.5" />
                </button>

                {/* Özellikler */}
                <div className="flex-1 space-y-2">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                      <span className="text-[13px] text-slate-300">{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <div key={f} className="flex items-start gap-2 opacity-35">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-600" />
                      <span className="text-[13px] text-slate-500 line-through">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Veri Kaynakları ── */}
      <section className="border-t border-slate-800/60 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/8 px-4 py-1.5 text-sm font-semibold text-emerald-400">
              <Database className="h-3.5 w-3.5" />
              Doğrulanmış Veri Kaynakları
            </div>
            <h2 className="text-2xl font-black text-white">
              Mock veri yok. Yalnızca gerçek kaynaklardan doğrulanmış veri.
            </h2>
            <p className="mt-2 text-slate-400">
              Her veri noktası şu resmi kaynaklardan doğrudan çekilir ve kaynağıyla birlikte gösterilir.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {DATA_SOURCES.map((source) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/60"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 text-blue-400 group-hover:bg-slate-700">
                  <Globe2 className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-bold text-white">{source.name}</p>
                    <ExternalLink className="h-3 w-3 text-slate-500 group-hover:text-slate-400" />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">{source.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Güven Göstergeleri ── */}
      <section className="border-t border-slate-800/60 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Shield, label: "GDPR Uyumlu", sub: "AB veri koruma standartları" },
              { icon: Shield, label: "SOC2 (Planlı)", sub: "Kurumsal güvenlik denetimi" },
              { icon: Zap, label: "Gerçek Zamanlı", sub: "15 dk. güncelleme sıklığı" },
              { icon: Building2, label: "Kurumsal SLA", sub: "%99.9 uptime garantisi" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-900/30 p-4 text-center"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold text-white">{label}</p>
                <p className="text-[11px] text-slate-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Veri Mimarisi ve Cloudflare Edge Açıklama Kartı ── */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-blue-500/30 bg-slate-950/80 p-8 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">DONA NOVA Veri ve Dağıtım Mimarisi</h2>
              <p className="text-xs text-slate-400">Çekilen 35.000+ verinin işlenmesi, saklanması ve canlı canlıya alınma süreci</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <span className="rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold">1. VERİ KAYNAKLARI</span>
              <h3 className="font-bold text-slate-100 text-sm">35.000+ Dünya Santrali & Canlı Şebeke</h3>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                WRI GPPD (34.936 nükleer, güneş, rüzgar santralinin GPS ve kapasite verisi), US EIA (ABD saatlik güç yükü), ENTSO-E (Avrupa canlı elektrik iletimi) ve Electricity Maps (karbon yoğunluğu) verileri sürekli işlenmektedir.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold">2. LOCAL ÇALIŞMA (DEV)</span>
              <h3 className="font-bold text-slate-100 text-sm">In-Memory Cache & WebGL Point Cloud</h3>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Local geliştirme sırasında veriler `/api/data` rotası üstünden hafızada (Node.js RAM Cache) tutulur ve Three.js GPU WebGL Point Cloud katmanı ile 60 FPS hızında dünya üstünde 3D nokta bulutu olarak çizilir.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <span className="rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold">3. CANLI CANLIYA ALMA (CLOUDFLARE)</span>
              <h3 className="font-bold text-slate-100 text-sm">Cloudflare Workers KV & Edge CDN</h3>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                GitHub'a `push` yaptığınızda GitHub Actions otomatik olarak Cloudflare Workers'a deploy eder. API anahtarlarınız Cloudflare Workers Secret içinde güvenle tutulur ve veriler 300+ global kenar sunucuda &lt;10ms hızla önbelleklenir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SSS ── */}
      <section className="border-t border-slate-800/60 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-black text-white">
            Sıkça Sorulan Sorular
          </h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  id={`faq-${i}`}
                >
                  <span className="text-sm font-semibold text-slate-200">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="h-4 w-4 flex-shrink-0 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 flex-shrink-0 text-slate-400" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="border-t border-slate-800 px-5 py-4">
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-slate-800/60 px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-3 text-2xl font-black text-white">
            Hazır mısınız?
          </h2>
          <p className="mb-6 text-slate-400">
            14 gün ücretsiz deneyin. Kredi kartı gerektirmez.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              id="pricing-start-free"
              className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Ücretsiz Başla
              <ArrowRight className="ml-2 inline h-4 w-4" />
            </button>
            <button
              id="pricing-talk-sales"
              className="rounded-xl border border-slate-700 bg-slate-800 px-8 py-3 font-bold text-slate-300 transition-all hover:bg-slate-700"
            >
              Satış Ekibiyle Konuş
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
