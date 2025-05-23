import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: {
    size?: string;
    color?: string;
    sku?: string;
  };
  addedAt: number;
}

export interface CartStore {
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Smart features
  getRecommendedItems: () => CartItem[];
  applyCoupon: (code: string) => Promise<boolean>;
  calculateShipping: (address: any) => Promise<number>;
}

// Zustand store with simplified persistence
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      isLoading: false,

      addItem: (newItem) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          item => 
            item.productId === newItem.productId &&
            JSON.stringify(item.variant) === JSON.stringify(newItem.variant)
        );

        const cartItem: CartItem = {
          ...newItem,
          id: `${newItem.productId}-${Date.now()}`,
          addedAt: Date.now(),
        };

        let updatedItems: CartItem[];

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          updatedItems = items.map((item, index) => 
            index === existingItemIndex 
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        } else {
          // Add new item
          updatedItems = [...items, cartItem];
        }

        set({
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: calculateItemCount(updatedItems),
        });
      },

      removeItem: (id) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.id !== id);
        
        set({
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: calculateItemCount(updatedItems),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const { items } = get();
        const updatedItems = items.map(item => 
          item.id === id ? { ...item, quantity } : item
        );
        
        set({
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: calculateItemCount(updatedItems),
        });
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0,
        });
      },

      getRecommendedItems: () => {
        const { items } = get();
        // Simple recommendations - return some sample items
        return items.slice(0, 3);
      },

      applyCoupon: async (code: string) => {
        // Mock coupon validation
        const validCoupons = ['SAVE10', 'NEXUS20', 'WELCOME15'];
        return validCoupons.includes(code.toUpperCase());
      },

      calculateShipping: async (_address: any) => {
        // Simulate shipping calculation
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock shipping cost based on location
        const mockShippingCost = Math.random() * 15 + 5; // $5-$20
        return Math.round(mockShippingCost * 100) / 100;
      },
    }),
    {
      name: 'nexusshop-cart',
    }
  )
);

// Helper functions
function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

// Initialize cart on app start
export const initializeCart = async () => {
  // Simple initialization - just return resolved promise
  return Promise.resolve();
}; 