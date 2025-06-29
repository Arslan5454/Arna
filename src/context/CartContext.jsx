import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.title === product.title);
      if (existing) {
        return prev.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            quantity,
            image: Array.isArray(product.images)
              ? product.images[0]
              : product.images,
          },
        ];
      }
    });
  };

  const updateQuantity = (index, delta) => {
    setCartItems((prev) =>
      prev
        .map((item, idx) =>
          idx === index
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (index) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Make sure this hook is exported:
export const useCart = () => useContext(CartContext);
