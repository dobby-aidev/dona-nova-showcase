# DONA NOVA — UYGULAMA GÖREV LİSTESİ

> Rapordaki stratejiye göre sırayla uygulanacak adımlar.
> Son güncelleme: Ağustos 2026

---

## FAZ 1 — GERÇEK VERİ PIPELINE'I (Hemen Başla)

### 1.1 Veri Servisi Altyapısı
- [x] Proje yapısını analiz et ve mevcut kodu incele
- [x] `app/src/lib/` klasörü oluştur (veri katmanı için)
- [x] `app/src/lib/data-sources/` klasörü oluştur
- [x] EIA (ABD Enerji) API istemcisi: `eia-client.ts`
- [x] ENTSO-E (Avrupa Enerji) API istemcisi: `entsoe-client.ts`
- [x] Electricity Maps API istemcisi: `electricity-maps-client.ts`
- [x] Global Power Plant Database parser: `power-plants.ts`
- [ ] WRI Aqueduct su stresi istemcisi: `water-stress.ts`

### 1.2 Veri Normalizasyonu
- [x] Ortak `InfrastructureAsset` tip tanımı: `app/src/types/infrastructure.ts`
- [ ] Veri normalizer fonksiyonları: `app/src/lib/normalizers/`
- [ ] Mock data → Gerçek veri geçiş katmanı

### 1.3 Cloudflare Altyapısı
- [ ] Cloudflare D1 şeması tasarla: `schema.sql`
- [ ] Cloudflare KV namespace tanımları (cache için)
- [ ] Cloudflare Cron Trigger yapılandırması `wrangler.toml'a ekle

---

## FAZ 2 — GLOBE'A GERÇEK VERİ (Tamamlandı)

### 2.1 EIA Gerçek Veri Entegrasyonu
- [x] EIA API'den ABD enerji talep verisi çek
- [x] Globe üzerinde ABD enerji noktaları güncelle (mock yerine EIA)
- [x] "Son güncelleme: X dk. önce | Kaynak: EIA" bandı ekle

### 2.2 Global Power Plant Database
- [x] 35.000+ santral verisini indir ve işle
- [x] Globe'a kümelenmiş santral noktaları ekle (LOD sistemi)
- [x] Kategori filtresi: Nükleer / Güneş / Rüzgar / Termik / Hidro

### 2.3 Veri Güvenilirlik Göstergesi (Kritik UX)
- [x] Her veri noktasında `DataBadge` bileşeni oluştur
- [x] Kaynak logosu + güncelleme zamanı + güvenilirlik skoru
- [x] "Gerçek Veri" vs "Tahminsel" etiketleme sistemi

### 2.4 Canlı Feed Paneli
- [x] Sağ panelde canlı aktivite akışı: "Son 15 dk: Almanya +2.3 GW"
- [x] WebSocket veya polling ile periyodik güncelleme
- [x] Animasyonlu veri akışı göstergesi

---

## FAZ 3 — FİYATLANDIRMA & HUKUKİ SAYFALAR

### 3.1 Pricing Sayfası
- [x] `/pricing` route'u oluştur
- [x] Explorer (Ücretsiz) / Analyst ($299) / Professional ($999) / Enterprise planları
- [x] Veri kaynakları logoları bölümü (ENTSO-E, EIA, WRI)
- [x] Güven badge'leri (SOC2, GDPR)
- [x] SSS bölümü
- [x] "14 gün ücretsiz dene" CTA

### 3.2 Hukuki Sayfalar
- [x] `/terms` — Kullanım Koşulları sayfası
- [x] `/privacy` — Gizlilik Politikası (GDPR / KVKK uyumlu) sayfası
- [x] `/data-sources` — Veri kaynakları ve metodoloji şeffaflık sayfası

### 3.3 Landing / Marketing Sayfası
- [ ] `/` için hero section (mevcut app `/app` altına taşın)
- [ ] Özellikler bölümü
- [ ] "Nasıl Çalışır" bölümü
- [ ] Bekleme listesi / erken erişim formu

---

## FAZ 4 — AI YORUMLAMA MOTORU

### 4.1 AI Sorgu Arayüzü
- [ ] Mevcut `AIAgentDrawer.tsx` geliştir
- [ ] Doğal dil sorgu: "Bu bölgede en çok elektrik tüketen sektör nedir?"
- [ ] Cloudflare AI Gateway entegrasyonu

### 4.2 Anomali Tespiti
- [ ] Elektrik talebi anomali algoritması
- [ ] Otomatik "Dikkat çekici değişim" bildirimleri
- [ ] Globe üzerinde anomali highlight sistemi

### 4.3 Tahmin Motoru
- [ ] 30/90/365 günlük trend tahmini
- [ ] Su stresi + elektrik talebi korelasyon analizi
- [ ] "2030 projeksiyonu" görünüm modu

---

## FAZ 5 — PERFORMANS & LANSMAN

### 5.1 Performans & 3D Motor İyileştirmeleri
- [x] LOD sistemi (Level of Detail) globe noktaları için
- [x] 3D Radar Ayarlar Paneli (DPR 1x / 1.5x / 2x Retina, Otomatik Dönüş hızı, Telemetri sorgulama sıklığı)
- [x] Mobil duyarlı tam uyumluluk (Simetrik üst bar, dokunmatik buton standartları, yatay taşma/kayma engelleme)
- [x] MCP v1.2.0 Model Context Protocol sunucusu ve araçları (Cursor, Windsurf, Claude Desktop)
- [x] Saydam kristal obsidian-gold HUD arayüzü (Bulanıklıksız yüksek performans)
- [x] Açık Kaynak Dağıtım Hazırlığı (README, CONTRIBUTING, LICENSE, .github)

### 5.2 Lansman Hazırlığı
- [ ] Product Hunt varlığı hazırla
- [ ] Demo video (Loom veya benzeri)
- [ ] İlk 10 beta kullanıcı onboarding
- [ ] Sosyal medya görselleri

---

## ŞU AN YAPILIYOR

> Açık kaynak GitHub lansmanı (`dona-nova-showcase`) ve GitHub repository yükleme hazırlığı tamamlandı.

---

*Güncelleme: Her tamamlanan görev `[x]` olarak işaretlenir.*
