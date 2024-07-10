import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './LocationDummy.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContextProvider';

const RestaurantList = () => {
  const { setCartRestaurant } = useContext(StoreContext);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.post('https://test.tandooripizza.com/api/online/stores', {});
        setStores(response.data.Data);
      } catch (error) {
        console.error('Error fetching the store data', error);
      }
    };

    fetchStores();
  }, []);

  const handleSelectRestaurant = (restaurant) => {
    setCartRestaurant(restaurant);
    localStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));
    console.log('Selected Restaurant:', restaurant); // Ensure this logs the correct restaurant object
  };

  const handleOrderNow = (e, restaurant) => {
    e.stopPropagation();
    handleSelectRestaurant(restaurant);
    navigate('/OrderType');
  };

  return (
    <div className='dummy-container'>
      <h2>Order Now</h2>
      <div className="restaurant-container">
        {stores.map((store) => (
          <div className="restaurant-item" key={store.ID} onClick={() => handleSelectRestaurant(store)}>
            <h3>{store.BusinessName}</h3>
            <p>{store.BusinessAddress1}<br />
              {store.LandlineNumber}</p>
            <p>Latitude: {store.Latitude}, Longitude: {store.Longitude}</p>
            <button className="order-btn" onClick={(e) => handleOrderNow(e, store)}>ORDER NOW</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
