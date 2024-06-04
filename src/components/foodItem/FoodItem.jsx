import React, { useContext, useEffect, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContextProvider';
import defaultPizzaImage from '../../assets/Plain.png'; // Add path to your default image

const FoodItem = ({ id, name, price, description, image, darkTheme }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  useEffect(() => {
    if (cartItems[id]) {
      setIsAddedToCart(true);
    } else {
      setIsAddedToCart(false);
    }
  }, [cartItems, id]);

  return (
    <div className='food-item'>
      <div className='food-item-image-container'>
        <img className='food-item-image' src={image || defaultPizzaImage} alt={name} />
        {!cartItems[id] ? (
          <img
            className='add'
            onClick={() => addToCart({ id, name, price, description, image: image || defaultPizzaImage, quantity: 1 })}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className='food-item-counter'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove from cart" />
            <p>{cartItems[id].quantity}</p>
            <img onClick={() => addToCart({ id, name, price, description, image: image || defaultPizzaImage, quantity: 1 })} src={assets.add_icon_green} alt="Add to cart" />
          </div>
        )}
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
      </div>
      <p className={`food-item-desc ${darkTheme ? 'light-input' : 'dark-input'}`}>{description}</p>
      <p className="food-item-price">Rs.{price} (Total: Rs.{price * cartItems[id]?.quantity})</p>
    </div>
  );
};

export default FoodItem;