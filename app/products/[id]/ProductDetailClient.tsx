"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductItem } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";
import { SITE_CONFIG } from "@/config/site";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import FitMatrixModal from "@/components/FitMatrixModal";
import ResupplyRadarModal from "@/components/ResupplyRadarModal";
import LookbookModal from "@/components/LookbookModal";
import LoadoutBuilder from "@/components/LoadoutBuilder";
import DropGateModal from "@/components/DropGateModal";
import AudioDeck from "@/components/AudioDeck";
import { playUiClick, playSuccessChime } from "@/lib/audio";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  ShoppingBag,
  Sliders,
  ShieldCheck,
  Truck,
  Sparkles,
  Zap,
  ZoomIn,
  Check,
  Layers,
  Flame,
  BellRing,
  RotateCcw,
} from "lucide-react";

interface ProductDetailClientProps {
  product: ProductItem;
  allProducts: ProductItem[];
}

export default function ProductDetailClient({
  product,
  allProducts,
}: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState<"front" | "back">("front");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [quantity, setQuantity] = useState(1);
  const [flashCam, setFlashCam] = useState(false);
  const [loupeActive, setLoupeActive] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [isAdded, setIsAdded] = useState(false);

  // Modals
  const [isFitMatrixOpen, setIsFitMatrixOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isResupplyOpen, setIsResupplyOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isLoadoutOpen, setIsLoadoutOpen] = useState(false);
  const [isDropGateOpen, setIsDropGateOpen] = useState(false);
  const [isVipUnlocked, setIsVipUnlocked] = useState(false);

  const { addItem, toggleCartDrawer } = useCartStore();

  const isSoldOut = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 4;

  const currentImageSrc = activeImage === "front" ? product.imageFront : product.imageBack;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!loupeActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleAddToCart = () => {
    if (isSoldOut) {
      setIsResupplyOpen(true);
      return;
    }

    playUiClick();
    setIsAdded(true);
    addItem(
      {
        id: product.id,
        name: product.name,
        japaneseTitle: product.japaneseTitle,
        price: isVipUnlocked ? Math.round(product.price * 0.8) : product.price,
        size: selectedSize,
        imageFront: product.imageFront,
        printType: product.printType,
        gsmRating: product.gsmRating,
      },
      quantity
    );
    playSuccessChime();

    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className={`min-h-screen flex flex-col font-mono transition-colors duration-500 ${
      flashCam ? "bg-[#050508] text-zinc-100" : "bg-[#08080b] text-white"
    }`}>
      {/* Navigation Header */}
      <Navbar
        activeCategory="All"
        onSelectCategory={() => {}}
        searchQuery=""
        onSearchChange={() => {}}
        onOpenLookbook={() => setIsLookbookOpen(true)}
        onOpenLoadoutBuilder={() => setIsLoadoutOpen(true)}
        onOpenDropGate={() => setIsDropGateOpen(true)}
        globalFlashCam={flashCam}
        onToggleGlobalFlashCam={() => setFlashCam(!flashCam)}
        isVipUnlocked={isVipUnlocked}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 w-full text-xs text-zinc-500 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO STOREFRONT CATALOG</span>
        </Link>
        <span className="hidden sm:inline text-zinc-600">
          DROP VOL. 04 // ARCHIVE CODE: {product.id.toUpperCase()}
        </span>
      </div>

      {/* Main Product Layout: 2 Columns */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Gallery & Micro-Loupe */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Visual Showcase */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setLoupeActive(false)}
              className={`relative aspect-[3/4] w-full rounded-2xl overflow-hidden border bg-[#0a0a0f] shadow-2xl transition-all ${
                flashCam
                  ? "border-[#00f0ff] shadow-[#00f0ff]/20"
                  : "border-[#242436]"
              }`}
            >
              <img
                src={currentImageSrc}
                alt={product.name}
                className={`w-full h-full object-cover object-center transition-all duration-500 ${
                  flashCam ? "brightness-125 contrast-125 saturate-50" : ""
                }`}
              />

              {/* 3M Flash Cam Luminous Overlay */}
              {flashCam && (
                <div className="absolute inset-0 pointer-events-none mix-blend-screen bg-radial from-white/30 via-[#00f0ff]/25 to-transparent animate-pulse flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-5xl font-black text-white glow-text-cyan tracking-widest uppercase">
                    {product.japaneseTitle}
                  </div>
                  <div className="text-xs font-mono text-[#00f0ff] bg-black/80 px-3 py-1 rounded border border-[#00f0ff]/50 mt-3">
                    ⚡ 3M RETRO-REFLECTIVE 450 CD/LUX ACTIVE
                  </div>
                </div>
              )}

              {/* Micro-Loupe Magnifier Circle */}
              {loupeActive && (
                <div
                  className="absolute w-44 h-44 rounded-full border-2 border-[#ff2a5f] pointer-events-none shadow-2xl overflow-hidden bg-black z-30"
                  style={{
                    left: `calc(${loupePos.x}% - 88px)`,
                    top: `calc(${loupePos.y}% - 88px)`,
                    backgroundImage: `url(${currentImageSrc})`,
                    backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
                    backgroundSize: "450%",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-px bg-[#ff2a5f]/50" />
                    <div className="h-full w-px bg-[#ff2a5f]/50 absolute" />
                  </div>
                  <div className="absolute bottom-2 right-3 bg-black/80 text-[9px] font-mono text-white px-1.5 py-0.5 rounded">
                    4.5X WEAVE
                  </div>
                </div>
              )}

              {/* Floating Interactive Badges on Image */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2 z-20">
                <span className="bg-[#08080c]/90 backdrop-blur-md px-3 py-1 rounded text-xs text-white border border-[#27273a]">
                  {product.japaneseTitle}
                </span>
                <span className="bg-[#ff2a5f]/20 backdrop-blur-md px-3 py-1 rounded text-xs text-[#ff2a5f] font-bold border border-[#ff2a5f]/40">
                  {product.printType}
                </span>
              </div>

              {/* Floating Flash & Zoom Toggles */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20">
                <button
                  onClick={() => {
                    playUiClick();
                    setFlashCam(!flashCam);
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs flex items-center space-x-1.5 transition-all ${
                    flashCam
                      ? "bg-[#00f0ff] text-black font-bold border-[#00f0ff] shadow-lg shadow-[#00f0ff]/40"
                      : "bg-black/75 hover:bg-black text-white border-[#27273c]"
                  }`}
                  title="Toggle 3M Flash Cam Mode"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>3M FLASH</span>
                </button>

                <button
                  onClick={() => {
                    playUiClick();
                    setLoupeActive(!loupeActive);
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs flex items-center space-x-1.5 transition-all ${
                    loupeActive
                      ? "bg-[#ff2a5f] text-white font-bold border-[#ff2a5f] shadow-lg shadow-[#ff2a5f]/40"
                      : "bg-black/75 hover:bg-black text-white border-[#27273c]"
                  }`}
                  title="Toggle Magnifier Loupe"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>LOUPE ZOOM</span>
                </button>
              </div>

              {/* Bottom Spec Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <span className="bg-black/85 backdrop-blur-md px-3 py-1.5 rounded text-xs text-zinc-300 border border-[#2b2b3d]">
                  {product.gsmRating} · {product.fitType}
                </span>
              </div>
            </div>

            {/* Thumbnail Switcher */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  playUiClick();
                  setActiveImage("front");
                }}
                className={`p-2 rounded-xl border flex items-center space-x-3 transition-all ${
                  activeImage === "front"
                    ? "bg-[#141422] border-[#ff2a5f] shadow-md shadow-[#ff2a5f]/20"
                    : "bg-[#101017] border-[#222232] text-zinc-400 hover:text-white"
                }`}
              >
                <div className="w-12 h-14 rounded overflow-hidden bg-black shrink-0 border border-[#272738]">
                  <img src={product.imageFront} alt="Front View" className="w-full h-full object-cover" />
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-white">FRONT PROFILE</div>
                  <div className="text-[10px] text-zinc-500">Chest Graphics & Collar</div>
                </div>
              </button>

              <button
                onClick={() => {
                  playUiClick();
                  setActiveImage("back");
                }}
                className={`p-2 rounded-xl border flex items-center space-x-3 transition-all ${
                  activeImage === "back"
                    ? "bg-[#141422] border-[#ff2a5f] shadow-md shadow-[#ff2a5f]/20"
                    : "bg-[#101017] border-[#222232] text-zinc-400 hover:text-white"
                }`}
              >
                <div className="w-12 h-14 rounded overflow-hidden bg-black shrink-0 border border-[#272738]">
                  <img src={product.imageBack} alt="Back View" className="w-full h-full object-cover" />
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-white">BACK / SPINE ANGLE</div>
                  <div className="text-[10px] text-zinc-500">Full Schematics & Hood</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Specifications, Sizing & Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header / Title */}
            <div className="space-y-2 border-b border-[#1c1c2b] pb-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#ff2a5f] font-bold tracking-widest uppercase">
                  DROP VOL. 04 // {product.category}
                </span>
                {isSoldOut ? (
                  <span className="bg-red-950 text-red-400 border border-red-800 px-2.5 py-0.5 rounded font-bold text-[10px]">
                    SOLD OUT
                  </span>
                ) : isLowStock ? (
                  <span className="bg-[#ff2a5f]/20 text-[#ff2a5f] border border-[#ff2a5f]/40 px-2.5 py-0.5 rounded font-bold text-[10px] animate-pulse">
                    ONLY {product.stock} PIECES LEFT
                  </span>
                ) : (
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded text-[10px]">
                    IN STOCK ({product.stock} UNITS)
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                {product.name}
              </h1>

              <div className="flex items-baseline space-x-3 pt-1">
                <span className="text-3xl font-black text-[#ff2a5f]">
                  ${product.price} <span className="text-xs text-zinc-500 font-normal">USD</span>
                </span>
                <span className="text-xs text-zinc-400 font-sans">
                  Free international express shipping on orders $100+
                </span>
              </div>
            </div>

            {/* Lore Description */}
            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
              {product.description}
            </p>

            {/* Interactive Fit-Matrix Radar Trigger */}
            <div className="bg-gradient-to-r from-[#171724] to-[#12121b] border border-[#2d2d42] p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-[#00f0ff]" />
                  <span className="text-xs font-bold text-white">UNSURE OF YOUR SIZE?</span>
                </div>
                <button
                  onClick={() => {
                    playUiClick();
                    setIsFitMatrixOpen(true);
                  }}
                  className="px-3 py-1 bg-[#ff2a5f] hover:bg-[#ff1f58] text-white text-xs font-bold rounded shadow transition-all"
                >
                  CALCULATE WITH FIT RADAR
                </button>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans">
                Input your height and weight to get the exact drape recommendation (Regular vs. Boxy vs. Tokyo Cyber).
              </p>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400 font-bold">SELECT SIZE:</span>
                <span className="text-zinc-500 text-[10px]">TRUE TO TOKYO STREETWEAR SIZING</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      playUiClick();
                      setSelectedSize(s);
                    }}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold border transition-all ${
                      selectedSize === s
                        ? "bg-[#ff2a5f] border-[#ff2a5f] text-white shadow-lg shadow-[#ff2a5f]/25"
                        : "bg-[#13131f] border-[#252538] text-zinc-300 hover:border-zinc-500"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add To Cart Bar */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-5 gap-3">
                {/* Quantity */}
                <div className="col-span-2 flex items-center justify-between bg-[#13131f] border border-[#252538] rounded-xl px-3 py-2">
                  <span className="text-[11px] text-zinc-500">QTY:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-6 h-6 rounded bg-[#1c1c2b] text-zinc-400 hover:text-white flex items-center justify-center text-xs"
                    >
                      -
                    </button>
                    <span className="font-bold text-white text-xs">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                      className="w-6 h-6 rounded bg-[#1c1c2b] text-zinc-400 hover:text-white flex items-center justify-center text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="col-span-3">
                  {isSoldOut ? (
                    <button
                      onClick={() => setIsResupplyOpen(true)}
                      className="w-full py-3 px-4 bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-bold uppercase rounded-xl flex items-center justify-center space-x-2 transition-colors"
                    >
                      <BellRing className="w-4 h-4 text-red-400" />
                      <span>LOCK IN RE-SUPPLY RADAR</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xl ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-[#ff2a5f] hover:bg-[#ff1f58] text-white shadow-[#ff2a5f]/25 hover:scale-[1.01]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>ADDED TO CART</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>SECURE DROP PIECE (${product.price * quantity})</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Technical Specifications Specs Grid */}
            <div className="bg-[#101018] border border-[#202030] rounded-xl p-4 space-y-3 text-xs">
              <div className="text-zinc-400 font-bold tracking-wider uppercase border-b border-[#1b1b2a] pb-2">
                FABRIC & PRINT SPECIFICATIONS
              </div>
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div>
                  <span className="text-zinc-500 block">FABRIC MASS:</span>
                  <span className="text-white font-bold">{product.gsmRating}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">PRINT METHOD:</span>
                  <span className="text-[#00f0ff] font-bold">{product.printType}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">CUT SILHOUETTE:</span>
                  <span className="text-white font-bold">{product.fitType}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">DISPATCH ORIGIN:</span>
                  <span className="text-white font-bold">Shibuya, Tokyo</span>
                </div>
              </div>

              {product.printDetails && (
                <p className="text-[11px] text-zinc-400 font-sans pt-1 border-t border-[#1a1a28]">
                  {product.printDetails}
                </p>
              )}
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-2 gap-3 text-[11px] text-zinc-400">
              <div className="flex items-center space-x-2 bg-[#12121b] border border-[#20202e] p-2.5 rounded-lg">
                <Truck className="w-4 h-4 text-[#00f0ff] shrink-0" />
                <span>DHL Express 2-4 Day Dispatch</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#12121b] border border-[#20202e] p-2.5 rounded-lg">
                <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>14-Day Global Returns Policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Drop Related Pieces */}
        <div className="mt-20 pt-10 border-t border-[#1c1c2b] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-[#ff2a5f] font-bold uppercase tracking-widest">
                COORDINATED ARCHIVE
              </div>
              <h2 className="text-xl font-black text-white uppercase mt-0.5">
                COMPLETE THE SHIBUYA DROP
              </h2>
            </div>
            <Link
              href="/#catalog"
              className="text-xs text-zinc-400 hover:text-white transition-colors"
            >
              VIEW ALL 8 PIECES ❯
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.id}`}
                className="group bg-[#0f0f16] border border-[#1f1f2e] hover:border-[#ff2a5f]/50 rounded-xl overflow-hidden p-3 space-y-2.5 transition-all hover:shadow-xl"
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-black/40 relative">
                  <img
                    src={rel.imageFront}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/85 px-1.5 py-0.5 rounded text-[9px] text-zinc-300">
                    {rel.gsmRating}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#ff2a5f] transition-colors truncate">
                    {rel.name}
                  </h4>
                  <div className="text-[11px] text-zinc-400">${rel.price} USD</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Modals */}
      <FitMatrixModal
        product={product}
        isOpen={isFitMatrixOpen}
        onClose={() => setIsFitMatrixOpen(false)}
      />

      <ResupplyRadarModal
        product={product}
        isOpen={isResupplyOpen}
        onClose={() => setIsResupplyOpen(false)}
      />

      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        products={allProducts}
        onOpenProductFit={() => setIsFitMatrixOpen(true)}
      />

      <LoadoutBuilder
        isOpen={isLoadoutOpen}
        onClose={() => setIsLoadoutOpen(false)}
        products={allProducts}
        onOpenCart={() => toggleCartDrawer(true)}
      />

      <DropGateModal
        isOpen={isDropGateOpen}
        onClose={() => setIsDropGateOpen(false)}
        onUnlocked={() => setIsVipUnlocked(true)}
        isUnlocked={isVipUnlocked}
      />

      <AudioDeck />
      <Footer />
    </div>
  );
}
