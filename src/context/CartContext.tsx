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
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, selectedSize: string, selectedColor: string) => {
    setItems((prev) => {
      const id = String(product.id || product._id);
      const existingItem = prev.find(
        (item) => String(item.id) === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      // Always set image for cart item
      const mainImage = product.image || (Array.isArray(product.images) && product.images.length > 0
        ? (typeof product.images[0] === 'string' ? product.images[0] : product.images[0].url)
        : undefined);

      if (existingItem) {
        return prev.map((item) =>
          String(item.id) === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          { ...product, image: mainImage, quantity: 1, selectedSize, selectedColor, id },
        ];
      }
    });
  };

  const removeFromCart = (itemToRemove: RemoveCartItem) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            String(item.id) === String(itemToRemove.id) &&
            item.selectedSize === itemToRemove.selectedSize &&
            item.selectedColor === itemToRemove.selectedColor
          )
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => String(item.id) !== String(productId));
      }
      return prev.map((item) =>
        String(item.id) === String(productId)
          ? { ...item, quantity }
          : item
      );
    });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice }}
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
