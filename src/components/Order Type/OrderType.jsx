import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Delivery from './Delivery';
import TakeOut from './TakeOut';
import DineIn from './DineIn';
import './OrderType.css';
import { useNavigate } from 'react-router-dom'; 

const OrderType = ({ onSelectOrderType, onClose }) => {
  const [selectedOrderType, setSelectedOrderType] = useState('');
  const navigate = useNavigate(); 

  const handleOrderTypeSelect = (orderType) => {
    setSelectedOrderType(orderType);
    onSelectOrderType(orderType); 
  };
  const handleContinue = () => {
    onClose();
   // Navigate to the home page
  };
  return (
    <div className='orderTypePopup'>
       
      <div className='Order-type'>
      
        <h1>Order Type</h1>
        <div className="order-type-container">
          
        <ToggleButtonGroup
            value={selectedOrderType}
            exclusive
            sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            
            <ToggleButton value="Delivery" onClick={() => handleOrderTypeSelect('Delivery')}
                  sx={{ width: '30%', height: '60px', backgroundColor: '#8B0000', color: '#FFFFFF', fontSize: '0.rem' }}>
                  <span className="order-type-icon">🚚</span>Delivery
                  {/*{distances.Delivery && <p>{distances.Delivery} km</p>}*/}
                  {selectedOrderType === 'Delivery' && <span className="checkmark-icon">✔️</span>}
                </ToggleButton>
                <ToggleButton value="TakeOut" onClick={() => handleOrderTypeSelect('TakeOut')}
                  sx={{ width: '30%', height: '60px', backgroundColor: '#8B0000', color: '#FFFFFF', fontSize: '0.9rem' }}>
                  <span className="order-type-icon">🥡</span>Take Out
                  {/*{distances.TakeOut && <p>{distances.TakeOut} km</p>}*/}
                  {selectedOrderType === 'TakeOut' && <span className="checkmark-icon">✔️</span>}
                </ToggleButton>
                <ToggleButton value="DineIn" onClick={() => handleOrderTypeSelect('DineIn')}
                  sx={{ width: '30%', height: '60px', backgroundColor: '#8B0000', color: '#FFFFFF', fontSize: '1.0rem' }}>
                  <span className="order-type-icon">🍽️</span>Dine In
                 
                  {selectedOrderType === 'DineIn' && <span className="checkmark-icon">✔️</span>}
                </ToggleButton>

          </ToggleButtonGroup>

        </div>
      </div>
      {selectedOrderType === 'Delivery' && <Delivery onClose={() => setSelectedOrderType('')} onContinue={handleContinue} />}
      {selectedOrderType === 'TakeOut' &&  <TakeOut onClose={onClose} onContinue={handleContinue} />}
      {selectedOrderType === 'DineIn' && <DineIn onClose={() => setSelectedOrderType('')} onContinue={handleContinue} />}
    </div>
    
  );
};

export default OrderType;
