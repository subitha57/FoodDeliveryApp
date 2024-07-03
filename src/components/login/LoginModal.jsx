import React, { useState, useContext } from 'react';
import axios from 'axios';
import './LoginModal.css'; // Optional: for styling
import { useNavigate, Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContextProvider';

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://test.tandooripizza.com/token', new URLSearchParams({
        grant_type: 'password',
        username,
        password
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      console.log('Login response:', response.data); // Check the structure of the response
  
      // Update this part based on the actual structure of response.data
      const userData = { 
        userName: response.data.userName, 
        email: response.data.email, 
        phoneNumber: response.data.phoneNumber, 
        address: response.data.address 
      };
  
      localStorage.setItem('authToken', response.data.access_token); // Save token to local storage
      login(userData); // Update user in context and local storage
  
      setError('');
      onLoginSuccess();
      onClose();
      navigate('/'); // Redirect to home or any other page
    } catch (err) {
      console.error('Login error:', err); // Debug log
      setError('Login failed. Please check your credentials.');
    }
  };
  
  return (
    <div className="login-modal">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>New user? <Link to="/RegisterPopup" onClick={onClose}>Register here</Link></p>
      </form>
    </div>
  );
};

export default LoginModal;
