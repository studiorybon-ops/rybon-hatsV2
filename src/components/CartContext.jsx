import { createContext, useContext, useState } from 'react';

export const DOP_TO_USD = 58;

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState(null);

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty < 1) { removeItem(productId); return; }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: qty } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
  };

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotalDOP = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const discountRate = promoCode ? promoCode.discount : 0;
  const discountDOP = Math.round(subtotalDOP * discountRate);
  const totalDOP = subtotalDOP - discountDOP;
  const totalUSD = parseFloat((totalDOP / DOP_TO_USD).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        items, isOpen, setIsOpen, promoCode, setPromoCode,
        addItem, removeItem, updateQuantity, clearCart,
        totalItems, subtotalDOP, discountDOP, totalDOP, totalUSD, DOP_TO_USD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
