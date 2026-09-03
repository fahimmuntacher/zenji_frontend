"use client";

import React, { useState, useMemo } from "react";
import { X, Check, Ruler, Sparkles, Sliders, ShieldCheck, ShoppingBag, Eye } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export interface MeasurementDetail {
  chest: string;
  length: string;
  shoulder: string;
}

export interface ProductItem {
  id: string;
  name: string;
  japaneseTitle?: string;
  price: number;
  category: string;
  sizes: string[];
  printType: string;
  gsmRating: string;
  fitType: string;
  stock: number;
  featured?: boolean;
  description: string;
  printDetails?: string;
  measurements?: Record<string, MeasurementDetail | undefined>;
  imageFront: string;
  imageBack: string;
}

interface FitMatrixModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddedToCart?: () => void;
}

export default function FitMatrixModal({
  product,
  isOpen,
  onClose,
  onAddedToCart,
}: FitMatrixModalProps) {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  // Metric: cm & kg | Imperial: inches & lbs
  const [heightCm, setHeightCm] = useState(178); // ~5'10"
  const [weightKg, setWeightKg] = useState(74); // ~163 lbs
  const [preferredFit, setPreferredFit] = useState<"regular" | "boxy" | "tokyo_cyber">(
    "boxy"
  );
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [activeTab, setActiveTab] = useState<"fit" | "print_inspector">("fit");

  const { addItem } = useCartStore();

  // Convert for imperial display
  const heightFeetInches = useMemo(() => {
    const totalInches = heightCm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}'${inches}"`;
  }, [heightCm]);

  const weightLbs = useMemo(() => Math.round(weightKg * 2.20462), [weightKg]);

  // Recommendation algorithm based on user measurements & fit preference
  const calculatedRecommendation = useMemo(() => {
    // Base sizing on BMI/Height index
    let sizeIndex = 1; // 0=S, 1=M, 2=L, 3=XL, 4=XXL

    if (heightCm < 168 && weightKg < 63) {
      sizeIndex = 0; // S
    } else if (heightCm < 176 && weightKg < 73) {
      sizeIndex = 1; // M
    } else if (heightCm < 184 && weightKg < 84) {
      sizeIndex = 2; // L
    } else if (heightCm < 192 && weightKg < 96) {
      sizeIndex = 3; // XL
    } else {
      sizeIndex = 4; // XXL
    }

    // Modify based on fit preference
    if (preferredFit === "regular") {
      // Keep closer to true size
      sizeIndex = Math.max(0, sizeIndex - 1);
    } else if (preferredFit === "tokyo_cyber") {
      // Oversized drape + drop shoulder
      sizeIndex = Math.min(4, sizeIndex + 1);
    }

    const sizeLabels = ["S", "M", "L", "XL", "XXL"];
    const recommended = sizeLabels[sizeIndex] || "L";

    // Check available sizes in product
    const isAvailable = product?.sizes?.includes(recommended);
    return {
      size: recommended,
      isAvailable,
      fitDescription:
        preferredFit === "tokyo_cyber"
          ? "Ultra-dropped shoulder drape with boxy torso profile. Authentic Harajuku silhouette."
          : preferredFit === "boxy"
          ? "Modern streetwear relaxed cut with comfortable chest volume and structured drape."
          : "Tailored streetwear drape without excess bulk, sitting clean on shoulders.",
    };
  }, [heightCm, weightKg, preferredFit, product]);

  // Auto-sync selectedSize when recommendation changes if user hasn't explicitly overridden
  React.useEffect(() => {
    if (calculatedRecommendation.size) {
      setSelectedSize(calculatedRecommendation.size);
    }
  }, [calculatedRecommendation.size]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addItem({
      id: product.id,
      name: product.name,
      japaneseTitle: product.japaneseTitle,
      price: product.price,
      size: selectedSize,
      imageFront: product.imageFront,
      printType: product.printType,
      gsmRating: product.gsmRating,
    });
    onClose();
    if (onAddedToCart) onAddedToCart();
  };

  const measurements = product.measurements?.[selectedSize] || {
    chest: "124cm",
    length: "71cm",
    shoulder: "58cm",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e0e16] border border-[#262638] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#141420] px-5 py-3.5 border-b border-[#232334] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded bg-[#ff2a5f]/20 border border-[#ff2a5f]/40 flex items-center justify-center text-[#ff2a5f]">
              <Ruler className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                  ZENJI FIT-MATRIX RADAR
                </h3>
                <span className="text-[10px] bg-[#ff2a5f]/15 text-[#ff2a5f] px-2 py-0.5 rounded font-mono border border-[#ff2a5f]/30">
                  AI FIT
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                {product.name} ({product.japaneseTitle})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1c1c2b] hover:bg-[#28283d] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="grid grid-cols-2 bg-[#0a0a10] border-b border-[#1f1f2e] text-xs font-mono">
          <button
            onClick={() => setActiveTab("fit")}
            className={`py-2.5 flex items-center justify-center space-x-2 transition-colors ${
              activeTab === "fit"
                ? "bg-[#141420] text-white border-b-2 border-[#ff2a5f] font-semibold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#ff2a5f]" />
            <span>MEASUREMENT & FIT CALCULATOR</span>
          </button>
          <button
            onClick={() => setActiveTab("print_inspector")}
            className={`py-2.5 flex items-center justify-center space-x-2 transition-colors ${
              activeTab === "print_inspector"
                ? "bg-[#141420] text-white border-b-2 border-[#00f0ff] font-semibold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>TACTILE PRINT INSPECTOR</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm">
          {activeTab === "fit" ? (
            <>
              {/* Unit Toggle & Sliders */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                    1. Input Your Body Metrics
                  </span>
                  <div className="bg-[#181824] border border-[#2b2b3d] p-0.5 rounded flex items-center font-mono text-[10px]">
                    <button
                      onClick={() => setUnit("metric")}
                      className={`px-2 py-1 rounded transition-colors ${
                        unit === "metric" ? "bg-[#ff2a5f] text-white font-bold" : "text-zinc-400"
                      }`}
                    >
                      METRIC (CM/KG)
                    </button>
                    <button
                      onClick={() => setUnit("imperial")}
                      className={`px-2 py-1 rounded transition-colors ${
                        unit === "imperial" ? "bg-[#ff2a5f] text-white font-bold" : "text-zinc-400"
                      }`}
                    >
                      IMPERIAL (FT/LBS)
                    </button>
                  </div>
                </div>

                {/* Height Slider */}
                <div className="bg-[#12121b] border border-[#20202e] p-3.5 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">YOUR HEIGHT:</span>
                    <span className="text-white font-bold bg-[#1d1d2b] px-2 py-0.5 rounded text-sm text-[#00f0ff]">
                      {unit === "metric" ? `${heightCm} cm` : heightFeetInches}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={155}
                    max={205}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#232334] rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>155 cm (5&apos;1&quot;)</span>
                    <span>180 cm (5&apos;11&quot;)</span>
                    <span>205 cm (6&apos;9&quot;)</span>
                  </div>
                </div>

                {/* Weight Slider */}
                <div className="bg-[#12121b] border border-[#20202e] p-3.5 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">YOUR WEIGHT:</span>
                    <span className="text-white font-bold bg-[#1d1d2b] px-2 py-0.5 rounded text-sm text-[#ff2a5f]">
                      {unit === "metric" ? `${weightKg} kg` : `${weightLbs} lbs`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={48}
                    max={125}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#232334] rounded-lg appearance-none cursor-pointer accent-[#ff2a5f]"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>48 kg (105 lbs)</span>
                    <span>85 kg (187 lbs)</span>
                    <span>125 kg (275 lbs)</span>
                  </div>
                </div>
              </div>

              {/* Silhouette Aesthetic Preference */}
              <div className="space-y-2.5">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold block">
                  2. Choose Preferred Streetwear Drape
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => setPreferredFit("regular")}
                    className={`p-3 rounded-xl border text-left font-mono transition-all ${
                      preferredFit === "regular"
                        ? "bg-[#ff2a5f]/15 border-[#ff2a5f] text-white"
                        : "bg-[#12121a] border-[#222230] text-zinc-400 hover:border-zinc-600"
                    }`}
                  >
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Regular Fit</span>
                      {preferredFit === "regular" && <Check className="w-3.5 h-3.5 text-[#ff2a5f]" />}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">Clean silhouette, standard torso drop</div>
                  </button>

                  <button
                    onClick={() => setPreferredFit("boxy")}
                    className={`p-3 rounded-xl border text-left font-mono transition-all ${
                      preferredFit === "boxy"
                        ? "bg-[#ff2a5f]/15 border-[#ff2a5f] text-white"
                        : "bg-[#12121a] border-[#222230] text-zinc-400 hover:border-zinc-600"
                    }`}
                  >
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Boxy Oversized</span>
                      {preferredFit === "boxy" && <Check className="w-3.5 h-3.5 text-[#ff2a5f]" />}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">Wide chest cut, classic drop shoulders</div>
                  </button>

                  <button
                    onClick={() => setPreferredFit("tokyo_cyber")}
                    className={`p-3 rounded-xl border text-left font-mono transition-all ${
                      preferredFit === "tokyo_cyber"
                        ? "bg-[#ff2a5f]/15 border-[#ff2a5f] text-white"
                        : "bg-[#12121a] border-[#222230] text-zinc-400 hover:border-zinc-600"
                    }`}
                  >
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Tokyo Cyber</span>
                      {preferredFit === "tokyo_cyber" && <Check className="w-3.5 h-3.5 text-[#ff2a5f]" />}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">Harajuku extreme dropped drape & crop</div>
                  </button>
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="bg-gradient-to-r from-[#171724] to-[#12121b] border border-[#2d2d42] p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#ff2a5f]" />
                    <span className="text-xs font-mono text-zinc-300 font-semibold tracking-wider">
                      RECOMMENDED SIZE:
                    </span>
                  </div>
                  <span className="text-xl font-mono font-black text-white px-3 py-0.5 bg-[#ff2a5f] rounded shadow-md">
                    {calculatedRecommendation.size}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {calculatedRecommendation.fitDescription}
                </p>

                {/* Garment Dimensions for Selected Size */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#232334] text-center font-mono">
                  <div className="bg-[#0e0e16] p-2 rounded">
                    <div className="text-[10px] text-zinc-500">CHEST WIDTH</div>
                    <div className="text-xs font-bold text-white mt-0.5">{measurements.chest}</div>
                  </div>
                  <div className="bg-[#0e0e16] p-2 rounded">
                    <div className="text-[10px] text-zinc-500">BODY LENGTH</div>
                    <div className="text-xs font-bold text-white mt-0.5">{measurements.length}</div>
                  </div>
                  <div className="bg-[#0e0e16] p-2 rounded">
                    <div className="text-[10px] text-zinc-500">SHOULDER SPAN</div>
                    <div className="text-xs font-bold text-white mt-0.5">{measurements.shoulder}</div>
                  </div>
                </div>
              </div>

              {/* Size Buttons to Manual Pick */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-zinc-400">
                  CONFIRM SIZE FOR THIS DROP:
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s;
                    const isRec = calculatedRecommendation.size === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`relative px-4 py-2 font-mono text-xs rounded border transition-all ${
                          isSelected
                            ? "bg-[#ff2a5f] border-[#ff2a5f] text-white font-bold shadow-lg shadow-[#ff2a5f]/25"
                            : "bg-[#14141f] border-[#252538] text-zinc-300 hover:border-zinc-500"
                        }`}
                      >
                        {s}
                        {isRec && (
                          <span className="absolute -top-1.5 -right-1 w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Tactile Print Inspector Tab */
            <div className="space-y-5">
              <div className="flex items-center space-x-3 bg-[#13131c] border border-[#232334] p-3 rounded-xl">
                <div className="w-16 h-16 rounded bg-black/40 overflow-hidden shrink-0 border border-[#2a2a3e]">
                  <img
                    src={product.imageFront}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white">{product.name}</div>
                  <div className="text-[11px] font-mono text-[#00f0ff]">{product.printType}</div>
                  <div className="text-[10px] font-mono text-zinc-500">{product.gsmRating}</div>
                </div>
              </div>

              {/* Texture Analysis Cards */}
              <div className="space-y-3">
                <div className="bg-[#12121b] border border-[#212130] p-4 rounded-xl space-y-1.5">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#ff2a5f]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>PRINT ELEVATION & CURING</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {product.printDetails ||
                      "Ultra-dense 3D tactile silicone elevation cured at 160°C. Resists crack formation, stretching, and fading across 100+ machine cycles."}
                  </p>
                </div>

                <div className="bg-[#12121b] border border-[#212130] p-4 rounded-xl space-y-1.5">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#00f0ff]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>FABRIC WEIGHT & YARN METRICS</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    Constructed with {product.gsmRating}. Pre-shrunk Japanese loopback terry with dense 2-ply ring-spun yarn for maximum drape weight and zero fabric twisting.
                  </p>
                </div>

                <div className="bg-[#12121b] border border-[#212130] p-4 rounded-xl space-y-1.5 text-xs text-zinc-400 font-mono">
                  <div className="font-bold text-zinc-200">CARE INSTRUCTIONS // DROP CODE:</div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-zinc-400">
                    <li>Wash cold inside out (30°C max) to safeguard 3D puff topography.</li>
                    <li>Air dry flat. Do not tumble dry.</li>
                    <li>Do not iron directly on light-reactive 3M or silicone prints.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Add to Cart */}
        <div className="p-4 bg-[#12121c] border-t border-[#1f1f2e] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-zinc-500">SELECTED SIZE:</div>
            <div className="text-base font-bold font-mono text-white">
              SIZE {selectedSize}{" "}
              <span className="text-[#ff2a5f] text-sm">(${product.price} USD)</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              CANCEL
            </button>
            <button
              disabled={product.stock <= 0}
              onClick={handleAddToCart}
              className={`flex items-center px-6 py-2.5 rounded text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                product.stock <= 0
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-[#ff2a5f] hover:bg-[#ff1b53] text-white shadow-lg shadow-[#ff2a5f]/30 hover:scale-[1.02]"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 mr-2" />
              {product.stock <= 0 ? "SOLD OUT" : "LOCK IN SIZE & ADD TO CART"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
