"use client";

import React, { useState } from "react";
import { Send, ShieldCheck, Sparkles, Flame, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#07070a] border-t border-[#1a1a28] text-zinc-400 font-mono text-xs">
      {/* Drop Radar Newsletter Strip */}
      <div className="border-b border-[#181824] bg-[#0c0c12] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-[#ff2a5f] text-xs font-bold tracking-widest uppercase">
              <Flame className="w-3.5 h-3.5" />
              <span>EARLY ACCESS TELEMETRY</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-mono uppercase tracking-tight">
              JOIN THE DROP RADAR
            </h3>
            <p className="text-zinc-400 text-xs max-w-md font-sans">
              Never miss limited batch drops. Subscribers receive SMS / Email passwords 15 minutes before public release.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800 text-emerald-300 px-4 py-3 rounded-lg text-xs">
                <Check className="w-4 h-4" />
                <span>RADAR ACTIVATED. YOU WILL RECEIVE VIP DROP ACCESS.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md w-full gap-2">
                <input
                  type="email"
                  required
                  placeholder="agent@shibuya.net"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#14141f] border border-[#27273a] text-white px-3.5 py-2.5 rounded-lg text-xs focus:outline-none focus:border-[#ff2a5f] w-full"
                />
                <button
                  type="submit"
                  className="bg-[#ff2a5f] hover:bg-[#ff1b53] text-white px-5 py-2.5 rounded-lg font-bold uppercase tracking-wider shrink-0 transition-colors shadow-lg shadow-[#ff2a5f]/20 flex items-center space-x-1"
                >
                  <span>JOIN</span>
                  <Send className="w-3 h-3 ml-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Lore */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#ff2a5f] rounded-sm flex items-center justify-center font-bold text-white text-xs">
              禅
            </div>
            <span className="text-white font-bold tracking-widest text-base">ZENJI 禅路</span>
          </div>
          <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">
            Anime-inspired streetwear engineering. Crafted from custom-milled 380–450 GSM Japanese loopback terry with high-density silicone puff and light-reactive embroidery.
          </p>
          <div className="text-[10px] text-zinc-600">
            COORDINATES: 35.6595° N, 139.7004° E (SHIBUYA, TOKYO)
          </div>
        </div>

        {/* Drop Archive */}
        <div className="space-y-2">
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">DROP SCHEDULE</h4>
          <ul className="space-y-1.5 text-[11px] text-zinc-400">
            <li className="flex items-center space-x-1.5 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a5f]" />
              <span>VOL. 04: SHIBUYA HARVEST (LIVE)</span>
            </li>
            <li className="text-zinc-500">VOL. 03: AKIRA PROTO (SOLD OUT)</li>
            <li className="text-zinc-500">VOL. 02: KAIJU SCHEMATICS (ARCHIVED)</li>
            <li className="text-zinc-500">VOL. 01: GENESIS REVOLUTION (VAULTED)</li>
          </ul>
        </div>

        {/* Craft & Integrity */}
        <div className="space-y-2">
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">FABRIC SPECS</h4>
          <ul className="space-y-1.5 text-[11px] text-zinc-400">
            <li>450 GSM Loopback French Terry</li>
            <li>3D High-Viscosity Silicone Puff</li>
            <li>3M Scotchlite Reflective Kanji</li>
            <li>Pre-shrunk Double Ring-Spun Cotton</li>
            <li>DWR Cordura Ripstop Techwear</li>
          </ul>
        </div>

        {/* Support & Legal */}
        <div className="space-y-2">
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">CLIENT SERVICES</h4>
          <ul className="space-y-1.5 text-[11px] text-zinc-400">
            <li>Interactive Fit-Matrix Radar</li>
            <li>Worldwide Express Shipping</li>
            <li>14-Day Global Return Policy</li>
            <li>Authenticity Verification Portal</li>
            <li>Discord Streetwear Community</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#14141f] py-6 px-4 text-center text-[10px] text-zinc-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© 2026 ZENJI STREETWEAR CORP. ALL RIGHTS RESERVED.</div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="hover:text-zinc-400 cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-zinc-400 cursor-pointer">TERMS OF RELEASE</span>
            <span className="hover:text-zinc-400 cursor-pointer">SECURITY DISCLOSURE</span>
            <button
              onClick={() => {
                try {
                  sessionStorage.removeItem("zenji_bootloader_seen");
                  window.dispatchEvent(new CustomEvent("zenji:reboot"));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } catch {}
              }}
              className="hover:text-[#00f0ff] text-zinc-500 cursor-pointer transition-colors"
            >
              ⚡ REBOOT BOOTLOADER
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
