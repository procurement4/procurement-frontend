import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { forwardRef, useEffect, useState } from 'react';
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
import InfoIcon from '@mui/icons-material/Info';
import useFetch from "../../../../hooks/useFetch";
import axios from 'axios';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailProcurement({idProcurement}) {

  const [list, setList] = useState()
  const getDetail = async () => {
    try {
      const userResponse = await axios.get(`https://procurement-service.procurement-capstone.site/api/v1/procurements/${idProcurement}`)
      setList(userResponse.data.data)
      setOpen(true)
      console.log("userResponse :",userResponse.data.data)
    } catch (err) {
      console.log("error : ", err)
    }
  }
  const [open, setOpen] = useState(false);
 

  const handleClose = () => {
    setOpen(false);
  };

 

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <IconButton
              onClick={getDetail} 
              edge="end" 
              aria-label="detailIcon">
            <InfoIcon/>
      </IconButton>
      <Dialog
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"PROCUREMENT DETAIL"}</DialogTitle>
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
                    <TableCell align="right">Priority</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {list != undefined && list.procurement_detail.map((item, index) => ( 
                    <TableRow
                      key={item.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{item.product_id}</TableCell>
                      <TableCell align="right">{item.priority}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                      <TableCell align="right">{item.notes}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}