import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, Send, MessageCircle, Mail } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

// Demo placeholders—replace with real contact points when ready
const WHATSAPP_NUMBER = '+355600000000';

const Cart = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
  const whatsappUrl = useMemo(
    () => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`,
    [orderMessage, whatsappNumber]
  );

  // Demo-only email verification: code is always 123456
  const sendVerificationCode = async () => {
    setErrorMessage('');
    setInfoMessage('');
    if (!email) {
      setErrorMessage('Please enter your email to get a verification code.');
      return;
    }
    setSendingCode(true);
    await new Promise((res) => setTimeout(res, 800));
    setSendingCode(false);
    setCodeSent(true);
    setInfoMessage('Demo code sent. Use 123456 to verify.');
  };

  const verifyCode = async () => {
    setErrorMessage('');
    setInfoMessage('');
    if (!code) {
      setErrorMessage('Enter the code you received.');
      return;
    }
    setVerifyingCode(true);
    await new Promise((res) => setTimeout(res, 600));
    setVerifyingCode(false);
    if (code === '123456') {
      setCodeVerified(true);
      setInfoMessage('Email verified (demo). Order saved for admin follow-up.');
    } else {
      setErrorMessage('Invalid code (demo uses 123456).');
    }
  };

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
                    You are requesting to order these items. Choose WhatsApp or the email flow below.
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
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 text-white px-4 py-2 font-body hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Send via WhatsApp
                </a>
                <div className="rounded-md border border-border p-3 space-y-2 bg-muted/40">
                  <div className="flex items-center gap-2 text-sm font-body text-foreground">
                    <Mail className="w-4 h-4" />
                    <span>Send via Email (demo)</span>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded border border-border bg-background px-3 py-2 text-sm font-body"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={sendingCode}
                      onClick={sendVerificationCode}
                    >
                      {sendingCode ? 'Sending…' : codeSent ? 'Resend Code' : 'Send Code'}
                    </Button>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="123456"
                      className="flex-1 rounded border border-border bg-background px-3 py-2 text-sm font-body"
                    />
                    <Button
                      type="button"
                      size="sm"
                      disabled={!codeSent || verifyingCode}
                      onClick={verifyCode}
                    >
                      {verifyingCode ? 'Verifying…' : 'Verify'}
                    </Button>
                  </div>
                  {infoMessage && <p className="text-xs text-foreground">{infoMessage}</p>}
                  {errorMessage && <p className="text-xs text-destructive">{errorMessage}</p>}
                  {codeVerified && (
                    <p className="text-xs text-emerald-600">
                      Verified (demo). Order + email saved for admin follow-up.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="ghost" onClick={() => setShowConfirm(false)}>
                  Cancel
                </Button>
              </div>

              <div className="space-y-1 text-xs text-muted-foreground font-body">
                <p>WhatsApp opens with the order prefilled. Update the WhatsApp number when ready.</p>
                <p>Email flow is demo-only: code is 123456 and data is not actually emailed.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
