import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useComparison } from '@/contexts/ComparisonContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const ProductComparison = () => {
  const { items, removeFromComparison, clearComparison } = useComparison();
  const { addToCart } = useCart();

  if (items.length === 0) return null;

  const handleAddToCart = (product: typeof items[0]) => {
    addToCart(product);
    toast.success(`${product.name} ajouté au panier`);
  };

  const categoryLabels: Record<string, string> = {
    homme: 'Homme',
    femme: 'Femme',
    unisex: 'Unisex',
    pack: 'Pack'
  };

  // Get all unique notes across all products
  const allNotes = Array.from(new Set(items.flatMap(p => p.notes)));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border shadow-2xl transform transition-transform duration-300">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            Comparer ({items.length}/3)
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {items.length} produit{items.length > 1 ? 's' : ''}
            </Badge>
          </h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={clearComparison}>
              Vider
            </Button>
            <Link to="/compare">
              <Button size="sm" className="gradient-gold">
                Voir comparaison
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-3 gap-4">
          {items.map((product) => (
            <div key={product.id} className="relative bg-card rounded-lg p-3 border border-border/50">
              <button
                onClick={() => removeFromComparison(product.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <X className="h-3 w-3" />
              </button>
              <div className="flex gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-contain rounded-md bg-muted/30"
                />
                <div className="flex-1 min-w-0">
                  <Badge variant="outline" className="text-xs mb-1">
                    {categoryLabels[product.category]}
                  </Badge>
                  <h4 className="font-semibold text-sm truncate">{product.name}</h4>
                  <p className="text-primary font-bold">{product.price} DH</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full mt-2"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingBag className="h-3 w-3 mr-1" />
                Ajouter
              </Button>
            </div>
          ))}
          
          {/* Empty slots */}
          {Array.from({ length: 3 - items.length }).map((_, i) => (
            <div key={`empty-${i}`} className="border-2 border-dashed border-border/50 rounded-lg p-6 flex items-center justify-center text-muted-foreground text-sm">
              Ajoutez un produit
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
