import React, { useState } from 'react';
import './Signin.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
import image from '../../assets/a.png'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log('Username:', username);
    console.log('Password:', password);
  };
  const handleGuest = () => {
    navigate('/GeoLocation')
  }

  return (
    <div className="login-container">
      <div className="right-side-image">
        <img src={image} alt="Login Image" />
      </div>
      <div className="left-side-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit">Login</button>
          <br />
          <button onClick={handleGuest}>Continue as guest</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
