import React, { useContext, useEffect, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContextProvider';

const FoodItem = ({id,name,price,description,image}) => {

const {cartItems,addToCart,removeFromCart} = useContext(StoreContext);
const [itemPrice, setItemPrice] = useState(price);

useEffect(() => {
  if (cartItems[id]) {
    setItemPrice(cartItems[id].price);
  } else {
    setItemPrice(price);
  }
}, [cartItems, id, price]);

  const handleAddToCart = () => {
    console.log("Adding item to cart:", id, price);
    addToCart(id, price);
  };

  return (
    <div className='food-item'>
      <div className='food-item-image-container'>
        <img className='food-item-image' src={image} alt="" />
        {!cartItems[id]
        ?( <img className='add' onClick={()=>addToCart(id, price)} src={assets.add_icon_white} alt=""/>
        ):(
        <div className='food-item-counter'>
          <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=""/>
          <p>{cartItems[id].quantity}</p>
          <img  onClick={handleAddToCart} src={assets.add_icon_green } alt="" />
        </div> 
        )}
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" /> 
          
        </div>
      </div>
      <p className="food-item-desc">{description}</p>
      <p className="food-item-price">Rs.{itemPrice}</p>
    </div>
  )
}

export default FoodItem



