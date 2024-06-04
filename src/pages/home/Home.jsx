import React, { useState, useEffect } from 'react'
import Header from '../../components/header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/foodDisplay/FoodDisplay'
import AppDownload from '../../components/appDownload/AppDownload'
import Location from '../location/Location';
import OrderType from '../../components/Order Type/OrderType'
import ScrollButton from '../../ScrollButton'


const Home = () => {
  const [category, setCategory] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState('');
  const [foodList, setFoodList] = useState([]);

  const handleSelectOrderType = (orderType) => {
    setSelectedOrderType(orderType);
    // Additional logic related to order type selection can go here
  };

  return (
    <div >
      <Header />
      <ExploreMenu 
                category={category} 
                setCategory={setCategory} 
               
            />
            <FoodDisplay category={category} foodList={foodList} />
      <OrderType onSelectOrderType={handleSelectOrderType} userLocation={""} />
      <AppDownload /><br />
      <Location />
      <ScrollButton />
    </div>
  )
}

export default Home