import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/product';

interface ComparisonContextType {
  items: Product[];
  addToComparison: (product: Product) => boolean;
  removeFromComparison: (productId: string) => void;
  isInComparison: (productId: string) => boolean;
  clearComparison: () => void;
  canAdd: boolean;
  maxItems: number;
}

const MAX_COMPARISON_ITEMS = 3;

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addToComparison = (product: Product): boolean => {
    if (items.length >= MAX_COMPARISON_ITEMS) {
      return false;
    }
    if (items.some((item) => item.id === product.id)) {
      return false;
    }
    setItems((current) => [...current, product]);
    return true;
  };

  const removeFromComparison = (productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  };

  const isInComparison = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  const clearComparison = () => setItems([]);

  const value: ComparisonContextType = {
    items,
    addToComparison,
    removeFromComparison,
    isInComparison,
    clearComparison,
    canAdd: items.length < MAX_COMPARISON_ITEMS,
    maxItems: MAX_COMPARISON_ITEMS,
  };

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
};

export const useComparison = (): ComparisonContextType => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
