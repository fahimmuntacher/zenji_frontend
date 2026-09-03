# ZENJI 禅路 // Anime-Inspired Streetwear Storefront

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=flat)](https://github.com/pmndrs/zustand)
[![Web Audio API](https://img.shields.io/badge/Audio-Web_Audio_API-purple?style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

**ZENJI (禅路)** is a high-grade e-commerce storefront engineered for an anime-inspired streetwear brand. Designed with a dark cyberpunk / Neo-Tokyo aesthetic, it delivers an engaging, drop-optimized shopping experience built around limited releases, 380–450 GSM custom Japanese loopback cotton, and tactile print engineering.

---

## ⚡ The Real-World Problems Solved

Limited streetwear drops typically suffer from several critical friction points:

1. **Blind Pre-Ordering & Size Anxiety**: Streetwear cuts vary wildly (regular vs. boxy vs. extreme drop-shoulder), causing high return rates and abandoned carts.
2. **Fabric & Graphic Texture Blindness**: Shoppers cannot verify the elevation of 3D puff prints or the luminosity of 3M retro-reflective inks under studio lighting.
3. **Sold-Out Bounce Rates**: When an item sells out in minutes, shoppers leave permanently rather than staying engaged.
4. **Scalper Bot Invasions**: Fast bot checkouts ruin drops for genuine anime and streetwear enthusiasts.
5. **Low Average Order Value (AOV)**: Shoppers purchase isolated pieces instead of complete coordinated outfits.

---

## 🚀 Key Features

### 1. ZENJI "Drop Radar" & Interactive Fit-Matrix (`FitMatrixModal.tsx`)
* **Dual-Unit Metric/Imperial Inputs**: Sliders for height (cm / ft-in) and weight (kg / lbs).
* **Silhouette Drape Selector**: Choose between *Regular Street Fit*, *Boxy Oversized*, or *Tokyo Cyber Drop Shoulder*.
* **Instant Dimension Breakdown**: Live garment schematics displaying exact chest width, length, and shoulder span for recommended sizing.
* **Tactile Print Inspector**: Details print curing temperatures (160°C silicone puff) and yarn metrics.

### 2. 3M Flash Cam Mode (Night Vision Simulator)
* Global navbar toggle and individual product card triggers that dim ambient lighting to pitch black.
* Simulates camera flash and direct streetlights, illuminating 450 cd/lux retro-reflective 3M kanji graphics and cyber glyphs.

### 3. Tactile Fabric Micro-Loupe Zoom
* Interactive 3.5x to 4.5x magnifying loupe tracking cursor movement across garments.
* Reveals microscopic details: loopback cotton knit weave, raised puff print elevation, and reinforced stitch seams.

### 4. Tokyo Street Cam Community Lookbook (`LookbookModal.tsx`)
* Curated community fit snaps filterable by model height brackets (`< 170cm`, `170–180cm`, `> 180cm`).
* Displays exact biometric stats (e.g., *Ren Takahashi: 5'10" / 163 lbs wearing Size L*).
* Direct **"Shop This Look"** one-click cart deployment.

### 5. Cyber Loadout Outfit Builder (`LoadoutBuilder.tsx`)
* Complete-the-fit 3-slot bundle rack: **Outerwear/Hoodie + Base Graphic Tee + Tactical Accessory**.
* Dynamic pricing engine calculates an automatic **15% bundle discount** and qualifies the order for **Free Worldwide Express Shipping**.

### 6. Re-Supply Radar & Scarcity Queue (`ResupplyRadarModal.tsx`)
* Eliminates sold-out bounce on archived pieces like the *Cybernetic Crossbody Bag*.
* Live community pledge meter tracking progress toward the 200-piece batch threshold with instant alerts via Discord DM, Email, or SMS.

### 7. VIP Drop Gate & Anti-Bot Anime Cipher (`DropGateModal.tsx`)
* Interactive kanji alignment cipher puzzle (`禅` [Zen] - `路` [Ji] - `零` [Zero]) and secret Discord passcode entry (`SHIBUYA2099`).
* Grants 20% VIP Vault clearance with canvas confetti celebration.

### 8. Dedicated Product Details Pages (`/products/[id]`)
* Statically pre-rendered with Next.js App Router `generateStaticParams()` for instant load times and dynamic SEO OpenGraph cards.
* Front & back dual-angle gallery switchers, full measurement charts, and complete drop coordination links.

### 9. Shibuya Midnight Ambient Audio Deck (`AudioDeck.tsx`)
* Pure procedural Web Audio API synth drone with resonant low-pass filter modulation (zero external audio asset dependencies).
* Animated equalizer visualizer, track switcher, and tactile mechanical sound effects on clicks and cart actions.

### 10. Dynamic Slide-Over Cart Drawer & Mock Checkout
* Persistent cart state powered by **Zustand** with `localStorage` hydration.
* Real-time **Free Shipping Progress Bar** ($100 threshold).
* Express payment simulation (Card, Apple Pay, Cyber/Solana) with confetti celebration and drop tracking token.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 16.3 (Turbopack, App Router, SSG)](https://nextjs.org/)
* **Library**: [React 19](https://react.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand) with LocalStorage persistence
* **Icons**: [Lucide React](https://lucide.dev/)
* **Audio Synthesis**: Native HTML5 Web Audio API
* **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
* **Language**: [TypeScript 5](https://www.typescriptlang.org/)

---

## 📂 Project Architecture

```
zenji/
├── app/
│   ├── layout.tsx                     # Root layout, fonts, and dark theme metadata
│   ├── page.tsx                       # Storefront page with search/category URL sync
│   ├── globals.css                    # Tailwind v4 theme, cyber grids & neon glows
│   └── products/
│       └── [id]/
│           ├── page.tsx               # Static generator (generateStaticParams) & SEO
│           └── ProductDetailClient.tsx# Full product showcase, loupe zoom & gallery
├── components/
│   ├── Navbar.tsx                     # Route-aware header, search, and dynamic cart badge
│   ├── Hero.tsx                       # Cyberpunk banner, live countdown & specs strip
│   ├── ProductGrid.tsx                # Filterable catalog (All, Hoodies, Tees, Outerwear, Accessories)
│   ├── ProductCard.tsx                # Card with front-to-back swap, 3M flash & loupe
│   ├── FitMatrixModal.tsx             # Interactive fit calculator & print inspector
│   ├── CartDrawer.tsx                 # Zustand slide-over drawer with $100 free shipping bar
│   ├── CheckoutModal.tsx              # Streamlined checkout with address & confetti
│   ├── LookbookModal.tsx              # Street cam lookbook with real model biometrics
│   ├── LoadoutBuilder.tsx             # 3-piece outfit builder with 15% bundle discount
│   ├── DropGateModal.tsx              # VIP anti-bot kanji cipher minigame
│   ├── ResupplyRadarModal.tsx         # Scarcity restock waitlist for sold-out pieces
│   ├── AudioDeck.tsx                  # Web Audio API ambient drone & UI sound effects
│   └── Footer.tsx                     # Shibuya coordinates & newsletter subscription
├── data/
│   └── products.json                  # 8-piece Japanese anime streetwear dataset
└── store/
    └── useCartStore.ts                # Client-side persistent cart state manager
```

---

## 🚦 Getting Started

### Prerequisites
* **Node.js**: `v18.17+` (v20+ or v24+ recommended)
* **npm**: `v9+` or `v11+`

### Installation

1. Clone or navigate to the repository:
   ```bash
   cd D:\zenji
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Building for Production

To build the static application and verify route types:

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

---

## ⛩️ Brand Lore & Specifications

* **Origin**: Shibuya, Tokyo (`35.6595° N, 139.7004° E`)
* **Fabric Standard**: 380–450 GSM Japanese custom-milled loopback French terry & 280 GSM combed cotton
* **Print Technology**: 160°C thermal-cured 3D silicone puff & 3M Scotchlite retro-reflective transfer tape
* **Hardware**: YKK AquaGuard weatherproof zippers & Fidlock V-buckle magnetic clasps
* **Batch Policy**: Strictly limited to 150 pieces per drop run
