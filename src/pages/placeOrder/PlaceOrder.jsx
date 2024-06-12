import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContextProvider';
import { useNavigate } from 'react-router-dom';
import ProceedCheckOut from '../ProceedCheckOut/ProceedCheckOut';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PlaceOrder = ({ onClose }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const handleCheckout = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div>
      
      <form className='place-order'>
      <div className="modal-content">
      <button className="close-button" onClick={closeModal}>Close</button>
            </div>
        <div className="place-order-left">
          <p className='title'>{t("Delivery Information")}</p>
          <div className="multi-fields">
            <input type="text" placeholder='First Name' />
            <input type="text" placeholder='Last Name' />
          </div>
          <div className="multi-fields">
            <input type="email" placeholder='Email Address' />
            <input type="text" placeholder='Street' />
          </div>
          <div className="multi-fields">
            <input type="text" placeholder='City' />
            <input type="text" placeholder='State' />
          </div>
          <div className="multi-fields">
            <input type="text" placeholder='Zip Code' />
            <input type="text" placeholder='Country' />
          </div>
          <input type='text' placeholder='Phone' />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>{t("Cart Total")}</h2>
            <div>
              <div className='cart-total-details'>
                <p>{t("SubTotal")}</p>
                <p>Rs.{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <p>{t("Delivery Fee")}</p>
                <p>Rs.{getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <b>{t("Total")}</b>
                <b>Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="button" onClick={handleCheckout}>{t("PROCEED TO PAYMENT")}</button>
          </div>
        </div>
      </form>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ProceedCheckOut closeModal={onClose} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaceOrder;
