import { Product } from '@/types/product';

// Import product images
import parfumGoldSparkle from '@/assets/parfum-gold-sparkle.jpg';
import parfumCream from '@/assets/parfum-cream.jpg';
import parfumGold from '@/assets/parfum-gold.jpg';
import parfumHomme from '@/assets/parfum-homme.jpg';
import parfumFemme from '@/assets/parfum-femme.jpg';
import bgHomme from '@/assets/bg-homme.jpg';
import bgFemme from '@/assets/bg-femme.jpg';
import packCollection from '@/assets/pack-collection.jpg';

export const products: Product[] = [
  // HOMME
  {
    id: '1',
    name: 'R&Z Noir Intense',
    description: 'Un parfum mystérieux et envoûtant avec des notes profondes de oud et de vanille.',
    price: 50,
    image: parfumHomme,
    category: 'homme',
    notes: ['Oud', 'Vanille', 'Ambre']
  },
  {
    id: '2',
    name: 'R&Z Oud Prestige',
    description: "L'essence même du luxe oriental avec du oud rare et précieux.",
    price: 50,
    image: bgHomme,
    category: 'homme',
    notes: ['Oud', 'Safran', 'Cuir']
  },
  {
    id: '3',
    name: 'R&Z Gentleman',
    description: 'Un parfum élégant et raffiné pour l\'homme moderne et confiant.',
    price: 50,
    image: parfumGold,
    category: 'homme',
    notes: ['Bergamote', 'Lavande', 'Musc']
  },
  {
    id: '4',
    name: 'R&Z Sport Fresh',
    description: 'Une fragrance fraîche et dynamique pour les esprits actifs.',
    price: 50,
    image: parfumCream,
    category: 'homme',
    notes: ['Citron', 'Menthe', 'Bois de Cèdre']
  },
  // FEMME
  {
    id: '5',
    name: 'R&Z Rose Élégance',
    description: 'Une fragrance florale délicate mêlant rose de Damas et jasmin.',
    price: 50,
    image: parfumFemme,
    category: 'femme',
    notes: ['Rose', 'Jasmin', 'Musc Blanc']
  },
  {
    id: '6',
    name: 'R&Z Fleur de Nuit',
    description: "Un parfum séduisant aux accents de tubéreuse et d'ylang-ylang.",
    price: 50,
    image: bgFemme,
    category: 'femme',
    notes: ['Tubéreuse', 'Ylang-Ylang', 'Patchouli']
  },
  {
    id: '7',
    name: 'R&Z Velours Rose',
    description: 'Un parfum romantique et sensuel aux notes de rose et de framboise.',
    price: 50,
    image: parfumGoldSparkle,
    category: 'femme',
    notes: ['Rose', 'Framboise', 'Vanille']
  },
  {
    id: '8',
    name: 'R&Z Jardin Secret',
    description: 'Une explosion florale fraîche et féminine pour les jours ensoleillés.',
    price: 50,
    image: parfumCream,
    category: 'femme',
    notes: ['Pivoine', 'Freesia', 'Musc']
  },
  // UNISEX
  {
    id: '9',
    name: 'R&Z Ambre Royal',
    description: "Un mélange luxueux d'ambre précieux et de bois de santal.",
    price: 50,
    image: parfumGold,
    category: 'unisex',
    notes: ['Ambre', 'Santal', 'Bergamote']
  },
  {
    id: '10',
    name: 'R&Z Bois Mystique',
    description: 'Une composition boisée sophistiquée aux notes de cèdre et vétiver.',
    price: 50,
    image: parfumGoldSparkle,
    category: 'unisex',
    notes: ['Cèdre', 'Vétiver', 'Poivre Noir']
  },
  {
    id: '11',
    name: 'R&Z Essence Pure',
    description: 'Un parfum minimaliste et élégant aux notes fraîches et boisées.',
    price: 50,
    image: parfumCream,
    category: 'unisex',
    notes: ['Thé Blanc', 'Iris', 'Bois Blanc']
  },
  {
    id: '12',
    name: 'R&Z Cuir Oriental',
    description: 'Un parfum audacieux mêlant cuir précieux et épices orientales.',
    price: 50,
    image: bgHomme,
    category: 'unisex',
    notes: ['Cuir', 'Cardamome', 'Oud']
  },
  // PACKS
  {
    id: '13',
    name: 'Pack Trio Découverte',
    description: '3 parfums au choix pour découvrir notre collection à prix réduit.',
    price: 130,
    image: packCollection,
    category: 'pack',
    notes: ['3 Parfums', 'Au Choix', 'Économie 20 DH']
  },
  {
    id: '14',
    name: 'Pack Prestige',
    description: '4 parfums premium pour une collection complète à prix exceptionnel.',
    price: 160,
    image: packCollection,
    category: 'pack',
    notes: ['4 Parfums', 'Au Choix', 'Économie 40 DH']
  },
  {
    id: '15',
    name: 'Pack Couple',
    description: 'Un duo parfait avec 1 parfum homme et 1 parfum femme au choix.',
    price: 90,
    image: parfumGoldSparkle,
    category: 'pack',
    notes: ['2 Parfums', 'Homme + Femme', 'Économie 10 DH']
  },
  {
    id: '16',
    name: 'Pack Collection Complète',
    description: '6 parfums pour avoir toute notre gamme à un prix imbattable.',
    price: 250,
    image: packCollection,
    category: 'pack',
    notes: ['6 Parfums', 'Au Choix', 'Économie 50 DH']
  }
];

export const DELIVERY_FEE = 15;
export const FREE_DELIVERY_THRESHOLD = 300;
export const WHATSAPP_NUMBER = '+212641973545';
