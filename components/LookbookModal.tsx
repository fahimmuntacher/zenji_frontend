"use client";

import React, { useState, useMemo } from "react";
import { X, Sparkles, Sliders, ShoppingBag, Eye, Check, Camera, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { ProductItem } from "@/types/product";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { playUiClick, playSuccessChime } from "@/lib/audio";

interface LookbookItem {
  id: string;
  modelName: string;
  location: string;
  height: string;
  heightCm: number;
  weight: string;
  weightKg: number;
  sizeWorn: string;
  fitStyle: string;
  quote: string;
  imageUrl: string;
  primaryProductId: string;
  accessoryId?: string;
}

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  onOpenProductFit: (product: ProductItem) => void;
}

export default function LookbookModal({
  isOpen,
  onClose,
  products,
  onOpenProductFit,
}: LookbookModalProps) {
  const [heightFilter, setHeightFilter] = useState<"all" | "short" | "medium" | "tall">("all");
  const [addedLooks, setAddedLooks] = useState<Record<string, boolean>>({});

  const { addItem } = useCartStore();

  useEscapeKey(isOpen, onClose);

  if (!isOpen) return null;

  const looks: LookbookItem[] = [
    {
      id: "look-01",
      modelName: "Ren Takahashi",
      location: "Center-gai, Shibuya",
      height: "5'10\" (178 cm)",
      heightCm: 178,
      weight: "163 lbs (74 kg)",
      weightKg: 74,
      sizeWorn: "Size L (Boxy Drape)",
      fitStyle: "Tokyo Cyber Drop Shoulder",
      quote: "The 450 GSM weight doesn't collapse on shoulders; it creates a clean, architectural silhouette under night lights.",
      imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      primaryProductId: "zenji-01",
      accessoryId: "zenji-07",
    },
    {
      id: "look-02",
      modelName: "Aoi Minami",
      location: "Cat Street, Harajuku",
      height: "5'5\" (165 cm)",
      heightCm: 165,
      weight: "119 lbs (54 kg)",
      weightKg: 54,
      sizeWorn: "Size M (Oversized)",
      fitStyle: "Boxy Oversized Fit",
      quote: "Wearing the Kaiju Tee in Size M gives the exact cropped-boxy aesthetic without drowning my frame.",
      imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      primaryProductId: "zenji-02",
    },
    {
      id: "look-03",
      modelName: "Kenzo Sato",
      location: "Miyashita Park Deck",
      height: "6'1\" (185 cm)",
      heightCm: 185,
      weight: "185 lbs (84 kg)",
      weightKg: 84,
      sizeWorn: "Size XL (Drop Shoulder)",
      fitStyle: "Tokyo Cyber Drop Shoulder",
      quote: "The tactical bomber paired with the 3D puff hoodie has genuine wind-resistance. The Fidlock buckle is heavy hardware.",
      imageUrl: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
      primaryProductId: "zenji-03",
      accessoryId: "zenji-08",
    },
    {
      id: "look-04",
      modelName: "Yuki Tanaka",
      location: "Akihabara Radiokaikan",
      height: "5'8\" (172 cm)",
      heightCm: 172,
      weight: "145 lbs (66 kg)",
      weightKg: 66,
      sizeWorn: "Size L (Drape)",
      fitStyle: "Boxy Oversized Fit",
      quote: "The purple evangelist dye with Tatami kanji embroidery catches high-contrast flash. Size L was spot on.",
      imageUrl: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
      primaryProductId: "zenji-04",
    },
  ];

  const filteredLooks = useMemo(() => {
    return looks.filter((l) => {
      if (heightFilter === "short") return l.heightCm < 170;
      if (heightFilter === "medium") return l.heightCm >= 170 && l.heightCm <= 180;
      if (heightFilter === "tall") return l.heightCm > 180;
      return true;
    });
  }, [looks, heightFilter]);

  if (!isOpen) return null;

  const handleAddLookToCart = (look: LookbookItem) => {
    playUiClick();
    const product = products.find((p) => p.id === look.primaryProductId);
    if (!product) return;

    const chosenSize = look.sizeWorn.split(" ")[1]?.replace(/[^A-Z]/g, "") || "L";

    addItem({
      id: product.id,
      name: product.name,
      japaneseTitle: product.japaneseTitle,
      price: product.price,
      size: chosenSize,
      imageFront: product.imageFront,
      printType: product.printType,
      gsmRating: product.gsmRating,
    });

    playSuccessChime();
    setAddedLooks((prev) => ({ ...prev, [look.id]: true }));
    setTimeout(() => {
      setAddedLooks((prev) => ({ ...prev, [look.id]: false }));
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tokyo Street Cam Lookbook"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-5xl bg-[#0d0d14] border border-[#262638] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#12121b] border-b border-[#222234] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-[#ff2a5f]/20 flex items-center justify-center text-[#ff2a5f] border border-[#ff2a5f]/30">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                  TOKYO STREET CAM // COMMUNITY LOOKBOOK
                </h3>
                <span className="text-[10px] bg-[#00f0ff]/15 text-[#00f0ff] px-2 py-0.5 rounded font-mono border border-[#00f0ff]/30">
                  REAL BODY DATA
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                Streetwear fit validation with real model heights, weights, and sizing drape.
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

        {/* Height Filter Toolbar */}
        <div className="px-5 py-3 bg-[#0a0a10] border-b border-[#1c1c28] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="text-zinc-500 text-[11px]">FILTER MODEL STATS:</span>
            <div className="flex items-center space-x-1.5">
              {[
                { id: "all", label: "ALL HEIGHTS" },
                { id: "short", label: "< 170 CM (5'7\")" },
                { id: "medium", label: "170-180 CM (5'7\"-5'11\")" },
                { id: "tall", label: "> 180 CM (6'0\"+)" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => {
                    playUiClick();
                    setHeightFilter(btn.id as any);
                  }}
                  className={`px-3 py-1 rounded text-[11px] transition-colors ${
                    heightFilter === btn.id
                      ? "bg-[#ff2a5f] text-white font-bold"
                      : "bg-[#141420] text-zinc-400 hover:text-white"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <span className="text-zinc-500 text-[10px]">
            SHOWING {filteredLooks.length} ARCHIVE SNAPS
          </span>
        </div>

        {/* Lookbook Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLooks.map((look) => {
            const product = products.find((p) => p.id === look.primaryProductId);
            const isAdded = addedLooks[look.id];

            return (
              <div
                key={look.id}
                className="bg-[#111119] border border-[#212132] hover:border-[#ff2a5f]/40 rounded-xl overflow-hidden flex flex-col justify-between transition-colors shadow-lg"
              >
                {/* Photo & Model Stats Overlay */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <img
                    src={look.imageUrl}
                    alt={look.modelName}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />

                  {/* Top Stats Tag */}
                  <div className="absolute top-3 left-3 bg-[#08080c]/85 backdrop-blur-md px-3 py-1 rounded border border-[#2a2a3e] text-[10px] font-mono text-white flex items-center space-x-2">
                    <User className="w-3 h-3 text-[#00f0ff]" />
                    <span>{look.modelName}</span>
                    <span className="text-zinc-500">//</span>
                    <span className="text-zinc-300">{look.location}</span>
                  </div>

                  {/* Dimension Pills */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 font-mono text-[9px]">
                    <span className="bg-black/85 backdrop-blur-sm px-2 py-0.5 rounded text-[#00f0ff] border border-[#00f0ff]/30 font-bold">
                      HEIGHT: {look.height}
                    </span>
                    <span className="bg-black/85 backdrop-blur-sm px-2 py-0.5 rounded text-[#ff2a5f] border border-[#ff2a5f]/30 font-bold">
                      WEIGHT: {look.weight}
                    </span>
                    <span className="bg-white text-black font-bold px-2 py-0.5 rounded">
                      {look.sizeWorn}
                    </span>
                  </div>
                </div>

                {/* Card Content & Action */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-zinc-300 italic font-sans border-l-2 border-[#ff2a5f] pl-2.5">
                    &quot;{look.quote}&quot;
                  </p>

                  {product && (
                    <div className="bg-[#151522] border border-[#252538] p-3 rounded-lg flex items-center justify-between font-mono text-xs">
                      <div>
                        <div className="font-bold text-white line-clamp-1">{product.name}</div>
                        <div className="text-[10px] text-zinc-400">
                          ${product.price} USD · {product.gsmRating}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            playUiClick();
                            onClose();
                            onOpenProductFit(product);
                          }}
                          className="px-2.5 py-1 rounded bg-[#1c1c2b] hover:bg-[#28283e] text-zinc-300 hover:text-white text-[10px] border border-[#2d2d42]"
                          title="Open in Fit Matrix"
                        >
                          <Sliders className="w-3 h-3 text-[#00f0ff]" />
                        </button>

                        <button
                          onClick={() => handleAddLookToCart(look)}
                          className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-wider flex items-center space-x-1 transition-all ${
                            isAdded
                              ? "bg-emerald-600 text-white"
                              : "bg-[#ff2a5f] hover:bg-[#ff1f58] text-white"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>ADDED</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3 h-3" />
                              <span>SHOP FIT</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
