# Hitesh Thacker — Portfolio

> A world-class, animated portfolio built with **Next.js 16**, **Framer Motion**, and **Tailwind CSS v4**.  
> Combining the precision of software engineering with the soul of Indian classical music (Tabla).

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.x-ff0055?logo=framer)](https://www.framer.com/motion/)

---

## ✨ Highlights

| Feature | Description |
|---|---|
| 🎬 Cinematic Loading | Tabla concentric ring animation + HT monogram |
| 🖱️ Custom Cursor | Two-layer magnetic cursor with spring physics |
| ✨ Particle Field | Canvas-based floating particle field with mouse repulsion |
| 🎯 Glass Navbar | Frosted pill with sliding `layoutId` active indicator |
| 🎨 Hero | Aurora blobs, animated waveform, gradient name reveal |
| 🪐 Skills | Planetary orbital system — 3 rings, interactive tag cloud |
| 🃏 Projects | `perspective-1000` 3-D tilt cards with glow borders |
| 🥁 Tabla Section | Interactive canvas tabla — **click to play ripples** |
| 📬 Contact | Glassmorphism form with neon focus rings |

---

## 🗂️ Project Structure

```
portfolio/
├── app/
│   ├── globals.css         # Design system — tokens, keyframes, utilities
│   ├── layout.tsx          # Root layout — fonts (Space Grotesk + Inter), metadata
│   └── page.tsx            # Entry point
│
├── components/
│   ├── PortfolioPage.tsx   # Root orchestrator — assembles all sections + overlays
│   │
│   ├── layout/             # App-shell components (always mounted)
│   │   ├── FloatingNav.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingScreen.tsx
│   │   └── ScrollProgress.tsx
│   │
│   ├── sections/           # Page sections (rendered once, in order)
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Music.tsx
│   │   └── Contact.tsx
│   │
│   └── ui/                 # Reusable UI primitives
│       ├── CustomCursor.tsx
│       ├── ParticleField.tsx
│       ├── Reveal.tsx
│       ├── RippleButton.tsx
│       └── SectionHeading.tsx
│
└── lib/
    ├── data/               # All static content — single source of truth
    │   ├── experience.ts
    │   ├── music.ts
    │   ├── projects.ts
    │   ├── skills.ts
    │   └── site.ts         # Nav links, social links, hero stats, roles
    └── types/
        └── index.ts        # Shared TypeScript interfaces
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server (Turbopack)
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🎨 Design System

All design tokens live in `app/globals.css` inside an `@theme inline {}` block (Tailwind v4).

| Token | Value |
|---|---|
| Background | `#04020d` |
| Primary Purple | `#7c3aed` |
| Electric Cyan | `#06b6d4` |
| Tabla Gold | `#f59e0b` |
| Display Font | Space Grotesk |
| Body Font | Inter |

Custom utility classes: `.glass`, `.glass-purple`, `.gradient-text`, `.neon-border`, `.glow-purple`, `.aurora-bg`.

---

## 🛠️ Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language** — TypeScript 5
- **Styling** — Tailwind CSS v4 (CSS-first config)
- **Animation** — [Framer Motion 12](https://www.framer.com/motion/)
- **Canvas** — Native Web Canvas API (particle field, tabla visualization)
- **Fonts** — [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) + [Inter](https://fonts.google.com/specimen/Inter) via `next/font`

---

## 📬 Contact

| | |
|---|---|
| **Email** | thackerhitesh1505@gmail.com |
| **LinkedIn** | [hitesh-thacker-b22682284](https://www.linkedin.com/in/hitesh-thacker-b22682284/) |
| **GitHub** | [ht1505](https://github.com/ht1505) |

---

<p align="center">Built with rhythm — <strong>Code × Tabla × Craft</strong></p>
