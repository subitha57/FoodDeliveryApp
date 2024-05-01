import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContextProvider';
import FoodItem from '../foodItem/FoodItem';
import CustomizeForm from '../customize/CustomizeForm';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [showCustomizeForm, setShowCustomizeForm] = useState(false);
  const [pizzaItemId, setPizzaItemId] = useState(null);
  const [selectedPizza, setSelectedPizza] = useState(null);

  const toggleCustomizeForm = (item) => {
    setPizzaItemId(item._id);
    setSelectedPizza(item);
    setShowCustomizeForm(!showCustomizeForm);
  };

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item, index) => {
          if (category === 'All' || category === item.category) {
            return (
              <div className='food-item' key={index}>
                <FoodItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
                {category === 'Pizza' && (
                  <button className='customize-button' onClick={() => toggleCustomizeForm(item)}>
                    Customize Pizza
                  </button>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
      {showCustomizeForm && pizzaItemId && (
  <CustomizeForm
    selectedPizza={selectedPizza}
    onClose={() => setShowCustomizeForm(false)}
    isVisible={showCustomizeForm} // Pass visibility state
  />
)}
    </div>
  );
};

export default FoodDisplay;
