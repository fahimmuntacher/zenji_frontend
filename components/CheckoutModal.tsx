"use client";

import React, { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { X, ShieldCheck, CheckCircle2, CreditCard, Sparkles, Package, ArrowLeft, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<"checkout" | "processing" | "success">("checkout");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple_pay" | "cyber_pay">("card");
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({
    name: "Hiroshi Sato",
    email: "hiroshi@cyberpunk.io",
    address: "2-21-1 Shibuya, Dogenzaka Heights #402",
    city: "Tokyo",
    postalCode: "150-0043",
    cardNumber: "•••• •••• •••• 2099",
    expiry: "09/29",
    cvc: "808",
  });

  if (!isOpen) return null;

  const currentSubtotal = subtotal();
  const shipping = currentSubtotal >= 100 ? 0 : 14;
  const total = currentSubtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");

    setTimeout(() => {
      const generatedId = `ZENJI-DROP04-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderId(generatedId);
      setStep("success");
      clearCart();

      // Fire confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#ff2a5f", "#00f0ff", "#ffffff", "#8b5cf6"],
        });
      } catch (err) {
        console.error("Confetti error", err);
      }
    }, 1400);
  };

  const handleCloseAndReset = () => {
    setStep("checkout");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0e0e16] border border-[#252538] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#13131e] px-5 py-3.5 border-b border-[#222232] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded bg-[#ff2a5f]/20 flex items-center justify-center text-[#ff2a5f]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                ZENJI DISPATCH CHECKOUT
              </h3>
              <p className="text-[10px] font-mono text-zinc-500">256-BIT SECURE CHANNEL</p>
            </div>
          </div>

          <button
            onClick={handleCloseAndReset}
            className="w-8 h-8 rounded-full bg-[#1c1c2b] hover:bg-[#28283d] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {step === "processing" ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 className="w-10 h-10 text-[#ff2a5f] animate-spin" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold font-mono text-white uppercase">
                  RESERVING DROP BATCH & PROCESSING
                </h4>
                <p className="text-xs font-mono text-zinc-400">
                  Allocating inventory from Shibuya vault...
                </p>
              </div>
            </div>
          ) : step === "success" ? (
            <div className="py-8 flex flex-col items-center text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono bg-[#ff2a5f]/20 text-[#ff2a5f] px-2.5 py-1 rounded border border-[#ff2a5f]/30">
                  DROP PIECE SECURED
                </span>
                <h4 className="text-xl font-mono font-black text-white uppercase pt-2">
                  ORDER CONFIRMED: {orderId}
                </h4>
                <p className="text-xs text-zinc-400 font-mono max-w-md">
                  Confirmation sent to <strong className="text-white">{form.email}</strong>. 
                  Your package will be cut, inspected, and dispatched from Tokyo within 24 hours.
                </p>
              </div>

              {/* Order Specs Card */}
              <div className="w-full bg-[#12121c] border border-[#232334] p-4 rounded-xl text-left space-y-2.5 font-mono text-xs">
                <div className="flex justify-between text-zinc-400 pb-2 border-b border-[#1c1c2b]">
                  <span>DISPATCH ORIGIN</span>
                  <span className="text-white">SHIBUYA, TOKYO (35.6595° N, 139.7004° E)</span>
                </div>
                <div className="flex justify-between text-zinc-400 pb-2 border-b border-[#1c1c2b]">
                  <span>SHIPPING METHOD</span>
                  <span className="text-[#00f0ff]">DHL EXPRESS CYBERTRACK (2-4 DAYS)</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>TOTAL PAID</span>
                  <span className="text-[#ff2a5f] font-bold">${total.toFixed(2)} USD</span>
                </div>
              </div>

              <button
                onClick={handleCloseAndReset}
                className="w-full py-3 bg-[#ff2a5f] hover:bg-[#ff1f58] text-white text-xs font-mono font-bold uppercase rounded-lg shadow-xl shadow-[#ff2a5f]/25 transition-all"
              >
                RETURN TO STOREFRONT
              </button>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 font-semibold uppercase">
                  1. Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`py-2.5 px-3 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                      paymentMethod === "card"
                        ? "bg-[#ff2a5f]/15 border-[#ff2a5f] text-white"
                        : "bg-[#13131d] border-[#222232] text-zinc-400"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-[11px]">CREDIT CARD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("apple_pay")}
                    className={`py-2.5 px-3 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                      paymentMethod === "apple_pay"
                        ? "bg-[#ff2a5f]/15 border-[#ff2a5f] text-white"
                        : "bg-[#13131d] border-[#222232] text-zinc-400"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-[#00f0ff]" />
                    <span className="text-[11px]">APPLE PAY</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cyber_pay")}
                    className={`py-2.5 px-3 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                      paymentMethod === "cyber_pay"
                        ? "bg-[#ff2a5f]/15 border-[#ff2a5f] text-white"
                        : "bg-[#13131d] border-[#222232] text-zinc-400"
                    }`}
                  >
                    <span className="font-bold text-[#ff2a5f]">⚡ CYBER</span>
                    <span className="text-[11px]">CRYPTO / SOL</span>
                  </button>
                </div>
              </div>

              {/* Shipping Address Inputs */}
              <div className="space-y-3">
                <label className="block text-xs font-mono text-zinc-400 font-semibold uppercase">
                  2. Dispatch Destination
                </label>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-1">RECIPIENT NAME</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#12121b] border border-[#242436] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#ff2a5f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#12121b] border border-[#242436] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#ff2a5f]"
                    />
                  </div>
                </div>

                <div className="text-xs font-mono">
                  <label className="block text-[10px] text-zinc-500 mb-1">STREET ADDRESS</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-[#12121b] border border-[#242436] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#ff2a5f]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-1">CITY / PROVINCE</label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-[#12121b] border border-[#242436] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#ff2a5f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-1">POSTAL / ZIP CODE</label>
                    <input
                      type="text"
                      required
                      value={form.postalCode}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                      className="w-full bg-[#12121b] border border-[#242436] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#ff2a5f]"
                    />
                  </div>
                </div>
              </div>

              {/* Order Breakdown Summary */}
              <div className="bg-[#12121c] border border-[#222234] p-4 rounded-xl space-y-2 font-mono text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>ITEMS SUB-TOTAL</span>
                  <span className="text-white">${currentSubtotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>WORLDWIDE EXPRESS</span>
                  <span className={shipping === 0 ? "text-[#00f0ff] font-bold" : "text-white"}>
                    {shipping === 0 ? "FREE" : "$14.00 USD"}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#1f1f2e]">
                  <span>FINAL DROP CHARGE</span>
                  <span className="text-[#ff2a5f] font-mono text-base">${total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#ff2a5f] hover:bg-[#ff1b53] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-lg shadow-xl shadow-[#ff2a5f]/25 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
              >
                PLACE DROP ORDER (${total.toFixed(2)} USD)
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
