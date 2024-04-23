import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './OrderingForm.css';

const OrderingForm = () => {

const navigate= useNavigate();
const handlePizza = ()=>{
 navigate('/Pizza')
}
  return (
    <div>
        <div>
      <Button onClick={handlePizza} variant="contained" color="primary">Pizza</Button>
      <Button variant="contained" color="primary">Appetizers</Button>
      <Button variant="contained" color="primary">Beverages</Button>
      <Button variant="contained" color="primary">Pasta</Button>
    </div>
    </div>
  )
}

export default OrderingForm