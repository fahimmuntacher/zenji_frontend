"use client";

import React, { useState } from "react";
import productsData from "@/data/products.json";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import FitMatrixModal, { ProductItem } from "@/components/FitMatrixModal";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import Footer from "@/components/Footer";

export default function StorefrontPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFitProduct, setSelectedFitProduct] = useState<ProductItem | null>(null);
  const [isFitMatrixOpen, setIsFitMatrixOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const products = productsData as unknown as ProductItem[];

  const handleOpenFitMatrix = (product: ProductItem) => {
    setSelectedFitProduct(product);
    setIsFitMatrixOpen(true);
  };

  const handleOpenFitMatrixGeneral = () => {
    // Open for first product by default if triggered from hero
    setSelectedFitProduct(products[0] || null);
    setIsFitMatrixOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08080b] text-white">
      {/* Sticky Header with Cart Count and Search */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero onOpenFitMatrixGeneral={handleOpenFitMatrixGeneral} />

      {/* Main Catalog Grid */}
      <main className="flex-1">
        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenFitMatrix={handleOpenFitMatrix}
        />
      </main>

      {/* Creative Feature: Interactive Fit Matrix Modal */}
      <FitMatrixModal
        product={selectedFitProduct}
        isOpen={isFitMatrixOpen}
        onClose={() => setIsFitMatrixOpen(false)}
      />

      {/* Zustand-Powered Slide-Over Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Mock Checkout Modal with Confetti */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Rich Cyberpunk Footer */}
      <Footer />
    </div>
  );
}
