import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const About = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div 
        ref={sectionRef}
        className={cn(
          "container mx-auto px-4 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={cn(
            "relative transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&h=600&fit=crop"
                alt="R Z Parfum Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gold-light/20 rounded-full -z-10" />
          </div>

          <div className={cn(
            "transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <span className="text-sm tracking-[0.3em] text-primary uppercase mb-3 block">
              Notre Histoire
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              L'Art de la <br />
              <span className="text-gradient">Parfumerie</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              R Z Parfum est né d'une passion pour les fragrances d'exception. 
              Chaque parfum de notre collection est soigneusement créé avec les 
              meilleurs ingrédients, offrant une expérience olfactive unique et inoubliable.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Notre engagement envers la qualité et l'excellence nous permet de vous 
              proposer des parfums de luxe à un prix accessible de seulement 50 DH, 
              avec livraison à domicile dans tout le Maroc.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Qualité Premium</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary mb-1">50 DH</div>
                <div className="text-sm text-muted-foreground">Prix Unique</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary mb-1">24h</div>
                <div className="text-sm text-muted-foreground">Livraison Rapide</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
