export const SITE_CONFIG = {
  name: "ZENJI",
  kanjiName: "禅路",
  tagline: "Cyberpunk Anime Streetwear",
  description:
    "High-grade e-commerce storefront tailored for limited drops. Engineered with 380–450 GSM Japanese loopback terry, 3D puff prints, and the interactive Fit-Matrix Radar.",
  currency: "USD",
  currencySymbol: "$",
  freeShippingThreshold: 100,
  standardShippingFee: 14,
  loadoutDiscountPercent: 15,
  vipDiscountPercent: 20,
  vipPasscodes: ["SHIBUYA2099", "ZENJI", "AKIRA"],
  dropNumber: "DROP VOL. 04",
  dropSubhead: "SHIBUYA HARVEST",
  origin: {
    city: "Shibuya, Tokyo",
    coordinates: "35.6595° N, 139.7004° E",
  },
  batchLimit: 150,
  resupplyTargetPledges: 200,
  supportEmail: "dispatch@zenji.tokyo",
} as const;
