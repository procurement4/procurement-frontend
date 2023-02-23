import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { forwardRef, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';

import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import axios from 'axios';



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProduct({ableButton, idProduct}) {

  const [list, setList] = useState()
  const getDetail = async () => {
    try {
      const userResponse = await axios.get(`https://product-service.procurement-capstone.site/api/v1/products/${idProduct}`)
      setList(userResponse.data.data)
      setOpen(true)
      console.log("product edit:",userResponse.data.data)
    } catch (err) {
      console.log("error : ", err)
    }
  }

  const [data, setData] = useState({price: 200, quantity: 15});
  const handleChange = (e) => {
    setData((prev)=>({...prev,[e.target.id]:e.target.value }))
  }

  console.log("list edit product",list)

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateProcurement = (payload) => {
    console.log("payload :", payload)
    console.log("list.procurement_detail :", list.procurement_detail)

    list.procurement_detail = list.procurement_detail
      .map((product) => {
        if (product.product_id == payload.product_id && payload.price !== undefined) {
          return {
            ...product,
            price: payload.price,
          };
        } else if (product.product_id == payload.product_id && payload.quantity !== undefined){
          return {
            ...product,
            quantity: payload.quantity,
          };
        } else if (product.product_id == payload.product_id && payload.priority !== undefined){
          return {
            ...product,
            priority: payload.priority,
          };
        } else if (product.product_id == payload.product_id && payload.notes !== undefined){
          return {
            ...product,
            notes: payload.notes,
          };
        }
        return product;
      })}
     

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <IconButton
              disabled={ableButton}
              onClick={getDetail} 
              edge="end" 
              aria-label="receiptIcon">
            <EditIcon/>
      </IconButton>
      <Dialog
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"EDIT PRODUCT"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Procurement Description
          </DialogContentText> */}
          {/* <List>
                <ListItem
                  secondaryAction={
                  <Typography>
                   Use For Event Guidance in New Technology
                  </Typography>
                  }
                >
                  <ListItemText
                    primary={"Procurement Name :"}
                  />
                </ListItem>
                <ListItem
                  secondaryAction={
                  <Typography>
                    1e1321321321312
                  </Typography>
                  }
                >
                  <ListItemText
                    primary={"Procument Number :"}
                  />
                </ListItem>
            </List> */}

            <TableContainer className="tableCart" component={Paper}>
              <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead >
                  <TableRow sx={{ backgroundColor: "grey"}}>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Stock</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {list != undefined && <TableRow
                      key={list.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {list.name}
                      </TableCell>
                      <TableCell align="right">{list.category}</TableCell>
                      <TableCell align="right"><TextField value={list.stock} onChange={(e) => updateProcurement({product_id: list.id, notes: e.target.value})} id="stock" type="number" variant="standard"/></TableCell>
                    </TableRow>}
                </TableBody>
              </Table>
            </TableContainer>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Download</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}