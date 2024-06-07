import React, { useState, useEffect, useContext } from 'react';
import './CustomizeForm.css'; 
import defaultImage from '../../assets/Plain.png'; 
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContextProvider'; 
import { FormControl, InputLabel, MenuItem, Select, TextField, Grid, Box, FormControlLabel, Checkbox } from '@mui/material';
import HalfAndHalfPizza from '../HalfAndHalf/HalfAndHalfPizza'; 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const CustomizePizza = ({ selectedPizza, onClose }) => {
  const [size, setSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [crust, setCrust] = useState('');
  const [cheese, setCheese] = useState('');
  const [sauce, setSauce] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedPizzaName, setSelectedPizzaName] = useState(''); // Added state for selected pizza name
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    console.log("Selected Pizza Name:", selectedPizzaName);
  }, [selectedPizzaName]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log("Selected Pizza Name:", selectedPizzaName);
  }, [selectedPizzaName]);
  
  // Ensure `selectedPizzaName` is being set correctly and passed to `HalfAndHalfPizza`
  console.log("Passing selectedPizzaName to HalfAndHalfPizza:", selectedPizzaName);

  const FIXED_INGREDIENT_COST = 2;

  const {
    products,
    crusts,
    sauces,
    aCheeses,
    pCheeses,
    meats,
    vegetables,
    sizes,
    addToCart,
  } = useContext(StoreContext);

  useEffect(() => {
    if (selectedPizza) {
      setSize('Medium');
      setSelectedIngredients([...selectedPizza.DefaultIncrediantIds, ...selectedPizza.FixIncrediantIds]);
    }
  }, [selectedPizza]);

  useEffect(() => {
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

      let additionalCost = 0;
      if (crust) additionalCost += FIXED_INGREDIENT_COST;
      if (cheese) additionalCost += FIXED_INGREDIENT_COST;
      if (sauce) additionalCost += FIXED_INGREDIENT_COST;
      additionalCost += selectedIngredients.length * FIXED_INGREDIENT_COST;

      calculatedPrice += additionalCost;
      setPrice(calculatedPrice);
    }
  }, [selectedPizza, size, crust, cheese, sauce, selectedIngredients]);

  const handleAddToCart = () => {
    const customizedPizza = {
      name: selectedPizza.Name,
      size,
      price: price,
      quantity,
      image: selectedPizza.Image || defaultImage,
    };

    addToCart(customizedPizza);

    onClose();
  };

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
          <div>
            <Button variant="contained" onClick={handleOpen}>Make it half and half pizza</Button>
            <Dialog open={open} onClose={handleClose} PaperProps={{ style: { maxWidth: '1500px', width: '100%' } }}>
              <DialogContent>
                <HalfAndHalfPizza selectedPizzaName={selectedPizzaName} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancel} color="primary">
                  <CloseIcon />
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className="customization-options">
          <FormControl fullWidth>
            <InputLabel>Select Pizza</InputLabel>
            <Select
              value={selectedPizza ? selectedPizza.Id : ''}
              onChange={(e) => {
                const pizzaId = e.target.value;
                const pizza = products.find(p => p.Id === parseInt(pizzaId));
                setSelectedPizzaName(pizza.Name); // Update the selectedPizzaName state
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
        <hr />
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
        <div className="vegetable-options">
          <h3>Vegetable Options:</h3>
          <Grid container spacing={2}>
            {vegetables.map(option => (
              <Grid item xs={6} sm={3} key={option.Id}>
                <Box boxShadow={3} borderRadius={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={`vegetable-${option.Id}`}
                        name="vegetable"
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
      <hr />
      <div className="total-price">
        <h3>Total Price: ${price.toFixed(2)}</h3>
        <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default CustomizePizza;
