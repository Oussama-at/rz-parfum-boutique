import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import ProductFilters, { FilterState, SortOption } from './ProductFilters';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';

const ProductGrid = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  
  // Calculate max price and available notes
  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price)), []);
  const availableNotes = useMemo(() => {
    const notesSet = new Set<string>();
    products.forEach(p => p.notes.forEach(n => notesSet.add(n)));
    return Array.from(notesSet).sort();
  }, []);

  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: [0, maxPrice],
    notes: [],
    searchQuery: '',
    sortBy: 'default'
  });

  // Sort function
  const sortProducts = (productsToSort: Product[], sortBy: SortOption): Product[] => {
    const sorted = [...productsToSort];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name, 'fr'));
      case 'popular':
        // Sort by category popularity: packs first, then homme, femme, unisex
        const categoryOrder = ['pack', 'homme', 'femme', 'unisex'];
        return sorted.sort((a, b) => {
          const aIndex = categoryOrder.indexOf(a.category);
          const bIndex = categoryOrder.indexOf(b.category);
          return aIndex - bIndex;
        });
      default:
        return sorted;
    }
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      // Search filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDescription = product.description?.toLowerCase().includes(query);
        const matchesNotes = product.notes.some(note => note.toLowerCase().includes(query));
        if (!matchesName && !matchesDescription && !matchesNotes) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      
      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Notes filter - product must have at least one of the selected notes
      if (filters.notes.length > 0) {
        const hasMatchingNote = product.notes.some(note => filters.notes.includes(note));
        if (!hasMatchingNote) {
          return false;
        }
      }
      
      return true;
    });

    // Apply sorting
    return sortProducts(result, filters.sortBy);
  }, [filters]);

  return (
    <section id="collection" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-12 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="text-sm tracking-[0.3em] text-primary uppercase mb-3 block">
            Notre Sélection
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            La Collection
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Chaque parfum est une œuvre d'art olfactive, créée avec passion et expertise.
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside className={cn(
            "transition-all duration-700 delay-100",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="lg:sticky lg:top-24 bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
              <h3 className="font-display text-lg font-semibold mb-4 hidden lg:block">Filtres</h3>
              <ProductFilters 
                filters={filters} 
                onFiltersChange={setFilters}
                availableNotes={availableNotes}
                maxPrice={maxPrice}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div>
            {/* Product count */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} parfum{filteredProducts.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">Aucun parfum ne correspond à vos critères.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({
                    category: 'all',
                    priceRange: [0, maxPrice],
                    notes: [],
                    searchQuery: '',
                    sortBy: 'default'
                  })}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Vous cherchez quelque chose de spécifique ?</p>
          <Button variant="outline" size="lg" className="hover:gradient-gold hover:text-noir hover:border-transparent transition-all duration-300">
            Demander un conseil
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
