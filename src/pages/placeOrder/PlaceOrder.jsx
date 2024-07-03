import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContextProvider';
import { useNavigate } from 'react-router-dom';
import ProceedCheckOut from '../ProceedCheckOut/ProceedCheckOut';
import { useTranslation } from 'react-i18next';
import {
  Container,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';

const PlaceOrder = ({ onClose }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    futureOrder: false,
    futureDate: '',
    futureTime: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://test.tandooripizza.com/api/online/order/delivery/check',
        { address: formData.address }
      );

      const { Code, Message } = response.data;

      setSnackbar({
        open: true,
        message: Message,
        severity: Code === 0 ? 'success' : 'error'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'An error occurred while checking delivery availability.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCheckout = async () => {
    try {
      const orderDetails = {
        ...formData,
        cartTotal: getTotalCartAmount(),
        deliveryFee: getTotalCartAmount() === 0 ? 0 : 2,
        totalAmount: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2
      };

      const response = await axios.post(
        'https://test.tandooripizza.com/api/online/order/save',
        orderDetails
      );

      if (response.data.Code === 0) {
        setSnackbar({
          open: true,
          message: 'Order placed successfully!',
          severity: 'success'
        });
        setShowModal(true);
      } else {
        setSnackbar({
          open: true,
          message: response.data.Message,
          severity: 'error'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'An error occurred while placing the order.',
        severity: 'error'
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='place-order'>
      <div>
        <button className="close-button" onClick={closeModal}>Close</button>
      </div>
      <div className='check-availability'>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Check Delivery Availability
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="DineIn">Dine In</MenuItem>
                  <MenuItem value="Delivery">Delivery</MenuItem>
                  <MenuItem value="TakeOut">Take Out</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="futureOrder"
                      checked={formData.futureOrder}
                      onChange={handleChange}
                    />
                  }
                  label="Future Order"
                />
              </Grid>
              {formData.futureOrder && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      label="Future Date"
                      type="date"
                      name="futureDate"
                      value={formData.futureDate}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Future Time"
                      type="time"
                      name="futureTime"
                      value={formData.futureTime}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Check Delivery Availability
                </Button>
              </Grid>
            </Grid>
          </form>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
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
