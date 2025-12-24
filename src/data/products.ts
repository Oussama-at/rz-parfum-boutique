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
import catalogueNew from '@/assets/catalogue-new.jpg';
import flaconFemme from '@/assets/flacon-femme.png';
import flaconHomme from '@/assets/flacon-homme.png';
import packHomme5 from '@/assets/pack-homme-5.png';
import packFemme3 from '@/assets/pack-femme-3.png';
import packHommeNoel from '@/assets/pack-homme-noel.png';
import packFemmeNoel from '@/assets/pack-femme-noel.png';

export const products: Product[] = [
  // HOMME - Inspirés des grandes marques
  {
    id: '1',
    name: 'Aventus',
    description: 'Inspiré de Creed - Un parfum puissant et sophistiqué pour l\'homme audacieux.',
    price: 50,
    image: flaconHomme,
    category: 'homme',
    notes: ['Ananas', 'Bouleau', 'Musc']
  },
  {
    id: '2',
    name: 'Eros',
    description: 'Inspiré de Versace - Une fragrance intense et séduisante.',
    price: 50,
    image: flaconHomme,
    category: 'homme',
    notes: ['Menthe', 'Pomme Verte', 'Vanille']
  },
  {
    id: '3',
    name: 'Bleu de Chanel',
    description: 'Inspiré de Chanel - L\'élégance masculine intemporelle.',
    price: 50,
    image: flaconHomme,
    category: 'homme',
    notes: ['Citron', 'Menthe', 'Cèdre']
  },
  {
    id: '4',
    name: 'Sauvage',
    description: 'Inspiré de Dior - Une fragrance fraîche et magnétique.',
    price: 50,
    image: flaconHomme,
    category: 'homme',
    notes: ['Bergamote', 'Poivre', 'Ambroxan']
  },
  {
    id: '22',
    name: '1 Million',
    description: 'Inspiré de Paco Rabanne - Un parfum luxueux et audacieux.',
    price: 50,
    image: flaconHomme,
    category: 'homme',
    notes: ['Cannelle', 'Cuir', 'Ambre']
  },
  {
    id: '23',
    name: 'Dior Homme',
    description: 'Inspiré de Dior - Une signature boisée et élégante.',
    price: 50,
    image: flaconHomme,
    category: 'homme',
    notes: ['Iris', 'Cèdre', 'Vétiver']
  },
  {
    id: '24',
    name: 'Dylan Blue',
    description: 'Inspiré de Versace - Fraîcheur méditerranéenne et sensualité.',
    price: 50,
    image: flaconHomme,
    category: 'homme',
    notes: ['Bergamote', 'Pamplemousse', 'Encens']
  },
  {
    id: '25',
    name: 'Lacoste Blanc',
    description: 'Inspiré de Lacoste - Fraîcheur pure et élégance sportive.',
    price: 50,
    image: flaconHomme,
    category: 'homme',
    notes: ['Pamplemousse', 'Cèdre', 'Cuir']
  },
  // FEMME - Inspirés des grandes marques
  {
    id: '5',
    name: 'Nuit Trésor',
    description: 'Inspiré de Lancôme - Un parfum intense et passionné aux notes de rose et de vanille.',
    price: 50,
    image: flaconFemme,
    category: 'femme',
    notes: ['Rose', 'Vanille', 'Praline']
  },
  {
    id: '6',
    name: 'Prada Essence',
    description: 'Inspiré de Prada - Une fragrance sophistiquée aux accents floraux et poudrés.',
    price: 50,
    image: flaconFemme,
    category: 'femme',
    notes: ['Iris', 'Ambre', 'Musc']
  },
  {
    id: '7',
    name: "J'adore",
    description: "Inspiré de Dior - L'essence de la féminité avec des fleurs précieuses.",
    price: 50,
    image: flaconFemme,
    category: 'femme',
    notes: ['Jasmin', 'Rose', 'Ylang-Ylang']
  },
  {
    id: '8',
    name: 'Libre',
    description: 'Inspiré de YSL - Une fragrance audacieuse pour la femme libre et indépendante.',
    price: 50,
    image: flaconFemme,
    category: 'femme',
    notes: ['Lavande', 'Fleur d\'Oranger', 'Musc']
  },
  {
    id: '17',
    name: 'Black Opium',
    description: 'Inspiré de YSL - Un parfum addictif aux notes de café et vanille.',
    price: 50,
    image: parfumGold,
    category: 'femme',
    notes: ['Café', 'Vanille', 'Fleur d\'Oranger']
  },
  {
    id: '18',
    name: 'La Vie est Belle',
    description: 'Inspiré de Lancôme - Un hymne au bonheur avec iris et praline.',
    price: 50,
    image: parfumFemme,
    category: 'femme',
    notes: ['Iris', 'Praline', 'Patchouli']
  },
  {
    id: '19',
    name: 'Coco Mademoiselle',
    description: 'Inspiré de Chanel - Une fragrance fraîche et sensuelle.',
    price: 50,
    image: bgFemme,
    category: 'femme',
    notes: ['Orange', 'Jasmin', 'Patchouli']
  },
  {
    id: '20',
    name: 'Escada Celebration',
    description: 'Inspiré de Escada - Une explosion fruitée et joyeuse.',
    price: 50,
    image: parfumGoldSparkle,
    category: 'femme',
    notes: ['Framboise', 'Rose', 'Musc']
  },
  {
    id: '21',
    name: 'Kayali Vanilla',
    description: 'Inspiré de Kayali - Une vanille gourmande et envoûtante.',
    price: 50,
    image: flaconFemme,
    category: 'femme',
    notes: ['Vanille', 'Caramel', 'Santal']
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
  // PACKS - Updated with new images
  {
    id: '13',
    name: 'Pack Trio Découverte',
    description: '3 parfums au choix pour découvrir notre collection à prix réduit.',
    price: 130,
    image: packFemme3,
    category: 'pack',
    notes: ['3 Parfums', 'Au Choix', 'Économie 20 DH']
  },
  {
    id: '14',
    name: 'Pack Prestige',
    description: '4 parfums premium pour une collection complète à prix exceptionnel.',
    price: 160,
    image: packFemmeNoel,
    category: 'pack',
    notes: ['4 Parfums', 'Au Choix', 'Économie 40 DH']
  },
  {
    id: '15',
    name: 'Pack Homme 5',
    description: '5 parfums homme pour une collection masculine complète.',
    price: 200,
    image: packHomme5,
    category: 'pack',
    notes: ['5 Parfums', 'Homme', 'Économie 50 DH']
  },
  {
    id: '16',
    name: 'Pack Collection Complète',
    description: '5 parfums pour avoir toute notre gamme à un prix imbattable.',
    price: 200,
    image: packHommeNoel,
    category: 'pack',
    notes: ['5 Parfums', 'Au Choix', 'Économie 50 DH']
  }
];

export const DELIVERY_FEE = 15;
export const FREE_DELIVERY_THRESHOLD = 300;
export const WHATSAPP_NUMBER = '+212641973545';

// Export catalogue image for use in other components
export { catalogueNew };
