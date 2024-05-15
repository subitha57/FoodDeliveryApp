import React, { useContext } from 'react';
import './ViewPromotions.css';
import { StoreContext } from '../../context/StoreContextProvider';
import { useTheme } from '../Theme/ThemeContext'; // Import the ThemeContext
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const ViewPromotion = ({ onClose }) => {
  const { food_list } = useContext(StoreContext);
  const { darkTheme } = useTheme(); // Get the current theme from the context
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/ViewPizzaPromotion');
    onClose();
  };

  return (
    <div className={`ViewPromotion ${darkTheme ? "dark-theme" : "light-theme"}`}>
      <div className="closeicon">
        <button onClick={onClose}><CloseIcon /></button>
      </div>
      <h2 className={darkTheme ? 'dark-text' : 'light-text'}>Current Promotion</h2>
      <p className={darkTheme ? 'dark-text' : 'light-text'}>Get 10% off when you select a large pizza!</p>
      <div className="ViewPromotion-buttons">
        <button className="apply-button" onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
};

export default ViewPromotion;
