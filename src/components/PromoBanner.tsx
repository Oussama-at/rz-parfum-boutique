import { Truck } from 'lucide-react';
import { FREE_DELIVERY_THRESHOLD } from '@/data/products';

const PromoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-primary/90 to-primary py-2.5 px-4">
      <div className="container mx-auto flex items-center justify-center gap-2 text-primary-foreground">
        <Truck className="h-4 w-4 animate-pulse" />
        <p className="text-sm font-medium">
          Livraison GRATUITE à partir de {FREE_DELIVERY_THRESHOLD} DH !
        </p>
        <Truck className="h-4 w-4 animate-pulse" />
      </div>
    </div>
  );
};

export default PromoBanner;
