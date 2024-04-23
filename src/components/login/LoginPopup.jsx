import { useState } from 'react';
import React from 'react'
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({setShowLogin}) => {

  const [currState, setCurrState]= useState("Login")
  const navigate= useNavigate();   
  const handleGuest=()=>{
    navigate('/OrderingForm')
  }

  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""/>
        </div>
        <div className='login-popup-inputs'>
          {currState==="Login"?<></>:<input type='text' placeholder='your name' required />}
          <input type='email' placeholder='your email' required />
          <input type='password' placeholder='Password' required />
        </div>
        <button>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className='login-popup-condition'>
          <input type='checkbox' required/>
          <p>By Continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState==='Login' ? <p>Create a new account?<span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p> }
          
          <button onClick={handleGuest}>Continue as guest</button>
          </form>
      
    </div>
  )
}

export default LoginPopup