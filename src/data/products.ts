export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  servingSize: string;
  price_inr: number;
  image_url: string;
  images: string[];
  rating: number;
  in_stock: boolean;
}

export const categories = [
  "Nuts & Bars",
  "Dry Fruits",
  "Seeds",
  "High-Protein Oats",
  "Natural Shakes & Juices",
];

export const servingSizes = [
  "Single Serve",
  "2 People Serve",
  "4 People Serve",
  "Family Pack",
];

// Category → branded packet image
const categoryImage: Record<string, string> = {
  "Nuts & Bars": "/products/nuts-bars.png",
  "Dry Fruits": "/products/dry-fruits.png",
  Seeds: "/products/seeds.png",
  "High-Protein Oats": "/products/oats.png",
  "Natural Shakes & Juices": "/products/shakes-juices.png",
};

export const categoryDetails: {
  name: string;
  description: string;
  image: string;
}[] = [
  {
    name: "Nuts & Bars",
    description:
      "Energy-packed and convenient snacks made from premium nuts and natural ingredients. Ideal for quick nutrition on the go.",
    image: "/products/nuts-bars.png",
  },
  {
    name: "Dry Fruits",
    description:
      "Rich in vitamins, minerals, and antioxidants. Includes almonds, cashews, raisins, figs, etc., supporting overall health and immunity.",
    image: "/products/dry-fruits.png",
  },
  {
    name: "Seeds",
    description:
      "Nutrient-dense superfoods like chia seeds, flaxseeds, pumpkin seeds, and sunflower seeds — great for digestion, heart health, and protein intake.",
    image: "/products/seeds.png",
  },
  {
    name: "High-Protein Oats",
    description:
      "Oats enriched with high protein content to support fitness, muscle building, and sustained energy throughout the day.",
    image: "/products/oats.png",
  },
  {
    name: "Natural Shakes & Juices",
    description:
      "Fresh and preservative-free beverages made from natural fruits and ingredients, promoting hydration and wellness.",
    image: "/products/shakes-juices.png",
  },
];

export const products: Product[] = [
  {
    id: "nuts-bars",
    name: "Nuts & Bars",
    description:
      "Energy-packed and convenient snacks made from premium nuts and natural ingredients. Ideal for quick nutrition on the go.",
    category: "Nuts & Bars",
    servingSize: "Family Pack",
    price_inr: 499,
    image_url: "/products/nuts-bars.png",
    images: ["/products/nuts-bars.png"],
    rating: 4.7,
    in_stock: true,
  },
  {
    id: "dry-fruits",
    name: "Dry Fruits",
    description:
      "Rich in vitamins, minerals, and antioxidants. Includes almonds, cashews, raisins, figs, etc., supporting overall health and immunity.",
    category: "Dry Fruits",
    servingSize: "Family Pack",
    price_inr: 599,
    image_url: "/products/dry-fruits.png",
    images: ["/products/dry-fruits.png"],
    rating: 4.8,
    in_stock: true,
  },
  {
    id: "seeds",
    name: "Seeds",
    description:
      "Nutrient-dense superfoods like chia seeds, flaxseeds, pumpkin seeds, and sunflower seeds — great for digestion, heart health, and protein intake.",
    category: "Seeds",
    servingSize: "Family Pack",
    price_inr: 399,
    image_url: "/products/seeds.png",
    images: ["/products/seeds.png"],
    rating: 4.6,
    in_stock: true,
  },
  {
    id: "high-protein-oats",
    name: "High-Protein Oats",
    description:
      "Oats enriched with high protein content to support fitness, muscle building, and sustained energy throughout the day.",
    category: "High-Protein Oats",
    servingSize: "Family Pack",
    price_inr: 349,
    image_url: "/products/oats.png",
    images: ["/products/oats.png"],
    rating: 4.7,
    in_stock: true,
  },
  {
    id: "natural-shakes-juices",
    name: "Natural Shakes & Juices",
    description:
      "Fresh and preservative-free beverages made from natural fruits and ingredients, promoting hydration and wellness.",
    category: "Natural Shakes & Juices",
    servingSize: "Family Pack",
    price_inr: 299,
    image_url: "/products/shakes-juices.png",
    images: ["/products/shakes-juices.png"],
    rating: 4.5,
    in_stock: true,
  },
];
