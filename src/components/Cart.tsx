import { Minus, Plus, Trash2, MessageCircle, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, WHATSAPP_NUMBER } from '@/data/products';
import { Button } from '@/components/ui/button';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getSubtotal, getTotal, clearCart } = useCart();

  const subtotal = getSubtotal();
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const amountToFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal;
  const progressPercent = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);

  const handleWhatsAppOrder = () => {
    const orderDetails = items
      .map(item => `• ${item.name} x${item.quantity} = ${item.price * item.quantity} DH`)
      .join('\n');
    
    const deliveryText = isFreeDelivery ? 'GRATUITE 🎉' : `${DELIVERY_FEE} DH`;
    const message = `🌹 *Nouvelle Commande R Z Parfum*\n\n${orderDetails}\n\n📦 Sous-total: ${subtotal} DH\n🚚 Livraison: ${deliveryText}\n💰 *Total: ${getTotal()} DH*\n\n✨ Je souhaite passer cette commande.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
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
      <div className="flex-1 overflow-auto py-6 space-y-4">
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
          onClick={handleWhatsAppOrder}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Commander via WhatsApp
        </Button>

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
