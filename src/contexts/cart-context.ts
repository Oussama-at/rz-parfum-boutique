import { createContext } from 'react';
import type { CartItem, Product } from '@/types/product';

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  itemCount: number;
}

// Keep the context instance in its own module to prevent dev hot-reload from
// creating multiple context instances (which can cause "useCart must be used within a CartProvider").
export const CartContext = createContext<CartContextType | undefined>(undefined);
