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
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { setNewProcurement, newProcurementUpdate } from '../../../../stores/productSlice';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

<<<<<<< HEAD
export default function EditProcurement({idProcurement}) {
=======
export default function EditProcurement({ableButton, idProcurement}) {
>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3
  const dispatch = useDispatch();
  const detail_procurement = useSelector((state) => state.product.newprocurement);
  const user = useSelector((state) => state.auth.user);
// console.log("detail procurement product ",detail_procurement)

  const [list, setList] = useState()
  const getDetail = async () => {
    try {
      const userResponse = await axios.get(`https://procurement-service.procurement-capstone.site/api/v1/procurements/${idProcurement}`)
      setList(userResponse.data.data)
      dispatch(setNewProcurement(userResponse.data.data.procurement_detail))
      setOpen(true)
      console.log("userResponse edit:",userResponse.data.data.procurement_detail)
    } catch (err) { 
      console.log("error : ", err)
    }
  }

  const [data, setData] = useState({price: 200, quantity: 15});
  const handleChange = (e) => {
    setData((prev)=>({...prev,[e.target.id]:e.target.value }))
  }

  // console.log("list edit",list)

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
     
  function Subtotal(props) {
    console.log("props : ", props)
    if (props.item.price === '' && props.item.quantity === '') {
      return '';
    } else {
      return "Rp " + props.item.price * props.item.quantity;
    }
  }

  const handleClick = async e => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const {id, name, is_approved_manager, is_rejected_manager, ...otherDetails} = list
      let newProcurementDetail = [] 
          newProcurementDetail = detail_procurement.map((detail) => {
            const {product_id, quantity, price, priority, notes,...others} = detail
            return {
              product_id, quantity, price, priority, notes
            }
          })
      const procurement = {id , name, user_id: user.id, detail_procurement:newProcurementDetail}
      console.log("update procurement: ", procurement)
      const uploadRes = await axios.post('https://procurement-service.procurement-capstone.site/api/v1/update_procurements', procurement)
      console.log("update new procurement : ", uploadRes)
      setOpen(false);
=======
      const {procurement_detail, ...otherDetails} = list
      const procurement = {...otherDetails,user_id: user.id,  detail_procurement}
      console.log("update procurement: ", procurement)
      const uploadRes = await axios.patch('https://procurement-service.procurement-capstone.site/api/v1/procurements', procurement)
      console.log("update new procurement : ", uploadRes)
  
>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3
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

<<<<<<< HEAD
  

=======
>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <IconButton
<<<<<<< HEAD
=======
              disabled={ableButton}
>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3
              onClick={getDetail} 
              edge="end" 
              aria-label="receiptIcon">
            <EditIcon/>
      </IconButton>
      <Dialog
        maxWidth="lg"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"EDIT PROCUREMENT"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Procurement Description
          </DialogContentText> */}
          <List>
                <ListItem
                  secondaryAction={list != undefined &&
                  <Typography>
                   {list.name}
                  </Typography>
                  }
                >
                  <ListItemText
                    primary={"Procurement Name :"}
                  />
                </ListItem>
                <ListItem
                  secondaryAction={list != undefined &&
                    <Typography>
                    {list.id}
                  </Typography>
                  }
                >
                  <ListItemText
                    primary={"Procument Number :"}
                  />
                </ListItem>
            </List>

            <TableContainer className="tableCart" component={Paper}>
              <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead >
                  <TableRow sx={{ backgroundColor: "grey"}}>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="right">Priority</TableCell>
                    <TableCell align="right">Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {detail_procurement != undefined && detail_procurement.map((item, index) => ( 
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.product_detail.name}
                      </TableCell>
                      <TableCell align="right"> {item.product_detail.category}</TableCell>
                      <TableCell align="right">
                        <TextField value={item.price} onChange={(e) => dispatch(newProcurementUpdate({product_id: item.product_id, price: e.target.value}))} id="price" type="number" variant="standard"/>
                      </TableCell>
                      <TableCell align="right">
                        <TextField value={item.quantity} onChange={(e) => dispatch(newProcurementUpdate({product_id: item.product_id, quantity: e.target.value}))} id="quantity" type="number" variant="standard"/>
                      </TableCell>
                      <TableCell align="right"><Subtotal item={item}/></TableCell>
                      <TableCell align="right"> 
                        <NativeSelect
                          id="demo-simple-select-standard"
                          value={item.priority}
                          onChange={(e) => dispatch(newProcurementUpdate({product_id: item.product_id, priority: e.target.value}))}
                        >
                          <option  value="low">Low</option>
                          <option  value="medium">Medium</option>
                          <option  value="high">High</option>
                        </NativeSelect>
                      </TableCell>
                      <TableCell align="right">
                        <TextField multiline id="notes" value={item.notes} variant="standard" onChange={(e) => dispatch(newProcurementUpdate({product_id: item.product_id, notes: e.target.value}))}/>
                      </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>Update</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}