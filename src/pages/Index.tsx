import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import About from '@/components/About';
import Footer from '@/components/Footer';
import PromoBanner from '@/components/PromoBanner';

const Index = () => {
  return (
    <div className="min-h-screen">
      <PromoBanner />
      <Header />
      <Hero />
      <ProductGrid />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
