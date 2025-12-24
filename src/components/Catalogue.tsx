import catalogueNew from '@/assets/catalogue-new.jpg';

const Catalogue = () => {
  return (
    <section id="catalogue" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Voilà le Catalogue</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez notre collection exclusive inspirée des plus grandes maisons de parfumerie
          </p>
        </div>

        {/* Catalogue Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <img 
            src={catalogueNew} 
            alt="Catalogue R&Z Parfum - Collection Femmes et Hommes"
            className="w-full h-auto object-cover"
          />
          
          {/* Overlay gradient for elegance */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Call to action */}
        <div className="text-center mt-8">
          <a 
            href="#collection" 
            className="inline-flex items-center gap-2 px-8 py-3 gradient-gold text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Voir la Collection Complète
          </a>
        </div>
      </div>
    </section>
  );
};

export default Catalogue;
