"use client";

import React, { useState, useEffect } from "react";
import { playKatanaSlash, playUiClick } from "@/lib/audio";
import { Zap, Terminal, ShieldAlert, Sparkles } from "lucide-react";

export default function AnimeBootloader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isSlashing, setIsSlashing] = useState(false);

  const telemetryLogs = [
    "BOOTING ZENJI CORE // ARCHIVAL DROP VOL. 04",
    "COMPILING 450 GSM CUSTOM LOOPBACK WEAVE MATRIX... [OK]",
    "CALIBRATING 3M SCOTCHLITE LIGHT-REACTIVE EMULSION... [450 CD/LUX]",
    "SHIBUYA UNDERGROUND LINK ESTABLISHED // ACCESS GRANTED",
  ];

  const triggerExit = () => {
    setIsSlashing(true);
    playKatanaSlash();
    setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("zenji_bootloader_seen", "true");
      } catch {}
    }, 700);
  };

  useEffect(() => {
    // Check if previously booted in this session
    try {
      const seen = sessionStorage.getItem("zenji_bootloader_seen");
      if (seen) return;
    } catch {}

    setVisible(true);

    // Progress counter
    const startTime = Date.now();
    const duration = 1600; // 1.6 seconds total

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct > 25 && pct <= 50) setStepIndex(1);
      else if (pct > 50 && pct <= 80) setStepIndex(2);
      else if (pct > 80) setStepIndex(3);

      if (elapsed >= duration) {
        clearInterval(interval);
        triggerExit();
      }
    }, 25);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearInterval(interval);
        triggerExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Custom reboot trigger
    const handleReboot = () => {
      setIsSlashing(false);
      setProgress(0);
      setStepIndex(0);
      setVisible(true);
    };
    window.addEventListener("zenji:reboot", handleReboot);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("zenji:reboot", handleReboot);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="System Bootloader"
      className="fixed inset-0 z-[99999] overflow-hidden select-none font-mono bg-[#050508] flex flex-col justify-between p-6 sm:p-10 pointer-events-auto"
    >
      {/* Background Cyber Scanlines & Vignette */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#ff2a5f_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" />

      {/* Ambient Neon Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff2a5f]/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#00f0ff]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Katana Blade Slash Light Laser */}
      {isSlashing && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
          {/* High-speed white/cyan laser flash */}
          <div className="w-[200%] h-1 bg-white shadow-[0_0_40px_10px_#00f0ff,0_0_80px_20px_#ff2a5f] transform -rotate-[22deg] animate-pulse" />
          <div className="absolute inset-0 bg-white/40 mix-blend-screen animate-fadeOut" />
        </div>
      )}

      {/* Top Header HUD */}
      <div className="relative z-10 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff2a5f] animate-ping" />
          <span className="text-[#ff2a5f] font-bold tracking-widest uppercase">
            ZENJI_OS // SYS_INIT [2099.04]
          </span>
          <span className="text-zinc-600 hidden sm:inline">// SHIBUYA SECURE TUNNEL</span>
        </div>

        <button
          onClick={triggerExit}
          className="px-3 py-1 rounded bg-[#141420] border border-[#27273c] hover:border-[#ff2a5f] text-zinc-400 hover:text-white text-[11px] uppercase tracking-widest transition-all"
        >
          SKIP INTRO [ESC]
        </button>
      </div>

      {/* Central Anime Kanji & Logo Showcase */}
      <div className={`relative z-10 my-auto text-center space-y-4 transition-all duration-500 ${isSlashing ? "scale-110 opacity-0 blur-sm" : "scale-100 opacity-100"}`}>
        {/* Japanese Calligraphy Kanji */}
        <div className="relative inline-block">
          <div className="text-8xl sm:text-9xl md:text-[140px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-[0_0_35px_rgba(255,42,95,0.6)]">
            禅路
          </div>
          <div className="absolute -top-3 -right-3 text-[10px] text-[#00f0ff] border border-[#00f0ff]/40 px-2 py-0.5 rounded tracking-widest bg-black/80">
            VOL. 04
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-[0.3em] uppercase">
            ZENJI
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono tracking-widest uppercase">
            Anime Architecture // Heavyweight Streetwear
          </p>
        </div>

        {/* Live Telemetry Message */}
        <div className="inline-flex items-center space-x-2 bg-[#0d0d16] border border-[#222234] px-4 py-2 rounded-lg text-xs text-[#00f0ff] font-mono shadow-xl max-w-md mx-auto">
          <Terminal className="w-3.5 h-3.5 text-[#ff2a5f] shrink-0 animate-spin" />
          <span className="truncate">{telemetryLogs[stepIndex]}</span>
        </div>
      </div>

      {/* Bottom Progress Meter & Coordinates */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2 text-zinc-500 text-[11px]">
            <span>LOC: 35.6595° N, 139.7004° E</span>
            <span className="hidden sm:inline text-zinc-700">//</span>
            <span className="hidden sm:inline text-zinc-500">SHIBUYA CROSSING</span>
          </div>
          <div className="text-[#ff2a5f] font-bold tracking-widest text-sm">
            {progress}% LOADED
          </div>
        </div>

        {/* Segmented Cyber Progress Bar */}
        <div className="w-full bg-[#12121e] h-2 rounded-full overflow-hidden p-0.5 border border-[#222236]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#ff2a5f] via-[#ff4b7a] to-[#00f0ff] transition-all duration-75 shadow-[0_0_15px_#ff2a5f]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
