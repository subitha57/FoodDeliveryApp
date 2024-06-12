  import React, { useState, useEffect } from 'react';
  import { ToggleButton, ToggleButtonGroup, Modal, Backdrop, Fade, Button } from '@mui/material';
  import Delivery from './Delivery';
  import TakeOut from './TakeOut';
  import DineIn from './DineIn';
  import './OrderType.css';
  import CloseIcon from '@mui/icons-material/Close';

  const OrderType = ({ onSelectOrderType, onClose, isAuthenticated }) => {
    const [selectedOrderType, setSelectedOrderType] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (isAuthenticated) {
        setOpen(true);
      }
    }, [isAuthenticated]);

    const handleSelectOrderType = (orderType) => {
      setSelectedOrderType(orderType);
      onSelectOrderType(orderType);
      console.log("ordertype:", orderType);
    };

    const handleContinue = () => {
      handleClose();
    };

    const handleClose = () => {
      setOpen(false);
      onClose(); // Notify the parent component that the modal is closed
    };

    if (!isAuthenticated) {
      return null; // Do not render anything if the user is not authenticated
    }

    return (
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className='orderTypePopup'>
            <div className='closeButton'>
              <button onClick={handleClose} className="button" style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                <CloseIcon />
              </button>
            </div>
            <div className='Order-type'>
              <h1>Order Type</h1>
              <div className="order-type-container">
                <ToggleButtonGroup
                  value={selectedOrderType}
                  exclusive
                  sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                >
                  <ToggleButton
                    value="Delivery"
                    onClick={() => handleSelectOrderType('Delivery')}
                    sx={{ width: '30%', height: '60px', backgroundColor: 'skyblue', color: 'black', fontSize: '0.rem' }}
                  >
                    <span className="order-type-icon">🚚</span>Delivery
                    {selectedOrderType === 'Delivery' && <span className="checkmark-icon">✔️</span>}
                  </ToggleButton>
                  <ToggleButton
                    value="TakeOut"
                    onClick={() => handleSelectOrderType('TakeOut')}
                    sx={{ width: '30%', height: '60px', backgroundColor: 'skyblue', color: 'black', fontSize: '0.9rem' }}
                  >
                    <span className="order-type-icon">🥡</span>Take Out
                    {selectedOrderType === 'TakeOut' && <span className="checkmark-icon">✔️</span>}
                  </ToggleButton>
                  <ToggleButton
                    value="DineIn"
                    onClick={() => handleSelectOrderType('DineIn')}
                    sx={{ width: '30%', height: '60px', backgroundColor: 'skyblue', color: 'black', fontSize: '1.0rem' }}
                  >
                    <span className="order-type-icon">🍽️</span>Dine In
                    {selectedOrderType === 'DineIn' && <span className="checkmark-icon">✔️</span>}
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            {selectedOrderType === 'Delivery' && <Delivery onClose={handleContinue} closeOrderType={handleClose} />}
            {selectedOrderType === 'TakeOut' && <TakeOut onClose={handleContinue} closeOrderType={handleClose} />}
            {selectedOrderType === 'DineIn' && <DineIn onClose={handleContinue} closeOrderType={handleClose} />}
          </div>
        </Fade>
      </Modal>
    );
  };

  export default OrderType;
