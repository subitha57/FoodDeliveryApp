import React, { useContext , useState} from 'react';
import './FoodDisplay.css'
import  { StoreContext } from '../../context/StoreContextProvider';
import FoodItem from '../foodItem/FoodItem';
import CustomizeForm from '../customize/CustomizeForm'

const FoodDisplay = ({category}) => {

const {food_list}=useContext(StoreContext)
const [showCustomizeForm, setShowCustomizeForm] = useState(false);
const [showForm, setShowForm] = useState(false);
const [pizzaItemId, setPizzaItemId] = useState(null);


const toggleCustomizeForm = (itemId) => {
  console.log("Toggling Customize Form");
  setPizzaItemId(itemId);
  setShowCustomizeForm(!showCustomizeForm);
};  

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <div key={index}>
                {category === "Pizza" && (
                  <button onClick={() =>  toggleCustomizeForm(item._id)}>Customize Pizza</button>
                )}
              
                <FoodItem
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
       
              </div>
            );
          }
          return null;
        })}
      </div>
      {showCustomizeForm && pizzaItemId && (
        <CustomizeForm id={pizzaItemId} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default FoodDisplay