import React, { useState, useContext } from 'react';
import { StoreContext } from './context/StoreContextProvider.jsx';
import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Cart from './pages/cart/Cart.jsx';
import Footer from './components/footer/Footer.jsx';
import LoginPopup from './components/login/LoginPopup.jsx';
import PlaceOrder from './pages/placeOrder/PlaceOrder.jsx'
import CustomizeForm from './components/customize/CustomizeForm.jsx'
import HalfAndHalfPizza from './components/HalfAndHalf/HalfAndHalfPizza.jsx';
import OrderType from './components/Order Type/OrderType.jsx';
import ScrollButton from './ScrollButton.jsx';
import Delivery from './components/Order Type/Delivery.jsx';
import TakeOut from './components/Order Type/TakeOut.jsx';
import DineIn from './components/Order Type/DineIn.jsx';

function App() {

  const [showLogin, setShowLogin] = useState(false);
  const { food_list } = useContext(StoreContext);
  const handleClose = () => {
    // Define logic to handle closing
  };
  const [selectedOrderType, setSelectedOrderType] = useState('');
  const handleSelectOrderType = (orderType) => {
    setSelectedOrderType(orderType);
  };
  const handleCloseTakeOut = () => {
    setSelectedOrderType(''); // or any other logic to close the TakeOut component
  };
  const handleContinue = () => {
    // Handle continue logic
  };

  
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>

          {/*<Route path='/' element={<Signin/>}/>*/}
          <Route path='/' element={<Home />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/PlaceOrder' element={<PlaceOrder />} />
          <Route path='/CustomizePizza' element={<CustomizeForm />} />
          <Route path='/LoginPopup' element={<LoginPopup setShowLogin={setShowLogin} />} />
          <Route path='/HalfAndHalfPizza' element={<HalfAndHalfPizza foodList={food_list} onClose={handleClose} />} />
          <Route path='/OrderType' element={<OrderType onSelectOrderType={handleSelectOrderType} onContinue={handleContinue} />} />
          <Route path='/ScrollButton' element={<ScrollButton />} />
          <Route path='/Delivery' element={<Delivery/>}/>
          <Route path='/TakeOut' element={<TakeOut onClose={handleCloseTakeOut} onContinue={handleContinue} />} />
          <Route path='/DineIn' element={<DineIn/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
