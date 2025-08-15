import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductViewer3D } from "@/components/product-viewer-3d";
import { ProductDetails } from "@/components/product-details";
import { RelatedProducts } from "@/components/related-products";
import type { Product } from "@shared/schema";

export default function Home() {
  const [selectedColor, setSelectedColor] = useState("black");

  // Fetch main product
  const { data: product, isLoading: isProductLoading } = useQuery<Product>({
    queryKey: ["/api/products", "main"],
  });

  // Fetch related products
  const { data: relatedProducts, isLoading: isRelatedLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", "related"],
  });

  if (isProductLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-slate-600 dark:text-slate-400">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />

      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* 3D Product Viewer Section */}
            <div className="lg:col-span-2">
              <ProductViewer3D
                modelPath={product.modelPath}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
                colors={product.colors}
              />
            </div>

            {/* Product Details Panel */}
            <div className="lg:col-span-1">
              <ProductDetails product={product} />
            </div>
          </div>
        </div>
      </main>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}

      <Footer />
    </div>
  );
}
