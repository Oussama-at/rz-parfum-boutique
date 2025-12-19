import { Product } from '@/types/product';

export const products: Product[] = [
  // HOMME
  {
    id: '1',
    name: 'R&Z Noir Intense',
    description: 'Un parfum mystérieux et envoûtant avec des notes profondes de oud et de vanille.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop',
    category: 'homme',
    notes: ['Oud', 'Vanille', 'Ambre']
  },
  {
    id: '2',
    name: 'R&Z Oud Prestige',
    description: "L'essence même du luxe oriental avec du oud rare et précieux.",
    price: 50,
    image: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e9b?w=400&h=500&fit=crop',
    category: 'homme',
    notes: ['Oud', 'Safran', 'Cuir']
  },
  {
    id: '3',
    name: 'R&Z Gentleman',
    description: 'Un parfum élégant et raffiné pour l\'homme moderne et confiant.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=500&fit=crop',
    category: 'homme',
    notes: ['Bergamote', 'Lavande', 'Musc']
  },
  {
    id: '4',
    name: 'R&Z Sport Fresh',
    description: 'Une fragrance fraîche et dynamique pour les esprits actifs.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=500&fit=crop',
    category: 'homme',
    notes: ['Citron', 'Menthe', 'Bois de Cèdre']
  },
  // FEMME
  {
    id: '5',
    name: 'R&Z Rose Élégance',
    description: 'Une fragrance florale délicate mêlant rose de Damas et jasmin.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&h=500&fit=crop',
    category: 'femme',
    notes: ['Rose', 'Jasmin', 'Musc Blanc']
  },
  {
    id: '6',
    name: 'R&Z Fleur de Nuit',
    description: "Un parfum séduisant aux accents de tubéreuse et d'ylang-ylang.",
    price: 50,
    image: 'https://images.unsplash.com/photo-1595425964072-537c688ab02a?w=400&h=500&fit=crop',
    category: 'femme',
    notes: ['Tubéreuse', 'Ylang-Ylang', 'Patchouli']
  },
  {
    id: '7',
    name: 'R&Z Velours Rose',
    description: 'Un parfum romantique et sensuel aux notes de rose et de framboise.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?w=400&h=500&fit=crop',
    category: 'femme',
    notes: ['Rose', 'Framboise', 'Vanille']
  },
  {
    id: '8',
    name: 'R&Z Jardin Secret',
    description: 'Une explosion florale fraîche et féminine pour les jours ensoleillés.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=500&fit=crop',
    category: 'femme',
    notes: ['Pivoine', 'Freesia', 'Musc']
  },
  // UNISEX
  {
    id: '9',
    name: 'R&Z Ambre Royal',
    description: "Un mélange luxueux d'ambre précieux et de bois de santal.",
    price: 50,
    image: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=400&h=500&fit=crop',
    category: 'unisex',
    notes: ['Ambre', 'Santal', 'Bergamote']
  },
  {
    id: '10',
    name: 'R&Z Bois Mystique',
    description: 'Une composition boisée sophistiquée aux notes de cèdre et vétiver.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=500&fit=crop',
    category: 'unisex',
    notes: ['Cèdre', 'Vétiver', 'Poivre Noir']
  },
  {
    id: '11',
    name: 'R&Z Essence Pure',
    description: 'Un parfum minimaliste et élégant aux notes fraîches et boisées.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=400&h=500&fit=crop',
    category: 'unisex',
    notes: ['Thé Blanc', 'Iris', 'Bois Blanc']
  },
  {
    id: '12',
    name: 'R&Z Cuir Oriental',
    description: 'Un parfum audacieux mêlant cuir précieux et épices orientales.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1547887538-047f814bfb64?w=400&h=500&fit=crop',
    category: 'unisex',
    notes: ['Cuir', 'Cardamome', 'Oud']
  },
  // PACKS
  {
    id: '13',
    name: 'Pack Trio Découverte',
    description: '3 parfums au choix pour découvrir notre collection à prix réduit.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=400&h=500&fit=crop',
    category: 'pack',
    notes: ['3 Parfums', 'Au Choix', 'Économie 20 DH']
  },
  {
    id: '14',
    name: 'Pack Prestige',
    description: '4 parfums premium pour une collection complète à prix exceptionnel.',
    price: 160,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=500&fit=crop',
    category: 'pack',
    notes: ['4 Parfums', 'Au Choix', 'Économie 40 DH']
  },
  {
    id: '15',
    name: 'Pack Couple',
    description: 'Un duo parfait avec 1 parfum homme et 1 parfum femme au choix.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=500&fit=crop',
    category: 'pack',
    notes: ['2 Parfums', 'Homme + Femme', 'Économie 10 DH']
  },
  {
    id: '16',
    name: 'Pack Collection Complète',
    description: '6 parfums pour avoir toute notre gamme à un prix imbattable.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
    category: 'pack',
    notes: ['6 Parfums', 'Au Choix', 'Économie 50 DH']
  }
];

export const DELIVERY_FEE = 20;
export const WHATSAPP_NUMBER = '+212600000000'; // Replace with actual number
