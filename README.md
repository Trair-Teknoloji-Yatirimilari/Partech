# PARSTECH — Fren Balata Sistemleri Web Sitesi

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + Lenis.

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda http://localhost:3000 adresini aç.

## GitHub'a Push

```bash
git init
git add .
git commit -m "Parstech ilk sürüm"
git branch -M main
git remote add origin https://github.com/Trair-Teknoloji-Yatirimilari/Partech.git
git push -u origin main
```

## Canlıya Alma (Vercel)

1. vercel.com → GitHub ile giriş yap
2. Add New → Project → bu repoyu seç → Deploy
3. Her `git push` sonrası site otomatik güncellenir

## Yapı

- `app/` — layout (fontlar, metadata) ve ana sayfa
- `components/sections/` — Navbar, Hero, Layers, HeatSim, Exploded, Performance, Contact, Footer
- `components/ui/` — Reveal (scroll animasyonu), SectionHead
- `components/SmoothScroll.tsx` — Lenis pürüzsüz kaydırma
- `CLAUDE.md` — Claude Code için proje talimatları (tasarım dili, kurallar)
- `parstech-demo.html` — orijinal vanilla prototip (referans)

## Claude Code ile Geliştirme

Proje klasöründe terminali aç, `claude` yaz ve geliştirmek istediğin bölümü söyle.
CLAUDE.md otomatik okunur; tasarım kuralları oradadır.
