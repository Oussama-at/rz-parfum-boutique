import { Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} ajouté au panier`);
  };

  const categoryLabels = {
    homme: 'Homme',
    femme: 'Femme',
    unisex: 'Unisex'
  };

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm"
        >
          {categoryLabels[product.category]}
        </Badge>

        {/* Quick Add Button */}
        <Button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 gradient-gold"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter au panier
        </Button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.map(note => (
            <span 
              key={note} 
              className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="font-display text-2xl font-bold text-primary">
            {product.price}
          </span>
          <span className="text-sm text-muted-foreground">DH</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
