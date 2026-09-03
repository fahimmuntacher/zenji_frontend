"use client";

import React, { useState } from "react";
import { X, BellRing, ShieldAlert, CheckCircle2, Users, Flame, Sparkles } from "lucide-react";
import { ProductItem } from "@/types/product";
import { SITE_CONFIG } from "@/config/site";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { playUiClick, playSuccessChime } from "@/lib/audio";

interface ResupplyRadarModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResupplyRadarModal({
  product,
  isOpen,
  onClose,
}: ResupplyRadarModalProps) {
  const [channel, setChannel] = useState<"email" | "discord" | "sms">("email");
  const [handle, setHandle] = useState("");
  const [preferredSize, setPreferredSize] = useState("L");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEscapeKey(isOpen, onClose);

  if (!isOpen || !product) return null;

  const currentPledges = 164;
  const targetPledges = SITE_CONFIG.resupplyTargetPledges;
  const progress = Math.round((currentPledges / targetPledges) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle) return;
    playSuccessChime();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setHandle("");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Re-Supply Scarcity Radar"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-lg bg-[#0e0e16] border border-[#27273a] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#12121c] border-b border-[#202030] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-[#ff2a5f]/20 border border-[#ff2a5f]/40 flex items-center justify-center text-[#ff2a5f]">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                  RE-SUPPLY RADAR // VAULT PLEDGE
                </h3>
                <span className="text-[10px] bg-red-900/40 text-red-400 px-2 py-0.5 rounded font-mono border border-red-700/50">
                  SOLD OUT
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                {product.name} ({product.japaneseTitle})
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playUiClick();
              handleReset();
            }}
            className="w-8 h-8 rounded-full bg-[#1a1a28] hover:bg-[#252538] flex items-center justify-center text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 text-xs font-mono">
          {isSubmitted ? (
            <div className="py-6 flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white uppercase">
                  RADAR PLEDGE CONFIRMED // QUEUE TICKET #0165
                </h4>
                <p className="text-zinc-400 text-xs font-sans max-w-sm">
                  We linked <strong className="text-white">{handle}</strong>. You will receive an exclusive priority checkout link 15 minutes before the next batch drops.
                </p>
              </div>

              <div className="bg-[#13131e] border border-[#242436] p-3 rounded-lg text-left w-full space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>RESERVED ITEM:</span>
                  <span className="text-white">{product.name}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>DESIRED SIZE:</span>
                  <span className="text-[#00f0ff] font-bold">SIZE {preferredSize}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>DISPATCH WINDOW:</span>
                  <span className="text-[#ff2a5f]">VOL. 05 (OCTOBER 2026)</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-[#ff2a5f] hover:bg-[#ff1f58] text-white font-bold rounded-lg uppercase"
              >
                RETURN TO STOREFRONT
              </button>
            </div>
          ) : (
            <>
              {/* Batch Meter */}
              <div className="bg-[#12121b] border border-[#212132] p-4 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center text-zinc-300">
                    <Users className="w-3.5 h-3.5 mr-1.5 text-[#00f0ff]" />
                    <span>PRODUCTION RE-TRIGGER THRESHOLD:</span>
                  </span>
                  <span className="text-[#ff2a5f] font-bold">
                    {currentPledges} / {targetPledges} AGENTS
                  </span>
                </div>

                <div className="w-full bg-[#1b1b2a] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#27273a]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#ff2a5f] to-[#00f0ff] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-[10px] text-zinc-500">
                  Once 200 agents pledge interest, the Tokyo Shibuya workshop initiates a custom run of 200 pieces. Zero waste, zero scalper markups.
                </p>
              </div>

              {/* Notification Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-zinc-400 font-semibold">
                    1. CHOOSE DISPATCH CHANNEL:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "email", label: "EMAIL PING" },
                      { id: "discord", label: "DISCORD DM" },
                      { id: "sms", label: "SMS RADAR" },
                    ].map((m) => (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => {
                          playUiClick();
                          setChannel(m.id as any);
                        }}
                        className={`py-2 px-2 rounded-lg border text-center transition-colors ${
                          channel === m.id
                            ? "bg-[#ff2a5f]/20 border-[#ff2a5f] text-white font-bold"
                            : "bg-[#14141e] border-[#222230] text-zinc-400 hover:text-white"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-zinc-400 font-semibold">
                    2. YOUR {channel.toUpperCase()} ADDRESS / USERNAME:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      channel === "email"
                        ? "cyber@shibuya.net"
                        : channel === "discord"
                        ? "agent#2099"
                        : "+1 (555) 019-2831"
                    }
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full bg-[#13131e] border border-[#252538] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#ff2a5f]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-zinc-400 font-semibold">
                    3. SELECT TARGET SIZE:
                  </label>
                  <div className="flex space-x-2">
                    {product.sizes.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => {
                          playUiClick();
                          setPreferredSize(s);
                        }}
                        className={`px-3 py-1.5 rounded border transition-colors ${
                          preferredSize === s
                            ? "bg-[#00f0ff] border-[#00f0ff] text-black font-bold"
                            : "bg-[#14141e] border-[#222230] text-zinc-400 hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#ff2a5f] hover:bg-[#ff1f58] text-white font-bold uppercase tracking-widest rounded-lg shadow-xl shadow-[#ff2a5f]/25 transition-all mt-2"
                >
                  LOCK IN RADAR NOTIFICATION
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
