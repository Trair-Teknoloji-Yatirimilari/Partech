# PARSTECH — Fren Balata Sistemleri Web Sitesi

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + Lenis.

**Canlı:** https://mektumu.com (geçici domain)

## Kurulum (yerel)

```bash
npm install
npm run dev
```

Tarayıcıda http://localhost:3000

## Sunucu & Deploy

Tüm sunucu bilgileri, SSH bağlantısı ve güncelleme adımları:

→ **[DEPLOY.md](./DEPLOY.md)**

## GitHub

```bash
git remote -v
# origin  https://github.com/Trair-Teknoloji-Yatirimilari/Partech.git
```

## Yapı

- `app/` — layout, metadata, ana sayfa
- `components/sections/` — Navbar, Hero, Layers, HeatSim, Exploded, Performance, Contact, Footer
- `components/ui/` — Reveal, SectionHead, MobileBottomNav, ScrollProgress, …
- `components/providers/LenisProvider.tsx` — smooth scroll + anchor
- `deploy/` — nginx config şablonu
- `ecosystem.config.js` — PM2 config (port 3080)
- `CLAUDE.md` — proje talimatları
- `parstech-demo.html` — vanilla prototip referans
