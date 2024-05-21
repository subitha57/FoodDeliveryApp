import React, { useState, useContext, useEffect } from 'react';
import './HalfAndHalfPizza.css';
import { StoreContext } from '../../context/StoreContextProvider';
import plainPizza from '../../assets/menu_9.png';
import CloseIcon from '@mui/icons-material/Close';

const HalfAndHalfPizza = ({ onClose }) => {
    const { food_list, addToCart } = useContext(StoreContext);
    const [selectedPizzaLeftImage, setSelectedPizzaLeftImage] = useState(plainPizza);
    const [selectedPizzaRightImage, setSelectedPizzaRightImage] = useState(plainPizza);
    const [selectedPizzaLeft, setSelectedPizzaLeft] = useState('');
    const [selectedPizzaRight, setSelectedPizzaRight] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedCheeseLeft, setSelectedCheeseLeft] = useState('');
    const [selectedMeatLeft, setSelectedMeatLeft] = useState('');
    const [selectedVegetablesLeft, setSelectedVegetablesLeft] = useState('');
    const [selectedCheeseRight, setSelectedCheeseRight] = useState('');
    const [selectedMeatRight, setSelectedMeatRight] = useState('');
    const [selectedVegetablesRight, setSelectedVegetablesRight] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

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

        const halfAndHalfPizza = {
            name: `Half & Half Pizza: ${selectedPizzaLeft} and ${selectedPizzaRight}`,
            leftHalf: {
                name: selectedPizzaLeft,
                cheese: selectedCheeseLeft,
                meat: selectedMeatLeft,
                vegetables: selectedVegetablesLeft,
            },
            rightHalf: {
                name: selectedPizzaRight,
                cheese: selectedCheeseRight,
                meat: selectedMeatRight,
                vegetables: selectedVegetablesRight,
            },
            size: size,
            quantity: parseInt(quantity, 10),
            price: totalPrice,
            image: selectedPizzaLeftImage, // Use left image as representative
        };

        addToCart(halfAndHalfPizza);
        onClose();
    };

    const pizzaItems = food_list.filter(item => item.category === 'Pizza');

    const calculateTotalPrice = () => {
        let totalPrice = 0;

        const leftHalfPrice = calculateHalfPrice(selectedPizzaLeft, selectedCheeseLeft, selectedMeatLeft, selectedVegetablesLeft);
        totalPrice += leftHalfPrice;

        const rightHalfPrice = calculateHalfPrice(selectedPizzaRight, selectedCheeseRight, selectedMeatRight, selectedVegetablesRight);
        totalPrice += rightHalfPrice;

        if (size === "Medium") {
            totalPrice += 2;
        } else if (size === "Large") {
            totalPrice += 4;
        }

        totalPrice *= quantity;
        setTotalPrice(totalPrice);
    };

    const calculateHalfPrice = (pizza, cheese, meat, vegetables) => {
        let basePrice = 0;

        const selectedPizzaItem = pizzaItems.find(item => item.name === pizza);
        if (selectedPizzaItem) {
            basePrice = selectedPizzaItem.price;
        }

        let halfPrice = basePrice;

        if (cheese === "mozzarella") {
            halfPrice += 1;
        } else if (cheese === "cheddar") {
            halfPrice += 1.5;
        } else if (cheese === "parmesan") {
            halfPrice += 2;
        }

        if (meat === "pepperoni") {
            halfPrice += 2;
        } else if (meat === "sausage") {
            halfPrice += 2.5;
        } else if (meat === "ham") {
            halfPrice += 3;
        }

        if (vegetables === "mushrooms") {
            halfPrice += 1;
        } else if (vegetables === "onions") {
            halfPrice += 0.5;
        } else if (vegetables === "bellPeppers") {
            halfPrice += 1.5;
        }
        return halfPrice;
    };

    return (
        <div className={`half-and-half-popup ${darkMode ? 'dark-mode' : ''}`}>
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
                                    <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} min="1" />
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
                                    <h2>First Half</h2><br />
                                    <img src={selectedPizzaLeftImage} alt="Selected Pizza Left" /><br /><br />
                                    <label htmlFor="pizza-left">Select Pizza:</label>
                                    <select id="pizza-left" value={selectedPizzaLeft} onChange={handlePizzaLeftChange}>
                                        <option value="">Select Pizza</option>
                                        {pizzaItems.map((item) => (
                                            <option key={item._id} value={item.name}>{item.name}</option>
                                        ))}
                                    </select><br />
                                    <label htmlFor="cheese-left">Select Cheese:</label>
                                    <select id="cheese-left" value={selectedCheeseLeft} onChange={handleCheeseLeftChange}>
                                        <option value="">Select Cheese</option>
                                        <option value="mozzarella">Mozzarella</option>
                                        <option value="cheddar">Cheddar</option>
                                        <option value="parmesan">Parmesan</option>
                                    </select><br />
                                    <label htmlFor="meat-left">Select Meat:</label>
                                    <select id="meat-left" value={selectedMeatLeft} onChange={handleMeatLeftChange}>
                                        <option value="">Select Meat</option>
                                        <option value="pepperoni">Pepperoni</option>
                                        <option value="sausage">Sausage</option>
                                        <option value="ham">Ham</option>
                                    </select><br />
                                    <label htmlFor="vegetable-left">Select Vegetable:</label>
                                    <select id="vegetable-left" value={selectedVegetablesLeft} onChange={handleVegetablesLeftChange}>
                                        <option value="">Select Vegetable</option>
                                        <option value="mushrooms">Mushrooms</option>
                                        <option value="onions">Onions</option>
                                        <option value="bellPeppers">Bell Peppers</option>
                                    </select>
                                </td>
                                <td>
                                    <h2>Second Half</h2><br />
                                    <img src={selectedPizzaRightImage} alt="Selected Pizza Right" /><br /><br />
                                    <label htmlFor="pizza-right">Select Pizza:</label>
                                    <select id="pizza-right" value={selectedPizzaRight} onChange={handlePizzaRightChange}>
                                        <option value="">Select Pizza</option>
                                        {pizzaItems.map((item) => (
                                            <option key={item._id} value={item.name}>{item.name}</option>
                                        ))}
                                    </select><br />
                                    <label htmlFor="cheese-right">Select Cheese:</label>
                                    <select id="cheese-right" value={selectedCheeseRight} onChange={handleCheeseRightChange}>
                                        <option value="">Select Cheese</option>
                                        <option value="mozzarella">Mozzarella</option>
                                        <option value="cheddar">Cheddar</option>
                                        <option value="parmesan">Parmesan</option>
                                    </select><br />
                                    <label htmlFor="meat-right">Select Meat:</label>
                                    <select id="meat-right" value={selectedMeatRight} onChange={handleMeatRightChange}>
                                        <option value="">Select Meat</option>
                                        <option value="pepperoni">Pepperoni</option>
                                        <option value="sausage">Sausage</option>
                                        <option value="ham">Ham</option>
                                    </select><br />
                                    <label htmlFor="vegetable-right">Select Vegetable:</label>
                                    <select id="vegetable-right" value={selectedVegetablesRight} onChange={handleVegetablesRightChange}>
                                        <option value="">Select Vegetable</option>
                                        <option value="mushrooms">Mushrooms</option>
                                        <option value="onions">Onions</option>
                                        <option value="bellPeppers">Bell Peppers</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='buttonsbtn'>
                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HalfAndHalfPizza;
