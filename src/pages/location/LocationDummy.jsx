import React from 'react';
import './LocationDummy.css'; // Import CSS file
import { useNavigate } from 'react-router-dom';

const RestaurantComponent = () => {
const navigate=useNavigate();

    const handleClick =()=>{
      navigate("/RegisterPopup")
    }
  return (
    <div className='dummy-container'>
      <h2>Order Now</h2>
    <div className="restaurant-container">
     
     <div className="restaurant-item">

    <h3>Dublin</h3>
    <p>4060 Grafton St,<br/>Dublin, CA 94568<br/>925-248-2636</p>
    <p>SUN-THU 10:00 AM – 10:00 PM<br/>FRI-SAT 10:00 AM – 11:00 PM</p>
    <button className="order-btn" onClick={handleClick}>ORDER NOW</button>
  
</div>
      <div className="restaurant-item">
        <h3>Fremont</h3>
        <p>35760 Fremont Blvd,<br/>Fremont, CA 94536,<br/>510-494-5555</p>
        <p>SUN-THU 10:00 AM – 10:00 PM<br/>FRI-SAT 10:00 AM – 11:00 PM</p>
        <button onClick={handleClick} className="order-btn">ORDER NOW</button>
      </div>
      <div className="restaurant-item">
        <h3>Tracy</h3>
        <p>1920 W 11th St,<br/>Tracy, CA 95376<br/>209-834-5560</p>
        <p>MON-THU 10:00 AM – 10:00 PM<br/>FRI-SAT : 10:00 AM - 12:00 AM<br/>SUN: 10:00 AM - 11:00 PM</p>
        
        <button className="order-btn" onClick={handleClick}>ORDER NOW</button>
      </div>
      <div className="restaurant-item">
        <h3>Union City</h3>
        <p>31871 Alvarado Blvd,<br/>Union City, CA 94587<br/>510-324-3700</p>
        <p>SUN-THU 11:00 AM – 9:30 PM<br/>FRI-SAT 11:00 AM – 10:30 PM</p>
        <button className="order-btn" onClick={handleClick}>ORDER NOW</button>
      </div>
      <div className="restaurant-item">
        <h3>SAN RAMON</h3>
        <p>11020 BOLLINGER CANYON RD,<br/>Union City, CA 94587<br/>510-324-3700</p>
        <p>SUN-THU 11:00 AM – 9:30 PM<br/>FRI-SAT 11:00 AM – 10:30 PM</p>
        <button className="order-btn" onClick={handleClick}>ORDER NOW</button>
      </div>
      <div className="restaurant-item">
        <h3> SUNNYVALE</h3>
        <p>31871 Alvarado Blvd,<br/>Union City, CA 94587<br/>510-324-3700</p>
        <p>MON-SUN 24 HOURS</p>
        <button className="order-btn" onClick={handleClick}>ORDER NOW</button>
      </div>

    </div>
    </div>
  );
}

export default RestaurantComponent;
