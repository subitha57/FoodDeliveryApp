  import React, { useState, useEffect, useContext } from 'react';
  import './HalfAndHalfPizza.css'; // Import CSS file for CustomizePizza styling
  import defaultImage from '../../assets/Plain.png'; // Import the default image
  import CloseIcon from '@mui/icons-material/Close';
  import { useNavigate } from 'react-router-dom';
  import { StoreContext } from '../../context/StoreContextProvider'; // Adjust the path as needed
  import { FormControl, InputLabel, MenuItem, Select, TextField, Grid, Box, FormControlLabel, Checkbox, Button } from '@mui/material';

  const HalfAndHalfPizza = ({onClose}) => {
      
    // State for the left half of the pizza customization
    const [leftSize, setLeftSize] = useState('Large');
    const [leftQuantity, setLeftQuantity] = useState(1);
    const [leftPrice, setLeftPrice] = useState(0);
    const [leftCrust, setLeftCrust] = useState('');
    const [leftCheese, setLeftCheese] = useState('');
    const [leftCheeses, setLeftCheeses] = useState('');
    const [leftSauce, setLeftSauce] = useState('');
    const [leftSauces, setLeftSauces] = useState('');
    const [leftSelectedPizza, setLeftSelectedPizza] = useState(null);

    // State for the right half of the pizza customization
    const [rightSize, setRightSize] = useState('Large');
    const [rightQuantity, setRightQuantity] = useState(1);
    const [rightPrice, setRightPrice] = useState(0);
    const [rightCrust, setRightCrust] = useState('');
    const [rightCheese, setRightCheese] = useState('');
    const [rightCheeses, setRightCheeses] = useState('');
    const [rightSauce, setRightSauce] = useState('');
    const [rightSauces, setRightSauces] = useState('');
    const [rightSelectedPizza, setRightSelectedPizza] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const navigate = useNavigate();

    // Your context and useEffect logic remains the same

    const handleAddToCart = () => {
      // Add to cart logic for left and right halves
      console.log('Left Pizza added to cart:', {
        size: leftSize,
        quantity: leftQuantity,
        crust: leftCrust,
        cheese: leftCheese,
        sauce: leftSauce,
        price: leftPrice
      });
      console.log('Right Pizza added to cart:', {
        size: rightSize,
        quantity: rightQuantity,
        crust: rightCrust,
        cheese: rightCheese,
        sauce: rightSauce,
        price: rightPrice
      });
    };

    const handleClosebtn = () => {
      console.log("Close button clicked"); 
      onClose();
    };
 
    
    useEffect(() => {
      if (leftSelectedPizza) {
          setLeftSize('Large');
      }
    }, [leftSelectedPizza]);

    useEffect(() => {
      if (rightSelectedPizza) {
          setRightSize('Large');
      }
    }, [rightSelectedPizza]);

    const {
      products,
      crusts,
      sauces,
      aCheeses,
      pCheeses,
      meats,
      vegetables,
    } = useContext(StoreContext);

    const handleIngredientChange = (id) => {
      setSelectedIngredients((prevIngredients) =>
        prevIngredients.includes(id)
          ? prevIngredients.filter((ingredientId) => ingredientId !== id)
          : [...prevIngredients, id]
      );
    };


    return (
      <div className='half-and-half-container1'>
      <button className="close-icon" onClick={onClose}>
        <CloseIcon />
      </button>
        <h2>Half and Half Pizza</h2><br />
        
        <div className='size-quantity-crust'>
        
  <FormControl fullWidth>
      <InputLabel htmlFor="size">Size:</InputLabel>
      <Select
        id="size"
        value={leftSize}
        onChange={(e) => setLeftSize(e.target.value)}
      >
        <MenuItem value="Large">Large (Serving size (3-4) Person)</MenuItem>
        <MenuItem value="Extra Large">Extra Large (Serving size (4-6) Person)</MenuItem>
      </Select>
    </FormControl>

    <TextField
      fullWidth
      id="quantity"
      label="Quantity"
      type="number"
      value={leftQuantity}
      onChange={(e) => setLeftQuantity(parseInt(e.target.value))}
    />

    <FormControl fullWidth>
      <InputLabel htmlFor="crust">Crust:</InputLabel>
      <Select
        id="crust"
        value={leftCrust}
        onChange={(e) => setLeftCrust(e.target.value)}
      >
        {crusts.map(option => (
          <MenuItem key={option.Id} value={option.Name}>
            {option.Name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </div><br/><br/>
        <div className="customize-pizza-container">
          <div className="half-container" >
            {/* Left half */}
            <div className="half">
              <h3>Left Half</h3>
              {/* Left half customization options */}
              {/* Include your customization options here using leftSize, leftQuantity, etc. */}
              <div className="customize-pizza-container">
          <div className="pizza-details">
            <div className="pizza-image">
            {leftSelectedPizza && <h3>{leftSelectedPizza.Name}</h3>}
              <img src={leftSelectedPizza ? leftSelectedPizza.Image || defaultImage : defaultImage} alt={leftSelectedPizza ? leftSelectedPizza.Name : 'Default Pizza'} />
              </div>
          
          </div>
          <div className="customization-options">
    <FormControl fullWidth>
      <InputLabel>Select Pizza</InputLabel>
      <Select
        value={leftSelectedPizza ? leftSelectedPizza.Id : ''}
        onChange={(e) => {
          const pizzaId = e.target.value;
          const pizza = products.find(p => p.Id === parseInt(pizzaId));
          setLeftSelectedPizza(pizza);
          // Since we no longer have setSelectedPizza here, this code would need modification.
        }}
      >
        <MenuItem value="">Select Pizza</MenuItem>
        {products.filter(p => p.CategoryName === "The Feisty One").map(pizza => (
          <MenuItem key={pizza.Id} value={pizza.Id}>
            {pizza.Name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="cheese">Cheese:</InputLabel>
          <Select
            id="cheese"
            value={leftCheese}
            onChange={(e) => setLeftCheese(e.target.value)}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Light">Light</MenuItem>
            <MenuItem value="Regular">Regular</MenuItem>
            <MenuItem value="Double">Double</MenuItem>
            <MenuItem value="Trible">Trible</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="cheese">Cheese:</InputLabel>
          <Select
            id="cheese"
            value={leftCheeses}
            onChange={(e) => setLeftCheeses(e.target.value)}
          >
            {aCheeses.concat(pCheeses).map(option => (
              <MenuItem key={option.Id} value={option.Name}>
                {option.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>

    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="sauce">Sauce:</InputLabel>
          <Select
            id="sauce"
            value={leftSauce}
            onChange={(e) => setLeftSauce(e.target.value)}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Light">Light</MenuItem>
            <MenuItem value="Regular">Regular</MenuItem>
            <MenuItem value="Double">Double</MenuItem>
            <MenuItem value="Trible">Trible</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel className='sauce-cheese-options' htmlFor="sauce">Sauce:</InputLabel>
          <Select
            id="sauce"
            value={leftSauces}
            onChange={(e) => setLeftSauces(e.target.value)}
          >
            {sauces.map(option => (
              <MenuItem key={option.Id} value={option.Name}>
                {option.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  </div>
        </div>
        <hr />
        <div className="ingredient-lists">
        <div className="meat-options">
          <h3>Meat Options:</h3>
          <Grid container spacing={2}>
            {meats.map(option => (
              <Grid item xs={6} sm={3} key={option.Id}>
                <Box boxShadow={3} borderRadius={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={`meat-${option.Id}`}
                        name="meat"
                        checked={selectedIngredients.includes(option.Id)}
                        onChange={() => handleIngredientChange(option.Id)}
                      />
                    }
                    label={option.Name}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
        <hr />
        <div className="veggie-options">
          <h3>Veggie Options:</h3>
          <Grid container spacing={2}>
            {vegetables.map(option => (
              <Grid item xs={6} sm={3} key={option.Id}>
                <Box boxShadow={3} borderRadius={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={`veggie-${option.Id}`}
                        name="veggie"
                        checked={selectedIngredients.includes(option.Id)}
                        onChange={() => handleIngredientChange(option.Id)}
                      />
                    }
                    label={option.Name}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
        <hr />
        <div className="cheese-options">
          <h3>Cheese Options:</h3>
          <Grid container spacing={2}>
            {aCheeses.concat(pCheeses).map(option => (
              <Grid item xs={6} sm={3} key={option.Id}>
                <Box boxShadow={3} borderRadius={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={`cheese-${option.Id}`}
                        name="cheese"
                        checked={selectedIngredients.includes(option.Id)}
                        onChange={() => handleIngredientChange(option.Id)}
                      />
                    }
                    label={option.Name}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
            </div>
          </div>
        
          <div className="right-half-container" style={{ marginLeft: '30px' }}>
            {/* Right half */}
            <div className="half">
              <h3>Right Half</h3>
              {/* Right half customization options */}
              {/* Include your customization options here using rightSize, rightQuantity, etc. */}
              <div className="customize-pizza-container">
          <div className="pizza-details">
            <div className="pizza-image">
            {rightSelectedPizza && <h3>{rightSelectedPizza.Name}</h3>}
              <img src={rightSelectedPizza ? rightSelectedPizza.Image || defaultImage : defaultImage} alt={rightSelectedPizza ? rightSelectedPizza.Name : 'Default Pizza'} />
              
            </div>
                  </div>
          <div className="customization-options">
    <FormControl fullWidth>
      <InputLabel>Select Pizza</InputLabel>
      <Select
        value={rightSelectedPizza ? rightSelectedPizza.Id : ''}
        onChange={(e) => {
          const pizzaId = e.target.value;
          const pizzaRight = products.find(p => p.Id === parseInt(pizzaId));
          setRightSelectedPizza(pizzaRight);
          // Since we no longer have setSelectedPizza here, this code would need modification.
        }}
      >
        <MenuItem value="">Select Pizza</MenuItem>
        {products.filter(p => p.CategoryName === "The Feisty One").map(pizza => (
          <MenuItem key={pizza.Id} value={pizza.Id}>
            {pizza.Name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="cheese">Cheese:</InputLabel>
          <Select
            id="cheese"
            value={rightCheese}
            onChange={(e) => setRightCheese(e.target.value)}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Light">Light</MenuItem>
            <MenuItem value="Regular">Regular</MenuItem>
            <MenuItem value="Double">Double</MenuItem>
            <MenuItem value="Trible">Trible</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="cheese">Cheese:</InputLabel>
          <Select
            id="cheese"
            value={rightCheeses}
            onChange={(e) => setRightCheeses(e.target.value)}
          >
            {aCheeses.concat(pCheeses).map(option => (
              <MenuItem key={option.Id} value={option.Name}>
                {option.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>

    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="sauce">Sauce:</InputLabel>
          <Select
            id="sauce"
            value={rightSauce}
            onChange={(e) => setRightSauce  (e.target.value)}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Light">Light</MenuItem>
            <MenuItem value="Regular">Regular</MenuItem>
            <MenuItem value="Double">Double</MenuItem>
            <MenuItem value="Trible">Trible</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel className='sauce-cheese-options' htmlFor="sauce">Sauce:</InputLabel>
          <Select
            id="sauce"
            value={rightSauces}
            onChange={(e) => setRightSauces(e.target.value)}
          >
            {sauces.map(option => (
              <MenuItem key={option.Id} value={option.Name}>
                {option.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  </div>
        </div>
        <hr />
        <div className="ingredient-lists">
        <div className="meat-options">
          <h3>Meat Options:</h3>
          <Grid container spacing={2}>
            {meats.map(option => (
              <Grid item xs={6} sm={3} key={option.Id}>
                <Box boxShadow={3} borderRadius={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={`meat-${option.Id}`}
                        name="meat"
                        checked={selectedIngredients.includes(option.Id)}
                        onChange={() => handleIngredientChange(option.Id)}
                      />
                    }
                    label={option.Name}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
        <hr />
        <div className="veggie-options">
          <h3>Veggie Options:</h3>
          <Grid container spacing={2}>
            {vegetables.map(option => (
              <Grid item xs={6} sm={3} key={option.Id}>
                <Box boxShadow={3} borderRadius={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={`veggie-${option.Id}`}
                        name="veggie"
                        checked={selectedIngredients.includes(option.Id)}
                        onChange={() => handleIngredientChange(option.Id)}
                      />
                    }
                    label={option.Name}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
        <hr />
        <div className="cheese-options">
          <h3>Cheese Options:</h3>
          <Grid container spacing={2}>
            {aCheeses.concat(pCheeses).map(option => (
              <Grid item xs={6} sm={3} key={option.Id}>
                <Box boxShadow={3} borderRadius={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={`cheese-${option.Id}`}
                        name="cheese"
                        checked={selectedIngredients.includes(option.Id)}
                        onChange={() => handleIngredientChange(option.Id)}
                      />
                    }
                    label={option.Name}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>            </div>
          </div>
        </div>

        {/* Add to Cart button */}
        <div className="price-container">
          <p>Total Price: ${(leftPrice + rightPrice).toFixed(2)}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    );
  }

  export default HalfAndHalfPizza;
