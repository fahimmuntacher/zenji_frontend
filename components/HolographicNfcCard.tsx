"use client";

import React, { useState, useRef } from "react";
import { ProductItem } from "@/types/product";
import { playSuccessChime, playUiClick } from "@/lib/audio";
import { ShieldCheck, Cpu, QrCode, Sparkles, CheckCircle2, Lock, ExternalLink } from "lucide-react";

interface HolographicNfcCardProps {
  product?: ProductItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function HolographicNfcCard({
  product,
  isOpen,
  onClose,
}: HolographicNfcCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isScanned, setIsScanned] = useState(false);

  if (!isOpen) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate 3D tilt degrees (max 18deg)
    const rotateX = -(mouseY / (rect.height / 2)) * 14;
    const rotateY = (mouseX / (rect.width / 2)) * 14;

    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 0.85 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleSimulateScan = () => {
    playUiClick();
    setIsScanned(true);
    playSuccessChime();
  };

  const specimenId = product ? `${product.sku || "ZNJ-2099"}-0892` : "ZNJ-SPECIMEN-001";
  const productName = product?.name || "ARCHIVAL STREETWEAR SPECIMEN";
  const gsmRating = product?.gsmRating || "450 GSM HEAVYWEIGHT LOOPBACK";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cryptographic Certificate of Authenticity"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg flex flex-col items-center space-y-6"
      >
        {/* Header HUD */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#161622] border border-[#2d2d42] text-[10px] font-mono text-[#00f0ff] uppercase tracking-widest">
            <Lock className="w-3 h-3 text-[#00f0ff]" />
            <span>CRYPTOGRAPHIC NFC PROVENANCE CERTIFICATE</span>
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">
            PHYSICAL DIGITAL TWIN VERIFICATION
          </h3>
          <p className="text-xs text-zinc-400 font-sans">
            Tilt card with cursor to inspect anti-counterfeit rainbow prism foil.
          </p>
        </div>

        {/* 3D Perspective Card Container */}
        <div
          className="relative w-full aspect-[1.586/1] max-w-[420px] select-none"
          style={{ perspective: "1000px" }}
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full rounded-2xl p-6 relative overflow-hidden transition-transform duration-100 ease-out shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/20 bg-gradient-to-br from-[#12121c] via-[#0c0c14] to-[#06060a] flex flex-col justify-between"
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Holographic Rainbow Foil Layer */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-color-dodge z-10"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.7) 0%, rgba(0,240,255,0.5) 25%, rgba(255,42,95,0.4) 50%, rgba(250,204,21,0.3) 75%, transparent 100%)`,
              }}
            />

            {/* Subtle Metallic Brushed Grid Texture */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />

            {/* Card Header */}
            <div className="relative z-20 flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-[#ff2a5f] to-[#791530] flex items-center justify-center font-bold text-white shadow-md text-sm">
                  禅
                </div>
                <div>
                  <div className="text-xs font-black tracking-widest text-white">
                    ZENJI // 禅路
                  </div>
                  <div className="text-[8px] text-zinc-400 uppercase tracking-widest font-mono">
                    Official Authenticity Token
                  </div>
                </div>
              </div>

              {/* Japanese Official Seal Stamp */}
              <div className="border border-amber-400/60 bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider flex items-center space-x-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>【正規品】VERIFIED</span>
              </div>
            </div>

            {/* Card Center: Smart NFC Chip & Micro-Telemetry */}
            <div className="relative z-20 flex items-center justify-between py-2">
              {/* Metallic Smart Chip */}
              <div className="w-11 h-9 rounded-md bg-gradient-to-tr from-amber-200 via-amber-400 to-amber-100 border border-amber-500/80 p-1 flex flex-col justify-between shadow-inner">
                <div className="w-full h-[1px] bg-amber-700/60" />
                <div className="flex justify-between">
                  <div className="w-3 h-2 border-r border-amber-700/60" />
                  <div className="w-3 h-2 border-l border-amber-700/60" />
                </div>
                <div className="w-full h-[1px] bg-amber-700/60" />
              </div>

              {/* Wireless Wave Icon */}
              <div className="flex items-center space-x-1 text-zinc-500 text-[10px] font-mono">
                <Cpu className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span className="text-[#00f0ff] font-bold">NFC 13.56 MHz</span>
              </div>
            </div>

            {/* Card Footer: Specimen Number & Garment Spec */}
            <div className="relative z-20 space-y-1 text-left border-t border-white/10 pt-2.5">
              <div className="text-[10px] text-zinc-400 font-mono tracking-wider truncate">
                ITEM: <strong className="text-white">{productName}</strong>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
                <span>SPEC: {gsmRating}</span>
                <span>ORIGIN: TOKYO × MELBOURNE</span>
              </div>
              <div className="text-[10px] font-mono text-[#00f0ff] tracking-widest font-bold pt-0.5">
                SERIAL: {specimenId}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Actions & Scan Simulation */}
        <div className="w-full max-w-[420px] space-y-3">
          {isScanned ? (
            <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 flex items-center space-x-3 text-xs animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold text-white">CRYPTOGRAPHIC SIGNATURE VALID</div>
                <div className="text-[11px] text-emerald-300/80">
                  Batch #004 authenticity verified. Capped 150 pieces worldwide. No restocks.
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleSimulateScan}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#171726] via-[#1c1c30] to-[#171726] hover:border-[#00f0ff] border border-[#2c2c42] rounded-xl text-xs font-mono font-bold text-white flex items-center justify-center space-x-2 transition-all shadow-lg hover:scale-[1.01]"
            >
              <Cpu className="w-4 h-4 text-[#00f0ff] animate-pulse" />
              <span>TEST NFC CONTACTLESS VERIFICATION</span>
            </button>
          )}

          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 px-1">
            <span>HASH: 8F2A...99B4</span>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white underline underline-offset-2"
            >
              DISMISS VIEWER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
