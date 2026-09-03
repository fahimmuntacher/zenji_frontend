"use client";

import React, { useState } from "react";
import { X, Lock, Unlock, ShieldAlert, CheckCircle2, KeyRound, Sparkles, Terminal } from "lucide-react";
import confetti from "canvas-confetti";
import { playUiClick, playSuccessChime } from "./AudioDeck";

interface DropGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlocked: (code: string) => void;
  isUnlocked: boolean;
}

export default function DropGateModal({
  isOpen,
  onClose,
  onUnlocked,
  isUnlocked,
}: DropGateModalProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [cipherState, setCipherState] = useState({
    glyph1: "禅",
    glyph2: "道",
    glyph3: "零",
  });

  if (!isOpen) return null;

  const validGlyphs1 = ["禅", "空", "鬼"];
  const validGlyphs2 = ["路", "道", "影"];
  const validGlyphs3 = ["零", "電", "龍"];

  const handleCycle = (idx: 1 | 2 | 3) => {
    playUiClick();
    if (idx === 1) {
      const next = validGlyphs1[(validGlyphs1.indexOf(cipherState.glyph1) + 1) % validGlyphs1.length];
      setCipherState({ ...cipherState, glyph1: next });
    } else if (idx === 2) {
      const next = validGlyphs2[(validGlyphs2.indexOf(cipherState.glyph2) + 1) % validGlyphs2.length];
      setCipherState({ ...cipherState, glyph2: next });
    } else {
      const next = validGlyphs3[(validGlyphs3.indexOf(cipherState.glyph3) + 1) % validGlyphs3.length];
      setCipherState({ ...cipherState, glyph3: next });
    }
  };

  const handleVerifyCipher = () => {
    playUiClick();
    // Correct cipher is: 禅 (Zen) + 路 (Ji) + 零 (Zero)
    if (cipherState.glyph1 === "禅" && cipherState.glyph2 === "路" && cipherState.glyph3 === "零") {
      triggerUnlock("ZENJI-VAULT-20");
    } else {
      setError(true);
      setTimeout(() => setError(false), 1200);
    }
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playUiClick();
    const clean = passcode.trim().toUpperCase();
    if (clean === "SHIBUYA2099" || clean === "ZENJI" || clean === "AKIRA") {
      triggerUnlock("VIP-SHIBUYA-PASS");
    } else {
      setError(true);
      setTimeout(() => setError(false), 1200);
    }
  };

  const triggerUnlock = (token: string) => {
    playSuccessChime();
    onUnlocked(token);
    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#00f0ff", "#ff2a5f", "#ffffff"],
      });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0e0e16] border border-[#28283c] rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono">
        {/* Header */}
        <div className="p-4 bg-[#12121c] border-b border-[#202030] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-7 h-7 rounded flex items-center justify-center ${
              isUnlocked ? "bg-emerald-500/20 text-emerald-400" : "bg-[#ff2a5f]/20 text-[#ff2a5f]"
            }`}>
              {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                VIP VAULT GATE // PROOF OF FAN
              </h3>
              <p className="text-[10px] text-zinc-500">ANTI-BOT CIPHER CLEARANCE</p>
            </div>
          </div>

          <button
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="w-7 h-7 rounded-full bg-[#1b1b2a] hover:bg-[#28283c] flex items-center justify-center text-zinc-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 text-xs">
          {isUnlocked ? (
            <div className="py-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700">
                  CLEARANCE GRANTED // LEVEL 04
                </span>
                <h4 className="text-base font-bold text-white pt-1">
                  VIP ACCESS ACTIVE: 20% DISCOUNT UNLOCKED
                </h4>
                <p className="text-zinc-400 text-xs font-sans">
                  Your Shibuya Agent token has unlocked the secret archive release window.
                </p>
              </div>

              <div className="bg-[#141420] border border-[#252538] p-3 rounded-lg text-left w-full space-y-1">
                <div className="text-[10px] text-zinc-500">PROMO PASSTHROUGH TOKEN:</div>
                <div className="text-sm font-bold text-[#00f0ff]">VIP-SHIBUYA-2099</div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-[#ff2a5f] hover:bg-[#ff1f58] text-white font-bold rounded-lg uppercase"
              >
                ENTER STOREFRONT WITH VIP STATUS
              </button>
            </div>
          ) : (
            <>
              {/* Method 1: Align Kanji Cipher */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-zinc-400">
                  <span className="font-bold">METHOD 1: ALIGN KANJI GLYPHS</span>
                  <span className="text-[10px] text-zinc-500">CLICK TO CYCLE</span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <button
                    onClick={() => handleCycle(1)}
                    className="p-4 bg-[#141420] hover:bg-[#1c1c2e] border border-[#29293e] rounded-xl text-3xl font-black text-white hover:text-[#ff2a5f] transition-all hover:scale-105"
                  >
                    {cipherState.glyph1}
                  </button>
                  <button
                    onClick={() => handleCycle(2)}
                    className="p-4 bg-[#141420] hover:bg-[#1c1c2e] border border-[#29293e] rounded-xl text-3xl font-black text-white hover:text-[#00f0ff] transition-all hover:scale-105"
                  >
                    {cipherState.glyph2}
                  </button>
                  <button
                    onClick={() => handleCycle(3)}
                    className="p-4 bg-[#141420] hover:bg-[#1c1c2e] border border-[#29293e] rounded-xl text-3xl font-black text-white hover:text-[#ff2a5f] transition-all hover:scale-105"
                  >
                    {cipherState.glyph3}
                  </button>
                </div>

                <div className="flex justify-between items-center text-[10px] text-zinc-500">
                  <span>HINT: BRAND PHONETICS [ZEN - JI - ZERO]</span>
                  <button
                    onClick={handleVerifyCipher}
                    className="px-3 py-1 bg-[#ff2a5f]/20 hover:bg-[#ff2a5f] text-[#ff2a5f] hover:text-white border border-[#ff2a5f]/40 rounded font-bold"
                  >
                    VERIFY CIPHER
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-zinc-600">
                <div className="h-px bg-[#202030] flex-1" />
                <span className="text-[10px] uppercase">OR ENTER TELEGRAM/DISCORD CODE</span>
                <div className="h-px bg-[#202030] flex-1" />
              </div>

              {/* Method 2: Passcode Entry */}
              <form onSubmit={handlePasscodeSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ENTER CODE (e.g. SHIBUYA2099)"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full bg-[#13131f] border border-[#262638] rounded-lg p-2.5 text-white uppercase tracking-wider focus:outline-none focus:border-[#00f0ff]"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500">
                    DISCORD VIP
                  </span>
                </div>

                {error && (
                  <div className="text-red-400 text-[10px] bg-red-950/40 p-2 rounded border border-red-800 flex items-center space-x-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>INVALID CIPHER KEY. CHECK DISCORD OR MATCH KANJI.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#00f0ff]/15 hover:bg-[#00f0ff] text-[#00f0ff] hover:text-black border border-[#00f0ff]/40 font-bold uppercase tracking-wider rounded-lg transition-all"
                >
                  DECRYPT & UNLOCK VAULT
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
