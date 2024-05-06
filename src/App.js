import React, { useState, useContext } from 'react';
import { StoreContext } from './context/StoreContextProvider.jsx';
import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import ProceedCheckout from './pages/ProceedCheckOut/ProceedCheckOut.jsx';


function App() {

  const [showLogin, setShowLogin] = useState(false);
  const { food_list } = useContext(StoreContext);
  const navigate= useNavigate();  
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
    navigate('/')
    console.log("Button clicked");
  };
  const handleCloseOrderType = () => {
    // Implement logic to close the OrderType component
    console.log('Closing OrderType popup');
  };
  console.log('Selected Order Type in App:', selectedOrderType);
  
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>

          {/*<Route path='/' element={<Signin/>}/>*/}
          <Route path='/' element={<Home />} />
          <Route path='/Cart' element={<Cart selectedOrderType={selectedOrderType} />} />
          <Route path='/OrderType' element={<OrderType onSelectOrderType={handleSelectOrderType} onClose={handleCloseOrderType} onContinue={handleContinue} />} />
          <Route path='/PlaceOrder' element={<PlaceOrder />} />
          <Route path='/CustomizePizza' element={<CustomizeForm />} />
          <Route path='/LoginPopup' element={<LoginPopup setShowLogin={setShowLogin} />} />
          <Route path='/HalfAndHalfPizza' element={<HalfAndHalfPizza foodList={food_list} onClose={handleClose} />} />
          <Route path='/ScrollButton' element={<ScrollButton />} />
          <Route path='/Delivery' element={<Delivery onContinue={handleContinue} />}/>
          <Route path='/TakeOut' element={<TakeOut onContinue={handleContinue} />} />
          <Route path='/DineIn' element={<DineIn />}/>
         <Route path='/ProceedCheckout' element={<ProceedCheckout/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
