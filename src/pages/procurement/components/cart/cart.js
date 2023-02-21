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


import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { updateProcurement, deleteProcurementProduct } from '../../../../stores/productSlice';


const Cart = () => {
  const procurementProducts = useSelector((state) => state.product.procurement);
  console.log("procurementProducts : ", procurementProducts)

  function Subtotal(props) {
    console.log("props : ", props)
    if (props.item.price === '' && props.item.quantity === '') {
      return '';
    } else {
      return "Rp " + props.item.price * props.item.quantity;
    }
  }
// const [info, setInfo] = useState({
//     name:"", 
//     detail_procurement:[]
// })
const dispatch = useDispatch();
const [nameProcurement, setNameProcurement] = useState([])

const handleChange = (e) => {
  setNameProcurement((prev)=>({...prev,[e.target.id]:e.target.value }))
  console.log("nameProcurement : ",nameProcurement)
}

  // name" : "procurement baru",
  //   "user_id": "b9c24b1d-3565-4404-9486-b974ac3731a9",
  //   "detail_procurement" : [
       
  //   ]

// const addProcurement = procurement => e => {
//   const oldProcurement = info.detail_procurement
//   // do whatever to create a new colors
//   // based on oldColors and color, ex.
//   const procurements = [...oldProcurement, procurement]
  
//   setInfo({ ...info, detail_procurement: procurements })
// }



  return (
    <TableContainer className="tableCart" component={Paper}>
    <Table sx={{ minWidth: 650}} aria-label="simple table">
      <TableHead >
        <TableRow>
          <TableCell align="center" >Procurement Name</TableCell>
          <TableCell align="center">
            <TextField id="name" variant="standard" onChange={handleChange}/>
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
  
        {procurementProducts.map((item, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {item.name}
            </TableCell>
            <TableCell align="right">{item.category}</TableCell>
            <TableCell align="right">
              <TextField id="price" type="number" variant="standard" onChange={(e) => dispatch(updateProcurement({id: item.id, price: e.target.value}))}/>
            </TableCell>
            <TableCell align="right">
              <TextField onChange={(e) => dispatch(updateProcurement({id: item.id, quantity: e.target.value}))} id="quantity" type="number" variant="standard" />
            </TableCell>
            <TableCell align="right">
             <Subtotal item={item}/>
            </TableCell>
            <TableCell align="right">
              <NativeSelect
                id="demo-simple-select-standard"
                value={item.priority}
                onChange={(e) => dispatch(updateProcurement({id: item.id, priority: e.target.value}))}
              >
                <option  value="">Select Priority</option>
                <option  value="low">Low</option>
                <option  value="medium">Medium</option>
                <option  value="high">High</option>
              </NativeSelect>
            </TableCell>
            <TableCell align="right">
              <TextField multiline id="notes" variant="standard" onChange={(e) => dispatch(updateProcurement({id: item.id, notes: e.target.value}))}/>
            </TableCell>
            <TableCell align="right">
              <IconButton 
                    onClick={() => dispatch(deleteProcurementProduct(item.id))} 
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