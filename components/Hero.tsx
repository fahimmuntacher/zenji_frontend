"use client";

import React, { useState, useEffect } from "react";
import { ArrowDownRight, Flame, Layers, Sliders, Camera, Zap } from "lucide-react";
import { playUiClick } from "./AudioDeck";

interface HeroProps {
  onOpenFitMatrixGeneral?: () => void;
  onOpenLookbook?: () => void;
  onOpenLoadoutBuilder?: () => void;
}

export default function Hero({
  onOpenFitMatrixGeneral,
  onOpenLookbook,
  onOpenLoadoutBuilder,
}: HeroProps) {
  // Simulated live drop countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 38,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToCatalog = () => {
    playUiClick();
    const el = document.getElementById("catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#08080b] cyber-grid border-b border-[#1c1c2b] pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#ff2a5f]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative large Japanese watermark typography */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.035] text-[260px] lg:text-[420px] font-black leading-none text-white font-mono">
        禅路
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography, Tagline, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Drop Tag & Countdown */}
            <div className="inline-flex flex-wrap items-center gap-2.5 bg-[#12121b] border border-[#262638] px-3.5 py-1.5 rounded-full shadow-inner">
              <span className="flex items-center text-[10px] font-mono tracking-widest text-[#ff2a5f] uppercase font-bold">
                <Flame className="w-3.5 h-3.5 mr-1 text-[#ff2a5f] animate-pulse" />
                DROP VOL. 04
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-[11px] font-mono text-zinc-300">
                CLOSES IN:{" "}
                <span className="text-white font-semibold">
                  {String(timeLeft.hours).padStart(2, "0")}h :{" "}
                  {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
                  {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400 tracking-[0.3em]">
                <span>SHIBUYA UNDERGROUND</span>
                <span>//</span>
                <span className="text-[#00f0ff]">380-450 GSM HEAVYWEIGHT</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[0.95]">
                ANIME <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2a5f] via-[#ff547d] to-[#ffa3b8]">ARCHITECTURE</span>.
                <br />
                HEAVYWEIGHT <span className="text-zinc-400">HARDWARE</span>.
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              Streetwear engineered for limited drops. Cut from high-density Japanese loopback cotton, 
              fused with 3D tactile puff prints and light-reactive 3M kanji typography. 
              Zero blind pre-ordering anxiety with our interactive <strong className="text-white">Fit-Matrix</strong>, <strong className="text-white">Flash Cam</strong>, and <strong className="text-white">Street Lookbook</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={scrollToCatalog}
                className="group relative inline-flex items-center justify-center px-6 py-3 text-xs font-mono uppercase tracking-widest font-bold text-white bg-[#ff2a5f] hover:bg-[#ff1f58] transition-all rounded shadow-xl shadow-[#ff2a5f]/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>EXPLORE THE DROP</span>
                <ArrowDownRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              {onOpenFitMatrixGeneral && (
                <button
                  onClick={() => {
                    playUiClick();
                    onOpenFitMatrixGeneral();
                  }}
                  className="inline-flex items-center justify-center px-5 py-3 text-xs font-mono uppercase tracking-widest font-semibold text-zinc-300 hover:text-white bg-[#13131c] hover:bg-[#1a1a26] border border-[#252536] hover:border-[#ff2a5f]/40 transition-all rounded"
                >
                  <Sliders className="w-3.5 h-3.5 mr-1.5 text-[#00f0ff]" />
                  <span>FIT RADAR</span>
                </button>
              )}

              {onOpenLookbook && (
                <button
                  onClick={() => {
                    playUiClick();
                    onOpenLookbook();
                  }}
                  className="inline-flex items-center justify-center px-5 py-3 text-xs font-mono uppercase tracking-widest font-semibold text-zinc-300 hover:text-white bg-[#13131c] hover:bg-[#1a1a26] border border-[#252536] hover:border-[#ff2a5f]/40 transition-all rounded"
                >
                  <Camera className="w-3.5 h-3.5 mr-1.5 text-[#ff2a5f]" />
                  <span>LOOKBOOK</span>
                </button>
              )}

              {onOpenLoadoutBuilder && (
                <button
                  onClick={() => {
                    playUiClick();
                    onOpenLoadoutBuilder();
                  }}
                  className="inline-flex items-center justify-center px-5 py-3 text-xs font-mono uppercase tracking-widest font-semibold text-zinc-300 hover:text-white bg-[#13131c] hover:bg-[#1a1a26] border border-[#252538] hover:border-amber-400/40 transition-all rounded"
                >
                  <Layers className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  <span>BUILD LOADOUT</span>
                </button>
              )}
            </div>

            {/* Specs Quick Strip */}
            <div className="pt-6 border-t border-[#1a1a27] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-lg sm:text-xl font-bold font-mono text-white">450 GSM</div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                  Custom Loopback Terry
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold font-mono text-[#00f0ff]">3D PUFF</div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                  High-Density Silicone
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold font-mono text-[#ff2a5f]">150 PCS</div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                  Limited Batch Run
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              {/* Card Glow Outline */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff2a5f]/50 to-[#00f0ff]/40 rounded-xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />

              <div className="relative bg-[#101017] border border-[#242436] rounded-xl overflow-hidden shadow-2xl">
                {/* Visual Top Bar */}
                <div className="bg-[#0b0b12] px-4 py-2.5 border-b border-[#1f1f2e] flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff2a5f]" />
                    <span className="text-zinc-300 font-bold">DROP SPEC // 01</span>
                  </div>
                  <span className="text-[#00f0ff] tracking-widest text-[10px]">NEO-TOKYO 2099</span>
                </div>

                {/* Hero Showcase Image */}
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[#0c0c12]">
                  <img
                    src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
                    alt="Zenji Neo Tokyo Streetwear Drop"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 bg-[#08080c]/85 backdrop-blur-md border border-[#ff2a5f]/40 px-2.5 py-1 rounded text-[10px] font-mono text-white">
                    <span className="text-[#ff2a5f] font-bold mr-1.5">●</span> 3D SILICONE PUFF
                  </div>

                  <div className="absolute bottom-3 right-3 bg-[#08080c]/85 backdrop-blur-md border border-[#00f0ff]/40 px-2.5 py-1 rounded text-[10px] font-mono text-zinc-200">
                    <span className="text-[#00f0ff] font-bold mr-1.5">◆</span> 450 GSM JAPANESE FLEECE
                  </div>

                  {/* Japanese Kanji Accent Overlay */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-mono text-[#ff2a5f]">
                    禅路・最新投下
                  </div>
                </div>

                {/* Hero Card Footer Info */}
                <div className="p-4 bg-[#12121c] border-t border-[#1e1e2d] flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono">NEO-TOKYO 2099 PUFF HOODIE</h3>
                    <p className="text-xs text-zinc-400 font-mono">$128 USD · Only 4 Left In Drop</p>
                  </div>
                  <button
                    onClick={scrollToCatalog}
                    className="px-3 py-1.5 bg-[#ff2a5f]/15 hover:bg-[#ff2a5f] text-[#ff2a5f] hover:text-white border border-[#ff2a5f]/40 text-xs font-mono rounded transition-all"
                  >
                    VIEW PIECE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
