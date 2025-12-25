export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[]; // Multiple images for gallery
  category: 'homme' | 'femme' | 'unisex' | 'pack';
  notes: string[];
  badge?: 'flower' | 'newyear';
}

export interface CartItem extends Product {
  quantity: number;
}
