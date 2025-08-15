import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="bg-white dark:bg-slate-800 py-16 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8">You might also like</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
              data-testid={`card-product-${product.id}`}
            >
              <img
                src={product.images[0] || "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
                data-testid={`img-product-${product.id}`}
              />
              <h3 className="font-medium mb-1" data-testid={`text-product-name-${product.id}`}>
                {product.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                {product.category}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary" data-testid={`text-price-${product.id}`}>
                  ${parseFloat(product.price).toFixed(2)}
                </span>
                <Button
                  size="sm"
                  className="text-xs bg-primary text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
                  data-testid={`button-view-${product.id}`}
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
