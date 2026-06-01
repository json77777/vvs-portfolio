<div align="center">

# ✦ Visual Verse Studios

### Personal Portfolio — Video Editing · Graphic Design · Freelance Creative

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

<br/>

> *"Turning ideas into visual stories."*

<br/>

[🌐 Live Demo](https://vvs-portfolio.vercel.app/) · [📸 Instagram](https://www.instagram.com/visualversestd.official) · [📬 Hire Me](#contact)

</div>

---

## 📌 Overview

**Visual Verse Studios** is a premium personal portfolio website built to showcase creative work in video editing, graphic design, motion graphics, and brand identity — and to connect with potential clients and collaborators worldwide.

This portfolio is designed not just as a gallery, but as a **living brand experience** — every animation, font choice, and layout decision reflects the same craft and attention to detail that goes into client work.

---

## ✨ Features

- **Cinematic Loader** — Branded intro animation on every visit via `Loader.tsx` + `LoaderWrapper.tsx`
- **GSAP-Powered Animations** — Smooth, choreographed page transitions and scroll-triggered reveals using custom hooks (`useGSAP`, `useIsomorphicLayoutEffect`)
- **Magnetic Button Effect** — Interactive cursor-following button component (`MagneticButton.tsx`)
- **Geometric Visual Elements** — Decorative animated lines and shapes for a refined aesthetic (`GeometricLines.tsx`)
- **Smooth Scroll** — Native-feeling scroll experience via `SmoothScroll.tsx`
- **Works Gallery** — Showcases 6 curated project thumbnails with dedicated works page
- **Services Section** — Clean breakdown of offered creative services
- **About Page** — Personal story and background with animated reveal
- **CTA Section** — Conversion-optimized call-to-action for client inquiries
- **Custom Typography** — Proprietary fonts (Dean Gothic, Silvana) for a distinctive brand identity
- **SEO Ready** — Includes `sitemap.xml`, `robots.txt`, and Next.js metadata API
- **Fully Responsive** — Optimized for mobile, tablet, and desktop

---

## 🗂️ Project Structure

```
visual-verse-studios-portfolio/
├── public/
│   ├── fonts/                    # Custom brand fonts
│   │   ├── DeanGothicCMP-Book    # Display / heading font
│   │   ├── Silvana-LightItalic   # Accent / subtitle font
│   │   └── Silvana-RegularItalic # Body italic font
│   ├── images/
│   │   └── project-1 to 6.png   # Portfolio work thumbnails
│   ├── instagram.png             # Social asset
│   ├── sitemap.xml               # SEO sitemap
│   └── robots.txt                # Search engine directives
│
├── src/
│   ├── app/
│   │   ├── about/                # About page (SSR + Client split)
│   │   ├── works/                # Works/Portfolio page
│   │   ├── layout.tsx            # Root layout with metadata
│   │   ├── page.tsx              # Homepage
│   │   ├── icon.tsx              # Dynamic favicon
│   │   └── globals.css           # Global styles & CSS variables
│   │
│   ├── components/
│   │   ├── Hero.tsx              # Landing hero section
│   │   ├── About.tsx             # About section component
│   │   ├── Works.tsx             # Portfolio/works grid
│   │   ├── Services.tsx          # Services offering section
│   │   ├── CTA.tsx               # Call-to-action / hire me section
│   │   ├── Footer.tsx            # Site footer
│   │   ├── Navigation.tsx        # Nav bar / menu
│   │   ├── Loader.tsx            # Intro animation loader
│   │   ├── LoaderWrapper.tsx     # Client-side loader logic
│   │   ├── MagneticButton.tsx    # Cursor-magnetic button
│   │   ├── GeometricLines.tsx    # Decorative animated SVG lines
│   │   ├── OptimizedVideo.tsx    # Lazy-loaded video component
│   │   └── SmoothScroll.tsx      # Lenis/custom scroll wrapper
│   │
│   ├── data/
│   │   └── projects.ts           # Portfolio projects data source
│   │
│   ├── hooks/
│   │   ├── useGSAP.ts            # GSAP animation hook
│   │   └── useIsomorphicLayoutEffect.ts  # SSR-safe layout effect
│   │
│   └── lib/
│       └── animations.ts         # Reusable GSAP animation configs
│
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript config
├── tailwind.config               # Tailwind CSS config (via PostCSS)
└── package.json                  # Dependencies & scripts
```

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Custom CSS |
| **Animations** | [GSAP](https://greensock.com/gsap/) (GreenSock) |
| **Fonts** | Dean Gothic CMP · Silvana (Custom) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **SEO** | Next.js Metadata API · Sitemap · Robots.txt |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm / yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/visual-verse-studios-portfolio.git

# 2. Navigate into the project
cd visual-verse-studios-portfolio

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio.

### Build for Production

```bash
npm run build
npm run start
```

---

## 📸 Pages & Sections

| Route | Description |
|---|---|
| `/` | Homepage — Hero, About, Services, Works, CTA, Footer |
| `/about` | Extended about page with background and story |
| `/works` | Full portfolio gallery with all projects |

---

## 🎨 Brand Identity

**Visual Verse Studios** uses a carefully curated set of brand assets:

- **Typography:** Dean Gothic CMP (display) + Silvana Italic (accent) — proprietary fonts for a unique, non-generic look
- **Color Palette:** Defined in `globals.css` as CSS variables for consistent theming across all components
- **Motion Language:** GSAP-driven animations with intentional easing curves defined in `lib/animations.ts`

---

## 🧩 Key Components

### `MagneticButton`
A cursor-magnetic interactive button that subtly follows the user's mouse — used on key CTAs for a premium feel.

### `GeometricLines`
Decorative animated SVG lines that add visual rhythm and reinforce the design-studio aesthetic throughout the layout.

### `OptimizedVideo`
A lazy-loading, performance-aware video component that ensures smooth playback without sacrificing Core Web Vitals scores.

### `Loader` + `LoaderWrapper`
A branded intro animation sequence that plays on initial visit, handled via a client-side wrapper to stay compatible with Next.js SSR.

---

## 📂 Portfolio Projects

Project data is centrally managed in `src/data/projects.ts`, making it easy to add, remove, or update work samples without touching component code.

Each project entry supports:
- Project thumbnail (`/public/images/`)
- Title & description
- Tags / category (e.g., Motion Graphics, Brand Identity, Reels)
- External link (optional)

---

## 🌐 Deployment

This portfolio is deployed on **Vercel** for optimal Next.js performance.

To deploy your own fork:

1. Push the repo to GitHub
2. Import it at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — click **Deploy**

The `sitemap.xml` and `robots.txt` in `/public` are automatically served and picked up by search engines post-deployment.

---

## 📬 Contact & Freelance

Available for freelance projects and creative collaborations:

- 🎬 Video Editing (Reels, Promos, Motion Graphics)
- 🖥️ Graphic Design (Brand Identity, Thumbnails, Social Media)
- ✨ Visual Storytelling & Creative Direction

**📸 Instagram:** [@visualversestd.official](https://www.instagram.com/visualversestd.official)
**📩 Email:** *(Add your email here)*
**🔗 Portfolio:** https://vvs-portfolio.vercel.app/

---

## 📄 License

This project is for personal/portfolio use. The codebase is open for reference and inspiration, but the brand assets, fonts, and project images are proprietary to **Visual Verse Studios** and may not be reused without permission.

---

<div align="center">

Designed & Developed with ♥ by **Visual Verse Studios**

*© 2026 Visual Verse Studios. All rights reserved.*

</div>
