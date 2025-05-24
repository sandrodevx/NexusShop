export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  brand: string;
  tags: string[];
  specifications: Record<string, string>;
  variants?: {
    id: string;
    name: string;
    price: number;
    images: string[];
    specifications: Record<string, string>;
  }[];
  featured: boolean;
  new: boolean;
  sale: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  subcategories: {
    id: string;
    name: string;
    slug: string;
    productCount: number;
  }[];
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    description: "Latest tech gadgets and electronics",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
    productCount: 156,
    subcategories: [
      { id: "smartphones", name: "Smartphones", slug: "smartphones", productCount: 45 },
      { id: "laptops", name: "Laptops", slug: "laptops", productCount: 32 },
      { id: "headphones", name: "Headphones", slug: "headphones", productCount: 28 },
      { id: "cameras", name: "Cameras", slug: "cameras", productCount: 22 },
      { id: "gaming", name: "Gaming", slug: "gaming", productCount: 29 }
    ]
  },
  {
    id: "fashion",
    name: "Fashion",
    slug: "fashion", 
    description: "Trendy clothing and accessories",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    productCount: 234,
    subcategories: [
      { id: "mens", name: "Men's Fashion", slug: "mens", productCount: 89 },
      { id: "womens", name: "Women's Fashion", slug: "womens", productCount: 112 },
      { id: "shoes", name: "Shoes", slug: "shoes", productCount: 67 },
      { id: "accessories", name: "Accessories", slug: "accessories", productCount: 45 }
    ]
  },
  {
    id: "home",
    name: "Home & Living",
    slug: "home",
    description: "Beautiful home decor and furniture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    productCount: 189,
    subcategories: [
      { id: "furniture", name: "Furniture", slug: "furniture", productCount: 78 },
      { id: "decor", name: "Decor", slug: "decor", productCount: 56 },
      { id: "kitchen", name: "Kitchen", slug: "kitchen", productCount: 34 },
      { id: "lighting", name: "Lighting", slug: "lighting", productCount: 21 }
    ]
  },
  {
    id: "sports",
    name: "Sports & Fitness", 
    slug: "sports",
    description: "Sports equipment and fitness gear",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    productCount: 98,
    subcategories: [
      { id: "fitness", name: "Fitness", slug: "fitness", productCount: 34 },
      { id: "outdoor", name: "Outdoor", slug: "outdoor", productCount: 28 },
      { id: "team-sports", name: "Team Sports", slug: "team-sports", productCount: 22 },
      { id: "water-sports", name: "Water Sports", slug: "water-sports", productCount: 14 }
    ]
  }
];

export const products: Product[] = [
  // ELECTRONICS - Smartphones
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    description: "The most advanced iPhone ever with titanium design and cutting-edge A17 Pro chip.",
    price: 999,
    originalPrice: 1099,
    category: "electronics",
    subcategory: "smartphones",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&sat=-50",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&hue=180"
    ],
    rating: 4.8,
    reviewCount: 2847,
    inStock: true,
    stockCount: 24,
    brand: "Apple",
    tags: ["premium", "5g", "camera", "gaming"],
    specifications: {
      "Display": "6.1-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Camera": "48MP Main + 12MP Ultra Wide",
      "Storage": "128GB",
      "Battery": "Up to 23 hours video",
      "Material": "Titanium"
    },
    variants: [
      {
        id: "iphone-15-pro-128",
        name: "128GB",
        price: 999,
        images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop"],
        specifications: { "Storage": "128GB" }
      },
      {
        id: "iphone-15-pro-256", 
        name: "256GB",
        price: 1199,
        images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop"],
        specifications: { "Storage": "256GB" }
      }
    ],
    featured: true,
    new: true,
    sale: true
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    description: "Ultimate productivity powerhouse with S Pen and advanced AI features.",
    price: 899,
    category: "electronics",
    subcategory: "smartphones", 
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop&sat=-30"
    ],
    rating: 4.7,
    reviewCount: 1923,
    inStock: true,
    stockCount: 18,
    brand: "Samsung",
    tags: ["android", "s-pen", "camera", "productivity"],
    specifications: {
      "Display": "6.8-inch Dynamic AMOLED 2X", 
      "Processor": "Snapdragon 8 Gen 3",
      "Camera": "200MP Main + 50MP Periscope",
      "RAM": "12GB",
      "Storage": "256GB",
      "S Pen": "Included"
    },
    featured: true,
    new: false,
    sale: false
  },

  // ELECTRONICS - Laptops
  {
    id: "macbook-pro-14",
    name: "MacBook Pro 14-inch",
    description: "Supercharged for pros with M3 Pro chip and stunning Liquid Retina XDR display.",
    price: 1999,
    category: "electronics",
    subcategory: "laptops",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop&sat=-40"
    ],
    rating: 4.9,
    reviewCount: 856,
    inStock: true,
    stockCount: 12,
    brand: "Apple",
    tags: ["professional", "m3-chip", "retina", "creative"],
    specifications: {
      "Chip": "Apple M3 Pro",
      "Display": "14.2-inch Liquid Retina XDR",
      "Memory": "18GB Unified Memory",
      "Storage": "512GB SSD",
      "Battery": "Up to 18 hours",
      "Ports": "3x Thunderbolt 4, HDMI, SD card"
    },
    featured: true,
    new: true,
    sale: false
  },
  {
    id: "surface-laptop-studio-2",
    name: "Surface Laptop Studio 2",
    description: "The most powerful Surface laptop with dynamic woven hinge and touchscreen.",
    price: 1599,
    originalPrice: 1799,
    category: "electronics", 
    subcategory: "laptops",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop&brightness=0.8"
    ],
    rating: 4.5,
    reviewCount: 423,
    inStock: true,
    stockCount: 8,
    brand: "Microsoft",
    tags: ["windows", "touchscreen", "convertible", "creative"],
    specifications: {
      "Processor": "Intel Core i7-13700H",
      "Display": "14.4-inch PixelSense touchscreen", 
      "Graphics": "NVIDIA GeForce RTX 4060",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "OS": "Windows 11 Pro"
    },
    featured: false,
    new: false,
    sale: true
  },

  // ELECTRONICS - Headphones
  {
    id: "airpods-pro-2",
    name: "AirPods Pro (2nd generation)",
    description: "Rebuilt from the ground up with Apple H2 chip for smarter noise cancellation.",
    price: 249,
    category: "electronics",
    subcategory: "headphones",
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&h=800&fit=crop&brightness=1.2"
    ],
    rating: 4.6,
    reviewCount: 3245,
    inStock: true,
    stockCount: 45,
    brand: "Apple",
    tags: ["wireless", "noise-cancelling", "premium", "compact"],
    specifications: {
      "Chip": "Apple H2",
      "Active Noise Cancellation": "Yes",
      "Battery Life": "Up to 6 hours listening",
      "Case Battery": "Up to 30 hours total",
      "Water Resistance": "IPX4",
      "Spatial Audio": "Yes"
    },
    featured: true,
    new: false,
    sale: false
  },
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise canceling with exceptional sound quality and comfort.",
    price: 399,
    originalPrice: 449,
    category: "electronics",
    subcategory: "headphones", 
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop&hue=180"
    ],
    rating: 4.7,
    reviewCount: 1876,
    inStock: true,
    stockCount: 22,
    brand: "Sony",
    tags: ["wireless", "noise-cancelling", "premium", "over-ear"],
    specifications: {
      "Noise Cancellation": "Industry Leading",
      "Battery Life": "Up to 30 hours",
      "Quick Charge": "3 min = 3 hours",
      "Driver Unit": "30mm",
      "Weight": "250g",
      "Bluetooth": "5.2"
    },
    featured: false,
    new: false,
    sale: true
  },

  // FASHION - Men's
  {
    id: "premium-leather-jacket",
    name: "Premium Leather Jacket",
    description: "Handcrafted genuine leather jacket with modern slim fit and premium finishing.",
    price: 299,
    originalPrice: 399,
    category: "fashion",
    subcategory: "mens",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop&brightness=0.9"
    ],
    rating: 4.4,
    reviewCount: 567,
    inStock: true,
    stockCount: 15,
    brand: "NexusStyle",
    tags: ["leather", "premium", "casual", "winter"],
    specifications: {
      "Material": "100% Genuine Leather",
      "Lining": "Polyester", 
      "Closure": "Zipper",
      "Pockets": "4 exterior, 2 interior",
      "Care": "Professional leather cleaning",
      "Origin": "Made in Italy"
    },
    variants: [
      {
        id: "leather-jacket-s",
        name: "Small",
        price: 299,
        images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop"],
        specifications: { "Size": "S", "Chest": "38-40 inches" }
      },
      {
        id: "leather-jacket-m", 
        name: "Medium",
        price: 299,
        images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop"],
        specifications: { "Size": "M", "Chest": "40-42 inches" }
      },
      {
        id: "leather-jacket-l",
        name: "Large", 
        price: 299,
        images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop"],
        specifications: { "Size": "L", "Chest": "42-44 inches" }
      }
    ],
    featured: false,
    new: false,
    sale: true
  },
  {
    id: "designer-hoodie",
    name: "Designer Hoodie",
    description: "Premium cotton blend hoodie with embroidered logo and modern streetwear design.",
    price: 89,
    category: "fashion",
    subcategory: "mens",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&hue=60"
    ],
    rating: 4.3,
    reviewCount: 892,
    inStock: true,
    stockCount: 34,
    brand: "UrbanWear",
    tags: ["streetwear", "comfortable", "casual", "cotton"],
    specifications: {
      "Material": "80% Cotton, 20% Polyester",
      "Fit": "Regular",
      "Hood": "Adjustable drawstring",
      "Pockets": "Kangaroo pocket",
      "Care": "Machine washable",
      "Weight": "350 GSM"
    },
    featured: false,
    new: true,
    sale: false
  },

  // HOME & LIVING - Furniture
  {
    id: "modern-sofa-set",
    name: "Modern 3-Seater Sofa Set",
    description: "Contemporary design sofa with premium fabric upholstery and comfortable seating.",
    price: 1299,
    originalPrice: 1599,
    category: "home",
    subcategory: "furniture",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&brightness=1.1"
    ],
    rating: 4.6,
    reviewCount: 234,
    inStock: true,
    stockCount: 6,
    brand: "ComfortLiving",
    tags: ["modern", "comfortable", "living-room", "premium"],
    specifications: {
      "Dimensions": "220cm x 90cm x 85cm",
      "Seating Capacity": "3 people",
      "Frame Material": "Solid wood",
      "Upholstery": "Premium fabric",
      "Cushion Fill": "High-density foam",
      "Assembly": "Required"
    },
    featured: true,
    new: false,
    sale: true
  },

  // SPORTS & FITNESS
  {
    id: "smart-fitness-watch", 
    name: "Smart Fitness Watch Pro",
    description: "Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life.",
    price: 199,
    category: "sports",
    subcategory: "fitness",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&hue=120"
    ],
    rating: 4.5,
    reviewCount: 1456,
    inStock: true,
    stockCount: 28,
    brand: "FitTech",
    tags: ["fitness", "smartwatch", "waterproof", "gps"],
    specifications: {
      "Display": "1.4-inch AMOLED",
      "Battery Life": "Up to 7 days",
      "Water Resistance": "5ATM",
      "Sensors": "Heart rate, SpO2, GPS",
      "Connectivity": "Bluetooth 5.0",
      "Compatibility": "iOS & Android"
    },
    featured: true,
    new: true,
    sale: false
  }
];

// Helper functions
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getSaleProducts = (): Product[] => {
  return products.filter(product => product.sale);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(product => product.category === categorySlug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
}; 