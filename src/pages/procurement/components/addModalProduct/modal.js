import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { addProduct } from '../../../../stores/productSlice';
import axios from 'axios';


export default function FormDialog() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({})
  
  const handleChange = (e) => {
    setNewProduct((prev)=>({...prev,[e.target.id]:e.target.value }))
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };

  const handleClick = async e => {
    e.preventDefault();
    try {
      console.log("new product :", newProduct)
      const product = {...newProduct, stock: 1, user_id: user.id, is_deleted: false }
      const uploadRes = await axios.post( 'https://product-service.procurement-capstone.site/api/v1/products', product)
      console.log("upload res :", uploadRes)
      setOpen(false); 
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
    <div>
      <Button  sx={{marginTop: 12}} variant="outlined" onClick={handleClickOpen}>
        Add Product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
            <NativeSelect
              sx={{marginTop: 5}}
              id="category"
              onChange={handleChange}
              >
                <option  value="">Select Category</option>
                <option  value="Logistic">Logistic</option>
                <option  value="Office">Office</option>
              </NativeSelect>
            {/* <Select
              native={true}
              id="category"
              labelId="category-label"
              onChange={handleChange}
              value={newProduct.category || ''}
              >
                <MenuItem value={""}>
                </MenuItem>
                <MenuItem value={"Logistic"}>Logistic</MenuItem>
                <MenuItem value={"Office"}>Office</MenuItem>
            </Select> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}