import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContextProvider';
import { useNavigate } from 'react-router-dom';
import ProceedCheckOut from '../ProceedCheckOut/ProceedCheckOut';

const PlaceOrder = () => {
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
     
        <div className="place-order-left">
          <p className='title'>Delivery Information</p>
         
          <div className="multi-fields">
            <input type="text" placeholder='First Name'/>
            <input type="text" placeholder='Last Name'/>
          </div>
          <div className="multi-fields">
            <input type="email" placeholder='Email Address'/>
            <input type="text" placeholder='Street'/>
          </div>
          <div className="multi-fields">
            <input type="text" placeholder='City'/>
            <input type="text" placeholder='State'/>
          </div>
          <div className="multi-fields">
            <input type="text" placeholder='Zip Code'/>
            <input type="text" placeholder='Country'/>
          </div>
          <input type='text' placeholder='Phone'/>
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className='cart-total-details'>
                <p>SubTotal</p>
                <p>Rs.{getTotalCartAmount()}</p>
              </div>
              <hr/>
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>Rs.{getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr/>
              <div className='cart-total-details'>
                <b>Total</b>
                <b>Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="button" onClick={handleCheckout}>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ProceedCheckOut closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaceOrder;
