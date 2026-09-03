"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CurrencyCode = "USD" | "AUD" | "JPY" | "EUR" | "GBP";

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
  flag: string;
  name: string;
}

export const CURRENCY_CONFIG: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$", rate: 1.0, flag: "🇺🇸", name: "USD ($)" },
  AUD: { code: "AUD", symbol: "A$", rate: 1.54, flag: "🇦🇺", name: "AUD (A$)" },
  JPY: { code: "JPY", symbol: "¥", rate: 155.0, flag: "🇯🇵", name: "JPY (¥)" },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, flag: "🇪🇺", name: "EUR (€)" },
  GBP: { code: "GBP", symbol: "£", rate: 0.78, flag: "🇬🇧", name: "GBP (£)" },
};

interface CurrencyStore {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;
  convertPrice: (amountInUSD: number) => number;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: "USD",

      setCurrency: (currency) => set({ currency }),

      convertPrice: (amountInUSD) => {
        const info = CURRENCY_CONFIG[get().currency] || CURRENCY_CONFIG.USD;
        if (info.code === "JPY") {
          return Math.round(amountInUSD * info.rate);
        }
        return Math.round(amountInUSD * info.rate * 100) / 100;
      },

      formatPrice: (amountInUSD) => {
        const info = CURRENCY_CONFIG[get().currency] || CURRENCY_CONFIG.USD;
        const converted = get().convertPrice(amountInUSD);
        if (info.code === "JPY") {
          return `${info.symbol}${converted.toLocaleString()}`;
        }
        return `${info.symbol}${converted.toFixed(2)}`;
      },
    }),
    {
      name: "zenji_currency_state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
