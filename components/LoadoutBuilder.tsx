"use client";

import React, { useState, useMemo } from "react";
import { X, Layers, Sparkles, ShoppingBag, Check, ShieldCheck, ArrowRight, Flame } from "lucide-react";
import { ProductItem } from "./FitMatrixModal";
import { useCartStore } from "@/store/useCartStore";
import { playUiClick, playSuccessChime } from "./AudioDeck";

interface LoadoutBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  onOpenCart: () => void;
}

export default function LoadoutBuilder({
  isOpen,
  onClose,
  products,
  onOpenCart,
}: LoadoutBuilderProps) {
  const { addItem } = useCartStore();

  const tops = useMemo(
    () => products.filter((p) => p.category === "Hoodies" || p.category === "Outerwear"),
    [products]
  );
  const tees = useMemo(() => products.filter((p) => p.category === "Tees"), [products]);
  const accessories = useMemo(
    () => products.filter((p) => p.category === "Accessories"),
    [products]
  );

  const [selectedTop, setSelectedTop] = useState<ProductItem>(tops[0] || products[0]);
  const [selectedTee, setSelectedTee] = useState<ProductItem>(tees[0] || products[1]);
  const [selectedAcc, setSelectedAcc] = useState<ProductItem>(accessories[0] || products[6]);

  const [topSize, setTopSize] = useState("L");
  const [teeSize, setTeeSize] = useState("L");

  const [isDeploying, setIsDeploying] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal =
    (selectedTop?.price || 0) + (selectedTee?.price || 0) + (selectedAcc?.price || 0);
  const discountAmount = rawSubtotal * 0.15; // 15% Loadout Discount
  const finalPrice = rawSubtotal - discountAmount;

  const handleDeployLoadout = () => {
    playUiClick();
    setIsDeploying(true);

    if (selectedTop) {
      addItem({
        id: selectedTop.id,
        name: selectedTop.name,
        japaneseTitle: selectedTop.japaneseTitle,
        price: Math.round(selectedTop.price * 0.85),
        size: topSize,
        imageFront: selectedTop.imageFront,
        printType: selectedTop.printType,
        gsmRating: selectedTop.gsmRating,
      });
    }

    if (selectedTee) {
      addItem({
        id: selectedTee.id,
        name: selectedTee.name,
        japaneseTitle: selectedTee.japaneseTitle,
        price: Math.round(selectedTee.price * 0.85),
        size: teeSize,
        imageFront: selectedTee.imageFront,
        printType: selectedTee.printType,
        gsmRating: selectedTee.gsmRating,
      });
    }

    if (selectedAcc) {
      addItem({
        id: selectedAcc.id,
        name: selectedAcc.name,
        japaneseTitle: selectedAcc.japaneseTitle,
        price: Math.round(selectedAcc.price * 0.85),
        size: "OS",
        imageFront: selectedAcc.imageFront,
        printType: selectedAcc.printType,
        gsmRating: selectedAcc.gsmRating,
      });
    }

    playSuccessChime();

    setTimeout(() => {
      setIsDeploying(false);
      onClose();
      onOpenCart();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0e0e16] border border-[#27273b] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#12121c] border-b border-[#202030] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-[#00f0ff]/20 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                  CYBER LOADOUT // COMPLETE THE FIT BUILDER
                </h3>
                <span className="text-[10px] bg-[#ff2a5f]/15 text-[#ff2a5f] px-2 py-0.5 rounded font-mono border border-[#ff2a5f]/30">
                  SAVE 15% BUNDLE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                Assemble a full 3-piece Shibuya kit with coordinated fabric weights & print synergy.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#1b1b2a] hover:bg-[#28283c] flex items-center justify-center text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Builder Slots */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Slot 1: Top Layer */}
            <div className="bg-[#12121b] border border-[#232334] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400 font-bold">SLOT 01: OUTER / HOODIE</span>
                <span className="text-[#ff2a5f] font-bold">${selectedTop?.price}</span>
              </div>

              {/* Preview */}
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-black/50 border border-[#27273c] relative">
                <img
                  src={selectedTop?.imageFront}
                  alt={selectedTop?.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-300">
                  {selectedTop?.gsmRating}
                </span>
              </div>

              {/* Selector */}
              <select
                value={selectedTop?.id}
                onChange={(e) => {
                  playUiClick();
                  const found = tops.find((t) => t.id === e.target.value);
                  if (found) setSelectedTop(found);
                }}
                className="w-full bg-[#161624] border border-[#2b2b3e] text-xs font-mono text-white p-2 rounded-lg"
              >
                {tops.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} (${t.price})
                  </option>
                ))}
              </select>

              {/* Size */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-zinc-500">SIZE:</span>
                <div className="flex space-x-1">
                  {selectedTop?.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        playUiClick();
                        setTopSize(s);
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        topSize === s ? "bg-[#ff2a5f] text-white font-bold" : "bg-[#181826] text-zinc-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Slot 2: Graphic Tee */}
            <div className="bg-[#12121b] border border-[#232334] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400 font-bold">SLOT 02: BASE TEE</span>
                <span className="text-[#ff2a5f] font-bold">${selectedTee?.price}</span>
              </div>

              {/* Preview */}
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-black/50 border border-[#27273c] relative">
                <img
                  src={selectedTee?.imageFront}
                  alt={selectedTee?.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-300">
                  {selectedTee?.gsmRating}
                </span>
              </div>

              {/* Selector */}
              <select
                value={selectedTee?.id}
                onChange={(e) => {
                  playUiClick();
                  const found = tees.find((t) => t.id === e.target.value);
                  if (found) setSelectedTee(found);
                }}
                className="w-full bg-[#161624] border border-[#2b2b3e] text-xs font-mono text-white p-2 rounded-lg"
              >
                {tees.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} (${t.price})
                  </option>
                ))}
              </select>

              {/* Size */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-zinc-500">SIZE:</span>
                <div className="flex space-x-1">
                  {selectedTee?.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        playUiClick();
                        setTeeSize(s);
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        teeSize === s ? "bg-[#ff2a5f] text-white font-bold" : "bg-[#181826] text-zinc-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Slot 3: Tactical Accessory */}
            <div className="bg-[#12121b] border border-[#232334] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400 font-bold">SLOT 03: ACCESSORY</span>
                <span className="text-[#ff2a5f] font-bold">${selectedAcc?.price}</span>
              </div>

              {/* Preview */}
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-black/50 border border-[#27273c] relative">
                <img
                  src={selectedAcc?.imageFront}
                  alt={selectedAcc?.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-300">
                  {selectedAcc?.gsmRating}
                </span>
              </div>

              {/* Selector */}
              <select
                value={selectedAcc?.id}
                onChange={(e) => {
                  playUiClick();
                  const found = accessories.find((a) => a.id === e.target.value);
                  if (found) setSelectedAcc(found);
                }}
                className="w-full bg-[#161624] border border-[#2b2b3e] text-xs font-mono text-white p-2 rounded-lg"
              >
                {accessories.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} (${a.price})
                  </option>
                ))}
              </select>

              <div className="text-[10px] text-zinc-500 font-mono py-1">
                ONE SIZE FITS ALL (ADJUSTABLE HARDWARE)
              </div>
            </div>
          </div>

          {/* Pricing & Incentive Strip */}
          <div className="bg-[#141420] border border-[#252538] p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center space-x-2">
                <span className="text-zinc-400 line-through">${rawSubtotal.toFixed(2)} USD</span>
                <span className="text-xl font-bold text-white">${finalPrice.toFixed(2)} USD</span>
                <span className="bg-[#ff2a5f]/20 text-[#ff2a5f] px-2 py-0.5 rounded font-bold">
                  SAVE ${discountAmount.toFixed(2)} (15% OFF)
                </span>
              </div>
              <div className="text-[11px] text-[#00f0ff] flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>QUALIFIES FOR FREE TOKYO EXPRESS SHIPPING</span>
              </div>
            </div>

            <button
              onClick={handleDeployLoadout}
              disabled={isDeploying}
              className="w-full sm:w-auto px-6 py-3 bg-[#ff2a5f] hover:bg-[#ff1b53] text-white font-bold uppercase tracking-widest rounded-lg shadow-xl shadow-[#ff2a5f]/25 flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isDeploying ? "DEPLOYING LOADOUT..." : "DEPLOY FULL LOADOUT TO CART"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
