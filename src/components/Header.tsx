import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Cart from './Cart';

const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex flex-col items-center">
          <span className="font-display text-2xl md:text-3xl font-bold text-gradient">
            R<span className="text-primary">&</span>Z
          </span>
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase font-sans">
            Parfum
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#collection" className="text-sm tracking-wide hover:text-primary transition-colors">
            Collection
          </a>
          <a href="#about" className="text-sm tracking-wide hover:text-primary transition-colors">
            À Propos
          </a>
          <a href="#contact" className="text-sm tracking-wide hover:text-primary transition-colors">
            Contact
          </a>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg">
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
