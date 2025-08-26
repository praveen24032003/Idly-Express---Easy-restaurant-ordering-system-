import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const updateQty = (id, qty) =>
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty }}>
      {children}
    </CartContext.Provider>
  );
}
