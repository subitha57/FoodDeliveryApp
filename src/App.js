import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Cart from './pages/cart/Cart.jsx';
import Footer from './components/footer/Footer.jsx';
import LoginPopup from './components/login/LoginPopup.jsx';
import PlaceOrder from './pages/placeOrder/PlaceOrder.jsx'
import CustomizeForm from './components/customize/CustomizeForm.jsx'

function App() {
 
const [showLogin,setShowLogin]=useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/PlaceOrder' element={<PlaceOrder />}/>
        <Route path='/CustomizePizza' element={<CustomizeForm/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  );
}

export default App;
