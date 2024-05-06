  import React, { useState, useContext, useEffect } from 'react';
import './HalfAndHalfPizza.css'; 
import { StoreContext } from '../../context/StoreContextProvider';
import plainPizza from '../../assets/menu_9.png';
import CloseIcon from '@mui/icons-material/Close';

const HalfAndHalfPizza = ({ onClose }) => {
  const { food_list } = useContext(StoreContext);
  const [selectedPizzaLeftImage, setSelectedPizzaLeftImage] = useState(plainPizza);
  const [selectedPizzaRightImage, setSelectedPizzaRightImage] = useState(plainPizza);
  const [selectedPizzaLeft, setSelectedPizzaLeft] = useState('');
  const [selectedPizzaRight, setSelectedPizzaRight] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedCheeseLeft, setSelectedCheeseLeft] = useState('');
  const [selectedMeatLeft, setSelectedMeatLeft] = useState('');
  const [selectedVegetablesLeft, setSelectedVegetablesLeft] = useState('');
  const [selectedCheeseRight, setSelectedCheeseRight] = useState('');
  const [selectedMeatRight, setSelectedMeatRight] = useState('');
  const [selectedVegetablesRight, setSelectedVegetablesRight] = useState('');
  const [totalPrice, setTotalPrice] = useState(0); // State to hold the total price

  

  const handlePizzaLeftChange = (e) => {
    const selectedPizzaName = e.target.value;
    setSelectedPizzaLeft(selectedPizzaName);
    const selectedPizzaItem = pizzaItems.find(item => item.name === selectedPizzaName);
    if (selectedPizzaItem) {
      setSelectedPizzaLeftImage(selectedPizzaItem.image);
    }
    calculateTotalPrice();
  };

  const handlePizzaRightChange = (e) => {
    const selectedPizzaName = e.target.value;
    setSelectedPizzaRight(selectedPizzaName);
    const selectedPizzaItem = pizzaItems.find(item => item.name === selectedPizzaName);
    if (selectedPizzaItem) {
      setSelectedPizzaRightImage(selectedPizzaItem.image);
    }
    calculateTotalPrice();
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
    calculateTotalPrice();
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    calculateTotalPrice();
  };

  const handleCheeseLeftChange = (e) => {
    setSelectedCheeseLeft(e.target.value);
    calculateTotalPrice();
  };

  const handleVegetablesLeftChange = (e) => {
    setSelectedVegetablesLeft(e.target.value);
    calculateTotalPrice();
  };

  const handleMeatLeftChange = (e) => {
    setSelectedMeatLeft(e.target.value);
    calculateTotalPrice();
  };

  const handleCheeseRightChange = (e) => {
    setSelectedCheeseRight(e.target.value);
    calculateTotalPrice();
  };

  const handleVegetablesRightChange = (e) => {
    setSelectedVegetablesRight(e.target.value);
    calculateTotalPrice();
  };

  const handleMeatRightChange = (e) => {
    setSelectedMeatRight(e.target.value);
    calculateTotalPrice();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Total Price :$" + totalPrice)
    onClose();
  };

  const pizzaItems = food_list.filter(item => item.category === 'Pizza');

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    // Calculate price for left half
    const leftHalfPrice = calculateHalfPrice(selectedPizzaLeft, selectedCheeseLeft, selectedMeatLeft, selectedVegetablesLeft);
    totalPrice += leftHalfPrice;

    // Calculate price for right half
    const rightHalfPrice = calculateHalfPrice(selectedPizzaRight, selectedCheeseRight, selectedMeatRight, selectedVegetablesRight);
    totalPrice += rightHalfPrice;

    // Add additional price for size
    if (size === "Medium") {
      totalPrice += 2; // Example: Increase price by $2 for medium size
    } else if (size === "Large") {
      totalPrice += 4; // Example: Increase price by $4 for large size
    }

    // Multiply by quantity
    totalPrice *= quantity;

    setTotalPrice(totalPrice);
  };

  const calculateHalfPrice = (pizza, cheese, meat, vegetables) => {
    let basePrice = 0;

    // Find the selected pizza item from the food list
    const selectedPizzaItem = pizzaItems.find(item => item.name === pizza);
    if (selectedPizzaItem) {
      basePrice = selectedPizzaItem.price;
    }

    let halfPrice = basePrice;

    // Add price for cheese
    if (cheese === "mozzarella") {
      halfPrice += 1; // Example: Increase price by $1 for mozzarella cheese
    } else if (cheese === "cheddar") {
      halfPrice += 1.5; // Example: Increase price by $1.5 for cheddar cheese
    } else if (cheese === "parmesan") {
      halfPrice += 2; // Example: Increase price by $2 for parmesan cheese
    }

    // Add price for meat
    if (meat === "pepperoni") {
      halfPrice += 2; // Example: Increase price by $2 for pepperoni meat
    } else if (meat === "sausage") {
      halfPrice += 2.5; // Example: Increase price by $2.5 for sausage meat
    } else if (meat === "ham") {
      halfPrice += 3; // Example: Increase price by $3 for ham meat
    }

    // Add price for vegetables
    if (vegetables === "mushrooms") {
      halfPrice += 1; // Example: Increase price by $1 for mushrooms
    } else if (vegetables === "onions") {
      halfPrice += 0.5; // Example: Increase price by $0.5 for onions
    } else if (vegetables === "bellPeppers") {
      halfPrice += 1.5; // Example: Increase price by $1.5 for bell peppers
    }

    return halfPrice;
  };

  return (
    <div className={`half-and-half-popup`}>
    <div className="half-and-half-container">
      <h1>Half and Half Pizza</h1>
     
      <form onSubmit={handleSubmit}>
      <button className="close-Button" onClick={onClose}>
          <CloseIcon />
        </button> 
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
              </td>
              <td>
                <label htmlFor="size">Size:</label>
                <select id="size" value={size} onChange={handleSizeChange}>
                  <option value="">Select Size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </td>
            </tr>
            <tr>  
              <td>
                <h2>First Half</h2><br/>
                <img src={selectedPizzaLeftImage} alt="Selected Pizza Left" /><br/><br/>
                <label htmlFor="pizza-left">Select Pizza:</label>
                <select id="pizza-left" value={selectedPizzaLeft} onChange={handlePizzaLeftChange}>
                  <option value="">Select Pizza</option>
                  {pizzaItems.map((item) => (
                    item.category === 'Pizza' && <option key={item._id} value={item.name}>{item.name}</option>
                  ))}
                </select><br/>
                {/* Add more select elements for cheese, meat, and vegetables for the first half */}
                
                <label htmlFor="cheese-left">Select Cheese:</label>
                <select id="cheese-left" value={selectedCheeseLeft} onChange={handleCheeseLeftChange}>
                  <option value="">Select Cheese</option>
                  <option value="mozzarella">Mozzarella</option>
                  <option value="cheddar">Cheddar</option>
                  <option value="parmesan">Parmesan</option>
                </select><br/>
                <label htmlFor="meat-left">Select Meat:</label>
                <select id="meat-left" value={selectedMeatLeft} onChange={handleMeatLeftChange}>
                  <option value="">Select Meat</option>
                  <option value="pepperoni">Pepperoni</option>
                  <option value="sausage">Sausage</option>
                  <option value="ham">Ham</option>
                </select><br/>
                <label htmlFor="vegetable-left">Select Vegetable:</label>
                <select id="vegetable-left" value={selectedVegetablesLeft} onChange={handleVegetablesLeftChange}>
                  <option value="">Select Vegetable</option>
                  <option value="mushrooms">Mushrooms</option>
                  <option value="onions">Onions</option>
                  <option value="bellPeppers">Bell Peppers</option>
                </select>

              </td>
              <td>
                <h2>Second Half</h2><br/>
                <img src={selectedPizzaRightImage} alt="Selected Pizza" /><br/><br/>
                <label htmlFor="pizza-right">Select Pizza:</label>
                <select id="pizza-right" value={selectedPizzaRight} onChange={handlePizzaRightChange}>
                  <option value="">Select Pizza</option>
                  {pizzaItems.map((item) => (
                    item.category === 'Pizza' && <option key={item._id} value={item.name}>{item.name}</option>
                  ))}
                </select><br/>
                

                <label htmlFor="cheese-right">Select Cheese:</label>
                <select id="cheese-right" value={selectedCheeseRight} onChange={handleCheeseRightChange}>
                  <option value="">Select Cheese</option>
                  <option value="mozzarella">Mozzarella</option>
                  <option value="cheddar">Cheddar</option>
                  <option value="parmesan">Parmesan</option>
                </select><br/>
                <label htmlFor="meat-right">Select Meat:</label>
                <select id="meat-right" value={selectedMeatRight} onChange={handleMeatRightChange}>
                  <option value="">Select Meat</option>
                  <option value="pepperoni">Pepperoni</option>
                  <option value="sausage">Sausage</option>
                  <option value="ham">Ham</option>
                </select><br/>
                <label htmlFor="vegetable-right">Select Vegetable:</label>
                <select id="vegetable-right" value={selectedVegetablesRight} onChange={handleVegetablesRightChange}>
                  <option value="">Select Vegetable</option>
                  <option value="mushrooms">Mushrooms</option>
                  <option value="onions">Onions</option>
                  <option value="bellPeppers">Bell Peppers</option>
                </select>
                {/* Add more select elements for cheese, meat, and vegetables for the second half */}
              </td>
            </tr>
          </tbody>
        </table>
        <div className='buttonsbtn'>
        <p>Total Price: ${totalPrice.toFixed(2)}</p> {/* Display the total price */}
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default HalfAndHalfPizza;
