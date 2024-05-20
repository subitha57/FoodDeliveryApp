import React, { useState } from 'react';
import { Button, Modal, Backdrop, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import './TakeOut.css'; // Import your CSS file

const TakeOut = ({ onClose, closeOrderType }) => {
  const [pickupTime, setPickupTime] = useState('');
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [orderTime, setOrderTime] = useState('');
  const [orderDate, setOrderDate] = useState('');

  const handlePickupTimeChange = (e) => {
    setPickupTime(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    onClose(); // Close the modal
  };

  const handleOrderTimeChange = (e) => {
    setOrderTime(e.target.value);
  };

  const handleOrderDateChange = (e) => {
    setOrderDate(e.target.value);
  };

  const handleContinue = () => {
    handleClose();
    closeOrderType(); // Close the modal
    navigate('/'); // Navigate to the home page
  };

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
        <div className="takeout-modal">
          <div className="modal-header">
            <Button onClick={handleClose} className="close-button">
              <CloseIcon />
            </Button>
          </div>
          <div className="modal-content">
            <h2>Take Out</h2><br />
            <div className="form-group">
              <label htmlFor="orderDate">Order Date:</label>
              <input type="date" id="orderDate" value={orderDate} onChange={handleOrderDateChange} />
            </div>
            <div className="form-group">
              <label htmlFor="orderTime">Order Time:</label>
              <input type="time" id="orderTime" value={orderTime} onChange={handleOrderTimeChange} />
            </div>
            <div className="form-group">
              <label htmlFor="pickupTime">Pickup Time:</label>
              <input type="time" id="pickupTime" value={pickupTime} onChange={handlePickupTimeChange} />
            </div>
            <Button onClick={handleContinue} variant="contained" className="continue-button">Continue</Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default TakeOut;
