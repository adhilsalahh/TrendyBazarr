// src/context/ShopContext.jsx
import { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  return (
    <ShopContext.Provider value={{ cart, setCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
