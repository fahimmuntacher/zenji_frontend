"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ProductItem } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { ShoppingBag, Sliders, Sparkles, Zap, Eye, Check, BellRing, ZoomIn } from "lucide-react";
import { playUiClick, playSuccessChime } from "@/lib/audio";

interface ProductCardProps {
  product: ProductItem;
  onOpenFitMatrix: (product: ProductItem) => void;
  onOpenResupplyRadar: (product: ProductItem) => void;
  globalFlashCam?: boolean;
}

export default function ProductCard({
  product,
  onOpenFitMatrix,
  onOpenResupplyRadar,
  globalFlashCam = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [isAdding, setIsAdding] = useState(false);
  const [localFlashCam, setLocalFlashCam] = useState(false);
  const [loupeActive, setLoupeActive] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });

  const cardImageRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  const isFlashActive = globalFlashCam || localFlashCam;
  const isSoldOut = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 4;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSoldOut) {
      onOpenResupplyRadar(product);
      return;
    }

    playUiClick();
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      japaneseTitle: product.japaneseTitle,
      price: product.price,
      size: selectedSize,
      imageFront: product.imageFront,
      printType: product.printType,
      gsmRating: product.gsmRating,
    });
    playSuccessChime();

    setTimeout(() => setIsAdding(false), 900);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!loupeActive || !cardImageRef.current) return;
    const rect = cardImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setLoupeActive(false);
      }}
      className={`group relative flex flex-col bg-[#0f0f16] border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
        isFlashActive
          ? "border-[#00f0ff] shadow-[#00f0ff]/20 bg-[#07070b]"
          : "border-[#20202e] hover:border-[#ff2a5f]/50 hover:shadow-[#ff2a5f]/10"
      }`}
    >
      {/* Visual Image Swap Container */}
      <div
        ref={cardImageRef}
        onMouseMove={handleMouseMove}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#09090e] select-none"
      >
        {/* Normal Crossfade Images */}
        <img
          src={product.imageFront}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && !loupeActive ? "opacity-0 scale-105" : "opacity-100 scale-100"
          } ${isFlashActive ? "brightness-125 contrast-125 saturate-50" : ""}`}
        />
        <img
          src={product.imageBack}
          alt={`${product.name} back angle`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && !loupeActive ? "opacity-100 scale-105" : "opacity-0 scale-95"
          } ${isFlashActive ? "brightness-125 contrast-125 saturate-50" : ""}`}
        />

        {/* 3M Flash Cam Luminous Effect Overlay */}
        {isFlashActive && (
          <div className="absolute inset-0 pointer-events-none mix-blend-screen bg-radial from-white/30 via-[#00f0ff]/20 to-transparent animate-pulse">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="text-4xl font-black text-white glow-text-cyan tracking-widest uppercase">
                {product.japaneseTitle}
              </div>
              <div className="text-[10px] font-mono text-[#00f0ff] bg-black/80 px-2 py-0.5 rounded border border-[#00f0ff]/50 mt-2">
                ⚡ 3M RETRO-REFLECTIVE 450 CD/LUX ACTIVE
              </div>
            </div>
          </div>
        )}

        {/* Micro-Loupe Magnifier Circle */}
        {loupeActive && (
          <div
            className="absolute w-36 h-36 rounded-full border-2 border-[#ff2a5f] pointer-events-none shadow-2xl overflow-hidden bg-black z-30"
            style={{
              left: `calc(${loupePos.x}% - 72px)`,
              top: `calc(${loupePos.y}% - 72px)`,
              backgroundImage: `url(${isHovered ? product.imageBack : product.imageFront})`,
              backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
              backgroundSize: "400%",
            }}
          >
            {/* Loupe Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-px bg-[#ff2a5f]/40" />
              <div className="h-full w-px bg-[#ff2a5f]/40 absolute" />
            </div>
            <div className="absolute bottom-1 right-2 bg-black/80 text-[8px] font-mono text-white px-1 rounded">
              3.5X TEXTURE
            </div>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center space-x-1.5 z-20">
          <div className="bg-[#08080c]/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300 border border-[#232334]">
            {product.japaneseTitle}
          </div>
        </div>

        {/* Stock / Drop Status Badge */}
        <div className="absolute top-3 right-3 z-20">
          {isSoldOut ? (
            <button
              onClick={() => onOpenResupplyRadar(product)}
              className="bg-red-950/90 hover:bg-red-900 text-red-300 border border-red-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase flex items-center space-x-1"
              title="Click to request re-supply"
            >
              <BellRing className="w-3 h-3 text-red-400" />
              <span>SOLD OUT</span>
            </button>
          ) : isLowStock ? (
            <span className="bg-[#ff2a5f]/20 text-[#ff2a5f] border border-[#ff2a5f]/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase animate-pulse">
              ONLY {product.stock} LEFT
            </span>
          ) : (
            <span className="bg-[#12121b]/80 backdrop-blur-md text-[#00f0ff] border border-[#00f0ff]/30 text-[10px] font-mono px-2 py-0.5 rounded">
              LIMITED DROP
            </span>
          )}
        </div>

        {/* Interactive Tool Buttons: 3M Flash Cam & Micro-Loupe */}
        <div className="absolute top-10 right-3 flex flex-col space-y-1.5 z-20">
          {/* 3M Flash Cam Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playUiClick();
              setLocalFlashCam(!localFlashCam);
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              localFlashCam
                ? "bg-[#00f0ff] text-black shadow-lg shadow-[#00f0ff]/40 scale-110"
                : "bg-black/70 hover:bg-black text-zinc-300 hover:text-white border border-[#28283c]"
            }`}
            title="Toggle 3M Flash Cam Preview"
          >
            <Zap className="w-3.5 h-3.5" />
          </button>

          {/* Micro-Loupe Magnifier Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playUiClick();
              setLoupeActive(!loupeActive);
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              loupeActive
                ? "bg-[#ff2a5f] text-white shadow-lg shadow-[#ff2a5f]/40 scale-110"
                : "bg-black/70 hover:bg-black text-zinc-300 hover:text-white border border-[#28283c]"
            }`}
            title="Inspect 3.5x Fabric Weave & Puff Print"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Actions on Hover */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 space-y-2.5 transition-opacity duration-300 z-15 ${
            isHovered && !loupeActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <Link
            href={`/products/${product.id}`}
            onClick={() => playUiClick()}
            className="w-full max-w-[190px] px-4 py-2 bg-[#ff2a5f] hover:bg-[#ff1f58] text-white text-xs font-mono font-bold rounded-lg shadow-xl flex items-center justify-center space-x-1.5 transition-all transform hover:scale-105"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>VIEW PIECE DETAILS</span>
          </Link>
          <button
            onClick={() => {
              playUiClick();
              onOpenFitMatrix(product);
            }}
            className="w-full max-w-[190px] px-3 py-1.5 bg-[#141420]/90 hover:bg-[#1f1f2e] text-zinc-200 border border-[#2b2b3d] text-[11px] font-mono rounded-lg shadow-xl flex items-center justify-center space-x-1.5 transition-all"
          >
            <Sliders className="w-3 h-3 text-[#00f0ff]" />
            <span>FIT-MATRIX RADAR</span>
          </button>
        </div>

        {/* Bottom Technical Spec Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 pointer-events-none z-20">
          <span className="bg-[#08080c]/90 backdrop-blur-md border border-[#252536] text-white text-[9px] font-mono px-2 py-0.5 rounded">
            {product.gsmRating}
          </span>
          <span className="bg-[#ff2a5f]/15 backdrop-blur-md border border-[#ff2a5f]/30 text-[#ff2a5f] text-[9px] font-mono font-semibold px-2 py-0.5 rounded">
            {product.printType}
          </span>
        </div>
      </div>

      {/* Content & Details */}
      <div className="p-4 flex flex-col flex-grow space-y-3 justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              {product.category} // {product.fitType}
            </span>
            <span className="text-sm font-black font-mono text-white">
              {formatPrice(product.price)}
            </span>
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-mono font-bold text-sm text-white hover:text-[#ff2a5f] transition-colors line-clamp-1 cursor-pointer">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Size Selector & Action Buttons */}
        <div className="space-y-2.5 pt-2 border-t border-[#1a1a27]">
          {/* Size Pills */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500">SIZE:</span>
            <div className="flex items-center space-x-1">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => {
                    e.stopPropagation();
                    playUiClick();
                    setSelectedSize(sz);
                  }}
                  className={`w-6 h-6 rounded text-[10px] font-mono font-medium transition-colors ${
                    selectedSize === sz
                      ? "bg-[#ff2a5f] text-white font-bold"
                      : "bg-[#161622] text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-5 gap-2">
            <button
              onClick={() => {
                playUiClick();
                onOpenFitMatrix(product);
              }}
              className="col-span-2 py-2 px-2 rounded bg-[#151520] hover:bg-[#1f1f2e] border border-[#252538] text-[10px] font-mono text-zinc-300 hover:text-white flex items-center justify-center space-x-1 transition-colors"
              title="Calculate exact sizing"
            >
              <Sliders className="w-3 h-3 text-[#00f0ff]" />
              <span>FIT RADAR</span>
            </button>

            {isSoldOut ? (
              <button
                onClick={() => {
                  playUiClick();
                  onOpenResupplyRadar(product);
                }}
                className="col-span-3 py-2 px-2 rounded bg-red-950/80 hover:bg-red-900 border border-red-800 text-[10px] font-mono text-red-200 font-bold uppercase tracking-wider flex items-center justify-center space-x-1 transition-all"
              >
                <BellRing className="w-3 h-3 text-red-400" />
                <span>NOTIFY RESTOCK</span>
              </button>
            ) : (
              <button
                onClick={handleQuickAdd}
                className={`col-span-3 py-2 px-3 rounded text-[11px] font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
                  isAdding
                    ? "bg-emerald-600 text-white"
                    : "bg-[#ff2a5f] hover:bg-[#ff1f58] text-white shadow-md shadow-[#ff2a5f]/20 hover:scale-[1.02]"
                }`}
              >
                {isAdding ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>ADDED</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>QUICK ADD</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
