import React, { Suspense } from "react";
import type { Metadata } from "next";
import productsData from "@/data/products.json";
import { ProductItem } from "@/types/product";
import CollectionClient from "./CollectionClient";

export const metadata: Metadata = {
  title: "Full Drop Collection // All Releases — ZENJI 禅路",
  description:
    "Browse the complete Drop Vol. 04 collection. Limited-run 450 GSM heavyweight hoodies, 280 GSM oversized tees, and tactical outerwear. No restocks. Ever.",
};

export default function CollectionPage() {
  const products = productsData as unknown as ProductItem[];

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08080b]" />}>
      <CollectionClient products={products} />
    </Suspense>
  );
}
