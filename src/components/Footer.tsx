import { MessageCircle, Instagram, Facebook } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/products';

const Footer = () => {
  return (
    <footer id="contact" className="bg-noir text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex flex-col mb-6">
              <span className="font-display text-3xl font-bold text-gradient">R Z</span>
              <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                Parfum
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Découvrez l'essence du luxe avec notre collection de parfums exclusifs. 
              Qualité premium, prix accessible.
            </p>
            <div className="flex gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a href="#collection" className="text-muted-foreground hover:text-primary transition-colors">
                  Collection
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  À Propos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>📍 Maroc</li>
              <li>📞 {WHATSAPP_NUMBER}</li>
              <li>🚚 Livraison: 20 DH</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 R Z Parfum. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
