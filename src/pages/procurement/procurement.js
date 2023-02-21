import "./procurement.scss";
// import { userColumns, userRows } from "../../datatablesource";
// import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
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
import { productCategory, addProcurementProducts } from '../../stores/productSlice';

import List from './components/list/list';
import Cart from './components/cart/cart';
import FormDialog from './components/addModalProduct/modal';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';


const Procurement = () => {
  // const location = useLocation()
  // const path = location.pathname.split("/")[2]
  // const userdata = JSON.parse(localStorage.getItem("user"))

  // console.log(userdata.role)

  // const {data, loading, error} = useFetch(`/${path}`)

  // const navigate = useNavigate()

  // if (error === true) {
  //   console.log("errir")
  //   navigate("/persampahan")
  // }

  // const [list, setList] = useState([])

  // useEffect(() => {
  //   setList(data)
  // },[data])

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete( `/${path}/${id}`)
  //     setList(list.filter((item) => item._id !== id));
  //   } catch (err) { }
  // };

  // const list = [
  //   {
  //     id: 1,
  //     name: 'Book',
  //     category: 'Office',
  //     stock : 5,
  //     price: '450',
  //   },
  //   {
  //     id: 2,
  //     name: 'Pencil',
  //     category: 'Office',
  //     stock : 24,
  //     price: '150',
  //   },
  //   {
  //     id: 3,
  //     name: 'Eraser',
  //     category: 'Office',
  //     stock : 22,
  //     price: '100',
  //   },
  //   {
  //     id: 4,
  //     name: 'Bread',
  //     category: 'Logistic',
  //     stock : 100,
  //     price: '2500',
  //   },
  //   {
  //     id: 5,
  //     name: 'Bottle Water',
  //     category: 'Logistic',
  //     stock : 110,
  //     price: '2000',
  //   }
  //   ]

  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 200,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cellAction">
  //           {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
  //             <div className="viewButton">View</div>
  //           </Link> */}
  //           <div
  //             className="deleteButton"
  //             onClick={() => handleDelete(params.row._id)}
  //           >
  //             Add
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ];
  const dispatch = useDispatch();

  const [category, setCategory] = useState('');
  // const [list, setList] = useState('');
  console.log("category :", category)
  const handleChange = (event) => {
    setCategory(event.target.value);
    dispatch(productCategory(event.target.value))
    // const dataCategory = useSelector((state) => state.product.category);
    // setList(dataCategory);
  };
  
  const data = useSelector((state) => state.product.data);
  const dataCategory = useSelector((state) => state.product.category);

  

  console.log("data : ", data)
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
            <Box sx={{ minWidth: 340 , maxWidth: 382, marginTop: 10}}>
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