import { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, MessageCircle, Truck, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, WHATSAPP_NUMBER } from '@/data/products';
import { Button } from '@/components/ui/button';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MOROCCAN_CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 
  'Oujda', 'Kenitra', 'Tétouan', 'Safi', 'Mohammedia', 'El Jadida', 'Béni Mellal',
  'Nador', 'Taza', 'Settat', 'Berrechid', 'Khémisset', 'Khouribga', 'Larache',
  'Guelmim', 'Ksar El Kébir', 'Ouarzazate', 'Errachidia', 'Essaouira', 'Al Hoceima',
  'Taourirt', 'Berkane', 'Sidi Slimane', 'Sidi Kacem', 'Azrou', 'Ifrane'
].sort();

const STORAGE_KEY = 'rz-parfum-delivery-info';

interface DeliveryInfo {
  name: string;
  phone: string;
  city: string;
  address: string;
}

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getSubtotal, getTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<DeliveryInfo>({
    name: '',
    phone: '',
    city: '',
    address: ''
  });

  // Load saved delivery info on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } catch (e) {
        console.error('Failed to load saved delivery info');
      }
    }
  }, []);

  // Save delivery info when it changes
  useEffect(() => {
    if (formData.name || formData.phone || formData.city || formData.address) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const subtotal = getSubtotal();
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const amountToFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal;
  const progressPercent = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const deliveryFee = isFreeDelivery ? 0 : DELIVERY_FEE;

  const isFormValid = formData.name.trim() && formData.phone.trim() && formData.city && formData.address.trim();

  const handleOrder = async () => {
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Save order to database
      const orderItems = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const { error } = await supabase.from('orders').insert({
        customer_name: formData.name.trim(),
        customer_phone: formData.phone.trim(),
        customer_city: formData.city,
        customer_address: formData.address.trim(),
        items: orderItems,
        subtotal: subtotal,
        delivery_fee: deliveryFee,
        total: getTotal(),
      });

      if (error) throw error;

      toast({
        title: '✅ Commande enregistrée',
        description: 'Ouverture de WhatsApp…',
      });

      // Open WhatsApp (no popup => avoids popup blockers)
      const orderDetails = items
        .map(item => `• ${item.name} x${item.quantity} = ${item.price * item.quantity} DH`)
        .join('\n');

      const deliveryText = isFreeDelivery ? 'GRATUITE 🎉' : `${DELIVERY_FEE} DH`;
      const message = `🌹 *Nouvelle Commande R Z Parfum*\n\n📋 *Informations de livraison:*\n👤 Nom: ${formData.name.trim()}\n📞 Tél: ${formData.phone.trim()}\n🏙️ Ville: ${formData.city}\n📍 Adresse: ${formData.address.trim()}\n\n🛒 *Articles:*\n${orderDetails}\n\n📦 Sous-total: ${subtotal} DH\n🚚 Livraison: ${deliveryText}\n💰 *Total: ${getTotal()} DH*`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;

      clearCart();
      window.location.assign(whatsappUrl);
    } catch (error) {
      console.error('Order error:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de passer la commande. Réessayez.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Votre Panier</SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <MessageCircle className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Votre panier est vide</p>
            <p className="text-sm text-muted-foreground mt-2">
              Découvrez notre collection de parfums
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle className="font-display text-2xl">
          Votre Panier ({items.length})
        </SheetTitle>
      </SheetHeader>

      {/* Free Delivery Progress */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Truck className="h-4 w-4 text-primary" />
          {isFreeDelivery ? (
            <span className="text-sm font-medium text-green-600">
              🎉 Livraison GRATUITE !
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">
              Plus que <span className="font-semibold text-primary">{amountToFreeDelivery} DH</span> pour la livraison gratuite
            </span>
          )}
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Items */}
      <div className="flex-1 overflow-auto py-4 space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex gap-4 p-3 bg-muted/50 rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-24 object-contain rounded-md bg-muted/30"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{item.name}</h4>
              <p className="text-primary font-semibold mt-1">{item.price} DH</p>
              
              <div className="flex items-center gap-2 mt-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Delivery Form */}
        <div className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Informations de livraison
          </h4>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs">Nom complet *</Label>
            <Input
              id="name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="h-9"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs">Téléphone *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="06 XX XX XX XX"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="h-9"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city" className="text-xs">Ville *</Label>
            <Select
              value={formData.city}
              onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Sélectionnez votre ville" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border z-50 max-h-60">
                {MOROCCAN_CITIES.map(city => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="text-xs">Adresse complète *</Label>
            <Input
              id="address"
              placeholder="Rue, numéro, quartier..."
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="h-9"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Sous-total</span>
          <span>{subtotal} DH</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Livraison</span>
          {isFreeDelivery ? (
            <span className="text-green-600 font-medium">GRATUITE</span>
          ) : (
            <span>{DELIVERY_FEE} DH</span>
          )}
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span className="text-primary">{getTotal()} DH</span>
        </div>

        <Button
          className="w-full mt-4 gradient-gold text-primary-foreground py-6 text-base"
          onClick={handleOrder}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <MessageCircle className="h-5 w-5 mr-2" />
          )}
          {isSubmitting ? 'Envoi en cours...' : 'Commander via WhatsApp'}
        </Button>
        {!isFormValid && items.length > 0 && (
          <p className="text-xs text-center text-muted-foreground">
            Remplissez vos informations de livraison pour commander
          </p>
        )}

        <Button
          variant="ghost"
          className="w-full text-muted-foreground"
          onClick={clearCart}
        >
          Vider le panier
        </Button>
      </div>
    </div>
  );
};

export default Cart;
