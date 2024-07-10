import React, { useState, useEffect } from 'react';
import CartView from '../../Order Type/PreviousOrder/CartView';
import './OrderDetails.css';

const ViewOrderDetails = ({ orderID, onClose }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log('Fetching details for order ID:', orderID);
        const response = await fetch(`https://test.tandooripizza.com/api/online/order/${orderID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderID: orderID,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrderDetails(data.Data);
        console.log('Order details fetched:', data.Data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>Error loading order details. Please try again.</div>;
  }

  const { order } = orderDetails;
  const payment = order.OrderModel?.payments?.find(p => p.mode.name === 'Credit Card') || {};

  return (
    <div className="order-details-container">
      <button className="close-button" onClick={onClose}>X</button>
      <div className="order-details-content">
        <div className="order-details-left">
          <CartView />
        </div>
        <div className="order-details-right">
          <h3>Order Details for Order ID: {orderID}</h3>
          <div className="order-info">
            <p><strong>Type:</strong> {order.Status === 1 ? 'Delivery' : 'Pickup'}</p><br/>
            <p><strong>Order Date:</strong> {new Date(order.PlacedOn).toLocaleString()}</p><br/>
            <p><strong>Promise Date:</strong> {new Date(order.PromiseDate).toLocaleString()}</p><br/>
            <p><strong>Full Name:</strong> {order.CustomerName || 'N/A'}</p><br/>
            <p><strong>Email:</strong> {order.CustomerEmail || 'N/A'}</p><br/>
            <p><strong>Phone Number:</strong> {order.CustomerPhone || 'N/A'}</p><br/>
            <p><strong>Address:</strong> {order.CustomerAddress || 'N/A'}</p><br/>
          </div><br/>
          <h3>Payment Details</h3><br/>
          <div className="payment-info">
            <p><strong>Card Holder Name:</strong> {payment.holdername || 'N/A'}</p><br/>
            <p><strong>Card Number:</strong> {payment.cardnumber || 'N/A'}</p><br/>
            <p><strong>Card Issuer:</strong> {payment.cardtype || 'N/A'}</p><br/>
            <p><strong>Zip Code:</strong> {payment.zipcode || 'N/A'}</p><br/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetails;
