import React, { useState, useEffect } from 'react';
import './CustomizeForm.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContextProvider';

function CustomizeForm({id}) {
  const {addToCart} = useContext(StoreContext);
  const [size, setSize] = useState('medium');
  const [toppings, setToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const price = {
    small: 200,
    medium: 300,
    large: 400,
    toppings: {
      pepperoni: 50,
      mushrooms: 70,
      onions: 30,
      sausage: 20,
    },
  };

  useEffect(() => {
    calculateTotalPrice(size, toppings);
  }, [size, toppings]); // Recalculate totalPrice whenever size or toppings change

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleToppingChange = (e) => {
    const topping = e.target.value;
    if (e.target.checked) {
      setToppings([...toppings, topping]);
    } else {
      setToppings(toppings.filter((top) => top !== topping));
    }
    console.log("Toppings:", toppings);
  };

  const calculateTotalPrice = (selectedSize, selectedToppings) => {
    let totalPrice = price[selectedSize];
    selectedToppings.forEach((topping) => {
      totalPrice += price.toppings[topping];
    });
    setTotalPrice(totalPrice);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Submitting form with id:", id, "and totalPrice:", totalPrice);
    addToCart(id,totalPrice);
    setSize('medium');
    setToppings([]);
    setTotalPrice(0);
  };

  return (
    <div className="customize-form">
      <h2>Customize Your Pizza</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Choose Size:
          <select value={size} onChange={handleSizeChange}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <br />
        <label>
          Choose Toppings:
          <br />
          <input type="checkbox" value="pepperoni" onChange={handleToppingChange} /> Pepperoni
          <br />
          <input type="checkbox" value="mushrooms" onChange={handleToppingChange} /> Mushrooms
          <br />
          <input type="checkbox" value="onions" onChange={handleToppingChange} /> Onions
          <br />
          <input type="checkbox" value="sausage" onChange={handleToppingChange} /> Sausage
          <br />
        </label>
        <br />
        <button type="submit">Submit</button>
        <div>Total Price: Rs.{totalPrice}</div>
      </form>
    </div>
  );
}

export default CustomizeForm;
