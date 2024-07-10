import React, { useContext, useEffect, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContextProvider';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import defaultPizzaImage from '../../assets/Plain.png';

const FoodItem = ({
  id,
  name,
  price,
  description,
  image,
  darkTheme,
  customizationOptions,
  showAddToCartButton,
  SizeCategoryId
}) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [cartItem, setCartItem] = useState(null);
  const [sizes, setSizes] = useState([]); // State to hold sizes fetched from API
  const [selectedSize, setSelectedSize] = useState(null); // State to track selected size
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const { cartItems, addToCart, removeFromCart, user, cartRestaurant } = useContext(StoreContext);
  const navigate = useNavigate(); // Initialize navigate
  const isLoggedIn = localStorage.getItem('authToken') !== null;

  useEffect(() => {
    const existingCartItem = cartItems[id];
    setIsAddedToCart(!!existingCartItem);
    setCartItem(existingCartItem);
  }, [cartItems, id]);

  // Fetch sizes from API based on SizeCategoryId
  useEffect(() => {
    if (SizeCategoryId) {
      fetchSizes(SizeCategoryId); // Call fetchSizes function to fetch sizes
    }
  }, [SizeCategoryId]);

  const fetchSizes = async (SizeCategoryId) => {
    try {
      // Replace with actual API endpoint and SizeCategoryId
      const response = await fetch(`https://your-api-endpoint.com/sizes?SizeCategoryId=${SizeCategoryId}`);
      const data = await response.json();
      setSizes(data); // Assuming data is an array of size options
      setSelectedSize(data[0]); // Set default selected size
    } catch (error) {
      console.error('Error fetching sizes:', error);
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Please login."); // Navigate to login modal if not logged in
      return;
    }

    if (!cartRestaurant) {
      alert("Please select a restaurant before adding items to the cart.");
      return;
    }

    addToCart({
      id,
      name,
      price,
      description,
      image: image || defaultPizzaImage,
      quantity,
      size: selectedSize, // Include selected size in cart item
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
        {showAddToCartButton && (
          !isAddedToCart ? (
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
          )
        )}
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
      </div>
      <p className={`food-item-desc ${darkTheme ? 'light-input' : 'dark-input'}`}>{description}</p>
      <div className='food-item-options'>
        {sizes.length > 0 && (
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            {sizes.map((size) => (
              <option key={size.id} value={size}>
                {size.name} - {size.price}
              </option>
            ))}
          </select>
        )}
        <label>Qty</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default FoodItem;