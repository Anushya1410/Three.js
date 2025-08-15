import type { Express } from "express";
import { createServer, type Server } from "http";
import type { Product } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Mock product data for demo
  const mainProduct: Product = {
    id: "1",
    name: "AeroMax Pro Wireless",
    description: "Premium noise-cancelling headphones with spatial audio and 30-hour battery life.",
    price: "299.99",
    originalPrice: "399.99",
    category: "Premium Audio",
    brand: "AeroMax",
    modelPath: "/models/headphones.glb",
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"],
    colors: [
      { name: "black", value: "#000000" },
      { name: "white", value: "#ffffff" },
      { name: "red", value: "#ef4444" },
      { name: "blue", value: "#3b82f6" },
    ],
    features: [
      "Active Noise Cancellation",
      "30-Hour Battery Life",
      "Spatial Audio Support",
      "Quick Charge (15min = 3hrs)",
    ],
    specifications: {
      "Driver Size": "40mm Dynamic",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32 Ohms",
      "Weight": "290g",
      "Connectivity": "Bluetooth 5.3",
    },
    rating: "4.9",
    reviewCount: "2847",
    inStock: true,
  };

  const relatedProducts: Product[] = [
    {
      id: "2",
      name: "AeroBuds Pro",
      description: "True wireless earbuds with premium audio quality.",
      price: "179.99",
      originalPrice: null,
      category: "True Wireless",
      brand: "AeroMax",
      modelPath: "/models/earbuds.glb",
      images: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"],
      colors: [{ name: "silver", value: "#c0c0c0" }],
      features: ["Active Noise Cancellation", "Wireless Charging", "IPX4 Rating"],
      specifications: {},
      rating: "4.7",
      reviewCount: "1204",
      inStock: true,
    },
    {
      id: "3",
      name: "SoundWave Mini",
      description: "Portable Bluetooth speaker with rich bass.",
      price: "89.99",
      originalPrice: null,
      category: "Portable Speaker",
      brand: "SoundWave",
      modelPath: "/models/speaker.glb",
      images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"],
      colors: [{ name: "gray", value: "#6b7280" }],
      features: ["360° Sound", "Waterproof", "12-Hour Battery"],
      specifications: {},
      rating: "4.5",
      reviewCount: "856",
      inStock: true,
    },
    {
      id: "4",
      name: "Studio Master",
      description: "Professional studio headphones for audiophiles.",
      price: "449.99",
      originalPrice: null,
      category: "Studio",
      brand: "Studio",
      modelPath: "/models/studio-headphones.glb",
      images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"],
      colors: [{ name: "black", value: "#000000" }],
      features: ["Open-Back Design", "Planar Drivers", "Detachable Cable"],
      specifications: {},
      rating: "4.8",
      reviewCount: "423",
      inStock: true,
    },
    {
      id: "5",
      name: "ChargePad Pro",
      description: "Fast wireless charging pad with premium design.",
      price: "59.99",
      originalPrice: null,
      category: "Accessory",
      brand: "ChargePad",
      modelPath: "/models/charger.glb",
      images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"],
      colors: [{ name: "white", value: "#ffffff" }],
      features: ["15W Fast Charging", "LED Indicator", "Universal Compatibility"],
      specifications: {},
      rating: "4.3",
      reviewCount: "167",
      inStock: true,
    },
  ];

  // Get main product
  app.get("/api/products/main", (req, res) => {
    res.json(mainProduct);
  });

  // Get related products
  app.get("/api/products/related", (req, res) => {
    res.json(relatedProducts);
  });

  const httpServer = createServer(app);
  return httpServer;
}
