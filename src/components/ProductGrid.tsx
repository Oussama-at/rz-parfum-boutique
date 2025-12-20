import { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

const ProductGrid = () => {
  const [filter, setFilter] = useState<'all' | 'homme' | 'femme' | 'unisex' | 'pack'>('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <section id="collection" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
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

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {[
            { value: 'all', label: 'Tous' },
            { value: 'homme', label: 'Homme' },
            { value: 'femme', label: 'Femme' },
            { value: 'unisex', label: 'Unisex' },
            { value: 'pack', label: 'Pack' }
          ].map(({ value, label }) => (
            <Button
              key={value}
              variant={filter === value ? 'default' : 'outline'}
              onClick={() => setFilter(value as typeof filter)}
              className={`transition-all duration-300 ${
                filter === value 
                  ? 'gradient-gold shadow-lg shadow-primary/20 text-noir' 
                  : 'hover:border-primary/50 hover:bg-primary/5 text-foreground hover:text-noir'
              }`}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Product count */}
        <div className="text-center mb-8">
          <span className="text-sm text-muted-foreground">
            {filteredProducts.length} parfum{filteredProducts.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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

        {/* Bottom CTA */}
        <div className="text-center mt-16">
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