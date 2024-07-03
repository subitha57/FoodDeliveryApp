import React from 'react';
import CartNew from '../../../pages/cart/CartNew';
import './OrderDetails.css';

const OrderDetails = () => {
    // Static data for demonstration
    const order = {
        number: '12345',
        hotelName: 'Grand Hotel',
        orderType: 'Online',
        dateOrdered: '2024-06-20',
        promiseDate: '2024-06-25',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123-456-7890',
        address: '123 Main St, Anytown, USA',
        paymentDetails: {
            cardHolderName: 'John Doe',
            cardNumber: '**** **** **** 1234',
            cardIssuer: 'Visa',
        },
    };

    const handleLeftButtonClick = () => {
        alert('Left Button Clicked');
    };

    const handleDownloadReceipt = () => {
        alert('Downloading Receipt');
    };

    return (
        <div className="order-details">
            <h2>Order Details</h2>
            <p><strong>Order Number:</strong> {order.number}</p>
            <p><strong>Ordered From:</strong> {order.hotelName}</p>
            <div className="content">
                <div className="left">
                    
                    <button className="left-button" onClick={handleLeftButtonClick}>Placed</button>
                    <CartNew />
                </div>
                <div className="right">
                    <button className="right-button" onClick={handleDownloadReceipt}>Download Receipt</button>
                    <div className="details">
                        <p><strong>Order Type:</strong> {order.orderType}</p>
                        <p><strong>Date Ordered:</strong> {order.dateOrdered}</p>
                        <p><strong>Promise Date:</strong> {order.promiseDate}</p>
                        <p><strong>Full Name:</strong> {order.fullName}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
                        <p><strong>Address:</strong> {order.address}</p>
                        <h3>Payment Details</h3>
                        <p><strong>Card Holder Name:</strong> {order.paymentDetails.cardHolderName}</p>
                        <p><strong>Card Number:</strong> {order.paymentDetails.cardNumber}</p>
                        <p><strong>Card Issuer:</strong> {order.paymentDetails.cardIssuer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
