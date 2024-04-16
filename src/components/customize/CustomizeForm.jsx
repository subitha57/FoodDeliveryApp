import React, { useState } from 'react';
import './CustomizeForm.css'

function CustomizeForm() {
  const [size, setSize] = useState('medium');
  const [toppings, setToppings] = useState([]);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit the pizza order with selected size and toppings
    console.log('Pizza Size:', size);
    console.log('Toppings:', toppings);
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
      </form>
    </div>
  );
}

export default CustomizeForm;
