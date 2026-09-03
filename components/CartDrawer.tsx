"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export default function CartDrawer({ onProceedToCheckout }: CartDrawerProps) {
  const {
    items,
    isOpen,
    toggleCartDrawer,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const currentSubtotal = subtotal();
  const shippingThreshold = 100;
  const isFreeShipping = currentSubtotal >= shippingThreshold;
  const amountNeeded = Math.max(0, shippingThreshold - currentSubtotal);
  const progressPercent = Math.min(100, (currentSubtotal / shippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={() => toggleCartDrawer(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-[#0d0d14] border-l border-[#232334] shadow-2xl flex flex-col h-full z-10 animate-slideLeft">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1f1f2d] flex items-center justify-between bg-[#11111a]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#ff2a5f]/15 border border-[#ff2a5f]/30 flex items-center justify-center text-[#ff2a5f]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                DROP CART ({totalItems()} PIECES)
              </h2>
              <p className="text-[10px] font-mono text-zinc-500">ZENJI ARCHIVE SYSTEM</p>
            </div>
          </div>

          <button
            onClick={() => toggleCartDrawer(false)}
            className="w-8 h-8 rounded-full bg-[#181824] hover:bg-[#252538] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-[#12121c] border-b border-[#1f1f2d] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center text-zinc-300">
              <Truck className="w-3.5 h-3.5 mr-1.5 text-[#00f0ff]" />
              {isFreeShipping ? (
                <span className="text-[#00f0ff] font-bold">FREE EXPRESS SHIPPING UNLOCKED!</span>
              ) : (
                <span>
                  ADD <strong className="text-[#ff2a5f]">${amountNeeded.toFixed(2)}</strong> FOR FREE SHIPPING
                </span>
              )}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">
              ${currentSubtotal.toFixed(0)} / ${shippingThreshold}
            </span>
          </div>

          <div className="w-full bg-[#1c1c2b] h-2 rounded-full overflow-hidden p-0.5 border border-[#2b2b3d]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFreeShipping
                  ? "bg-gradient-to-r from-[#00f0ff] to-[#3b82f6]"
                  : "bg-gradient-to-r from-[#ff2a5f] to-[#ff6b8b]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#14141e] border border-[#242436] flex items-center justify-center text-zinc-600">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold font-mono text-zinc-300">YOUR CART IS EMPTY</p>
                <p className="text-xs text-zinc-500 font-mono">
                  Explore Drop Vol. 04 to secure limited pieces.
                </p>
              </div>
              <button
                onClick={() => toggleCartDrawer(false)}
                className="mt-2 px-5 py-2.5 bg-[#ff2a5f] hover:bg-[#ff1f58] text-white text-xs font-mono font-bold rounded transition-all"
              >
                START BROWSING
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex space-x-3 bg-[#12121b] border border-[#20202e] p-3 rounded-xl hover:border-zinc-700 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 rounded-lg bg-black/40 overflow-hidden shrink-0 border border-[#262638]">
                  <img
                    src={item.imageFront}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-bold font-mono text-white line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-zinc-500 hover:text-red-400 transition-colors ml-2"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 text-[10px] font-mono">
                      <span className="bg-[#1c1c2b] border border-[#2d2d42] px-2 py-0.5 rounded text-white font-bold">
                        SIZE: {item.size}
                      </span>
                      {item.printType && (
                        <span className="text-zinc-500 truncate max-w-[140px]">
                          {item.printType}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-1.5 bg-[#181824] border border-[#262638] rounded-md p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#252538] rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold text-white px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#252538] rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        ${item.price} each
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#11111a] border-t border-[#20202e] space-y-3">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>SUBTOTAL</span>
                <span className="text-white font-semibold">${currentSubtotal.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>ESTIMATED SHIPPING</span>
                <span className={isFreeShipping ? "text-[#00f0ff] font-bold" : "text-white"}>
                  {isFreeShipping ? "FREE EXPRESS" : "$14.00 USD"}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>TAXES & TOKYO DUTIES</span>
                <span className="text-zinc-500">Calculated at Checkout</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#1f1f2e]">
                <span>TOTAL</span>
                <span className="text-[#ff2a5f] font-mono">
                  ${(currentSubtotal + (isFreeShipping ? 0 : 14)).toFixed(2)} USD
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                toggleCartDrawer(false);
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 bg-[#ff2a5f] hover:bg-[#ff1b53] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-lg shadow-xl shadow-[#ff2a5f]/25 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-zinc-500 pt-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>ENCRYPTED TOKYO CHECKOUT // 100% SATISFACTION</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
