import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudioDeck from "@/components/AudioDeck";
import CartDrawer from "@/components/CartDrawer";
import { ArrowRight, Flame, ShieldCheck, Sparkles, Layers, Compass, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Our Story // BORN FROM THE WARRIOR SPIRIT — ZENJI 禅路",
  description:
    "ZENJI was born at the intersection of Japanese anime culture and modern heavyweight streetwear. Premium loopback cotton. Limited drops. No restocks. Ever.",
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08080b] text-white font-mono">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden cyber-grid border-b border-[#1c1c2b] pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#ff2a5f]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Japanese Kanji watermark */}
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-[280px] lg:text-[440px] font-black leading-none text-white">
          禅路
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#12121b] border border-[#262638] px-3.5 py-1.5 rounded-full text-xs text-[#ff2a5f] uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            <span>THE ZENJI ETHOS // TOKYO × AUSTRALIA</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
            BORN FROM THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2a5f] via-[#ff547d] to-[#ffa3b8]">WARRIOR SPIRIT</span>.
            <br />
            BUILT FOR THE <span className="text-zinc-400">OUTSIDERS</span>.
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 font-sans leading-relaxed max-w-3xl">
            ZENJI began with a singular obsession: what you wear should tell a story.
            Inspired by samurai discipline, high-octane anime cinematography, and modern cyberpunk techwear,
            we engineer garments for those who forge their own destiny.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/#catalog"
              className="px-6 py-3 bg-[#ff2a5f] hover:bg-[#ff1f58] text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-xl shadow-[#ff2a5f]/25 flex items-center space-x-2 transition-all"
            >
              <span>EXPLORE THE CURRENT DROP</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Narrative Section 1: The 450 GSM Standard */}
      <section className="py-20 border-b border-[#1c1c2b]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-xs text-[#00f0ff] uppercase tracking-widest font-bold">
                PILLAR 01 // TEXTILE ARCHITECTURE
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                WHY 450 GSM MATTERS IN A WORLD OF FAST FASHION
              </h2>
              <div className="space-y-4 text-sm text-zinc-300 font-sans leading-relaxed">
                <p>
                  Most commercial streetwear brands cut costs with 180–240 GSM open-end carded cotton that shrinks, pills, and loses silhouette shape after three washes.
                </p>
                <p>
                  Every ZENJI hoodie is milled from <strong className="text-white">450 GSM custom Japanese loopback French terry</strong>. Our double-faced terry loops hold internal body warmth while remaining completely breathable. It drapes with clean, angular structure that never collapses on the shoulders.
                </p>
                <p>
                  Pre-shrunk under high thermal wash baths, your piece will maintain the exact Tokyo drop-shoulder silhouette for years to come.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#1c1c2b] text-left">
                <div>
                  <div className="text-xl font-bold text-white">450 GSM</div>
                  <div className="text-[10px] text-zinc-500 uppercase">Loopback Terry</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#00f0ff]">160°C</div>
                  <div className="text-[10px] text-zinc-500 uppercase">Puff Thermal Cure</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#ff2a5f]">0%</div>
                  <div className="text-[10px] text-zinc-500 uppercase">Post-Wash Shrink</div>
                </div>
              </div>
            </div>

            {/* Editorial Visual */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#242436] bg-[#0e0e16] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80"
                alt="Zenji Japanese Craftsmanship"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <div className="text-xs text-[#00f0ff] font-mono">SPECIMEN // ARCHIVE NO. 01</div>
                <div className="text-sm font-bold text-white font-mono">
                  HEAVYWEIGHT LOOPBACK TERRY PATTERN CUTTING
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 2: No Restocks Policy */}
      <section className="py-20 border-b border-[#1c1c2b] bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#242436] bg-[#0e0e16] shadow-2xl order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"
                alt="Tokyo Shibuya Night Streetwear"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <div className="text-xs text-[#ff2a5f] font-mono">SHIBUYA DISTRICT // 03:42 AM</div>
                <div className="text-sm font-bold text-white font-mono">
                  3M SCOTCHLITE LIGHT-REACTIVE FIELD TESTING
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="text-xs text-[#ff2a5f] uppercase tracking-widest font-bold">
                PILLAR 02 // SCARCITY INTEGRITY
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                NO RESTOCKS. EVER.
              </h2>
              <div className="space-y-4 text-sm text-zinc-300 font-sans leading-relaxed">
                <p>
                  In an era where fashion brands overproduce millions of garments that end up in landfills, ZENJI strictly operates on the <strong className="text-white">Archival Batch Model</strong>.
                </p>
                <p>
                  Each volume is produced in a strictly capped micro-run of <strong className="text-white">150 pieces worldwide</strong>. Once a piece sells out, the digital screens and printing plates are permanently decommissioned.
                </p>
                <p>
                  When you own a ZENJI piece, you don’t just own a t-shirt or a hoodie. You own an irreproducible artifact of that drop cycle.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#12121c] border border-[#262638] flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-[#ff2a5f]/20 border border-[#ff2a5f]/40 flex items-center justify-center text-[#ff2a5f] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white">NUMBERED AUTHENTICITY CHIP</div>
                  <div className="text-zinc-400 font-sans text-[11px]">
                    Every order includes a tamper-proof cryptographic hologram verifying batch provenance.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-2">
            <div className="text-xs text-[#00f0ff] uppercase tracking-widest font-bold">
              JOIN THE UNDERGROUND
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              WEAR THE ARC. FOLLOW THE LORE.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-sans max-w-xl mx-auto">
              Our community spans Tokyo, Sydney, Melbourne, Los Angeles, and London. Connect with artists, gamers, and streetwear collectors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <a
              href="https://www.tiktok.com/@zenji_.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl bg-[#12121c] border border-[#242436] hover:border-[#ff2a5f] transition-all hover:scale-105"
            >
              <div className="text-sm font-bold text-white">TIKTOK</div>
              <div className="text-[11px] text-zinc-500 mt-1">@zenji_.shop</div>
              <div className="text-[10px] text-[#ff2a5f] mt-3">FIT CHECKS & DROPS ❯</div>
            </a>

            <a
              href="https://www.instagram.com/zenji_.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl bg-[#12121c] border border-[#242436] hover:border-[#00f0ff] transition-all hover:scale-105"
            >
              <div className="text-sm font-bold text-white">INSTAGRAM</div>
              <div className="text-[11px] text-zinc-500 mt-1">@zenji_.shop</div>
              <div className="text-[10px] text-[#00f0ff] mt-3">LOOKBOOK ARCHIVES ❯</div>
            </a>

            <Link
              href="/#catalog"
              className="p-5 rounded-xl bg-[#12121c] border border-[#242436] hover:border-amber-400 transition-all hover:scale-105"
            >
              <div className="text-sm font-bold text-white">DROP ARCHIVE</div>
              <div className="text-[11px] text-zinc-500 mt-1">VOL. 04 CATALOG</div>
              <div className="text-[10px] text-amber-400 mt-3">SHOP AVAILABLE PIECES ❯</div>
            </Link>
          </div>
        </div>
      </section>

      <CartDrawer />
      <AudioDeck />
      <Footer />
    </div>
  );
}
