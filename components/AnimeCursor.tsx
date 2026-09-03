"use client";

import React, { useEffect, useState, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function AnimeCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [slashEffect, setSlashEffect] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const trailRef = useRef<TrailPoint[]>([]);
  const trailId = useRef(0);
  const [, setRenderTrigger] = useState(0);

  useEffect(() => {
    // Only activate on devices with a physical mouse/pointer (not touchscreens)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    let mouseX = -100;
    let mouseY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPos({ x: mouseX, y: mouseY });

      // Add to blade trail
      trailId.current += 1;
      trailRef.current.push({ x: mouseX, y: mouseY, id: trailId.current });
      if (trailRef.current.length > 7) {
        trailRef.current.shift();
      }

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest(
          "a, button, [role='button'], select, input, .cursor-pointer"
        );
        setIsHovered(isClickable);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      // Trigger katana slash flash
      setSlashEffect({ x: e.clientX, y: e.clientY, active: true });
      setTimeout(() => {
        setSlashEffect((prev) => ({ ...prev, active: false }));
      }, 200);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Fade trail loop
    const trailInterval = setInterval(() => {
      if (trailRef.current.length > 0) {
        trailRef.current.shift();
        setRenderTrigger((r) => r + 1);
      }
    }, 45);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      clearInterval(trailInterval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Global CSS to hide default browser cursor on desktop */}
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          *,
          body,
          button,
          a,
          select {
            cursor: none !important;
          }
        }
      `}</style>

      {/* 1. Katana Blade Light Trail (Ghost motion blur) */}
      <div className="fixed inset-0 pointer-events-none z-[999998] overflow-hidden">
        {trailRef.current.map((pt, idx) => {
          const ratio = (idx + 1) / trailRef.current.length;
          const size = ratio * 6 + 2;
          return (
            <div
              key={pt.id}
              className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"
              style={{
                left: `${pt.x}px`,
                top: `${pt.y}px`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: idx % 2 === 0 ? "#00f0ff" : "#ff2a5f",
                opacity: ratio * 0.45,
                boxShadow: `0 0 10px ${idx % 2 === 0 ? "#00f0ff" : "#ff2a5f"}`,
              }}
            />
          );
        })}
      </div>

      {/* 2. Katana Sword Slash Flash Impact on Click */}
      {slashEffect.active && (
        <div
          className="fixed pointer-events-none z-[999999] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${slashEffect.x}px`, top: `${slashEffect.y}px` }}
        >
          {/* Diagonal laser slash line */}
          <div className="w-16 h-0.5 bg-white shadow-[0_0_20px_#00f0ff,0_0_35px_#ff2a5f] transform -rotate-45 animate-ping" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] -translate-x-1 -translate-y-1.5 shadow-[0_0_15px_#00f0ff]" />
        </div>
      )}

      {/* 3. Main Japanese Anime Reticle Cursor */}
      <div
        className="fixed pointer-events-none z-[999999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${
            isClicked ? 0.85 : 1
          })`,
          left: 0,
          top: 0,
        }}
      >
        {/* Outer Anime Targeting Bracket / Shuriken Ring */}
        <div
          className={`relative flex items-center justify-center transition-all duration-300 ${
            isHovered
              ? "w-11 h-11 rotate-45 border border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.6)]"
              : "w-7 h-7 rotate-0 border border-[#ff2a5f]/60"
          } rounded-full`}
        >
          {/* Cyber Corner Crosshairs */}
          <span className="absolute -top-1 w-1 h-1 bg-[#00f0ff] rounded-full" />
          <span className="absolute -bottom-1 w-1 h-1 bg-[#00f0ff] rounded-full" />
          <span className="absolute -left-1 w-1 h-1 bg-[#ff2a5f] rounded-full" />
          <span className="absolute -right-1 w-1 h-1 bg-[#ff2a5f] rounded-full" />

          {/* Center Katana Tip Core */}
          <div
            className={`transition-all duration-200 ${
              isHovered
                ? "w-2.5 h-2.5 bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]"
                : "w-1.5 h-1.5 bg-[#ff2a5f] shadow-[0_0_8px_#ff2a5f]"
            } transform rotate-45`}
          />

          {/* Tiny Japanese Kanji Tag on Hover */}
          {isHovered && (
            <span className="absolute -bottom-4 text-[8px] font-mono text-[#00f0ff] tracking-widest uppercase font-bold select-none bg-black/90 px-1 py-0.2 rounded border border-[#00f0ff]/40">
              斬 LOCK
            </span>
          )}
        </div>
      </div>
    </>
  );
}
