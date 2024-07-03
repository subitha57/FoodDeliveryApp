import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [crusts, setCrusts] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [aCheeses, setACheeses] = useState([]);
  const [pCheeses, setPCheeses] = useState([]);
  const [meats, setMeats] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [feistyProducts, setFeistyProducts] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [appetizers, setAppetizers] = useState([]);
  const [extras, setExtras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('All');
  const [sizes, setSizes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [Classics, setClassics] = useState([]);
  const [user, setUser] = useState(null);
  const [cartRestaurant, setCartRestaurant] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log('Stored user loaded:', JSON.parse(storedUser)); // Debug log
    }
    fetchProducts();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to local storage
    console.log('User logged in:', userData); // Debug log
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from local storage
    localStorage.removeItem('authToken');
    console.log('User logged out'); // Debug log
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://test.tandooripizza.com/Online/OnlineHome/GetData?id=1');
      const allProducts = response.data.Products;
      const sizes = response.data.Sizes;
      const prices = response.data.Prices;

      setProducts(allProducts.filter(product => 
        product.CategoryName !== 'Crust' && 
        product.CategoryName !== 'Sauce' && 
        product.CategoryName !== 'ACheese' && 
        product.CategoryName !== 'PCheese' && 
        product.CategoryName !== 'Pizza-Toppings'));

      setCrusts(allProducts.filter(product => product.CategoryName === 'Crust'));
      setSauces(allProducts.filter(product => product.CategoryName === 'Sauce'));
      setACheeses(allProducts.filter(product => product.CategoryName === 'ACheese'));
      setPCheeses(allProducts.filter(product => product.CategoryName === 'PCheese'));
      setMeats(allProducts.filter(product => product.CategoryName === 'Pizza-Toppings' && product.IsNonVeg));
      setVegetables(allProducts.filter(product => product.CategoryName === 'Pizza-Toppings' && !product.IsNonVeg));
      setFeistyProducts(allProducts.filter(product => product.CategoryName === 'The Feisty One'));
      setClassics(allProducts.filter(product => product.CategoryName === 'The Classics'));
      setSizes(sizes);
      setPrices(prices);

      const beverages = allProducts.filter(product => ['Water', 'Soft Drinks', 'Wine', 'Beer', 'Juice'].includes(product.CategoryName));
      setBeverages(beverages);

      const appetizers = allProducts.filter(product => ['Garlic Sticks with Cheese', 'Boneless', 'Garlic Bread with Cheese', 'Mozzarella Sticks', 'Jalapeno Poppers', 'Traditional Wings', 'Wing Flavor'].includes(product.CategoryName));
      setAppetizers(appetizers);

      const extras = allProducts.filter(product => ['Green Beans (greenbeans)', 'Wing Flavor', 'Cookies', 'Sides (extraside)', 'Sides'].includes(product.CategoryName));
      extras.forEach(extra => {
        extra.Cost = 0.50; 
      });
      setExtras(extras);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const addToCart = (item, crust, sauce, aCheese, pCheese, toppings) => {
    const customizedItem = {
      ...item,
      crust,
      sauce,
      aCheese,
      pCheese,
      toppings,
    };
    setCart((prevCart) => [...prevCart, customizedItem]);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item, index) => index !== itemId));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item of cart) {
      totalAmount += item.price;
    }
    return totalAmount;
  };

  const getTotalPriceOfCartItems = () => {
    let totalPrice = 0;
    for (const item of cart) {
      totalPrice += item.price;
    }
    return totalPrice;
  };

  const contextValue = {
    products,
    cart,
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
    beverages,
    appetizers,
    extras,
    sizes,
    prices,
    user,
    setUser: login,
    cartRestaurant,
    setCartRestaurant,
    login,
    logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
