"use client";

import React, { useEffect, useRef } from "react";

interface ShibuyaRainProps {
  isActive: boolean;
}

interface Drop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  color: string;
  width: number;
}

interface Splash {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
}

export default function ShibuyaRain({ isActive }: ShibuyaRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Neon drop colors inspired by Shibuya crossing night illumination
    const neonColors = [
      "rgba(0, 240, 255, 0.6)",   // Luminous Cyan
      "rgba(255, 42, 95, 0.5)",   // Neon Crimson
      "rgba(255, 255, 255, 0.45)",// Crisp White
      "rgba(192, 132, 252, 0.45)",// Cyber Purple
    ];

    const dropCount = Math.min(130, Math.floor(width / 13));
    const drops: Drop[] = [];
    const splashes: Splash[] = [];

    // Initialize drops scattered over the whole screen
    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 26 + 18,
        speed: Math.random() * 13 + 11,
        opacity: Math.random() * 0.5 + 0.4,
        color: neonColors[Math.floor(Math.random() * neonColors.length)],
        width: Math.random() * 1.5 + 1.0,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw and update falling raindrops
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];

        // Draw raindrop streak with light angle (-8deg wind)
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 3, d.y + d.length);
        ctx.strokeStyle = d.color;
        ctx.lineWidth = d.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Update position
        d.y += d.speed;
        d.x -= 1.2; // slight wind drift

        // Reset when out of viewport or spawn splash at bottom
        if (d.y > height) {
          // 20% chance of creating a ripple splash at the floor
          if (Math.random() > 0.7 && splashes.length < 35) {
            splashes.push({
              x: d.x,
              y: height - Math.random() * 20,
              radius: 1,
              maxRadius: Math.random() * 12 + 8,
              opacity: 0.6,
              color: d.color,
            });
          }

          d.y = -d.length;
          d.x = Math.random() * (width + 100);
        }
      }

      // 2. Draw and update ripples / splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        ctx.beginPath();
        ctx.ellipse(s.x, s.y, s.radius * 2, s.radius * 0.7, 0, 0, Math.PI * 2);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = s.opacity;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        s.radius += 0.5;
        s.opacity -= 0.025;

        if (s.opacity <= 0 || s.radius >= s.maxRadius) {
          splashes.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-700"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
