import React, { useContext, useState, useEffect } from 'react';
import './CustomizeForm.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContextProvider';
import HalfAndHalfPizza from '../HalfAndHalf/HalfAndHalfPizza';
import CloseIcon from '@mui/icons-material/Close';
import ViewPromotion from '../ViewPromotions/ViewPromotions';

const CustomizeForm = ({ onClose, selectedPizza, foodList, isVisible, promotionApplied, darkTheme }) => {
  const [selectedCheese, setSelectedCheese] = useState([]);
  const [selectedMeat, setSelectedMeat] = useState([]);
  const [selectedVegetables, setSelectedVegetables] = useState([]);
  const [size, setSize] = useState('');
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0); // State to hold the total price
  const { addToCart } = useContext(StoreContext);
  const [showHalfAndHalfPizza, setShowHalfAndHalfPizza] = useState(false);
  const [showHalfAndHalfPopup, setShowHalfAndHalfPopup] = useState(false);

  useEffect(() => {
    // Calculate the total price whenever there's a change in size or selectedPizza
    setTotalPrice(
      calculateTotalPrice(size, selectedPizza, selectedCheese, selectedMeat, selectedVegetables, quantity)
    );
  }, [size, selectedPizza, selectedCheese, selectedMeat, selectedVegetables, quantity]);

  useEffect(() => {
    // Reset form values whenever visibility changes
    if (!isVisible) {
      setSelectedCheese([]);
      setSelectedMeat([]);
      setSelectedVegetables([]);
      setSize('');
      setQuantity(1);
      setTotalPrice(0);
    }
  }, [isVisible]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value)); // Convert value to integer
  };

  const handleCheckboxChange = (setter) => (e) => {
    const { value, checked } = e.target;
    setter((prevSelected) =>
      checked ? [...prevSelected, value] : prevSelected.filter((item) => item !== value)
    );
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
      size: size,
      cheese: selectedCheese,
      meat: selectedMeat,
      vegetables: selectedVegetables,
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
    cheese.forEach((item) => {
      if (item === 'mozzarella') {
        totalPrice += 1; // Example: Increase price by $1 for mozzarella cheese
      } else if (item === 'cheddar') {
        totalPrice += 1.5; // Example: Increase price by $1.5 for cheddar cheese
      } else if (item === 'parmesan') {
        totalPrice += 2; // Example: Increase price by $2 for parmesan cheese
      }
    });

    // Add price for meat
    meat.forEach((item) => {
      if (item === 'pepperoni') {
        totalPrice += 2; // Example: Increase price by $2 for pepperoni meat
      } else if (item === 'sausage') {
        totalPrice += 2.5; // Example: Increase price by $2.5 for sausage meat
      } else if (item === 'ham') {
        totalPrice += 3; // Example: Increase price by $3 for ham meat
      }
    });

    // Add price for vegetables
    vegetables.forEach((item) => {
      if (item === 'mushrooms') {
        totalPrice += 1; // Example: Increase price by $1 for mushrooms
      } else if (item === 'onions') {
        totalPrice += 0.5; // Example: Increase price by $0.5 for onions
      } else if (item === 'bellPeppers') {
        totalPrice += 1.5; // Example: Increase price by $1.5 for bell peppers
      }
    });

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
                  <label>Cheese:</label>
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        value="mozzarella"
                        checked={selectedCheese.includes('mozzarella')}
                        onChange={handleCheckboxChange(setSelectedCheese)}
                      />
                      Mozzarella
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="cheddar"
                        checked={selectedCheese.includes('cheddar')}
                        onChange={handleCheckboxChange(setSelectedCheese)}
                      />
                      Cheddar
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="parmesan"
                        checked={selectedCheese.includes('parmesan')}
                        onChange={handleCheckboxChange(setSelectedCheese)}
                      />
                      Parmesan
                    </label>
                  </div>
                </div>
                <hr className="divider" />
                <div className="form-group">
                  <label>Meat:</label>
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        value="pepperoni"
                        checked={selectedMeat.includes('pepperoni')}
                        onChange={handleCheckboxChange(setSelectedMeat)}
                      />
                     Curry Chicken
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sausage"
                        checked={selectedMeat.includes('sausage')}
                        onChange={handleCheckboxChange(setSelectedMeat)}
                      />
                     Buffalo Chicken
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sausage"
                        checked={selectedMeat.includes('sausage')}
                        onChange={handleCheckboxChange(setSelectedMeat)}
                      />
                     Malai Chicken
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sausage"
                        checked={selectedMeat.includes('sausage')}
                        onChange={handleCheckboxChange(setSelectedMeat)}
                      />
                     Achari Chicken
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sausage"
                        checked={selectedMeat.includes('sausage')}
                        onChange={handleCheckboxChange(setSelectedMeat)}
                      />
                     Tandoori BB
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sausage"
                        checked={selectedMeat.includes('sausage')}
                        onChange={handleCheckboxChange(setSelectedMeat)}
                      />
                     Grilled Chicken
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sausage"
                        checked={selectedMeat.includes('sausage')}
                        onChange={handleCheckboxChange(setSelectedMeat)}
                      />
                     Pepperoni
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sausage"
                        checked={selectedMeat.includes('sausage')}
                        onChange={handleCheckboxChange(setSelectedMeat)}
                      />
                     Bacon
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="ham"
                        checked={selectedMeat.includes('ham')}
                        onChange={handleCheckboxChange(setSelectedMeat)}
                      />
                      Ham
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sausage"
                        checked={selectedMeat.includes('sausage')}
                        onChange={handleCheckboxChange(setSelectedMeat)}
                      />
                     Tandoori Chicken
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sausage"
                        checked={selectedMeat.includes('sausage')}
                        onChange={handleCheckboxChange(setSelectedMeat)}
                      />
                     Beef
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sausage"
                        checked={selectedMeat.includes('sausage')}
                        onChange={handleCheckboxChange(setSelectedMeat)}
                      />
                     Italian Sausage
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sausage"
                        checked={selectedMeat.includes('sausage')}
                        onChange={handleCheckboxChange(setSelectedMeat)}
                      />
                     Salami
                    </label>
                  </div>
                </div>
                <hr className="divider" />
                <div className="form-group">
                  <label>Vegetables:</label>
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        value="mushrooms"
                        checked={selectedVegetables.includes('mushrooms')}
                        onChange={handleCheckboxChange(setSelectedVegetables)}
                      />
                      Mushrooms
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="onions"
                        checked={selectedVegetables.includes('onions')}
                        onChange={handleCheckboxChange(setSelectedVegetables)}
                      />
                      Onions
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="bellPeppers"
                        checked={selectedVegetables.includes('bellPeppers')}
                        onChange={handleCheckboxChange(setSelectedVegetables)}
                      />
                      Bell Peppers
                    </label>
                  </div>
                </div><br />
                <div className="price">
                  <p>Total Price: ${totalPrice.toFixed(2)}</p> {/* Display the total price */}
                  <button type="submit">Add to Cart</button>
                </div>
              </form>
            </div>
          </div>
          <div className='col-6'>
            <div className="image-container">
              <button className="close-button" onClick={onClose}>
                <CloseIcon style={{ color: 'black' }} />
              </button>
              <img src={selectedPizza.image} alt={selectedPizza.name} />
              <div className='halfbutton'>
                <button onClick={handleHalfAndHalfClick} className="half-half-btn">
                  Make it half and half Pizza
                </button>
              </div>
              <hr className="divider" />
            </div>
            {showHalfAndHalfPopup && <HalfAndHalfPizza onClose={() => setShowHalfAndHalfPopup(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeForm;
