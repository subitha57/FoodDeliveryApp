import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [crusts, setCrusts] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [aCheeses, setACheeses] = useState([]);
  const [pCheeses, setPCheeses] = useState([]);
  const [meats, setMeats] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [feistyProducts, setFeistyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('All');
  const [sizes, setSizes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [Classics,setClassics]= useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://test.tandooripizza.com/Online/OnlineHome/GetData?id=1');
      const allProducts = response.data.Products;
      const sizes = response.data.Sizes;
      const prices = response.data.Prices;

      setProducts(allProducts.filter(product => product.CategoryName !== 'Crust' && product.CategoryName !== 'Sauce' && product.CategoryName !== 'ACheese' && product.CategoryName !== 'PCheese' && product.CategoryName !== 'Pizza-Toppings'));
      setCrusts(allProducts.filter(product => product.CategoryName === 'Crust'));
      setSauces(allProducts.filter(product => product.CategoryName === 'Sauce'));
      setSauces(allProducts.filter(product => product.CategoryName === 'Sauces'));
      setACheeses(allProducts.filter(product => product.CategoryName === 'ACheese'));
      setPCheeses(allProducts.filter(product => product.CategoryName === 'PCheese'));
      setMeats(allProducts.filter(product => product.CategoryName === 'Pizza-Toppings' && product.IsNonVeg));
      setVegetables(allProducts.filter(product => product.CategoryName === 'Pizza-Toppings' && !product.IsNonVeg));
      setFeistyProducts(allProducts.filter(product => product.CategoryName === 'The Feisty One'));
      setClassics(allProducts.filter(product => product.CategoryName === 'The Classics'));
      setSizes(sizes);
      setPrices(prices);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const getTotalPriceOfCartItems = () => {
    let totalPrice = 0;
    for (const itemId in cartItems) {
      const item = cartItems[itemId];
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  };

  const contextValue = {
    products,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalPriceOfCartItems,
    loading,
    error,
    setCategory,
    crusts,
    sauces,
    aCheeses,
    pCheeses,
    meats,
    vegetables,
    feistyProducts,
    sizes,
    prices,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
