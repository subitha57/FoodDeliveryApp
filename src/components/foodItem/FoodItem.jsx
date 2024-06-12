import React, { useContext, useEffect, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContextProvider';
import defaultPizzaImage from '../../assets/Plain.png';

const FoodItem = ({ id, name, price, description, image, darkTheme, customizationOptions }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [cartItem, setCartItem] = useState(null);
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  useEffect(() => {
    const existingCartItem = cartItems[id];
    setIsAddedToCart(!!existingCartItem);
    setCartItem(existingCartItem);
  }, [cartItems, id]);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      description,
      image: image || defaultPizzaImage,
      quantity: 1,
      ...customizationOptions,
    });
  };

  const handleRemoveFromCart = () => {  
    removeFromCart(id);
  };

  // Calculate dynamic price based on quantity in cart
  const dynamicPrice = cartItem ? cartItem.quantity * price : price;

  return (
    <div className='food-item'>
      <div className='food-item-image-container'>
        <img className='food-item-image' src={image || defaultPizzaImage} alt={name} />
       {/*  {!isAddedToCart ? (
          <img
            className='add'
            onClick={handleAddToCart}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className='food-item-counter'>
            <img onClick={handleRemoveFromCart} src={assets.remove_icon_red} alt="Remove from cart" />
            <p>{cartItem.quantity}</p>
           <img onClick={handleAddToCart} src={assets.add_icon_green} alt="Add to cart" />
          </div>
        )}*/}
      </div> 
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
      </div>
      <p className={`food-item-desc ${darkTheme ? 'light-input' : 'dark-input'}`}>{description}</p>
     {/*  <p className="food-item-price">Rs.{dynamicPrice}</p> Display dynamic price */}
    </div>
  );
};

export default FoodItem;