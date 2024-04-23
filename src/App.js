import React, { useState , useContext} from 'react';
import { StoreContext } from './context/StoreContextProvider.jsx';
import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import { Route, Routes, useLocation  } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Cart from './pages/cart/Cart.jsx';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import LoginPopup from './components/login/LoginPopup.jsx';
import PlaceOrder from './pages/placeOrder/PlaceOrder.jsx'
import CustomizeForm from './components/customize/CustomizeForm.jsx'
import OrderNow from './components/orderNow/GeoLocation.jsx';
import OrderingForm from './components/orderNow/OrderingForm.jsx';
import Pizza from './components/orderNow/Pizza.jsx';
import HalfAndHalfPizza from './components/orderNow/HalfAndHalfPizza.jsx';
import Signin from './components/signin/Signin.jsx'

function App() {
 
const [showLogin,setShowLogin]=useState(false);
const { food_list } = useContext(StoreContext);
const handleClose = () => {
  // Define logic to handle closing
};
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
        <Route path='/OrderNow' element={<OrderNow/>}/>
        <Route path='/LoginPopup' element={<LoginPopup setShowLogin={setShowLogin} />}/>
        <Route path='/OrderingForm' element={<OrderingForm/>}/>
        <Route path='/Pizza' element={<Pizza/>}/>
        <Route path='/HalfAndHalfPizza' element={<HalfAndHalfPizza foodList={food_list} onClose={handleClose} />} />
        
      </Routes>
     
    </div>
    <Footer/>
    </>
  );
}

export default App;
