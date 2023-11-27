// App.jsx
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import userData from '../db.json';
import axios from "axios";
import {
  Button,
  Box,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLogin, setUserLogin] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [productDetails, setProductDetails] = useState({
    category: '',
    name: '',
    description: '',
    price: '',
  });

  const handleAddProduct = () => {
    const userId = userLogin.id; 
    userLogin.requests.push(productDetails)
    console.log(userLogin)

  console.log(productDetails)
    axios.put(`http://localhost:3000/users/${userId}`, userLogin)
      .then(response => {
        console.log('Product added successfully:', response.data);
        setProductDetails({
          category: '',
          name: '',
          description: '',
          price: '',
        });
        setOpenModal(false); 
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };
  
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };


  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end" p={2}>
      {!isLoggedIn ? (
        <LoginForm setIsLoggedIn={setIsLoggedIn} setUserLogin={setUserLogin} />
      ) : (
        <Box>
          <Button
            variant="contained"
            onClick={handleLogout}
            style={{ marginLeft: "70px" }}
          >
            Logout
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "20px" }}
            onClick={handleAddClick}
          >
            Add
          </Button>
        </Box>
      )}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            padding: "20px",
            minWidth: "300px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Product
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: "15px" }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={productDetails.category}
              onChange={handleInputChange}
              name="category"
              required
            >
              <MenuItem value="category1">Clothing</MenuItem>
              <MenuItem value="category2">Cars</MenuItem>
              <MenuItem value="category3">Toys</MenuItem>
              <MenuItem value="category4">Electronics</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={productDetails.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            name="description"
            value={productDetails.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Price"
            fullWidth
            margin="normal"
            type="number"
            name="price"
            value={productDetails.price}
            onChange={handleInputChange}
            required
          />
          <Button
            variant="contained"
            type="submit"
            onClick={handleAddProduct}
            sx={{ marginTop: "15px" }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
export default App;