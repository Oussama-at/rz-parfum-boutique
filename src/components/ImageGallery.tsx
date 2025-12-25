import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { ZoomIn, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <div className="relative">
      {/* Main Image */}
      <div 
        className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 relative group cursor-zoom-in"
        onClick={() => setIsZoomOpen(true)}
      >
        <img
          src={images[selectedIndex]}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Zoom indicator */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <ZoomIn className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Thumbnail Carousel */}
      {images.length > 1 && (
        <div className="mt-4">
          <Carousel opts={{ align: 'start', loop: true }}>
            <CarouselContent className="-ml-2">
              {images.map((image, index) => (
                <CarouselItem key={index} className="pl-2 basis-1/4">
                  <button
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300",
                      selectedIndex === index 
                        ? "border-primary ring-2 ring-primary/30" 
                        : "border-border/50 hover:border-primary/50"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${productName} - Miniature ${index + 1}`}
                      className="w-full h-full object-contain p-2 bg-muted/30"
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 4 && (
              <>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </>
            )}
          </Carousel>
        </div>
      )}

      {/* Zoom Dialog */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          
          <Carousel opts={{ startIndex: selectedIndex, loop: true }} className="w-full h-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="flex items-center justify-center min-h-[80vh]">
                  <img
                    src={image}
                    alt={`${productName} - Image ${index + 1}`}
                    className="max-w-full max-h-[85vh] object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/10 hover:bg-white/20 border-none text-white" />
            <CarouselNext className="right-4 bg-white/10 hover:bg-white/20 border-none text-white" />
          </Carousel>
          
          {/* Dots indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === selectedIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
                  )}
                />
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
