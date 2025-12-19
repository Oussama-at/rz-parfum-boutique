import { Plus, Eye } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} ajouté au panier`);
  };

  const categoryLabels = {
    homme: 'Homme',
    femme: 'Femme',
    unisex: 'Unisex',
    pack: 'Pack'
  };

  return (
    <div 
      className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Shine effect on hover */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
            transform: isHovered ? 'translateX(200%)' : 'translateX(-100%)',
            transition: 'transform 0.8s ease-in-out'
          }}
        />
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-1000 ease-out"
          style={{
            transform: isHovered ? 'scale(1.15) rotate(2deg)' : 'scale(1) rotate(0deg)',
          }}
        />
        
        {/* Gradient overlay with dynamic opacity */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0.3 }}
        />
        
        {/* Category Badge with animation */}
        <Badge 
          variant="secondary" 
          className="absolute top-4 left-4 bg-background/90 backdrop-blur-md transition-all duration-300 border border-primary/20"
          style={{
            transform: isHovered ? 'translateY(0) scale(1.05)' : 'translateY(0) scale(1)',
          }}
        >
          {categoryLabels[product.category]}
        </Badge>

        {/* Floating action buttons */}
        <div 
          className="absolute top-4 right-4 flex flex-col gap-2 transition-all duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
          }}
        >
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-md hover:bg-primary hover:text-primary-foreground shadow-lg"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Add Button */}
        <div 
          className="absolute bottom-4 left-4 right-4 transition-all duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <Button
            onClick={handleAddToCart}
            className="w-full gradient-gold shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter au panier
          </Button>
        </div>
      </div>

      {/* Content with slide-up animation */}
      <div 
        className="p-5 transition-all duration-500"
        style={{
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        <h3 
          className="font-display text-lg font-semibold mb-2 transition-all duration-300"
          style={{
            color: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
          }}
        >
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Notes with staggered animation */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.map((note, noteIndex) => (
            <span 
              key={note} 
              className="text-xs px-2 py-1 bg-muted/80 rounded-full text-muted-foreground transition-all duration-300 hover:bg-primary/20 hover:text-primary"
              style={{
                transitionDelay: isHovered ? `${noteIndex * 50}ms` : '0ms',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price with emphasis animation */}
        <div 
          className="flex items-baseline gap-1 transition-all duration-300"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transformOrigin: 'left bottom',
          }}
        >
          <span className="font-display text-2xl font-bold text-primary">
            {product.price}
          </span>
          <span className="text-sm text-muted-foreground">DH</span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-gold to-primary transition-all duration-500"
        style={{
          width: isHovered ? '100%' : '0%',
        }}
      />
    </div>
  );
};

export default ProductCard;