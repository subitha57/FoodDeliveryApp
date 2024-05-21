import React, { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev[item.id];
      if (existingItem) {
        return {
          ...prev,
          [item.id]: {
            ...existingItem,
            quantity: existingItem.quantity + item.quantity,
          },
        };
      } else {
        return {
          ...prev,
          [item.id]: { ...item, quantity: item.quantity },
        };
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const existingItem = prev[itemId];
      if (existingItem.quantity > 1) {
        return {
          ...prev,
          [itemId]: {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          },
        };
      } else {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const item = cartItems[itemId];
      totalAmount += item.price * item.quantity;
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
