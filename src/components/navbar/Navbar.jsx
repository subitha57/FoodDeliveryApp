import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContextProvider';
import OrderNow from '../orderNow/GeoLocation';
import { Button } from '@mui/material';

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu]=useState("home");
  const navigate= useNavigate();

  const {getTotalCartAmount}= useContext(StoreContext)
 
  const handleOrderNow= ()=>{
    navigate('/OrderNow');
  }

  return (
    <div className='navbar'>
      <Link to='/'>  <h1>Tandoori Pizza</h1></Link> 
      <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("location")} className={menu==="location"?"active":""}>Location</a>
        <a href='#footer' onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>Contact Us</a>
        <a href="#OrderNow" onClick={handleOrderNow} className={menu==="OrderNow"?"active":""}>Order Now</a>
        
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt=""/>
        <div className='navbar-search-icon'>
        <Link to='/Cart'><img src={assets.basket_icon} alt=""/></Link>
          <div className={getTotalCartAmount()===0?"" : "dot"}></div>
        </div>
        <button onClick={()=>setShowLogin(true)}>Sign In</button>
      </div>

    </div>
  )
}

export default Navbar