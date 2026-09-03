"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import productsData from "@/data/products.json";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import FitMatrixModal from "@/components/FitMatrixModal";
import { ProductItem } from "@/types/product";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import LookbookModal from "@/components/LookbookModal";
import LoadoutBuilder from "@/components/LoadoutBuilder";
import DropGateModal from "@/components/DropGateModal";
import ResupplyRadarModal from "@/components/ResupplyRadarModal";
import AnimeBootloader from "@/components/AnimeBootloader";
import AudioDeck from "@/components/AudioDeck";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";

function StorefrontContent() {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFitProduct, setSelectedFitProduct] = useState<ProductItem | null>(null);
  const [resupplyProduct, setResupplyProduct] = useState<ProductItem | null>(null);

  // Modals & Drawers
  const [isFitMatrixOpen, setIsFitMatrixOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isLoadoutOpen, setIsLoadoutOpen] = useState(false);
  const [isDropGateOpen, setIsDropGateOpen] = useState(false);

  // Global Features
  const [globalFlashCam, setGlobalFlashCam] = useState(false);
  const [isVipUnlocked, setIsVipUnlocked] = useState(false);

  const { toggleCartDrawer } = useCartStore();
  const products = productsData as unknown as ProductItem[];

  // Sync category or search query from URL search parameters (e.g. from /products/[id])
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat);
      const catalogEl = document.getElementById("catalog");
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: "smooth" });
      }
    }
    const q = searchParams.get("search");
    if (q) {
      setSearchQuery(q);
      const catalogEl = document.getElementById("catalog");
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams]);

  const handleOpenFitMatrix = (product: ProductItem) => {
    setSelectedFitProduct(product);
    setIsFitMatrixOpen(true);
  };

  const handleOpenFitMatrixGeneral = () => {
    setSelectedFitProduct(products[0] || null);
    setIsFitMatrixOpen(true);
  };

  const handleOpenResupplyRadar = (product: ProductItem) => {
    setResupplyProduct(product);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        globalFlashCam ? "bg-[#050508] text-zinc-100" : "bg-[#08080b] text-white"
      }`}
    >
      {/* Global Anime Bootloader Sequence */}
      <AnimeBootloader />

      {/* Sticky Header with Cart Count, Search, & Navigation */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenLookbook={() => setIsLookbookOpen(true)}
        onOpenLoadoutBuilder={() => setIsLoadoutOpen(true)}
        onOpenDropGate={() => setIsDropGateOpen(true)}
        globalFlashCam={globalFlashCam}
        onToggleGlobalFlashCam={() => setGlobalFlashCam(!globalFlashCam)}
        isVipUnlocked={isVipUnlocked}
      />

      {/* Hero Section */}
      <Hero
        onOpenFitMatrixGeneral={handleOpenFitMatrixGeneral}
        onOpenLookbook={() => setIsLookbookOpen(true)}
        onOpenLoadoutBuilder={() => setIsLoadoutOpen(true)}
      />

      {/* Main Catalog Grid */}
      <main className="flex-1">
        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenFitMatrix={handleOpenFitMatrix}
          onOpenResupplyRadar={handleOpenResupplyRadar}
          onOpenLookbook={() => setIsLookbookOpen(true)}
          onOpenLoadoutBuilder={() => setIsLoadoutOpen(true)}
          onOpenDropGate={() => setIsDropGateOpen(true)}
          globalFlashCam={globalFlashCam}
          onToggleGlobalFlashCam={() => setGlobalFlashCam(!globalFlashCam)}
          isVipUnlocked={isVipUnlocked}
        />
      </main>

      {/* Feature 1 & PRD: Interactive Fit Matrix Modal & Print Inspector */}
      <FitMatrixModal
        product={selectedFitProduct}
        isOpen={isFitMatrixOpen}
        onClose={() => setIsFitMatrixOpen(false)}
      />

      {/* Feature 2: Tokyo Street Cam Community Lookbook */}
      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        products={products}
        onOpenProductFit={handleOpenFitMatrix}
      />

      {/* Feature 3: Re-Supply Radar for Sold Out & Scarce Pieces */}
      <ResupplyRadarModal
        product={resupplyProduct}
        isOpen={!!resupplyProduct}
        onClose={() => setResupplyProduct(null)}
      />

      {/* Feature 4: Cyber Loadout 3-Piece Outfit Builder */}
      <LoadoutBuilder
        isOpen={isLoadoutOpen}
        onClose={() => setIsLoadoutOpen(false)}
        products={products}
        onOpenCart={() => toggleCartDrawer(true)}
      />

      {/* Feature 5: VIP Drop Gate & Anti-Bot Anime Cipher */}
      <DropGateModal
        isOpen={isDropGateOpen}
        onClose={() => setIsDropGateOpen(false)}
        onUnlocked={() => setIsVipUnlocked(true)}
        isUnlocked={isVipUnlocked}
      />

      {/* Zustand-Powered Slide-Over Cart Drawer */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

      {/* Mock Checkout Modal with Confetti */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Feature 7: Shibuya Midnight Radio Deck & Ambient Drone */}
      <AudioDeck />

      {/* Rich Cyberpunk Footer */}
      <Footer />
    </div>
  );
}

export default function StorefrontPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08080b]" />}>
      <StorefrontContent />
    </Suspense>
  );
}
