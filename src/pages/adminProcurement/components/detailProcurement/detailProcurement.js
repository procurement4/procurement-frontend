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
import ReactPDF from '@react-pdf/renderer';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = StyleSheet.create({
  table: { 
    marginTop: 20, 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol: { 
    width: "16.6%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10 
  },
  title: { 
    margin: "auto", 
    marginTop: 10, 
    fontSize: 15 
  }
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
 

 console.log("list : ",list)
  const handleClose = () => {
    setOpen(false);
  };

  const MyDocument = () => (
    <Document>
    {list !== undefined && <Page size="A4" orientation="landscape" style={styles.body}>
      <View>
        <Text style={styles.title}>DETAIL PROCUREMENT</Text>
        <Text style={styles.title}>{list.name}</Text>
        <Text style={styles.title}>{list.id}</Text>
      </View>
      <View style={styles.table}> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>No</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Product Name</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Price</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Quantity</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Priority</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Subtotal</Text> 
          </View>
        </View>
        {list.procurement_detail.map((item, index) => ( 
        <View key={index} style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{index + 1}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{item.product_detail.name}</Text> 
          </View> 
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{item.price}</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{item.quantity}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{item.priority}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{item.subtotal}</Text> 
          </View> 
        </View> ))}
      </View>
    </Page>}
  </Document>
  );


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
          <PDFDownloadLink document={<MyDocument />} filename="FORM">
            <Button onClick={handleClose}>Download Invoice</Button>
          </PDFDownloadLink>
          <Button onClick={handleClose}>Back</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

