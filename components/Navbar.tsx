"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Search, X, Menu, Flame, ShieldCheck, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

interface NavbarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { toggleCartDrawer, totalItems } = useCartStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { label: "ALL PIECES", value: "All" },
    { label: "HOODIES", value: "Hoodies" },
    { label: "OVERSIZED TEES", value: "Tees" },
    { label: "OUTERWEAR", value: "Outerwear" },
    { label: "ACCESSORIES", value: "Accessories" },
  ];

  const itemCount = mounted ? totalItems() : 0;

  return (
    <>
      {/* Top Drop Announcement Bar */}
      <div className="bg-[#0b0b10] border-b border-[#1f1f2e] text-[11px] font-mono tracking-widest text-zinc-400 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ff2a5f] animate-ping" />
            <span className="text-[#ff2a5f] font-semibold tracking-wider">DROP RADAR:</span>
            <span className="hidden sm:inline text-zinc-300">LIMITED DROP VOL. 04 NOW LIVE</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400 hidden md:inline">FREE EXPRESS SHIPPING OVER $100</span>
          </div>

          <div className="flex items-center space-x-4 text-[10px]">
            <span className="flex items-center text-zinc-400">
              <ShieldCheck className="w-3 h-3 mr-1 text-[#00f0ff]" />
              AUTHENTIC 380+ GSM
            </span>
            <span className="hidden sm:inline text-zinc-500">SHIBUYA, TOKYO</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#08080b]/90 backdrop-blur-md border-b border-[#1c1c28] shadow-2xl py-3"
            : "bg-[#08080b]/70 backdrop-blur-sm border-b border-[#161622] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                onSelectCategory("All");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center space-x-2 group text-left"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-[#ff2a5f] to-[#791530] rounded-sm flex items-center justify-center font-bold text-white shadow-lg shadow-[#ff2a5f]/20 group-hover:scale-105 transition-transform">
                <span className="font-mono text-base tracking-tighter">禅</span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-black text-xl tracking-[0.2em] text-white">
                    ZENJI
                  </span>
                  <span className="text-xs font-light text-[#ff2a5f] tracking-widest">
                    禅路
                  </span>
                </div>
                <p className="text-[9px] tracking-widest text-zinc-500 uppercase font-mono">
                  Cyberpunk Streetwear
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center space-x-1 bg-[#101017]/80 border border-[#1f1f2e] p-1 rounded-full">
            {categories.map((cat) => {
              const active = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => {
                    onSelectCategory(cat.value);
                    const catalogEl = document.getElementById("catalog");
                    if (catalogEl) {
                      catalogEl.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-200 ${
                    active
                      ? "bg-[#ff2a5f] text-white shadow-md shadow-[#ff2a5f]/25 font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Search & Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-[#13131c] border border-[#ff2a5f]/50 rounded-full px-3 py-1.5 text-xs w-48 sm:w-64 transition-all">
                  <Search className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search drops, print, gsm..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    autoFocus
                    className="bg-transparent text-white focus:outline-none w-full placeholder-zinc-500 font-mono text-[11px]"
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      onSearchChange("");
                    }}
                    className="text-zinc-400 hover:text-white ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-10 h-10 rounded-full bg-[#12121a] hover:bg-[#1a1a26] border border-[#232333] flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                  aria-label="Search items"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => toggleCartDrawer(true)}
              className="relative flex items-center space-x-2 bg-[#12121a] hover:bg-[#1a1a28] border border-[#28283a] hover:border-[#ff2a5f]/50 px-3.5 py-2 rounded-full text-zinc-200 transition-all group"
            >
              <ShoppingBag className="w-4 h-4 text-[#ff2a5f] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono font-medium hidden sm:inline">CART</span>
              <span className="w-5 h-5 bg-[#ff2a5f] text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-md shadow-[#ff2a5f]/30">
                {itemCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-[#12121a] border border-[#232333] flex items-center justify-center text-zinc-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1a1a27] bg-[#0d0d14] px-4 pt-3 pb-6 mt-3 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-3 py-1">
                Collections // Drop Vol. 04
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    onSelectCategory(cat.value);
                    setMobileMenuOpen(false);
                    const catalogEl = document.getElementById("catalog");
                    if (catalogEl) {
                      catalogEl.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`text-left px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider transition-colors flex items-center justify-between ${
                    activeCategory === cat.value
                      ? "bg-[#ff2a5f]/15 text-[#ff2a5f] font-bold border border-[#ff2a5f]/30"
                      : "text-zinc-300 hover:bg-zinc-800/40"
                  }`}
                >
                  <span>{cat.label}</span>
                  {activeCategory === cat.value && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a5f]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
