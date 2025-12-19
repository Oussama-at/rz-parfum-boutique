import { useState, useEffect, useRef } from 'react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

const ProductGrid = () => {
  const [filter, setFilter] = useState<'all' | 'homme' | 'femme' | 'unisex' | 'pack'>('all');
  const [visibleProducts, setVisibleProducts] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleProducts(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const productElements = gridRef.current?.querySelectorAll('[data-index]');
    productElements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredProducts]);

  // Reset visible products when filter changes
  useEffect(() => {
    setVisibleProducts(new Set());
    // Trigger re-observation after a short delay
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Number(entry.target.getAttribute('data-index'));
              setVisibleProducts(prev => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      const productElements = gridRef.current?.querySelectorAll('[data-index]');
      productElements?.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }, 100);
  }, [filter]);

  return (
    <section id="collection" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with fade-in animation */}
        <div className="text-center mb-12">
          <span className="text-sm tracking-[0.3em] text-primary uppercase mb-3 block animate-fade-in">
            Notre Sélection
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            La Collection
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Chaque parfum est une œuvre d'art olfactive, créée avec passion et expertise.
          </p>
        </div>

        {/* Filters with enhanced styling */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {[
            { value: 'all', label: 'Tous' },
            { value: 'homme', label: 'Homme' },
            { value: 'femme', label: 'Femme' },
            { value: 'unisex', label: 'Unisex' },
            { value: 'pack', label: 'Pack' }
          ].map(({ value, label }, index) => (
            <Button
              key={value}
              variant={filter === value ? 'default' : 'outline'}
              onClick={() => setFilter(value as typeof filter)}
              className={`transition-all duration-300 ${
                filter === value 
                  ? 'gradient-gold shadow-lg shadow-primary/20 scale-105' 
                  : 'hover:border-primary/50 hover:bg-primary/5'
              }`}
              style={{ 
                animationDelay: `${0.3 + index * 0.05}s`,
              }}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Product count indicator */}
        <div className="text-center mb-8">
          <span className="text-sm text-muted-foreground">
            {filteredProducts.length} parfum{filteredProducts.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Grid with staggered reveal animations */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              data-index={index}
              className="opacity-0"
              style={{ 
                animation: visibleProducts.has(index) ? 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
                animationDelay: `${(index % 4) * 0.1}s`,
                perspective: '1000px',
              }}
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-muted-foreground mb-4">Vous cherchez quelque chose de spécifique ?</p>
          <Button variant="outline" size="lg" className="hover:gradient-gold hover:text-foreground hover:border-transparent transition-all duration-300">
            Demander un conseil
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;