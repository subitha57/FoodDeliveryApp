import React, { useState, useEffect } from 'react';
import './PreviousOrder.css'; // Import the CSS file

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://test.tandooripizza.com/api/online/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers if needed
          },
          body: JSON.stringify({
            // Add any request body parameters if required by your API
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.Data); // Assuming data structure matches your provided JSON
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Handle error state or notification to the user
      }
    };

    fetchOrders();
  }, []);

  const viewOrderDetails = async (orderID) => {
    try {
      const response = await fetch(`https://test.tandooripizza.com/api/online/order/${orderID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const data = await response.json();
      setSelectedOrder(orderID);
      setOrderDetails(data); // Assuming the response has detailed order information
    } catch (error) {
      console.error('Error fetching order details:', error);
      // Handle error state or notification to the user
    }
  };

  return (
    <div>
      <h2>All Orders</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Status</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <React.Fragment key={order.order.ID}>
                {order.order.OrderItems.map((item, index) => (
                  <tr key={item.ID}>
                    {index === 0 && (
                      <React.Fragment>
                        <td rowSpan={order.order.OrderItems.length}>{order.order.ID}</td>
                        <td rowSpan={order.order.OrderItems.length}>{order.order.OrderHistory[0].OrderStatus}</td>
                      </React.Fragment>
                    )}
                    <td>{item.Name}</td>
                    <td>{item.Quantity}</td>
                    <td>{item.ItemPrice}</td>
                    {index === 0 && (
                      <td rowSpan={order.order.OrderItems.length}>
                        <button onClick={() => viewOrderDetails(order.order.ID)}>View</button>
                      </td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && orderDetails && (
        <div className="order-details">
          <h3>Order Details for Order ID: {selectedOrder}</h3>
          <p><strong>Order Date:</strong> {orderDetails.order.Date}</p>
          <p><strong>Customer Name:</strong> {orderDetails.order.CustomerName}</p>
          <p><strong>Total Price:</strong> {orderDetails.order.TotalPrice}</p>
          <h4>Items:</h4>
          <ul>
            {orderDetails.order.OrderItems.map(item => (
              <li key={item.ID}>
                <div>Item Name: {item.Name}</div>
                <div>Quantity: {item.Quantity}</div>
                <div>Price: {item.ItemPrice}</div>
                {/* Render other item details as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllOrder;
