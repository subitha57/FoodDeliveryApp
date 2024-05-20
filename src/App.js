import React, { useState, useContext } from 'react';
import { StoreContext } from './context/StoreContextProvider.jsx';
import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Cart from './pages/cart/Cart.jsx';
import Footer from './components/footer/Footer.jsx';
import LoginPopup from './components/login/LoginPopup.jsx';
import PlaceOrder from './pages/placeOrder/PlaceOrder.jsx';
import CustomizeForm from './components/customize/CustomizeForm.jsx';
import HalfAndHalfPizza from './components/HalfAndHalf/HalfAndHalfPizza.jsx';
import OrderType from './components/Order Type/OrderType.jsx';
import ScrollButton from './ScrollButton.jsx';
import Delivery from './components/Order Type/Delivery.jsx';
import TakeOut from './components/Order Type/TakeOut.jsx';
import DineIn from './components/Order Type/DineIn.jsx';
import ProceedCheckout from './pages/ProceedCheckOut/ProceedCheckOut.jsx';
import TermsAndConditions from './pages/TermsAnd Conditions/TermsAndCondition.jsx';
import GeoLocation from './components/Order Type/GeoLocation.jsx';
import PreviousOrder from './components/Order Type/PreviousOrder/PreviousOrder.jsx';
import ViewPizzaPromotion from './components/customize/ViewPizzaPromotion.jsx';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import { ThemeProvider } from './components/Theme/ThemeContext.js';
import DarkMode from './components/Theme/DarkMode.jsx';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector.js';


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedOrderType, setSelectedOrderType] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
   const { food_list } = useContext(StoreContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClose = () => {
    // Define logic to handle closing
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false); // Close the login popup after successful login
    // Redirect the user to the OrderType page after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedOrderType(''); // Reset selected order type on logout
    navigate('/'); // Redirect to the homepage after logout
  };

  const handleSelectOrderType = (orderType) => {
    setSelectedOrderType(orderType);
  };

  const handleContinue = () => {
    navigate('/OrderType');
    console.log('Button clicked');
  };

  const handleCloseOrderType = () => {
    // Implement logic to close the OrderType component
    console.log('Closing OrderType popup');
  };

  console.log('Selected Order Type in App:', selectedOrderType);

  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(prevTheme => !prevTheme);
  };

  const pastOrders = [
    {
      date: '2024-05-01',
      total: 25.5,
      items: [
        { name: 'Pizza', price: 12.5 },
        { name: 'Salad', price: 8 },
        { name: 'Drink', price: 5 },
      ],
    },
    {
      date: '2024-04-28',
      total: 18,
      items: [
        { name: 'Burger', price: 10 },
        { name: 'Fries', price: 5 },
        { name: 'Drink', price: 3 },
      ],
    },
  ];

  return (
     <>
     <ThemeProvider>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} onLoginSuccess={handleLoginSuccess} />}
      <div className={`app ${darkTheme ? "dark-theme" : "light-theme"}`}> 
      <div className="top-right-corner">
      <LanguageSelector/>
      <button className='theme-button' onClick={toggleTheme}> {darkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
      </button>
      </div>
        <Navbar setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart selectedOrderType={selectedOrderType}  darkTheme={darkTheme} />} />
          <Route
            path="/OrderType"
            element={<OrderType isAuthenticated={isAuthenticated} onSelectOrderType={handleSelectOrderType} onClose={handleCloseOrderType} onContinue={handleContinue} />}
          />
          <Route path="/PlaceOrder" element={<PlaceOrder />} />
          <Route path="/CustomizePizza" element={<CustomizeForm />} />
          <Route path="/LoginPopup" element={<LoginPopup setShowLogin={setShowLogin} />} />
          <Route path="/HalfAndHalfPizza" element={<HalfAndHalfPizza foodList={food_list} onClose={handleClose} />} />
          <Route path="/ScrollButton" element={<ScrollButton />} />
          <Route path="/Delivery" element={<Delivery onContinue={handleContinue} />} />
          <Route path="/TakeOut" element={<TakeOut onContinue={handleContinue} />} />
          <Route path="/DineIn" element={<DineIn />} />
          <Route path="/ProceedCheckout" element={<ProceedCheckout />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/GeoLocation" element={<GeoLocation />} />
          <Route path="/PreviousOrder" element={<PreviousOrder pastOrders={pastOrders} />} />
          <Route path="/ViewPizzaPromotion" element={<ViewPizzaPromotion />} />
        </Routes>
      </div>
      <Footer />
      <DarkMode darkTheme={darkTheme} toggleTheme={toggleTheme} />
       </ThemeProvider>
    </>
  );
}

export default App;
