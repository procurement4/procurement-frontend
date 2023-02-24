import "./procurement.scss";
// import { userColumns, userRows } from "../../datatablesource";
// import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import useFetch from "../../hooks/useFetch"
// import axios from "axios";
import { Add } from "@mui/icons-material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { setProduct, productCategory, addProcurementProducts } from '../../stores/productSlice';

import List from './components/list/list';
import Cart from './components/cart/cart';
import FormDialog from './components/addModalProduct/modal';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import useFetch from "../../hooks/useFetch"


const Procurement = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');

  const {data, loading, error} = useFetch(`https://product-service.procurement-capstone.site/api/v1/products`)


  const [list, setList] = useState([])

  useEffect(() => {
    setList(data.data)
    dispatch(setProduct(data.data))
    console.log("Dispatch Called")
  },[data])

  console.log("list : ", list)

  // const [list, setList] = useState('');
  console.log("category :", category)
  const handleChange = (event) => {
    setCategory(event.target.value);
    dispatch(productCategory(event.target.value))
    
    // const dataCategory = useSelector((state) => state.product.category);
    // setList(dataCategory);
  };


  const dataProduct = useSelector((state) => state.product.data);
  const dataCategory = useSelector((state) => state.product.category);

  

  console.log("data product : ", dataProduct)
  console.log("dataCategory : ", dataCategory)

  return (
    <div className="container">
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
          limit={2}
        />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>

          <Grid item xs={6} md={4}>
<<<<<<< HEAD
            <Box sx={{marginLeft: 10, minWidth: 340 , maxWidth: 382, marginTop: 10}}>
=======
            <Box sx={{ minWidth: 340 , maxWidth: 382, marginTop: 10}}>
>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Select Category"
                  onChange={handleChange}
                >
                  <MenuItem value={"Office"}>Office</MenuItem>
                  <MenuItem value={"Logistic"}>Logistic</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <List dataCategory={dataCategory}/>
          </Grid>

          <Grid item xs={6} md={8}>
            <FormDialog   />
            <Cart/>
          </Grid>
          
        </Grid>
      </Box>
    </div>
  );
};

export default Procurement