import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/types/product';

interface RemoveCartItem {
  id: string;
  selectedSize: string;
  selectedColor: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (item: RemoveCartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Add a static, invisible item to always keep at least one item in cart
  const INVISIBLE_ITEM: CartItem = {
    id: '__invisible__',
    name: '',
    price: 0,
    category: '',
    description: '',
    sizes: [],
    colors: [],
    inStock: false,
    quantity: 1,
    selectedSize: '',
    selectedColor: '',
    image: '',
  };
  const [items, setItems] = useState<CartItem[]>([INVISIBLE_ITEM]);

  const addToCart = (product: Product, selectedSize: string, selectedColor: string) => {
    setItems((prev) => {
      // Always keep the invisible item in the cart
      const filtered = prev.filter(item => item.id !== INVISIBLE_ITEM.id);
      const id = String(product.id || product._id);
      const existingItem = filtered.find(
        (item) => String(item.id) === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      // Always set image for cart item
      const mainImage = product.image || (Array.isArray(product.images) && product.images.length > 0
        ? (typeof product.images[0] === 'string' ? product.images[0] : product.images[0].url)
        : undefined);

      let newItems;
      if (existingItem) {
        newItems = filtered.map((item) =>
          String(item.id) === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [
          ...filtered,
          { ...product, image: mainImage, quantity: 1, selectedSize, selectedColor, id },
        ];
      }
      // Always add the invisible item back
      return [INVISIBLE_ITEM, ...newItems];
    });
  };

  const removeFromCart = (itemToRemove: RemoveCartItem) => {
    setItems((prev) => {
      // Never remove the invisible item
      return prev.filter(
        (item) =>
          item.id === INVISIBLE_ITEM.id ||
          !(
            String(item.id) === String(itemToRemove.id) &&
            item.selectedSize === itemToRemove.selectedSize &&
            item.selectedColor === itemToRemove.selectedColor
          )
      );
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) => {
      // Never update the invisible item
      if (productId === INVISIBLE_ITEM.id) return prev;
      if (quantity <= 0) {
        return prev.filter((item) => String(item.id) !== String(productId) || item.id === INVISIBLE_ITEM.id);
      }
      return prev.map((item) =>
        String(item.id) === String(productId)
          ? { ...item, quantity }
          : item
      );
    });
  };

  // Remove clearCart entirely

  // Only count visible items for totals
  const visibleItems = items.filter(item => item.id !== INVISIBLE_ITEM.id);
  const totalItems = visibleItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = visibleItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: visibleItems, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
