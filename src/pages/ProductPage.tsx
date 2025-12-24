import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Sparkles, Flower2, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Produit non trouvé</h1>
          <p className="text-muted-foreground mb-8">Ce produit n'existe pas ou a été supprimé.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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

  // Get related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
              <li>
                <Link to="/#collection" className="hover:text-primary transition-colors">Collection</Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">{product.name}</li>
            </ol>
          </nav>

          {/* Product Details */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Badge */}
                {product.badge === 'flower' && (
                  <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-rose-400 to-pink-600 flex items-center justify-center animate-badge-flower shadow-xl shadow-pink-500/40">
                    <Flower2 className="h-8 w-8 text-white" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-badge-shine" />
                  </div>
                )}
                {product.badge === 'newyear' && (
                  <div className="absolute top-6 right-6 px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 flex items-center gap-2 animate-badge-glow shadow-xl shadow-amber-500/40 overflow-hidden">
                    <Sparkles className="h-6 w-6 text-white animate-spin-slow" />
                    <span className="text-base font-bold text-white">2025</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-badge-shine" />
                  </div>
                )}
                
                {/* Category Badge */}
                <Badge 
                  variant="secondary" 
                  className="absolute top-6 left-6 bg-background/90 backdrop-blur-md border border-primary/20"
                >
                  {categoryLabels[product.category]}
                </Badge>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <Badge variant="outline" className="w-fit mb-4 border-primary/30 text-primary">
                {categoryLabels[product.category]}
              </Badge>
              
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
                {product.name}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Notes */}
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold mb-3">Notes olfactives</h3>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span 
                      key={note} 
                      className="px-4 py-2 bg-muted/80 rounded-full text-muted-foreground text-sm hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-display text-4xl font-bold text-primary">
                  {product.price}
                </span>
                <span className="text-lg text-muted-foreground">DH</span>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="gradient-gold shadow-xl flex-1 text-lg h-14"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Ajouter au panier
                </Button>
                <Link to="/#collection">
                  <Button variant="outline" size="lg" className="h-14">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Voir la collection
                  </Button>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-border/50">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>🚚</span>
                    <span>Livraison: 15 DH</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>🎁</span>
                    <span>Livraison gratuite dès 300 DH</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>📦</span>
                    <span>Emballage cadeau gratuit</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>✨</span>
                    <span>Qualité premium garantie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="font-display text-3xl font-bold mb-8 text-center">
                Produits similaires
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
