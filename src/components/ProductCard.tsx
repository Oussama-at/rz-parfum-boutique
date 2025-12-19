import { Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} ajouté au panier`);
  };

  const categoryLabels: Record<string, string> = {
    homme: 'Homme',
    femme: 'Femme',
    unisex: 'Unisex',
    pack: 'Pack'
  };

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:scale-[1.02]">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
        {/* Shine effect overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-4 left-4 bg-background/90 backdrop-blur-md border border-primary/20 transition-transform duration-300 group-hover:scale-105"
        >
          {categoryLabels[product.category]}
        </Badge>

        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button
            onClick={handleAddToCart}
            className="w-full gradient-gold shadow-xl"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter au panier
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 transition-transform duration-300 group-hover:-translate-y-1">
        <h3 className="font-display text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.map((note, i) => (
            <span 
              key={note} 
              className="text-xs px-2 py-1 bg-muted/80 rounded-full text-muted-foreground transition-all duration-300 hover:bg-primary/20 hover:text-primary"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 transition-transform duration-300 group-hover:scale-105 origin-left">
          <span className="font-display text-2xl font-bold text-primary">
            {product.price}
          </span>
          <span className="text-sm text-muted-foreground">DH</span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-gold to-primary w-0 group-hover:w-full transition-all duration-500" />
    </div>
  );
};

export default ProductCard;