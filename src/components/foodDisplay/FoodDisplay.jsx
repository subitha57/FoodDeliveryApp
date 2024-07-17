import React, { useContext, useState, useEffect } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContextProvider';
import FoodItem from '../foodItem/FoodItem';
import { useTranslation } from 'react-i18next';
import CartNew from '../../pages/cart/CartNew';
import CustomizePizza from '../customize/CustomizeForm';

const FoodDisplay = ({ category}) => {
 
  const { t } = useTranslation();
  const {
    feistyProducts,
    beverages,
    appetizers,
    extras,
    loading,
    error,
    getTotalPriceOfCartItems,
    cart,
    selectedOrderType
  } = useContext(StoreContext);

  const [showCustomizeForm, setShowCustomizeForm] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [promotionApplied, setPromotionApplied] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customizedPrice, setCustomizedPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(getTotalPriceOfCartItems());
  }, [feistyProducts, beverages, appetizers, extras, cart]);

  const toggleCustomizeForm = (item) => {
    setSelectedPizza(item);
    setShowCustomizeForm(!showCustomizeForm);
    setCustomizedPrice(null);
  };

  const handleApplyPromotion = () => {
    setPromotionApplied(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Loading...</div>;

  const renderItems = () => {
    switch (category) {
      case 'Beverages':
        return beverages.map(item => (
          <div className='food-item' key={item.Id}>
            <FoodItem
              key={item.Id}
              id={item.Id}
              name={item.Name}
              description={item.Description}
              price={item.Cost}
              image={item.Image}
              showAddToCartButton={true}
            />
          </div>
        ));
      case 'Appetizers':
        return appetizers.map(item => (
          <div className='food-item' key={item.Id}>
            <FoodItem
              key={item.Id}
              id={item.Id}
              name={item.Name}
              description={item.Description}
              price={item.Cost}
              image={item.Image}
              showAddToCartButton={true}
            />
          </div>
        ));
      case 'Extras':
        return extras.map(item => (
          <div className='food-item' key={item.Id}>
            <FoodItem
              key={item.Id}
              id={item.Id}
              name={item.Name}
              description={item.Description}
              price={item.Cost}
              image={item.Image}
              showAddToCartButton={true}
            />
          </div>
        ));
      default:
        return feistyProducts.map(item => (
          <div className='food-item' key={item.Id}>
            <FoodItem
              key={item.Id}
              id={item.Id}
              name={item.Name}
              description={item.Description}
              price={item.Id === selectedPizza?.Id && customizedPrice !== null ? customizedPrice : item.LargePrice}
              image={item.Image}
              isFeisty={true}
              showAddToCartButton={false} // Don't show the "Add to Cart" button for feistyProducts
            />
            <button className='customize-button' onClick={() => toggleCustomizeForm(item)}>
              {t("Customize Pizza")}
            </button>
          </div>
        ));
    }
  };

  return (
    <div className='container'>
      <div className='cart-container fixed-cart'>
        <CartNew selectedOrderType={selectedOrderType} />
      </div>
      <div className='food-display-container'>
        <div className='food-display' id='food-display'>
          <h2>
            {category === 'Beverages'
              ? t("Beverages")
              : category === 'Appetizers'
              ? t("Appetizers")
              : category === 'Extras'
              ? t("Extras")
              : t("Top dishes near you")}
          </h2>
          <div className='food-display-list'>
            {renderItems()}
          </div>
          <p>Total Price: ${totalPrice}</p>
          {showCustomizeForm && selectedPizza && (
            <CustomizePizza
              selectedPizza={selectedPizza}
              foodList={feistyProducts}
              onClose={() => setShowCustomizeForm(false)}
              setPrice={setCustomizedPrice}
              isVisible={showCustomizeForm}
              promotionApplied={promotionApplied}
              setSelectedPizza={setSelectedPizza}
            />
          )}
          {!promotionApplied && (
            <button className="apply-promotion-button" onClick={handleApplyPromotion}>
              {t("Apply Promotion")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
