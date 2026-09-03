import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#08080b",
};

export const metadata: Metadata = {
  title: "ZENJI 禅路 // Anime-Inspired Heavyweight Streetwear",
  description:
    "High-grade e-commerce storefront tailored for limited drops. Engineered with 380–450 GSM Japanese loopback terry, 3D puff prints, and the interactive Fit-Matrix Radar.",
  keywords: [
    "ZENJI",
    "streetwear",
    "cyberpunk clothing",
    "anime hoodie",
    "heavyweight cotton",
    "450 GSM",
    "3D puff print",
    "Shibuya streetwear",
  ],
  authors: [{ name: "ZENJI Studios Tokyo" }],
};

import GlobalRainWrapper from "@/components/GlobalRainWrapper";
import AnimeCursor from "@/components/AnimeCursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[#08080b] text-zinc-100 flex flex-col font-sans">
        <AnimeCursor />
        <GlobalRainWrapper />
        {children}
      </body>
    </html>
  );
}
