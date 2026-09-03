"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { ProductItem } from "./FitMatrixModal";
import { SlidersHorizontal, ArrowUpDown, Flame, PackageX, Sparkles } from "lucide-react";

interface ProductGridProps {
  products: ProductItem[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenFitMatrix: (product: ProductItem) => void;
}

export default function ProductGrid({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenFitMatrix,
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState<"featured" | "price_asc" | "price_desc" | "stock">(
    "featured"
  );

  const categories = [
    { label: "ALL", value: "All" },
    { label: "HOODIES", value: "Hoodies" },
    { label: "TEES", value: "Tees" },
    { label: "OUTERWEAR", value: "Outerwear" },
    { label: "ACCESSORIES", value: "Accessories" },
  ];

  // Filtering by category and search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        activeCategory === "All" || p.category.toLowerCase() === activeCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.japaneseTitle?.toLowerCase().includes(q) ||
        p.printType.toLowerCase().includes(q) ||
        p.gsmRating.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [products, activeCategory, searchQuery]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "stock") {
      list.sort((a, b) => a.stock - b.stock);
    } else {
      // featured first, then id
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#1c1c2b] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#ff2a5f] tracking-widest uppercase">
            <Flame className="w-3.5 h-3.5" />
            <span>DROP VOL. 04 CATALOG</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400">SHIBUYA HARVEST</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white uppercase mt-1">
            ARCHIVE RELEASES & HARDWARE
          </h2>
        </div>

        {/* Status Count */}
        <div className="text-xs font-mono text-zinc-400 flex items-center space-x-3">
          <span className="bg-[#12121b] border border-[#232333] px-3 py-1.5 rounded-full">
            SHOWING <strong className="text-white">{sortedProducts.length}</strong> OF {products.length} PIECES
          </span>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#0f0f16] p-1.5 rounded-xl border border-[#1e1e2d] w-full lg:w-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
                  isActive
                    ? "bg-[#ff2a5f] text-white font-bold shadow-md shadow-[#ff2a5f]/20"
                    : "text-zinc-400 hover:text-white hover:bg-[#161622]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2 w-full lg:w-auto justify-end">
          <span className="text-xs font-mono text-zinc-500 hidden sm:inline">SORT BY:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#12121b] border border-[#242436] hover:border-[#ff2a5f]/40 text-xs font-mono text-zinc-200 py-2 pl-3 pr-8 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#ff2a5f]"
            >
              <option value="featured">Featured Drops</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="stock">Lowest Stock First</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenFitMatrix={onOpenFitMatrix}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#0f0f16] border border-[#20202e] rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto text-zinc-500">
            <PackageX className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold font-mono text-white">NO PIECES MATCH YOUR QUERY</h3>
            <p className="text-xs text-zinc-400 font-mono">
              We couldn&apos;t find items matching &quot;{searchQuery}&quot; in {activeCategory}.
            </p>
          </div>
          <button
            onClick={() => {
              onSelectCategory("All");
              onSearchChange("");
            }}
            className="px-4 py-2 bg-[#ff2a5f] text-white text-xs font-mono font-bold rounded-lg hover:bg-[#ff1f58] transition-colors"
          >
            RESET ALL FILTERS
          </button>
        </div>
      )}
    </section>
  );
}
