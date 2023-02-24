import "./cart.scss";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ToastContainer, toast, Slide } from 'react-toastify';


import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { updateProcurement, deleteProcurementProduct, resetProcurement } from '../../../../stores/productSlice';
import axios from "axios";


const Cart = () => {

  const user = useSelector((state) => state.auth.user);
  console.log("user :", user.id)
  const detail_procurement = useSelector((state) => state.product.procurement);
  console.log("procurementProducts : ", detail_procurement)

  function Subtotal(props) {
    console.log("props : ", props)
    if (props.item.price === '' && props.item.quantity === '') {
      return '';
    } else {
      return "Rp " + props.item.price * props.item.quantity;
    }
  }


const dispatch = useDispatch();
const [nameProcurement, setNameProcurement] = useState()

const handleChange = (e) => {
  setNameProcurement((prev)=>({...prev,[e.target.id]:e.target.value }))
  console.log("nameProcurement : ",nameProcurement)
}

const handleClick = async e => {
  e.preventDefault();
  try {
    const procurement = {name: nameProcurement.name, user_id: user.id, detail_procurement}
    console.log("procurement : ", procurement)
    const uploadRes = await axios.post('https://procurement-service.procurement-capstone.site/api/v1/procurements', procurement)
    console.log("new procurement : ", uploadRes)

    toast.success('Success', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  } catch (err) {
    console.log("error", err)
    toast.error('Error', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
}



  return (
<<<<<<< HEAD
    <TableContainer sx={{ minWidth: 650, marginRight: 20}} className="tableCart" component={Paper}>
    <Table  aria-label="simple table">
=======
    <TableContainer className="tableCart" component={Paper}>
    <Table sx={{ minWidth: 650}} aria-label="simple table">
>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3
      <TableHead >
        <TableRow>
          <TableCell colSpan={1} align="center" >Procurement Name</TableCell>
          <TableCell  align="center" colSpan={4}>
            <TextField sx={{ width: "100%"}} id="name" variant="standard" onChange={handleChange}/>
          </TableCell>
          <TableCell colSpan={3} align="center" >
            <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleClick}>Submit</Button>
            <Button variant="outlined" onClick={() => dispatch(resetProcurement())}>Reset</Button>
            </Stack>
          </TableCell>
        </TableRow>
        <TableRow sx={{ backgroundColor: "grey"}}>
          <TableCell  >Product Name</TableCell>
          <TableCell align="right">Category</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Quantity</TableCell>
          <TableCell align="right">Subtotal</TableCell>
          <TableCell align="right">Priority</TableCell>
          <TableCell align="right">Notes</TableCell>
          <TableCell align="right">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
  
        {detail_procurement.map((item, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {item.name}
            </TableCell>
            <TableCell align="right">{item.category}</TableCell>
            <TableCell align="right">
              <TextField id="price" type="number" variant="standard" onChange={(e) => dispatch(updateProcurement({product_id: item.product_id, price: e.target.value}))}/>
            </TableCell>
            <TableCell align="right">
              <TextField onChange={(e) => dispatch(updateProcurement({product_id: item.product_id, quantity: e.target.value}))} id="quantity" type="number" variant="standard" />
            </TableCell>
            <TableCell align="right">
             <Subtotal item={item}/>
            </TableCell>
            <TableCell align="right">
              <NativeSelect
                id="demo-simple-select-standard"
                value={item.priority}
                onChange={(e) => dispatch(updateProcurement({product_id: item.product_id, priority: e.target.value}))}
              >
                <option  value="">Select Priority</option>
                <option  value="low">Low</option>
                <option  value="medium">Medium</option>
                <option  value="high">High</option>
              </NativeSelect>
            </TableCell>
            <TableCell align="right">
              <TextField multiline id="notes" variant="standard" onChange={(e) => dispatch(updateProcurement({product_id: item.product_id, notes: e.target.value}))}/>
            </TableCell>
            <TableCell align="right">
              <IconButton 
                    onClick={() => dispatch(deleteProcurementProduct(item.product_id))} 
                    edge="end" 
                    aria-label="delete">
                      <DeleteIcon/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default Cart