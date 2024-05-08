import { useState } from 'react';
import React from 'react'
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({setShowLogin,onLoginSuccess }) => {

  const [currState, setCurrState]= useState("Login")
  const navigate= useNavigate();   

   const handleGuest = () => {
    // Directly navigate to the home page
    navigate('/');
    // Close the login popup if it's open
    setShowLogin(false);
  };
  const handleLogin = () => {
      const loginSuccess = true;
    if (loginSuccess) {
      onLoginSuccess(); 
      navigate('/OrderType');
    }
  };
  const handleForgotPassword = () => {
    // Add logic to handle forgot password
    alert("Forgot Password clicked");
  };

  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
             <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""/>
        </div>
        <div className='login-popup-inputs'>
          {currState==="Login"?<></>:
          
          <input type='text' placeholder='Name' required />}
          <label>Email</label>
          <input type='email' placeholder='your email' required />
          <label>Password</label>
          <input type='password' placeholder='Password' required />
        </div>
        <div className='signin'>
        <button  onClick={handleLogin}>{currState==="Sign Up"?"Create Account":"Login"}</button>
        </div>
        {/*<div className='login-popup-condition'>
          <input type='checkbox' required/>
          <p>By Continuing, i agree to the terms of use & privacy policy.</p>
  </div><br/>*/}
        {currState === 'Login' ? (
          <div >
            <p>Create a new account?<span className="clickhere" onClick={() => setCurrState("Sign Up")}>Click here</span></p><br/>
            <p className="forgot-password" onClick={handleForgotPassword}>Forgot your password?</p><br/>
          </div>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        )}
        <div className='guest'>
        <button  onClick={handleGuest}>Continue as guest</button>
        </div>
      </form>
         
    </div>
  )
}

export default LoginPopup