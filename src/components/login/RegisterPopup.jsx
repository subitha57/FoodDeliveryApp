import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const RegisterPopup = ({ setShowLogin, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Username: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
    ConfirmPassword: ''
  });
  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
      const response = await axios.post('https://test.tandooripizza.com/api/online/account/register', formData);
      const { Code, Message, Errors } = response.data;
      if (Code === 0) {
        setResponseMessage(Message);
        setErrorMessages([]);
        onLoginSuccess();
        navigate("/LoginModal");
      } else {
        setResponseMessage(Message);
        setErrorMessages(Errors);
      }
   
  };

  const handleClose = () => {
    setShowLogin(false);
  };

  const handleLogin = () => {
    setShowLogin(false); // Close the RegisterPopup
    navigate("/LoginModal"); // Navigate to LoginModal // Open the LoginModal, assuming the second parameter is for showing LoginModal
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Register</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            name="FirstName"
            type="text"
            fullWidth
            value={formData.FirstName}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            label="Last Name"
            name="LastName"
            type="text"
            fullWidth
            value={formData.LastName}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            label="Username"
            name="Username"
            type="text"
            fullWidth
            value={formData.Username}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            label="Email"
            name="Email"
            type="email"
            fullWidth
            value={formData.Email}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            label="Phone Number"
            name="PhoneNumber"
            type="tel"
            fullWidth
            value={formData.PhoneNumber}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            label="Password"
            name="Password"
            type="password"
            fullWidth
            value={formData.Password}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            name="ConfirmPassword"
            type="password"
            fullWidth
            value={formData.ConfirmPassword}
            onChange={handleChange}
            required
          />
          {responseMessage && <Typography color="error">{responseMessage}</Typography>}
          {errorMessages.length > 0 && (
            <List>
              {errorMessages.map((error, index) => (
                <ListItem key={index}>
                  <ListItemText primary={error} />
                </ListItem>
              ))}
            </List>
          )}
          <div className='login-here'>
            <p>Already have an account? <span onClick={handleLogin}>Login here</span></p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Register
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RegisterPopup;
