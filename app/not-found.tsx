import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudioDeck from "@/components/AudioDeck";
import CartDrawer from "@/components/CartDrawer";
import { ArrowLeft, Compass, ShieldAlert, Sparkles, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08080b] text-white font-mono">
      <Navbar />

      <main className="flex-1 flex items-center justify-center relative overflow-hidden py-24 px-4 sm:px-6">
        {/* Background Cyber Scanlines & Glow Orbs */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ff2a5f_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#ff2a5f]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#00f0ff]/10 rounded-full blur-[110px] pointer-events-none" />

        {/* Giant Watermark Kanji */}
        <div className="absolute select-none pointer-events-none opacity-[0.03] text-[260px] sm:text-[380px] font-black leading-none text-white">
          消失
        </div>

        {/* Central 404 Content Container */}
        <div className="relative z-10 max-w-lg w-full text-center space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#151522] border border-[#2b2b3e] text-xs text-[#ff2a5f]">
            <ShieldAlert className="w-3.5 h-3.5 text-[#ff2a5f] animate-pulse" />
            <span className="font-bold tracking-widest uppercase">ERROR CODE 404 // SIGNAL TERMINATED</span>
          </div>

          {/* Glitch Headline */}
          <div className="space-y-2">
            <h1 className="text-7xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 drop-shadow-[0_0_35px_rgba(255,42,95,0.4)]">
              404
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white">
              LOST IN THE SHIBUYA GRID
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-md mx-auto leading-relaxed">
              The coordinates you followed lead to a decommissioned sector or an unreleased drop vault. 
              Recalibrate your compass to re-enter the citadel.
            </p>
          </div>

          {/* Telemetry Log Box */}
          <div className="p-4 rounded-xl bg-[#0e0e16] border border-[#202030] text-left text-xs font-mono space-y-1.5 text-zinc-400">
            <div className="flex items-center space-x-2 text-[#00f0ff] pb-1 border-b border-[#1a1a28]">
              <Terminal className="w-3.5 h-3.5" />
              <span>TELEMETRY REPORT:</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-500">REQUEST_URI:</span>
              <span className="text-zinc-300">OUT_OF_BOUNDS</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-500">CITADEL_GATEWAY:</span>
              <span className="text-emerald-400">SHIBUYA_NODE_ONLINE</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-500">REMEDY:</span>
              <span className="text-amber-400">FALLBACK_TO_HOME</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 bg-[#ff2a5f] hover:bg-[#ff1f58] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-xl shadow-[#ff2a5f]/25 flex items-center justify-center space-x-2 transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO CITADEL</span>
            </Link>

            <Link
              href="/#catalog"
              className="w-full sm:w-auto px-6 py-3 bg-[#13131e] hover:bg-[#1a1a2a] border border-[#252538] hover:border-[#00f0ff] text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center space-x-2 transition-all"
            >
              <Compass className="w-4 h-4 text-[#00f0ff]" />
              <span>VIEW CURRENT DROPS</span>
            </Link>
          </div>
        </div>
      </main>

      <CartDrawer />
      <AudioDeck />
      <Footer />
    </div>
  );
}
