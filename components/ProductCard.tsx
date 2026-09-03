"use client";

import React, { useState } from "react";
import { ProductItem } from "./FitMatrixModal";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, Sliders, Sparkles, Layers, Eye, Check } from "lucide-react";

interface ProductCardProps {
  product: ProductItem;
  onOpenFitMatrix: (product: ProductItem) => void;
}

export default function ProductCard({ product, onOpenFitMatrix }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [isAdding, setIsAdding] = useState(false);

  const { addItem } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock <= 0) return;

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

    setTimeout(() => setIsAdding(false), 800);
  };

  const isSoldOut = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 4;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-[#0f0f16] border border-[#20202e] hover:border-[#ff2a5f]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#ff2a5f]/10"
    >
      {/* Visual Image Swap Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0a0f]">
        {/* Front & Back Images with Smooth Crossfade */}
        <img
          src={product.imageFront}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />
        <img
          src={product.imageBack}
          alt={`${product.name} alternate view`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered ? "opacity-100 scale-105" : "opacity-0 scale-95"
          }`}
        />

        {/* Japanese Title Watermark */}
        <div className="absolute top-3 left-3 bg-[#08080c]/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300 border border-[#232334]">
          {product.japaneseTitle}
        </div>

        {/* Stock / Drop Status Badge */}
        <div className="absolute top-3 right-3">
          {isSoldOut ? (
            <span className="bg-red-950/80 text-red-400 border border-red-800/80 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
              SOLD OUT
            </span>
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

        {/* Floating Technical Fabric & Print Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 pointer-events-none">
          <span className="bg-[#08080c]/90 backdrop-blur-md border border-[#252536] text-white text-[9px] font-mono px-2 py-0.5 rounded">
            {product.gsmRating}
          </span>
          <span className="bg-[#ff2a5f]/15 backdrop-blur-md border border-[#ff2a5f]/30 text-[#ff2a5f] text-[9px] font-mono font-semibold px-2 py-0.5 rounded">
            {product.printType}
          </span>
        </div>

        {/* Quick Fit Matrix Overlay Action on Hover */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => onOpenFitMatrix(product)}
            className="px-4 py-2 bg-[#12121c]/90 hover:bg-[#ff2a5f] text-white border border-[#2e2e42] hover:border-[#ff2a5f] text-xs font-mono font-bold rounded-lg shadow-xl flex items-center space-x-2 transition-all transform hover:scale-105"
          >
            <Sliders className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>OPEN FIT-MATRIX & RADAR</span>
          </button>
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
              ${product.price} <span className="text-[10px] text-zinc-500 font-normal">USD</span>
            </span>
          </div>

          <h3 className="font-mono font-bold text-sm text-white group-hover:text-[#ff2a5f] transition-colors line-clamp-1">
            {product.name}
          </h3>

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
              onClick={() => onOpenFitMatrix(product)}
              className="col-span-2 py-2 px-2 rounded bg-[#151520] hover:bg-[#1f1f2e] border border-[#252538] text-[10px] font-mono text-zinc-300 hover:text-white flex items-center justify-center space-x-1 transition-colors"
              title="Calculate exact sizing"
            >
              <Sliders className="w-3 h-3 text-[#00f0ff]" />
              <span>FIT RADAR</span>
            </button>

            <button
              disabled={isSoldOut}
              onClick={handleQuickAdd}
              className={`col-span-3 py-2 px-3 rounded text-[11px] font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
                isSoldOut
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : isAdding
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
                  <span>{isSoldOut ? "SOLD OUT" : "QUICK ADD"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
