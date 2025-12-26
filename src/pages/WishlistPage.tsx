import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';

const WishlistPage = () => {
  const { items, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    items.forEach(item => addToCart(item));
    toast.success(`${items.length} produit(s) ajouté(s) au panier`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">Favoris</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
              <Heart className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Mes Favoris
            </h1>
            <p className="text-muted-foreground">
              {items.length > 0 
                ? `Vous avez ${items.length} parfum${items.length > 1 ? 's' : ''} dans vos favoris`
                : 'Votre liste de favoris est vide'
              }
            </p>
          </div>

          {items.length > 0 ? (
            <>
              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button onClick={handleAddAllToCart} className="gradient-gold">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Tout ajouter au panier
                </Button>
                <Button variant="outline" onClick={clearWishlist} className="text-red-500 border-red-500/30 hover:bg-red-500/10">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Vider les favoris
                </Button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((product, index) => (
                  <div 
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
              </div>

              {/* Discover Collection Button at the bottom */}
              <div className="text-center mt-12">
                <Link to="/#collection">
                  <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Découvrir la collection
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-8">
                Parcourez notre collection et ajoutez vos parfums préférés à vos favoris.
              </p>
              <Link to="/#collection">
                <Button className="gradient-gold">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Découvrir la collection
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
