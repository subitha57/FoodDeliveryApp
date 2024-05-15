import React, { useContext, useState, useEffect } from 'react';
import './CustomizeForm.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContextProvider';
import HalfAndHalfPizza from '../HalfAndHalf/HalfAndHalfPizza';
import CloseIcon from '@mui/icons-material/Close';
import ViewPromotion from './ViewPromotions';

const CustomizeForm = ({ onClose, selectedPizza, foodList, isVisible,promotionApplied ,darkTheme  }) => { // Add 'isVisible' to the function parameters
  const [selectedPizzas, setSelectedPizzas] = useState('');
  const [selectedCheese, setSelectedCheese] = useState('');
  const [selectedMeat, setSelectedMeat] = useState('');
  const [selectedVegetables, setSelectedVegetables] = useState('');
  const [size, setSize] = useState('');
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0); // State to hold the total price
  const { addToCart } = useContext(StoreContext);
  const [showHalfAndHalfPizza, setShowHalfAndHalfPizza] = useState(false);
  const [showHalfAndHalfPopup, setShowHalfAndHalfPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [showPromotion, setShowPromotion] = useState(false);
 


  useEffect(() => {
    // Calculate the total price whenever there's a change in size or selectedPizza
    setTotalPrice(
      calculateTotalPrice(size, selectedPizza, selectedCheese, selectedMeat, selectedVegetables, quantity)
    );
  }, [size, selectedPizza, selectedCheese, selectedMeat, selectedVegetables, quantity]);

  useEffect(() => {
    // Reset form values whenever visibility changes
    if (!isVisible) {
      setSelectedPizzas('');
      setSelectedCheese('');
      setSelectedMeat('');
      setSelectedVegetables('');
      setSize('');
      setQuantity(1);
      setTotalPrice(0);
    }
  }, [isVisible]);

  const handlePizzaChange = (e) => {
    setSelectedPizzas(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value)); // Convert value to integer
  };

  const handleCheeseChange = (e) => {
    setSelectedCheese(e.target.value);
  };

  const handleMeatChange = (e) => {
    setSelectedMeat(e.target.value);
  };

  const handleVegetablesChange = (e) => {
    setSelectedVegetables(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const customPizza = {
      id: selectedPizza._id,
      name: selectedPizza.name,
      description: selectedPizza.description,
      price: totalPrice, // Use the calculated total price
      quantity: quantity,
    };
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    existingCartItems.push(customPizza);
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    // Add the custom pizza to the cart
    addToCart(customPizza);

    onClose();
  };

  const handleHalfAndHalfClick = () => {
    setShowHalfAndHalfPopup(true);

  };

  const calculateTotalPrice = (size, pizza, cheese, meat, vegetables, quantity) => {
    let basePrice = pizza.price; // Base price of the pizza
    let totalPrice = basePrice; // Initial total price is the base price

    // Add additional price for size
    if (size === 'Medium') {
      totalPrice += 2; // Example: Increase price by $2 for medium size
    } else if (size === 'Large') {
      totalPrice += 4; // Example: Increase price by $4 for large size
    }

    // Add price for cheese
    if (cheese === 'mozzarella') {
      totalPrice += 1; // Example: Increase price by $1 for mozzarella cheese
    } else if (cheese === 'cheddar') {
      totalPrice += 1.5; // Example: Increase price by $1.5 for cheddar cheese
    } else if (cheese === 'parmesan') {
      totalPrice += 2; // Example: Increase price by $2 for parmesan cheese
    }

    // Add price for meat
    if (meat === 'pepperoni') {
      totalPrice += 2; // Example: Increase price by $2 for pepperoni meat
    } else if (meat === 'sausage') {
      totalPrice += 2.5; // Example: Increase price by $2.5 for sausage meat
    } else if (meat === 'ham') {
      totalPrice += 3; // Example: Increase price by $3 for ham meat
    }

    // Add price for vegetables
    if (vegetables === 'mushrooms') {
      totalPrice += 1; // Example: Increase price by $1 for mushrooms
    } else if (vegetables === 'onions') {
      totalPrice += 0.5; // Example: Increase price by $0.5 for onions
    } else if (vegetables === 'bellPeppers') {
      totalPrice += 1.5; // Example: Increase price by $1.5 for bell peppers
    }

    // Multiply by quantity
    totalPrice *= quantity;
     // Apply promotion if promotionApplied is true
     if (promotionApplied) {
      // Apply 10% discount
      totalPrice *= 0.9;
    }


    return totalPrice;
  };

  if (showHalfAndHalfPizza) {
    return <HalfAndHalfPizza onClose={onClose} selectedPizza={selectedPizza} />;
  }

  return (
   
    <div className={`customize-container ${darkTheme ? 'dark-theme' : 'light-theme'} ${isVisible ? 'show' : ''}`}>
    <div className='container'>
    <div className="heading-container">
      <h2>Customize Your Pizza</h2>
    </div>
       
      <div className='row'>
        <div className='col-6'> 
      <div className="form-container"> 
     
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="size">Size:</label>
            <select id="size" value={size} onChange={handleSizeChange}>
              <option value="">Select Size</option>
              <option value="Small">Small (Serving size 1-2 person)</option>
              <option value="Medium">Medium (Serving size 2-3 person)</option>
              <option value="Large">Large (Serving size 3-4 person)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
          </div>
          <div className="form-group">
            <label htmlFor="cheese">Cheese:</label>
            <select id="cheese" value={selectedCheese} onChange={handleCheeseChange}>
              <option value="">Select Cheese</option>
              <option value="mozzarella">Mozzarella</option>
              <option value="cheddar">Cheddar</option>
              <option value="parmesan">Parmesan</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="meat">Meat:</label>
            <select id="meat" value={selectedMeat} onChange={handleMeatChange}>
              <option value="">Select Meat</option>
              <option value="pepperoni">Pepperoni</option>
              <option value="sausage">Sausage</option>
              <option value="ham">Ham</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="vegetables">Vegetables:</label>
            <select id="vegetables" value={selectedVegetables} onChange={handleVegetablesChange}>
              <option value="">Select Vegetables</option>
              <option value="mushrooms">Mushrooms</option>
              <option value="onions">Onions</option>
              <option value="bellPeppers">Bell Peppers</option>
            </select>
          </div><br />
          <div className="price">
            <p>Total Price: ${totalPrice.toFixed(2)}</p> {/* Display the total price */}
            <button  type="submit">Add to Cart</button>
          </div>
        </form>
      </div>
      </div>
      <div className='col-6'>
      <div className="image-container">
        <button className="close-button" onClick={onClose}>
          <CloseIcon style={{ color: 'black' }}/>
        </button>
        <img src={selectedPizza.image} alt={selectedPizza.name} />
        <div className='halfbutton'>
          <button onClick={handleHalfAndHalfClick} className="half-half-btn">
            Make it half and half Pizza
          </button>
        </div> 
      </div>
      {showHalfAndHalfPopup && <HalfAndHalfPizza onClose={() => setShowHalfAndHalfPopup(false)} />}
    </div>
    </div>
    </div>
</div>
  );
};

export default CustomizeForm;
