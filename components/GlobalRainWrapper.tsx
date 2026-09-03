"use client";

import React, { useEffect, useState } from "react";
import ShibuyaRain from "./ShibuyaRain";
import { useRainStore } from "@/store/useRainStore";

export default function GlobalRainWrapper() {
  const [mounted, setMounted] = useState(false);
  const { isRainActive } = useRainStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ShibuyaRain isActive={isRainActive} />;
}
