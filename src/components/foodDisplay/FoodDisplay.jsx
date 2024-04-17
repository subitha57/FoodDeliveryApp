import React, { useContext , useState} from 'react';
import './FoodDisplay.css'
import  { StoreContext } from '../../context/StoreContextProvider';
import FoodItem from '../foodItem/FoodItem';
import CustomizeForm from '../customize/CustomizeForm'

const FoodDisplay = ({category}) => {

const {food_list}=useContext(StoreContext)
const [showCustomizeForm, setShowCustomizeForm] = useState(false);
const [showForm, setShowForm] = useState(false);

const toggleCustomizeForm = () => {
  setShowCustomizeForm(!showCustomizeForm);
};

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <div>
                {category === "Pizza" && (
                  <button onClick={() => setShowForm(true)}>Customize Pizza</button>
                )}
              <div key={item._id}>
                <FoodItem
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
                
              </div>
              </div>
            );
          }
        })}
      </div>
      {showForm && (
        <CustomizeForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default FoodDisplay