import React, { useState, useEffect, useContext } from 'react';
import './CustomizeForm.css';
import defaultImage from '../../assets/Plain.png';
import CloseIcon from '@mui/icons-material/Close';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContextProvider';
import { FormControl, InputLabel, MenuItem, Select, TextField, Grid, Box, FormControlLabel, Checkbox } from '@mui/material';
import HalfAndHalfPizza from '../HalfAndHalf/HalfAndHalfPizza';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LoginModal from '../login/LoginModal';

const CustomizePizza = ({ selectedPizza, onClose, setPrice  }) => {
  const [size, setSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [localPrice, setLocalPrice] = useState(0);
  const [crust, setCrust] = useState('');
  const [cheese, setCheese] = useState('');
  const [sauce, setSauce] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedPizzaName, setSelectedPizzaName] = useState('');
  const [selectedPizzaState, setSelectedPizzaState] = useState(selectedPizza);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showHalfAndHalfPizza, setShowHalfAndHalfPizza] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); 

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
    user,
    cartRestaurant,
    setUser,
    extraPrice 
  } = useContext(StoreContext);

  useEffect(() => {
    if (selectedPizzaState) {
      setSize('Medium');
      setSelectedIngredients([...selectedPizzaState.DefaultIncrediantIds, ...selectedPizzaState.FixIncrediantIds]);
    }
  }, [selectedPizzaState]);

  useEffect(() => {
    if (selectedPizzaState) {
      let calculatedPrice = 0;
      switch (size) {
        case 'Small':
          calculatedPrice = selectedPizzaState.SmallPrice;
          break;
        case 'Medium':
          calculatedPrice = selectedPizzaState.MediumPrice;
          break;
        case 'Large':
          calculatedPrice = selectedPizzaState.LargePrice;
          break;
        case 'Extra Large':
          calculatedPrice = selectedPizzaState.ExtraLargePrice;
          break;
        default:
          calculatedPrice = 0;
      }
  
      // Calculate additional cost based on selected customizations
      let additionalCost = 0;
      
      // Add $2 for each selected customization option that is not a default ingredient
      selectedIngredients.forEach(ingredientId => {
        if (!isDefaultIngredient(ingredientId)) {
          additionalCost += 2;
        }
      });
  
      calculatedPrice += additionalCost + extraPrice; 
      setLocalPrice(calculatedPrice);  // Update local price state
      setPrice(calculatedPrice);
    }
  }, [selectedPizzaState, size, selectedIngredients, extraPrice]);
  
  const handleAddToCart = () => {
    if (!cartRestaurant) {
      alert('Please select a restaurant before adding items to the cart.');
      navigate('/'); // Redirect to the restaurant selection page
      onClose();
      return;
    }
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      addPizzaToCart();
    } else {
      alert('Please login to add items to the cart.');
    }
  };
  const addPizzaToCart = () => {
    const deselectedDefaultIngredients = selectedPizzaState.DefaultIncrediantIds.filter(
      (id) => !selectedIngredients.includes(id)
    );

    const customizedPizza = {
      name: selectedPizzaState.Name,
      size,
      price: localPrice,
      quantity,
      image: selectedPizzaState.Image || defaultImage,
      cheese:
        deselectedDefaultIngredients.length > 0
          ? "None "
          : selectedIngredients
            .filter((id) =>
              aCheeses.concat(pCheeses).map((option) => option.Id).includes(id)
            )
            .map(
              (id) =>
                aCheeses
                  .concat(pCheeses)
                  .find((option) => option.Id === id).Name
            )
            .join(", "),
      meat: selectedIngredients
        .filter((id) => meats.map((option) => option.Id).includes(id))
        .map((id) => meats.find((option) => option.Id === id).Name)
        .join(", "),
      vegetable: selectedIngredients
        .filter((id) => vegetables.map((option) => option.Id).includes(id))
        .map((id) => vegetables.find((option) => option.Id === id).Name)
        .join(", "),
    };

    addToCart(customizedPizza);

    onClose();
  };

  

  const handleIngredientChange = (id) => {
    if (isDefaultIngredient(id)) {
      setSelectedIngredients((prevIngredients) => prevIngredients.filter(ingredientId => !isDefaultIngredient(ingredientId)));
    } else {
      setSelectedIngredients((prevIngredients) =>
        prevIngredients.includes(id)
          ? prevIngredients.filter((ingredientId) => ingredientId !== id)
          : [...prevIngredients, id]
      );
    }
  };

  const isDefaultIngredient = (id) => {
    return selectedPizzaState && selectedPizzaState.DefaultIncrediantIds.includes(id);
  };
  const [cheeseCustomizations, setCheeseCustomizations] = useState({});
  const [meatCustomizations, setMeatCustomizations] = useState({});
const [vegetableCustomizations, setVegetableCustomizations] = useState({});

// Function to handle customization change for meat ingredients
const handleMeatCustomizationChange = (ingredientId, customization) => {
  setMeatCustomizations(prevState => ({
    ...prevState,
    [ingredientId]: customization
  }));
};

const handleCheeseCustomizationChange = (ingredientId, customization) => {
  setCheeseCustomizations(prevState => ({
    ...prevState,
    [ingredientId]: customization
  }));
};


// Function to handle customization change for vegetable ingredients
const handleVegetableCustomizationChange = (ingredientId, customization) => {
  setVegetableCustomizations(prevState => ({
    ...prevState,
    [ingredientId]: customization
  }));
};

const handleLoginSuccess = (userData) => {
  setUser(userData); // Update user state in context
  setLoginModalOpen(false); // Close the login modal
};

  return (
    <div className='customize-container'>
       {loginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />}
      <button className="close-button" onClick={onClose}>
        <CloseIcon />
      </button>
      <h2>Customize Pizza</h2><br />

      <div className="customize-pizza-container">
        <div className="pizza-details">
          <div className="pizza-image">
            {selectedPizzaState && <h3>{selectedPizzaState.Name}</h3>}
            <img src={selectedPizzaState ? selectedPizzaState.Image || defaultImage : defaultImage} alt={selectedPizzaState ? selectedPizzaState.Name : 'Default Pizza'} />
          </div>
          <div>
            <Button variant="contained" onClick={() => setOpen(true)}>Make it half and half pizza</Button>
            <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ style: { maxWidth: '1500px', width: '100%' } }}>
              <DialogContent>
                <HalfAndHalfPizza handleCloseHalfAndHalfPizza={() => setOpen(false)} selectedPizzaName={selectedPizzaName} />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                  <CloseIcon />
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className="customization-options">
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Pizza</InputLabel>
            <Select
              value={selectedPizzaState ? selectedPizzaState.Id : ''}
              onChange={(e) => {
                const pizzaId = e.target.value;
                const pizza = products.find(p => p.Id === parseInt(pizzaId));
                setSelectedPizzaName(pizza.Name);
                setSelectedPizzaState(pizza); 
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
          <FormControl fullWidth sx={{ mb: 2 }}>
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
            fullWidth sx={{ mb: 2 }}
            id="quantity"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
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
              <FormControl fullWidth sx={{ mb: 2 }}>
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
          <Grid container spacing={2}  >
            {aCheeses.concat(pCheeses).map(option => (
              <Grid item xs={6} sm={3} key={option.Id}>
                <Box boxShadow={3} borderRadius={2} style={{ backgroundColor: 'white' }}>
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
                  {selectedIngredients.includes(option.Id) && (
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel htmlFor={`cheese-customization-${option.Id}`}>  </InputLabel>
                      <Select
                        id={`cheese-customization-${option.Id}`}
                        style={{ backgroundColor: 'white' }}
                        value={cheeseCustomizations[option.Id] || 'Regular'}
                        onChange={(e) => handleCheeseCustomizationChange(option.Id, e.target.value)}
                      >
                        <MenuItem value="Light">Light</MenuItem>
                        <MenuItem value="Regular">Regular</MenuItem>
                        <MenuItem value="Double">Double</MenuItem>
                        <MenuItem value="Triple">Triple</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                  {isDefaultIngredient(option.Id) && !selectedIngredients.includes(option.Id) && (
                    <DoNotDisturbIcon color="error" />
                  )}
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
                <Box boxShadow={3} borderRadius={2} style={{ backgroundColor: 'white' }}>
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
                  {selectedIngredients.includes(option.Id)  && (
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel htmlFor={`meat-customization-${option.Id}`}>Customization:</InputLabel>
                      <Select
                        id={`meat-customization-${option.Id}`}
                        style={{ backgroundColor: 'white' }}
                        value={meatCustomizations[option.Id] || 'Regular'}
                        onChange={(e) => handleMeatCustomizationChange(option.Id, e.target.value)}
                      >
                        <MenuItem value="Light">Light</MenuItem>
                        <MenuItem value="Regular">Regular</MenuItem>
                        <MenuItem value="Double">Double</MenuItem>
                        <MenuItem value="Triple">Triple</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                  {isDefaultIngredient(option.Id) && !selectedIngredients.includes(option.Id) && (
                    <DoNotDisturbIcon color="error" />
                  )}
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
                <Box boxShadow={3} borderRadius={2}style={{ backgroundColor: 'white' }}>
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
                  {selectedIngredients.includes(option.Id) && (
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel htmlFor={`vegetable-customization-${option.Id}`}>Customization:</InputLabel>
                      <Select
                        id={`vegetable-customization-${option.Id}`}
                        value={vegetableCustomizations[option.Id] || 'Regular'}
                        onChange={(e) => handleVegetableCustomizationChange(option.Id, e.target.value)}
                      >
                        <MenuItem value="Light">Light</MenuItem>
                        <MenuItem value="Regular">Regular</MenuItem>
                        <MenuItem value="Double">Double</MenuItem>
                        <MenuItem value="Triple">Triple</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                  {isDefaultIngredient(option.Id) && !selectedIngredients.includes(option.Id) && (
                    <DoNotDisturbIcon color="error" />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <hr />
      <div className="total-price">
        <h3>Pizza Price: ${localPrice.toFixed(2)}</h3>
        <h3>Total Price: ${(localPrice * quantity).toFixed(2)}</h3>

        <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default CustomizePizza;