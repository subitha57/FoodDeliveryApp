import React from 'react';
import './PreviousOrder.css'

const PreviousOrder = ({ pastOrders }) => {
  if (!pastOrders || pastOrders.length === 0) {
    return <p>No previous orders.</p>;
  }

  return (
    <div className="previous-orders-container">
      <h2>Previous Orders</h2>
      <ul className="previous-orders-list">
        {pastOrders.map((order, index) => (
          <li key={index} className="previous-order-item">
            <div className="order-details">
              <span className="order-date">{order.date}</span>
              <span className="order-total">Total: ${order.total}</span>
            </div>
            <div className="order-items">
              <h3>Items:</h3>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>{item.name} - ${item.price}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousOrder;