import React, { useState, useEffect, useContext } from 'react';
import './CustomizeForm.css'; // Import CSS file for CustomizePizza styling
import defaultImage from '../../assets/Plain.png'; // Import the default image
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContextProvider'; // Adjust the path as needed
import { FormControl, InputLabel, MenuItem, Select, TextField, Grid, Box, FormControlLabel, Checkbox } from '@mui/material';

const CustomizePizza = ({  onClose }) => {
  const [size, setSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [crust, setCrust] = useState('');
  const [cheese, setCheese] = useState('');
  const [sauce, setSauce] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedPizza,setSelectedPizza] = useState();
  const navigate = useNavigate();

  const {
    products,
    crusts,
    sauces,
    aCheeses,
    pCheeses,
    meats,
    vegetables,
    sizes,
  } = useContext(StoreContext);

  useEffect(() => {
    if (selectedPizza) {
      setSize('Medium ');
      // Set default ingredients
      setSelectedIngredients([...selectedPizza.DefaultIncrediantIds, ...selectedPizza.FixIncrediantIds]);
    }
  }, [selectedPizza]);

  useEffect(() => {
    // Calculate price based on selected options
    if (selectedPizza) {
      let calculatedPrice = 0;
      switch (size) {
        case 'Small':
          calculatedPrice = selectedPizza.SmallPrice;
          break;
        case 'Medium':
          calculatedPrice = selectedPizza.MediumPrice;
          break;
        case 'Large':
          calculatedPrice = selectedPizza.LargePrice;
          break;
        case 'Extra Large':
          calculatedPrice = selectedPizza.ExtraLargePrice;
          break;
        default:
          calculatedPrice = 0;
      }
      setPrice(calculatedPrice);
    }
  }, [selectedPizza, size]);

  const handleAddToCart = () => {
    // Add to cart logic
    console.log('Pizza added to cart:', {
      selectedPizza,
      size,
      quantity,
      crust,
      cheese,
      sauce,
      selectedIngredients,
      price
    });
  };

  const handleHalfButton = () => {
    navigate("/HalfAndHalfPizza");
  }

  const handleIngredientChange = (id) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.includes(id)
        ? prevIngredients.filter((ingredientId) => ingredientId !== id)
        : [...prevIngredients, id]
    );
  };

  return (
    <div className='customize-container'>
      <button className="close-button" onClick={onClose}>
        <CloseIcon />
      </button>
      <h2>Customize Pizza</h2><br />

      <div className="customize-pizza-container">
        <div className="pizza-details">
          <div className="pizza-image">
            {selectedPizza && <h3>{selectedPizza.Name}</h3>}
            <img src={selectedPizza ? selectedPizza.Image || defaultImage : defaultImage} alt={selectedPizza ? selectedPizza.Name : 'Default Pizza'} />
          </div>
          <button onClick={handleHalfButton}>Make it half and half pizza</button>
        </div>
        <div className="customization-options">
          <FormControl fullWidth>
            <InputLabel>Select Pizza</InputLabel>
            <Select
              value={selectedPizza ? selectedPizza.Id : ''}
              onChange={(e) => {
                const pizzaId = e.target.value;
                const pizza = products.find(p => p.Id === parseInt(pizzaId));
                setSelectedPizza(pizza);
                // Since we no longer have setSelectedPizza here, this code would need modification.
              }}
            >
              <MenuItem value="">Select Pizza</MenuItem>
              {products.filter(p => p.CategoryName === "The Feisty One" || p.CategoryName === "The Classics").map(pizza => (
                <MenuItem key={pizza.Id} value={pizza.Id}>
                  {pizza.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="size">Size:</InputLabel>
            <Select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
            
            <MenuItem value="Small">Small (Serving size (1-2) Person)</MenuItem>
              <MenuItem value="Medium">Medium (Serving size (2-3) Person)</MenuItem>
              <MenuItem value="Large">Large (Serving size (3-4) Person)</MenuItem>
              <MenuItem value="Extra Large">Extra Large (Serving size (4-6) Person)</MenuItem>
            </Select>

          </FormControl>

          <TextField
            fullWidth
            id="quantity"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />

          <FormControl fullWidth>
            <InputLabel htmlFor="crust">Crust:</InputLabel>
            <Select
              id="crust"
              value={crust}
              onChange={(e) => setCrust(e.target.value)}
            >
              {crusts.map(option => (
                <MenuItem key={option.Id} value={option.Name}>
                  {option.Name}
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
                  value={cheese}
                  onChange={(e) => setCheese(e.target.value)}
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="Light">Light</MenuItem>
                  <MenuItem value="Regular">Regular</MenuItem>
                  <MenuItem value="Double">Double</MenuItem>
                  <MenuItem value="Triple">Triple</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="sauce">Sauce:</InputLabel>
                <Select
                  id="sauce"
                  value={sauce}
                  onChange={(e) => setSauce(e.target.value)}
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
      <div className="price-container">
        <p>Price: ${price.toFixed(2)}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default CustomizePizza;
