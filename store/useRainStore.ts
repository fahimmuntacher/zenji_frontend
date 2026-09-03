"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toggleRainAudio } from "@/lib/audio";

interface RainStore {
  isRainActive: boolean;
  toggleRain: () => void;
  setRain: (active: boolean) => void;
}

export const useRainStore = create<RainStore>()(
  persist(
    (set, get) => ({
      isRainActive: true, // Default ALWAYS ON for the authentic Shibuya cyberpunk atmosphere!

      toggleRain: () => {
        const next = !get().isRainActive;
        set({ isRainActive: next });
        toggleRainAudio(next);
      },

      setRain: (active) => {
        set({ isRainActive: active });
        toggleRainAudio(active);
      },
    }),
    {
      name: "zenji_rain_state_v3", // Version bump ensures fresh default is ON for everyone
      storage: createJSONStorage(() => localStorage),
    }
  )
);
