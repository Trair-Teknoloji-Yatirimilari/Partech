# PARSTECH — Proje Talimatları

## Proje Nedir
Parstech, fren balata sistemleri üreten bir marka için premium bir tanıtım/kurumsal web sitesidir. Hedef kitle: bayiler, filo yöneticileri, OEM satın almacıları. Sitenin tek görevi: mühendislik gücüne ve güvenliğe dair anında güven uyandırmak.

## Teknoloji Yığını
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (tüm animasyonlar; spring fiziği tercih et: `type: "spring", stiffness: 100-260, damping: 18-30`)
- Lenis (smooth scroll)
- Lucide React (ikonlar)
- Recharts (performans grafikleri gerekirse)

## Tasarım Dili — "Industrial Dark"
Renk tokenları (Tailwind config'e ekle, hardcode etme):
- `bg`: #0B0F14 (ana zemin)
- `panel`: #11161D
- `steel`: #1B232E
- `line`: #243040 (border'lar)
- `blue`: #2D7FF9 (ana vurgu — Teknoloji Mavisi)
- `cyan`: #38BDF8 (ikincil vurgu)
- `heat`: #F43F5E (SADECE ısı simülasyonunda; başka yerde kullanma)
- `text`: #E8EDF4, `muted`: #8A97A8

Tipografi:
- Display: Chakra Petch (başlıklar, 600-700)
- Body: Inter (400-600)
- Mono: IBM Plex Mono (etiketler, teknik veriler, eyebrow'lar — UPPERCASE + letter-spacing)
- `next/font/google` ile yükle.

## Sayfa Yapısı (sıralı)
1. **Hero** — stagger giriş (yazılar yukarıdan süzülür), dönen fren diski SVG + Parstech kaliper
2. **Katman Teknolojisi** — 4 hover-genişleyen kart (Sürtünme Yüzeyi, Geçiş Tabakası, İzolasyon, Çelik Taşıyıcı+Shim)
3. **Isı Simülasyonu** — basılı tutunca disk maviden kırmızıya ısınır, 38°C→650°C canlı sayaç
4. **Patlatılmış Görünüm** — disk/balatalar/kaliper scroll'a girince ayrılır, toggle butonu da olsun
5. **Performans** — scroll ile dolan karşılaştırma barları (Parstech vs segment ortalaması)
6. **İletişim** — bayilik/OEM teklif formu
7. Footer — sertifikalar: ECE R90 · ISO 9001 · IATF 16949

Referans: kök dizindeki `parstech-demo.html` dosyası bu yapının çalışan vanilla prototipidir. İçerik metinlerini ve SVG'leri oradan al, mimariyi React bileşenlerine çevir.

## Animasyon Kuralları
- Scroll reveal: `whileInView` + `viewport={{ once: true, amount: 0.2 }}`, fade-in-up (y: 34 → 0)
- Tek bir orkestre edilmiş an, dağınık efektlerden iyidir. Her bölümde maksimum 1 belirgin animasyon.
- `prefers-reduced-motion` her zaman desteklenmeli (`useReducedMotion` hook'u)
- Hover'lar: spring ile translateY(-8px), asla yalnızca opacity değişimi

## Kalite Standartları
- Mobil öncelikli responsive (375px'e kadar test et)
- Görünür klavye odağı (focus-visible)
- Lighthouse performans hedefi: 90+
- Bileşen yapısı: `components/sections/Hero.tsx` gibi bölüm bazlı; ortak parçalar `components/ui/`
- Türkçe içerik; teknik terimler (μ, NVH, fading) korunur

## Yapma
- Açık tema, beyaz zemin yok
- Stok foto placeholder'ları yerine SVG/illüstrasyon kullan (gerçek görseller gelene kadar)
- Kırmızıyı vurgu rengi olarak yayma (yalnızca ısı bölgesi)
- Lorem ipsum yazma; demo dosyasındaki gerçek Türkçe metinleri kullan
