
    import React, { useState } from 'react';
import './Delivery.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const Delivery = ({ onClose ,onContinue}) => {
  const [address, setAddress] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderHour, setOrderHour] = useState('');
  const [orderMinute, setOrderMinute] = useState('');
  const navigate=useNavigate();

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleOrderTimeChange = (e) => {
    setOrderTime(e.target.value);
  };

  const handleOrderDateChange = (e) => {
    setOrderDate(e.target.value);
  };

  const handleOrderHourChange = (e) => {
    setOrderHour(e.target.value);
  };

  const handleOrderMinuteChange = (e) => {
    setOrderMinute(e.target.value);
  };
  const handleContinue = () => {
    onClose();
    onContinue();
    // Navigate to the home page when Continue button is clicked
    navigate('/');
  };

  return (
    <div className="delivery-container">
      <h2>Delivery</h2>
    
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={address} onChange={handleAddressChange} />
      </div>
      <hr />
      <div className="form-group">
        <label htmlFor="orderDate">Order Date:</label>
        <input type="date" id="orderDate" value={orderDate} onChange={handleOrderDateChange} />
      </div>
      <div className="form-group">
        <label htmlFor="orderTime">Order Time:</label>
        <input type="time" id="orderTime" value={orderTime} onChange={handleOrderTimeChange} />
      </div>
      <div className="form-group">
        <label htmlFor="orderHour">Hour:</label>
        <input type="number" id="orderHour" min="0" max="23" value={orderHour} onChange={handleOrderHourChange} />
      </div>
      
      <button onClick={handleContinue}>Continue</button> {/* Continue button */}
    </div>
  );
};

export default Delivery;
