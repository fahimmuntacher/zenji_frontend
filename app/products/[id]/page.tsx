import productsData from "@/data/products.json";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { ProductItem } from "@/components/FitMatrixModal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return productsData.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = productsData.find((p) => p.id === id);
  if (!product) {
    return { title: "Piece Not Found // ZENJI" };
  }

  return {
    title: `${product.name} (${product.japaneseTitle}) // ZENJI DROP VOL. 04`,
    description: product.description,
    openGraph: {
      title: `${product.name} // ZENJI`,
      description: product.description,
      images: [{ url: product.imageFront }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailClient
      product={product as unknown as ProductItem}
      allProducts={productsData as unknown as ProductItem[]}
    />
  );
}
