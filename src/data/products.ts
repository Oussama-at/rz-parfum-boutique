import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'R Z Noir Intense',
    description: 'Un parfum mystérieux et envoûtant avec des notes profondes de oud et de vanille.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop',
    category: 'homme',
    notes: ['Oud', 'Vanille', 'Ambre']
  },
  {
    id: '2',
    name: 'R Z Rose Élégance',
    description: 'Une fragrance florale délicate mêlant rose de Damas et jasmin.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&h=500&fit=crop',
    category: 'femme',
    notes: ['Rose', 'Jasmin', 'Musc Blanc']
  },
  {
    id: '3',
    name: 'R Z Ambre Royal',
    description: 'Un mélange luxueux d\'ambre précieux et de bois de santal.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=500&fit=crop',
    category: 'unisex',
    notes: ['Ambre', 'Santal', 'Bergamote']
  },
  {
    id: '4',
    name: 'R Z Oud Prestige',
    description: 'L\'essence même du luxe oriental avec du oud rare et précieux.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e9b?w=400&h=500&fit=crop',
    category: 'homme',
    notes: ['Oud', 'Safran', 'Cuir']
  },
  {
    id: '5',
    name: 'R Z Fleur de Nuit',
    description: 'Un parfum séduisant aux accents de tubéreuse et d\'ylang-ylang.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1595425964072-537c688ab02a?w=400&h=500&fit=crop',
    category: 'femme',
    notes: ['Tubéreuse', 'Ylang-Ylang', 'Patchouli']
  },
  {
    id: '6',
    name: 'R Z Bois Mystique',
    description: 'Une composition boisée sophistiquée aux notes de cèdre et vétiver.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=500&fit=crop',
    category: 'unisex',
    notes: ['Cèdre', 'Vétiver', 'Poivre Noir']
  }
];

export const DELIVERY_FEE = 20;
export const WHATSAPP_NUMBER = '+212600000000'; // Replace with actual number
