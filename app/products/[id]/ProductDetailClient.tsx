"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ProductItem } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { SITE_CONFIG } from "@/config/site";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import FitMatrixModal from "@/components/FitMatrixModal";
import ResupplyRadarModal from "@/components/ResupplyRadarModal";
import LookbookModal from "@/components/LookbookModal";
import LoadoutBuilder from "@/components/LoadoutBuilder";
import DropGateModal from "@/components/DropGateModal";
import HolographicNfcCard from "@/components/HolographicNfcCard";
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
  ChevronDown,
  User,
  Info,
} from "lucide-react";

interface ProductDetailClientProps {
  product: ProductItem;
  allProducts: ProductItem[];
}

export default function ProductDetailClient({
  product,
  allProducts,
}: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState<"front" | "back" | "model">("front");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [quantity, setQuantity] = useState(1);
  const [flashCam, setFlashCam] = useState(false);
  const [loupeActive, setLoupeActive] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [isAdded, setIsAdded] = useState(false);

  // Sticky Buy Bar State
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyModuleRef = useRef<HTMLDivElement>(null);

  // Accordion State
  const [openAccordion, setOpenAccordion] = useState<string | null>("spec-1");

  // Modals
  const [isFitMatrixOpen, setIsFitMatrixOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isResupplyOpen, setIsResupplyOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isLoadoutOpen, setIsLoadoutOpen] = useState(false);
  const [isDropGateOpen, setIsDropGateOpen] = useState(false);
  const [isVipUnlocked, setIsVipUnlocked] = useState(false);
  const [isNfcOpen, setIsNfcOpen] = useState(false);

  const { addItem, toggleCartDrawer } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  const isSoldOut = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 4;

  const currentImageSrc =
    activeImage === "front"
      ? product.imageFront
      : activeImage === "back"
      ? product.imageBack
      : product.imageModel || product.imageFront;

  // Scroll listener for Sticky Buy HUD
  useEffect(() => {
    const handleScroll = () => {
      if (buyModuleRef.current) {
        const rect = buyModuleRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const toggleAccordionItem = (id: string) => {
    playUiClick();
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div
      className={`min-h-screen flex flex-col font-mono transition-colors duration-500 pb-20 sm:pb-0 ${
        flashCam ? "bg-[#050508] text-zinc-100" : "bg-[#08080b] text-white"
      }`}
    >
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

      {/* Breadcrumbs & Scarcity Seal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 w-full text-xs text-zinc-500 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO CATALOG</span>
        </Link>

        <div className="flex items-center space-x-3">
          <span className="bg-[#ff2a5f]/15 border border-[#ff2a5f]/40 text-[#ff2a5f] text-[10px] font-bold px-2.5 py-0.5 rounded tracking-widest uppercase animate-pulse">
            NO RESTOCKS. EVER.
          </span>
          <span className="hidden sm:inline text-zinc-600">
            {product.sku || product.id.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Main Product Layout: 2 Columns */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: 3-Angle Showcase, Flash Cam & Micro-Loupe */}
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

              {/* Floating Badges */}
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

              {/* On Model Stats HUD */}
              {activeImage === "model" && product.modelStats && (
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/85 backdrop-blur-md px-3 py-2 rounded-lg border border-[#00f0ff]/40 flex items-center space-x-2 text-xs text-[#00f0ff]">
                  <User className="w-3.5 h-3.5" />
                  <span>{product.modelStats}</span>
                </div>
              )}
            </div>

            {/* 3-Angle Editorial Photography Switcher */}
            <div className="grid grid-cols-3 gap-3">
              {/* Front Profile */}
              <button
                onClick={() => {
                  playUiClick();
                  setActiveImage("front");
                }}
                className={`p-2.5 rounded-xl border flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 transition-all ${
                  activeImage === "front"
                    ? "bg-[#141422] border-[#ff2a5f] shadow-md shadow-[#ff2a5f]/20"
                    : "bg-[#101017] border-[#222232] text-zinc-400 hover:text-white"
                }`}
              >
                <div className="w-10 h-12 rounded overflow-hidden bg-black shrink-0 border border-[#272738]">
                  <img src={product.imageFront} alt="Front View" className="w-full h-full object-cover" />
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-white text-[11px]">FRONT</div>
                  <div className="text-[9px] text-zinc-500 hidden sm:block">Chest Graphics</div>
                </div>
              </button>

              {/* Back / Spine */}
              <button
                onClick={() => {
                  playUiClick();
                  setActiveImage("back");
                }}
                className={`p-2.5 rounded-xl border flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 transition-all ${
                  activeImage === "back"
                    ? "bg-[#141422] border-[#ff2a5f] shadow-md shadow-[#ff2a5f]/20"
                    : "bg-[#101017] border-[#222232] text-zinc-400 hover:text-white"
                }`}
              >
                <div className="w-10 h-12 rounded overflow-hidden bg-black shrink-0 border border-[#272738]">
                  <img src={product.imageBack} alt="Back View" className="w-full h-full object-cover" />
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-white text-[11px]">SPINE / REAR</div>
                  <div className="text-[9px] text-zinc-500 hidden sm:block">Full Schematics</div>
                </div>
              </button>

              {/* On Model Fit */}
              <button
                onClick={() => {
                  playUiClick();
                  setActiveImage("model");
                }}
                className={`p-2.5 rounded-xl border flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 transition-all ${
                  activeImage === "model"
                    ? "bg-[#141422] border-[#00f0ff] shadow-md shadow-[#00f0ff]/20"
                    : "bg-[#101017] border-[#222232] text-zinc-400 hover:text-white"
                }`}
              >
                <div className="w-10 h-12 rounded overflow-hidden bg-black shrink-0 border border-[#272738]">
                  <img
                    src={product.imageModel || product.imageFront}
                    alt="On Model View"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-white text-[11px]">ON-MODEL FIT</div>
                  <div className="text-[9px] text-zinc-500 hidden sm:block">Real Proportion</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Specifications, Sizing & Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header / Title */}
            <div className="space-y-2 border-b border-[#1c1c2b] pb-5" ref={buyModuleRef}>
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

              {/* Colorway & SKU Telemetry Badge */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] font-mono text-zinc-400">
                <span className="bg-[#141420] border border-[#242436] px-2 py-0.5 rounded text-white font-bold">
                  COLORWAY: {product.colorway || "OBSIDIAN"}
                </span>
                <span className="text-zinc-600">//</span>
                <span className="text-zinc-500">SKU: {product.sku || product.id.toUpperCase()}</span>
              </div>

              {/* 3D Holographic NFC Provenance Certificate Trigger */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    playUiClick();
                    setIsNfcOpen(true);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start space-x-2 bg-gradient-to-r from-[#141422] to-[#0f0f18] hover:from-[#1b1b2e] hover:to-[#141422] border border-[#2b2b40] hover:border-[#00f0ff]/60 px-3.5 py-2 rounded-xl text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-md group"
                >
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#00f0ff] group-hover:rotate-12 transition-transform" />
                    <span>CRYPTOGRAPHIC NFC AUTHENTICITY CARD</span>
                  </div>
                  <span className="text-[9px] bg-[#00f0ff]/15 text-[#00f0ff] px-2 py-0.5 rounded border border-[#00f0ff]/40 font-bold uppercase tracking-wider">
                    INSPECT 3D
                  </span>
                </button>
              </div>

              {/* Price & Shipping */}
              <div className="flex items-baseline space-x-3 pt-2">
                <span className="text-3xl font-black text-[#ff2a5f]">
                  {formatPrice(isVipUnlocked ? Math.round(product.price * 0.8) : product.price)}
                </span>
                <span className="text-xs text-zinc-400 font-sans">
                  Free DHL express delivery on orders over $100
                </span>
              </div>
            </div>

            {/* Description */}
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
                      <span>JOIN RE-SUPPLY RADAR</span>
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
                          <span>SECURE PIECE ({formatPrice(product.price * quantity)})</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Animated Technical Accordions */}
            <div className="border-t border-[#1c1c2b] pt-4 space-y-2.5">
              {/* Accordion 1: Textile Weave & GSM */}
              <div className="border border-[#222234] rounded-xl overflow-hidden bg-[#0d0d14]">
                <button
                  onClick={() => toggleAccordionItem("spec-1")}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-white hover:bg-[#12121c] transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-[#00f0ff]">SPEC 01 //</span>
                    <span>TEXTILE WEAVE & {product.gsmRating} MASS</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      openAccordion === "spec-1" ? "rotate-180 text-[#ff2a5f]" : ""
                    }`}
                  />
                </button>
                {openAccordion === "spec-1" && (
                  <div className="p-4 pt-1 text-xs text-zinc-300 font-sans space-y-2 border-t border-[#1c1c28]">
                    <p>
                      Milled from 100% compact ring-spun Japanese cotton with dual loopback terry loops.
                      Maintains rigid structural drape while remaining breathable across seasonal temperature shifts.
                    </p>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-1">
                      <div><span className="text-zinc-500">GSM MASS:</span> {product.gsmRating}</div>
                      <div><span className="text-zinc-500">SILHOUETTE:</span> {product.fitType}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: 3D Puff & 3M Ink */}
              <div className="border border-[#222234] rounded-xl overflow-hidden bg-[#0d0d14]">
                <button
                  onClick={() => toggleAccordionItem("spec-2")}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-white hover:bg-[#12121c] transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-[#ff2a5f]">SPEC 02 //</span>
                    <span>{product.printType.toUpperCase()}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      openAccordion === "spec-2" ? "rotate-180 text-[#ff2a5f]" : ""
                    }`}
                  />
                </button>
                {openAccordion === "spec-2" && (
                  <div className="p-4 pt-1 text-xs text-zinc-300 font-sans space-y-2 border-t border-[#1c1c28]">
                    <p>{product.printDetails}</p>
                    <p className="text-[11px] text-[#00f0ff] font-mono">
                      ● 3M Scotchlite Retro-Reflective Emulsion (450 cd/lux reflection under direct headlights/flash).
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Community Fit Sentiment */}
              <div className="border border-[#222234] rounded-xl overflow-hidden bg-[#0d0d14]">
                <button
                  onClick={() => toggleAccordionItem("spec-3")}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-white hover:bg-[#12121c] transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-amber-400">SPEC 03 //</span>
                    <span>COMMUNITY FIT SENTIMENT & SIZING</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      openAccordion === "spec-3" ? "rotate-180 text-[#ff2a5f]" : ""
                    }`}
                  />
                </button>
                {openAccordion === "spec-3" && (
                  <div className="p-4 pt-1 text-xs text-zinc-300 font-sans space-y-3 border-t border-[#1c1c28]">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-400">COMMUNITY VERDICT:</span>
                        <span className="text-emerald-400 font-bold">94% TRUE TO OVERSIZED</span>
                      </div>
                      <div className="w-full bg-[#1b1b2a] h-2 rounded-full overflow-hidden flex">
                        <div className="bg-emerald-500 h-full w-[94%]" />
                        <div className="bg-amber-500 h-full w-[6%]" />
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      If you prefer a tailored fit, choose one size down. For the authentic Shibuya drop-shoulder aesthetic, select your standard size.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Shipping & Dispatch */}
              <div className="border border-[#222234] rounded-xl overflow-hidden bg-[#0d0d14]">
                <button
                  onClick={() => toggleAccordionItem("spec-4")}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-white hover:bg-[#12121c] transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400">SPEC 04 //</span>
                    <span>TOKYO DISPATCH & DHL EXPRESS (2-4 DAYS)</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      openAccordion === "spec-4" ? "rotate-180 text-[#ff2a5f]" : ""
                    }`}
                  />
                </button>
                {openAccordion === "spec-4" && (
                  <div className="p-4 pt-1 text-xs text-zinc-300 font-sans space-y-2 border-t border-[#1c1c28]">
                    <p>
                      Direct worldwide dispatch from our Shibuya fulfillment hub. All orders packed in custom vacuum-sealed anti-static mylar bags with cryptographic hologram seals.
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      • 14-Day Global Return Window for unworn pieces with original tags intact.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 5: Garment Care Protocol */}
              <div className="border border-[#222234] rounded-xl overflow-hidden bg-[#0d0d14]">
                <button
                  onClick={() => toggleAccordionItem("spec-5")}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-white hover:bg-[#12121c] transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-400">SPEC 05 //</span>
                    <span>GARMENT CARE PROTOCOL</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      openAccordion === "spec-5" ? "rotate-180 text-[#ff2a5f]" : ""
                    }`}
                  />
                </button>
                {openAccordion === "spec-5" && (
                  <div className="p-4 pt-1 text-xs text-zinc-300 font-sans space-y-1.5 border-t border-[#1c1c28] text-[11px]">
                    <div>• Machine wash cold (30°C) inside-out with like colors.</div>
                    <div>• Line dry in shade to preserve silicone puff volume.</div>
                    <div>• Do NOT iron directly over 3D puff graphics or 3M tape.</div>
                    <div>• Do not bleach or dry clean.</div>
                  </div>
                )}
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
              VIEW ALL PIECES ❯
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
                  <div className="text-[11px] text-zinc-400">{formatPrice(rel.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Luxury Sticky Bottom Quick-Buy HUD Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c14]/95 backdrop-blur-md border-t border-[#222234] py-3 px-4 transition-transform duration-300 shadow-2xl ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-black border border-[#27273a] shrink-0">
              <img src={product.imageFront} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-mono truncate max-w-[200px] sm:max-w-xs">
                {product.name}
              </h4>
              <div className="text-[11px] text-[#ff2a5f] font-mono font-bold">
                {formatPrice(product.price)}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Size Pills */}
            <div className="hidden sm:flex items-center space-x-1">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    playUiClick();
                    setSelectedSize(s);
                  }}
                  className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${
                    selectedSize === s
                      ? "bg-[#ff2a5f] text-white"
                      : "bg-[#181826] text-zinc-400 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Quick Add Button */}
            {isSoldOut ? (
              <button
                onClick={() => setIsResupplyOpen(true)}
                className="px-4 py-2 bg-red-950 text-red-300 border border-red-800 text-xs font-bold rounded-lg uppercase font-mono"
              >
                JOIN RADAR
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="px-5 py-2.5 bg-[#ff2a5f] hover:bg-[#ff1f58] text-white text-xs font-bold rounded-lg uppercase tracking-wider font-mono shadow-lg shadow-[#ff2a5f]/25 flex items-center space-x-1.5 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isAdded ? "ADDED" : "SECURE PIECE"}</span>
              </button>
            )}
          </div>
        </div>
      </div>

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

      <HolographicNfcCard
        product={product}
        isOpen={isNfcOpen}
        onClose={() => setIsNfcOpen(false)}
      />

      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <AudioDeck />
      <Footer />
    </div>
  );
}
