import { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

const ProductGrid = () => {
  const [filter, setFilter] = useState<'all' | 'homme' | 'femme' | 'unisex'>('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <section id="collection" className="py-24 bg-background">
      <div className="container mx-auto px-4">
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
            { value: 'unisex', label: 'Unisex' }
          ].map(({ value, label }) => (
            <Button
              key={value}
              variant={filter === value ? 'default' : 'outline'}
              onClick={() => setFilter(value as typeof filter)}
              className={filter === value ? 'gradient-gold' : ''}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
