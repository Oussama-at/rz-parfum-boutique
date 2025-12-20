import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl transition-transform duration-100"
          style={{ transform: `translate(${scrollY * 0.15}px, ${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-light/20 rounded-full blur-3xl transition-transform duration-100"
          style={{ transform: `translate(-${scrollY * 0.1}px, ${scrollY * 0.15}px)` }}
        />
      </div>

      {/* Content with parallax */}
      <div 
        className="relative z-10 container mx-auto px-4 text-center"
        style={{ transform: `translateY(${scrollY * 0.3}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
      >
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
          <span className="text-sm tracking-[0.4em] text-muted-foreground uppercase mb-4 block">
            Maison de Parfum
          </span>
        </div>
        
        <h1 
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in opacity-0"
          style={{ animationDelay: '0.4s' }}
        >
          <span className="text-gradient">R<span className="font-sans text-primary">&</span>Z</span>
          <br />
          <span className="text-foreground">Parfum</span>
        </h1>

        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 animate-fade-in opacity-0"
          style={{ animationDelay: '0.6s' }}
        >
          Découvrez notre collection exclusive de parfums d'exception, 
          créés avec les essences les plus précieuses.
        </p>

        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in opacity-0"
          style={{ animationDelay: '0.8s' }}
        >
          <Button 
            size="lg" 
            className="gradient-gold text-primary-foreground px-8 py-6 text-base font-medium"
            asChild
          >
            <a href="#collection">Découvrir la Collection</a>
          </Button>
        </div>

        <div 
          className="mt-16 flex justify-center gap-12 animate-fade-in opacity-0"
          style={{ animationDelay: '1s' }}
        >
          <div className="text-center">
            <span className="font-display text-3xl font-bold text-primary">50</span>
            <span className="text-xl text-primary">DH</span>
            <p className="text-sm text-muted-foreground mt-1">Par Parfum</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <span className="font-display text-3xl font-bold text-foreground">6+</span>
            <p className="text-sm text-muted-foreground mt-1">Fragrances</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <span className="font-display text-3xl font-bold text-foreground">100%</span>
            <p className="text-sm text-muted-foreground mt-1">Qualité</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
