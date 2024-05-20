import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContextProvider';
import FoodItem from '../foodItem/FoodItem';
import CustomizeForm from '../customize/CustomizeForm';
import { useTranslation } from 'react-i18next';

const FoodDisplay = ({ category }) => {
  const { t } = useTranslation();
  const { food_list } = useContext(StoreContext);
  const [showCustomizeForm, setShowCustomizeForm] = useState(false);
  const [pizzaItemId, setPizzaItemId] = useState(null);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [promotionApplied, setPromotionApplied] = useState(false);

  const toggleCustomizeForm = (item) => {
    setPizzaItemId(item._id);
    setSelectedPizza(item);
    setShowCustomizeForm(!showCustomizeForm);
  };
  const handleApplyPromotion = () => {
    // Set promotionApplied to true when the Apply Promotion button is clicked
    setPromotionApplied(true);
  };

  return (
    <div className='food-display' id='food-display'>
      <h2>{t("Top dishes near you")}</h2>
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
                    {t("Customize Pizza")}
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
          foodList={food_list} // Pass the pizza list as a prop
          onClose={() => setShowCustomizeForm(false)}
          isVisible={showCustomizeForm}
          promotionApplied={promotionApplied}
        />
      )}
      {!promotionApplied && (
        <button className="apply-promotion-button" onClick={handleApplyPromotion}>
          {t(" Apply Promotion")}
        </button>
      )}
    </div>
  );
};

export default FoodDisplay;
