import { useState } from "react";
import { Star, Check, Minus, Plus, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Redirecting to checkout...",
      description: "You would be redirected to the checkout page.",
    });
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const rating = parseFloat(product.rating || "0");
  const reviewCount = parseInt(product.reviewCount || "0");
  const originalPrice = product.originalPrice ? parseFloat(product.originalPrice) : null;
  const currentPrice = parseFloat(product.price);
  const discount = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  return (
    <div className="sticky top-24">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
        {/* Product Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-accent font-medium">{product.category}</span>
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating) ? "fill-current" : ""
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                ({rating})
              </span>
            </div>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold mb-2" data-testid="text-product-name">
            {product.name}
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mb-4" data-testid="text-product-description">
            {product.description}
          </p>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-primary" data-testid="text-current-price">
              ${currentPrice.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-lg text-slate-500 line-through" data-testid="text-original-price">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm px-2 py-1 rounded-md">
                {discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
            Key Features
          </h3>
          <div className="space-y-2">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg w-fit">
            <Button
              variant="ghost"
              size="icon"
              onClick={decreaseQuantity}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg transition-colors"
              data-testid="button-decrease-quantity"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="px-4 py-2 min-w-[3rem] text-center" data-testid="text-quantity">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={increaseQuantity}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg transition-colors"
              data-testid="button-increase-quantity"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl"
            data-testid="button-add-to-cart"
          >
            Add to Cart
          </Button>

          <Button
            onClick={handleBuyNow}
            className="w-full bg-accent hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl"
            data-testid="button-buy-now"
          >
            Buy Now
          </Button>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1 py-2 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2"
              data-testid="button-save"
            >
              <Heart className="w-5 h-5" />
              <span>Save</span>
            </Button>

            <Button
              variant="outline"
              className="flex-1 py-2 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2"
              data-testid="button-share"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
        <h3 className="font-semibold mb-4">Technical Specifications</h3>
        <div className="space-y-3 text-sm">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
