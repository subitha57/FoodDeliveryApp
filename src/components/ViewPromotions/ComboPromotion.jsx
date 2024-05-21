import React from 'react';
import './ComboPromotion.css';
import { useTheme } from '../Theme/ThemeContext'; // Import the ThemeContext
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const ComboPromotion = ({ onClose }) => {
  const { darkTheme } = useTheme(); // Get the current theme from the context
  const navigate = useNavigate();

  const handleApplyCombo = () => {
    navigate('/ViewComboPromotion'); // Adjust the route as necessary
    onClose(); 
  };

  return (
    <div className={`ComboPromotion ${darkTheme ? "dark-theme" : "light-theme"}`}>
      <div className="closeicon">
        <button onClick={onClose}><CloseIcon /></button>
      </div>
      <h2 className={darkTheme ? 'dark-text' : 'light-text'}>Combo Offer</h2>
      <p className={darkTheme ? 'dark-text' : 'light-text'}>Get a free drink with any large pizza and side order!</p>
      <div className="ComboPromotion-buttons">
        <button className="apply-button" onClick={handleApplyCombo}>Apply Combo Offer</button>
      </div>
    </div>
  );
};

export default ComboPromotion;
