import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContextProvider';
import FoodItem from '../foodItem/FoodItem';
import CustomizeForm from '../customize/CustomizeForm';
import OrderingForm from './OrderingForm';

const Pizza = () => {
  const { food_list } = useContext(StoreContext);
  const [showCustomizeForm, setShowCustomizeForm] = useState(false);
  const [pizzaItemId, setPizzaItemId] = useState(null);

  const toggleCustomizeForm = (itemId) => {
    console.log("Toggling Customize Form");
    setPizzaItemId(itemId);
    setShowCustomizeForm(!showCustomizeForm);
  };

  const pizzaItems = food_list.filter(item => item.category === 'Pizza');

  return (
    <div>
      <OrderingForm/>
    <div className='food-display' id='food-display'>
      <h2>Pizza </h2>
      <div className='food-display-list'>
        {pizzaItems.map((item, index) => (
          <div key={index}>
            <button onClick={() => toggleCustomizeForm(item._id)}>Customize Pizza</button>
            <FoodItem
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
      {showCustomizeForm && pizzaItemId && (
        <CustomizeForm id={pizzaItemId}  foodList={food_list}  onClose={() => setShowCustomizeForm(false)} />
      )}
    </div>
    </div>
  );
};

export default Pizza;
