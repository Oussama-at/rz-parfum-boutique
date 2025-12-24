import Header from '@/components/Header';
import Footer from '@/components/Footer';
import catalogueNew from '@/assets/catalogue-new.jpg';

const CataloguePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4 block">
                Notre Collection
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                <span className="text-gradient">Catalogue R&Z</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Découvrez notre collection exclusive inspirée des plus grandes maisons de parfumerie
              </p>
            </div>

            {/* Full Catalogue Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-6xl mx-auto">
              <img 
                src={catalogueNew} 
                alt="Catalogue R&Z Parfum - Collection Complète Femmes et Hommes"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Call to action */}
            <div className="text-center mt-12">
              <a 
                href="/#collection" 
                className="inline-flex items-center gap-2 px-8 py-4 gradient-gold text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity text-lg"
              >
                Commander Maintenant
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CataloguePage;
