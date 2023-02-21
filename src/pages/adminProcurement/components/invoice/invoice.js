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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Invoice({ableButton}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <IconButton
              disabled={ableButton}
              onClick={handleClickOpen} 
              edge="end" 
              aria-label="receiptIcon">
            <ReceiptIcon/>
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"INVOICE"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Invoice Description
          </DialogContentText>
          <List>
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
                    primary={"Invoice Number :"}
                  />
                </ListItem>
                <ListItem
                  secondaryAction={
                  <Typography>
                    Staff Research and Development
                  </Typography>
                  }
                >
                  <ListItemText
                    primary={"Submitter :"}
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
                    <TableCell align="right">Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Name
                      </TableCell>
                      <TableCell align="right">Category</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Notes</TableCell>
                    </TableRow>
                
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