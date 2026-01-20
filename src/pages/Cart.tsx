import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Send, Instagram, MessageCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

// Demo placeholders—replace with real contact points when ready
const INSTAGRAM_USERNAME = 'demo_handle';
const WHATSAPP_NUMBER = '+355600000000';

const Cart = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-display text-3xl text-foreground mb-2">Your Cart is Empty</h1>
          <p className="font-body text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/shop">
            <Button className="btn-primary font-body uppercase tracking-wider">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const shipping = totalPrice >= 150 ? 0 : 15;
  const total = totalPrice + shipping;
  const orderMessage = useMemo(() => {
    const lines = items.map(
      (item) =>
        `${item.name} (Size: ${item.selectedSize}, Color: ${item.selectedColor}) x${item.quantity} - $${(
          item.price * item.quantity
        ).toFixed(2)}`
    );

    const summary = [
      `Subtotal: $${totalPrice.toFixed(2)}`,
      `Shipping: ${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}`,
      `Total: $${total.toFixed(2)}`,
    ];

    return ['Order request:', ...lines, ...summary].join('\n');
  }, [items, shipping, total, totalPrice]);

  const whatsappNumber = useMemo(() => WHATSAPP_NUMBER.replace(/\D/g, ''), []);
  const instagramUrl = useMemo(() => `https://www.instagram.com/${INSTAGRAM_USERNAME}`, []);
  const whatsappUrl = useMemo(
    () => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`,
    [orderMessage, whatsappNumber]
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-4xl text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="flex gap-6 pb-6 border-b border-border animate-fade-in"
              >
                <Link to={`/product/${item.id}`} className="w-24 md:w-32 aspect-[3/4] flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-display text-lg text-foreground hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="font-body text-sm text-muted-foreground mt-1">
                        Size: {item.selectedSize} | Color: {item.selectedColor}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-body">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-body font-semibold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="font-body text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-muted/50 rounded-lg p-6 sticky top-24">
              <h2 className="font-display text-xl text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-accent">
                    Add ${(150 - totalPrice).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="border-t border-border pt-4 flex justify-between text-lg">
                  <span className="font-display text-foreground">Total</span>
                  <span className="font-display text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full mt-6 btn-primary font-body uppercase tracking-wider"
                onClick={() => setShowConfirm(true)}
              >
                Send this Order
                <Send className="w-4 h-4 ml-2" />
              </Button>

              <Link
                to="/shop"
                className="block text-center mt-4 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="bg-background text-foreground w-full max-w-lg rounded-lg shadow-lg p-6 space-y-4 animate-fade-in">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl">Confirm & Send</h3>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    You are requesting to order these items. If possible, our staff will contact you.
                    Choose Instagram or WhatsApp to send the order details.
                  </p>
                </div>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-muted/50 rounded-md p-3 space-y-2 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between text-sm font-body">
                    <div className="text-foreground">
                      {item.name}
                      <span className="text-muted-foreground"> · {item.selectedSize} / {item.selectedColor}</span>
                      <span className="text-muted-foreground"> · x{item.quantity}</span>
                    </div>
                    <span className="text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 text-sm font-body space-y-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 font-body hover:bg-muted transition-colors"
                >
                  <Instagram className="w-4 h-4" /> Send via Instagram
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 text-white px-4 py-2 font-body hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Send via WhatsApp
                </a>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setShowConfirm(false)}>
                  Cancel
                </Button>
                <Button onClick={() => window.open(whatsappUrl, '_blank')} className="btn-primary">
                  Send Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground font-body">
                Demo note: Instagram handle and WhatsApp number are placeholders. Replace them with real contact details to enable messaging.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
