import React, { useContext, useState, useEffect } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContextProvider';
import FoodItem from '../foodItem/FoodItem';
import CustomizeForm from '../customize/CustomizeForm';
import { useTranslation } from 'react-i18next';

const FoodDisplay = () => {
  const { t } = useTranslation();
  const { feistyProducts, loading, error, getTotalPriceOfCartItems, cart  } = useContext(StoreContext);
  const [showCustomizeForm, setShowCustomizeForm] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null); // State to store selected pizza
  const [promotionApplied, setPromotionApplied] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(getTotalPriceOfCartItems());
  }, [feistyProducts, cart]);

  const toggleCustomizeForm = (item) => {
    setSelectedPizza(item); // Update selected pizza state when toggling the form
    setShowCustomizeForm(!showCustomizeForm);
  };

  const handleApplyPromotion = () => {
    setPromotionApplied(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='food-display' id='food-display'>
      <h2>{t("Top dishes near you")}</h2>
      <div className='food-display-list'>
        {feistyProducts.map((item) => (
          <div className='food-item' key={item.Id}>
            <FoodItem
              key={item.Id}
              id={item.Id}
              name={item.Name}
              description={item.Description}
              price={item.price}
              image={item.Image}
            />
            <button className='customize-button' onClick={() => toggleCustomizeForm(item)}>
              {t("Customize Pizza")}
            </button>
          </div>
        ))}
      </div>
     <p>Total Price: Rs.{totalPrice}</p>
      {showCustomizeForm && selectedPizza && (
        <CustomizeForm
          selectedPizza={selectedPizza}
          foodList={feistyProducts}
          onClose={() => setShowCustomizeForm(false)}
          isVisible={showCustomizeForm}
          promotionApplied={promotionApplied}
          setSelectedPizza={setSelectedPizza} // Pass function to update selectedPizza
        />
      )}
      {!promotionApplied && (
        <button className="apply-promotion-button" onClick={handleApplyPromotion}>
          {t("Apply Promotion")}
        </button>
      )}
    </div>
  );
};

export default FoodDisplay;
