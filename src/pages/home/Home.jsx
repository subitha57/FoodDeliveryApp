// Home.jsx
import React, { useState } from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/foodDisplay/FoodDisplay';
import AppDownload from '../../components/appDownload/AppDownload';
import OrderType from '../../components/Order Type/OrderType';
import ScrollButton from '../../ScrollButton';
import LocationDummy from '../location/LocationDummy';
import TakeOut from '../../components/Order Type/TakeOut'; // Import the TakeOut component

const Home = () => {
  const [category, setCategory] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [showTakeOut, setShowTakeOut] = useState(false); // State to control the visibility of TakeOut component

  const handleContinue = () => {
    setShowTakeOut(false);
    // Additional logic you want to execute when continuing
    console.log('Continuing...');
  };

  const handleSelectOrderType = (orderType) => {
    setSelectedOrderType(orderType);
    // Additional logic related to order type selection can go here
    // If orderType is TakeOut, show TakeOut component
    if (orderType === "TakeOut") {
      setShowTakeOut(true);
    }
  };

  return (
    <div>
      <LocationDummy />
      {/* Conditionally render TakeOut or ExploreMenu based on selectedOrderType */}
      {showTakeOut ? (
        <TakeOut onClose={() => setShowTakeOut(false)} onContinue={handleContinue} />
      ) : (
        <ExploreMenu category={category} setCategory={setCategory} />
      )}
      
      {/* Other components */}
      <FoodDisplay category={category} foodList={foodList} />
      <OrderType onSelectOrderType={handleSelectOrderType} userLocation={""} />
      <AppDownload /><br />
      <ScrollButton />
    </div>
  );
};

export default Home;
