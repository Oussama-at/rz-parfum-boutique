import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, X, Plus } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useComparison } from '@/contexts/ComparisonContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const ComparePage = () => {
  const { items, removeFromComparison, clearComparison } = useComparison();
  const { addToCart } = useCart();

  const handleAddToCart = (product: typeof items[0]) => {
    addToCart(product);
    toast.success(`${product.name} ajouté au panier`);
  };

  const handleAddAllToCart = () => {
    items.forEach(product => addToCart(product));
    toast.success(`${items.length} produits ajoutés au panier`);
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
              <li className="text-foreground font-medium">Comparaison</li>
            </ol>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient">
              Comparer les produits
            </h1>
            {items.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={clearComparison}>
                  Vider
                </Button>
                <Button onClick={handleAddAllToCart} className="gradient-gold">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Tout ajouter au panier
                </Button>
              </div>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                <Plus className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-display font-semibold mb-4">Aucun produit à comparer</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Ajoutez jusqu'à 3 produits pour les comparer côte à côte et trouver le parfum parfait.
              </p>
              <Link to="/#collection">
                <Button className="gradient-gold">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Découvrir la collection
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 border-b border-border bg-muted/30 rounded-tl-xl font-semibold">
                      Caractéristiques
                    </th>
                    {items.map((product) => (
                      <th key={product.id} className="p-4 border-b border-border bg-muted/30 min-w-[250px]">
                        <div className="relative">
                          <button
                            onClick={() => removeFromComparison(product.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <Link to={`/product/${product.id}`}>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-32 h-32 object-contain mx-auto mb-3 hover:scale-105 transition-transform"
                            />
                          </Link>
                          <Link to={`/product/${product.id}`} className="font-display text-lg hover:text-primary transition-colors">
                            {product.name}
                          </Link>
                        </div>
                      </th>
                    ))}
                    {Array.from({ length: 3 - items.length }).map((_, i) => (
                      <th key={`empty-${i}`} className="p-4 border-b border-border bg-muted/30 min-w-[250px]">
                        <div className="h-40 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground">
                          <Link to="/#collection" className="text-center hover:text-primary transition-colors">
                            <Plus className="h-8 w-8 mx-auto mb-2" />
                            Ajouter un produit
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Price */}
                  <tr>
                    <td className="p-4 border-b border-border font-medium">Prix</td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4 border-b border-border text-center">
                        <span className="font-display text-2xl font-bold text-primary">{product.price} DH</span>
                      </td>
                    ))}
                    {Array.from({ length: 3 - items.length }).map((_, i) => (
                      <td key={`empty-${i}`} className="p-4 border-b border-border"></td>
                    ))}
                  </tr>

                  {/* Category */}
                  <tr>
                    <td className="p-4 border-b border-border font-medium">Catégorie</td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4 border-b border-border text-center">
                        <Badge variant="secondary">{categoryLabels[product.category]}</Badge>
                      </td>
                    ))}
                    {Array.from({ length: 3 - items.length }).map((_, i) => (
                      <td key={`empty-${i}`} className="p-4 border-b border-border"></td>
                    ))}
                  </tr>

                  {/* Description */}
                  <tr>
                    <td className="p-4 border-b border-border font-medium">Description</td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4 border-b border-border text-center text-sm text-muted-foreground">
                        {product.description}
                      </td>
                    ))}
                    {Array.from({ length: 3 - items.length }).map((_, i) => (
                      <td key={`empty-${i}`} className="p-4 border-b border-border"></td>
                    ))}
                  </tr>

                  {/* Notes */}
                  <tr>
                    <td className="p-4 border-b border-border font-medium">Notes olfactives</td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4 border-b border-border text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {product.notes.map((note) => (
                            <span key={note} className="text-xs px-2 py-1 bg-muted rounded-full">
                              {note}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                    {Array.from({ length: 3 - items.length }).map((_, i) => (
                      <td key={`empty-${i}`} className="p-4 border-b border-border"></td>
                    ))}
                  </tr>

                  {/* Individual Notes Comparison */}
                  {allNotes.map((note) => (
                    <tr key={note}>
                      <td className="p-4 border-b border-border text-sm pl-8">{note}</td>
                      {items.map((product) => (
                        <td key={product.id} className="p-4 border-b border-border text-center">
                          {product.notes.includes(note) ? (
                            <span className="text-green-500 font-bold">✓</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      ))}
                      {Array.from({ length: 3 - items.length }).map((_, i) => (
                        <td key={`empty-${i}`} className="p-4 border-b border-border"></td>
                      ))}
                    </tr>
                  ))}

                  {/* Add to Cart */}
                  <tr>
                    <td className="p-4 font-medium">Action</td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <Button onClick={() => handleAddToCart(product)} className="gradient-gold">
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Ajouter au panier
                        </Button>
                      </td>
                    ))}
                    {Array.from({ length: 3 - items.length }).map((_, i) => (
                      <td key={`empty-${i}`} className="p-4"></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComparePage;
