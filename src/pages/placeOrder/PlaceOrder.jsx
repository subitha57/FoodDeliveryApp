import React, { useState, useContext } from 'react';
import axios from 'axios';
import CartNew from '../cart/CartNew'; // Import your CartNew component
import { StoreContext } from '../../context/StoreContextProvider';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import './PlaceOrder.css'; // Import the CSS file

const PlaceOrder = ({ selectedOrderType }) => {
  const navigate = useNavigate();
  const { cart, user } = useContext(StoreContext);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    cardHolderName: '',
    billingZipCode: '',
    cardNumber: '',
    cvv: '',
    cartItems: [], // Assume CartNew provides this data
    selectedOrderType: selectedOrderType || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const updateCartItems = (cartItems) => {
    setOrderDetails(prevDetails => ({
      ...prevDetails,
      cartItems
    }));
  };

  const handleProceedToCheckout = async (e) => {
    e.preventDefault();

    const orderData = {
      userName: orderDetails.name || user?.userName || null,
      email: orderDetails.email || user?.email || null,
      phoneNumber: orderDetails.phone || user?.phoneNumber || null,
      address: orderDetails.address || user?.address || null,
      promoID: 0,
      discount: 0,
      items: cart.map(item => ({
        isHybrid: false,
        name: item.name,
        productId: item.id,
        quantity: item.quantity,
        cost: item.price,
        items: (item.toppings || []).map(topping => ({
          id: topping.id,
          isHybrid: false,
          name: topping.name,
          productId: topping.productId,
          quantity: topping.quantity,
          cost: topping.cost,
          items: [],
          isPizza: false,
          isNo: topping.isNo,
          isExtra: topping.isExtra,
          isRegular: topping.isRegular,
          size: topping.size,
          topCat: topping.topCat,
          subCat: topping.subCat
        })),
        isPizza: item.isPizza,
        isNo: item.isNo,
        isExtra: item.isExtra,
        isLight: item.isLight,
        isRegular: item.isRegular,
        isSubstitude: item.isSubstitude,
        size: item.size,
        topCat: item.topCat,
        subCat: item.subCat,
        crust: item.crust,
        crustprice: item.crustprice
      })),
      deliveryCharges: 0,
      paymentMethod: null,
      payments: [],
      amountDue: 0,
      paid: 0,
      mode: 0,
      appliedCredits: 0,
      remainingCredits: 0,
      customerCredits: 0,
      comments: cart.map(item => ({
        type: 0,
        itemId: `pizza-${item.id}`
      })),
      taxExempt: false,
      waitTime: 15,
      gratuity: 0,
      creditApplied: false,
      futureOrder: false,
      subtotal: cart.reduce((acc, item) => acc + item.price, 0),
      total: cart.reduce((acc, item) => acc + item.price, 0),
      storeUID: 2270,
      cardHolderName: orderDetails.cardHolderName,
      billingZipCode: orderDetails.billingZipCode,
      cardNumber: orderDetails.cardNumber,
      cvv: orderDetails.cvv
    };

    try {
      const response = await axios.post('https://test.tandooripizza.com/api/online/order/save', orderData);
      if (response.status === 200) {
        console.log('Order saved:', response.data);
        alert("Order placed successfully");
        navigate('/Home');
      } else {
        console.error('Failed to save order:', response.data);
      }
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <Box className='place-your-order' maxWidth="md" mx="auto" mt={4}>
      <Typography variant="h4" component="h2" className="title" align="center" gutterBottom>
        Place Your Order
      </Typography>
      <Grid container spacing={2} className="place-order">
        <Grid item xs={10} md={5}>
          <CartNew selectedOrderType={selectedOrderType}  hideCheckoutButton={true} 
          updateCartItems={updateCartItems} />
        </Grid>
        <Grid item xs={12} md={6} mt={5}>
          <form onSubmit={handleProceedToCheckout}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  value={orderDetails.name}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  value={orderDetails.address}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={orderDetails.phone}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  value={orderDetails.email}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Card Holder Name"
                  name="cardHolderName"
                  value={orderDetails.cardHolderName}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Billing Zip Code"
                  name="billingZipCode"
                  value={orderDetails.billingZipCode}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Card Number"
                  name="cardNumber"
                  value={orderDetails.cardNumber}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="CVV"
                  name="cvv"
                  value={orderDetails.cvv}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Button type="submit" variant="contained" color="primary">
                    Place Order
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceOrder;
