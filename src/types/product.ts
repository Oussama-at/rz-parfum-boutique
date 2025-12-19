export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'homme' | 'femme' | 'unisex' | 'pack';
  notes: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
