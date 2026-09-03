"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductItem } from "@/types/product";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import FitMatrixModal from "@/components/FitMatrixModal";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import LookbookModal from "@/components/LookbookModal";
import LoadoutBuilder from "@/components/LoadoutBuilder";
import DropGateModal from "@/components/DropGateModal";
import ResupplyRadarModal from "@/components/ResupplyRadarModal";
import AudioDeck from "@/components/AudioDeck";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { Flame, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CollectionClientProps {
  products: ProductItem[];
}

export default function CollectionClient({ products }: CollectionClientProps) {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFitProduct, setSelectedFitProduct] = useState<ProductItem | null>(null);
  const [resupplyProduct, setResupplyProduct] = useState<ProductItem | null>(null);

  // Modals
  const [isFitMatrixOpen, setIsFitMatrixOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isLoadoutOpen, setIsLoadoutOpen] = useState(false);
  const [isDropGateOpen, setIsDropGateOpen] = useState(false);

  // Features
  const [globalFlashCam, setGlobalFlashCam] = useState(false);
  const [isVipUnlocked, setIsVipUnlocked] = useState(false);

  const { toggleCartDrawer } = useCartStore();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);

    const q = searchParams.get("search");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const handleOpenFitMatrix = (product: ProductItem) => {
    setSelectedFitProduct(product);
    setIsFitMatrixOpen(true);
  };

  const handleOpenFitMatrixGeneral = () => {
    setSelectedFitProduct(products[0] || null);
    setIsFitMatrixOpen(true);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-mono transition-colors duration-500 ${
        globalFlashCam ? "bg-[#050508] text-zinc-100" : "bg-[#08080b] text-white"
      }`}
    >
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

      {/* Collection Header Banner */}
      <section className="border-b border-[#1c1c2b] bg-[#0a0a0f] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex items-center space-x-2 text-xs text-[#ff2a5f] uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            <span>FULL ARCHIVE COLLECTION // DROP VOL. 04</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              ALL RELEASES
            </h1>
            <span className="text-xs text-zinc-400">
              Showing all 8 curated heavyweight garments & tactical hardware
            </span>
          </div>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <main className="flex-1">
        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenFitMatrix={handleOpenFitMatrix}
          onOpenResupplyRadar={(p) => setResupplyProduct(p)}
          onOpenLookbook={() => setIsLookbookOpen(true)}
          onOpenLoadoutBuilder={() => setIsLoadoutOpen(true)}
          onOpenDropGate={() => setIsDropGateOpen(true)}
          globalFlashCam={globalFlashCam}
          onToggleGlobalFlashCam={() => setGlobalFlashCam(!globalFlashCam)}
          isVipUnlocked={isVipUnlocked}
        />
      </main>

      {/* Modals */}
      <FitMatrixModal
        product={selectedFitProduct}
        isOpen={isFitMatrixOpen}
        onClose={() => setIsFitMatrixOpen(false)}
      />

      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        products={products}
        onOpenProductFit={handleOpenFitMatrix}
      />

      <ResupplyRadarModal
        product={resupplyProduct}
        isOpen={!!resupplyProduct}
        onClose={() => setResupplyProduct(null)}
      />

      <LoadoutBuilder
        isOpen={isLoadoutOpen}
        onClose={() => setIsLoadoutOpen(false)}
        products={products}
        onOpenCart={() => toggleCartDrawer(true)}
      />

      <DropGateModal
        isOpen={isDropGateOpen}
        onClose={() => setIsDropGateOpen(false)}
        onUnlocked={() => setIsVipUnlocked(true)}
        isUnlocked={isVipUnlocked}
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
