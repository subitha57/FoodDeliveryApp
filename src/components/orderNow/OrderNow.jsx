import React from 'react'
import GeoLocation from './GeoLocation';
import LoginPopup from '../login/LoginPopup';


const OrderNow = () => {
    const loaction = GeoLocation();
   
  return (
    <div>
      {
        location.loaded ? JSON.stringify(location) : 
        "Location data not available yet"
      }
      
    </div>
  )
}

export default OrderNow