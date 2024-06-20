// src/components/navbar/Navbar.js
import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContextProvider';
import LoginModal from '../login/LoginModal'; // Update the import path if necessary
import { useTranslation } from 'react-i18next';
import RegisterPopup from '../login/RegisterPopup';

const Navbar = ({ darkMode }) => {
  const { t } = useTranslation();
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setShowLogin(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    navigate('/'); // Redirect to home or desired route
  };

  return (
    <div className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <Link to='/'> <h1>{t("Tandoori Pizza")}</h1></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>{t("Home")}</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>{t("Menu")}</a>
        <a href='#app-download' onClick={() => setMenu("location")} className={menu === "location" ? "active" : ""}>{t("Location")}</a>
        <a href='#footer' onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>{t("Contact Us")}</a>
        {isAuthenticated && <Link to='/PreviousOrder' onClick={() => setMenu('previous-order-page')}>{t("PastOrders")}</Link>}
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
          <Link to='/Cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {isAuthenticated ? (
          <button onClick={handleSignOut}>{t("Sign Out")}</button>
        ) : (
          <button onClick={handleSignIn}>{t("Sign In")}</button>
        )}
      </div>
      {showLogin && <RegisterPopup onLoginSuccess={handleLoginSuccess} />} {/* Use LoginModal here */}
    </div>
  );
};

export default Navbar;
