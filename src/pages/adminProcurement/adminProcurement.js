import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import "./adminProcurement.scss";
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// primary.dark
import Invoice from './components/invoice/invoice';
import EditIcon from '@mui/icons-material/Edit';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';



const AdminProcurement = ({columns}) => {
  const dispatch = useDispatch();
  const data = [
    {
    "id": "1",
    "procurement_name" : "Office Procurement",
    "product_name": "Book",
    "quantity" : 20,
    "price": 15,
    "priority": "medium",
    "status": "",
    "notes": "NOTES",
    "is_approved_manager": true,
    "is_approved_finance": false,
    "is_rejected_manager": false,
    "is_rejected_finance": false
  },
  {
    "id": "2",
    "procurement_name" : "Office Procurement",
    "product_name": "Pencil",
    "quantity" : 30,
    "price": 12,
    "priority": "low",
    "status": "",
    "notes": "NOTES",
    "is_approved_manager": false,
    "is_approved_finance": false,
    "is_rejected_manager": true,
    "is_rejected_finance": false
  },
  {
    "id": "3",
    "procurement_name" : "Logistic Procurement",
    "product_name": "Bread",
    "quantity" : 20,
    "price": 15,
    "priority": "medium",
    "status": "",
    "notes": "NOTES",
    "is_approved_manager": true,
    "is_approved_finance": true,
    "is_rejected_manager": false,
    "is_rejected_finance": false
  },
  {
    "id": "4",
    "procurement_name" : "Logistic Procurement",
    "product_name": "Water",
    "quantity" : 220,
    "price": 10,
    "priority": "medium",
    "status": "",
    "notes": "NOTES",
    "is_approved_manager": true,
    "is_approved_finance": false,
    "is_rejected_manager": false,
    "is_rejected_finance": true
  },
  {
    "id": "5",
    "procurement_name" : "Logistic Procurement",
    "product_name": "Burger",
    "quantity" : 200,
    "price": 25,
    "priority": "medium",
    "status": "",
    "notes": "NOTES",
    "is_approved_manager": false,
    "is_approved_finance": false,
    "is_rejected_manager": false,
    "is_rejected_finance": false
  }
]

const user = "Manager"
console.log(user)

const shapeStyles = { bgcolor: 'neutral.main', width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: '50%' };
const circle = (
  <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
);

  const actionColumn = [
    {
      field: "status",
      headerName: "Procurement Status",
      width: 200,
      renderCell: (params) => {
        // console.log("params", params.row)
        let managerColor;
        if (params.row.is_approved_manager === false && params.row.is_rejected_manager === false) {
          managerColor = 'warning'
        } else if (params.row.is_approved_manager === true) {
          managerColor = 'success'
        } else if (params.row.is_rejected_manager === true) { 
          managerColor = 'error'
        }

        let financeColor;
        console.log("finance Color :",financeColor)
        if (params.row.is_approved_manager === true && params.row.is_approved_finance === false 
          && params.row.is_rejected_finance === false ) {
          financeColor = 'warning'
        } else if (params.row.is_approved_finance === true) {
          financeColor = 'success'
        } else if (params.row.is_rejected_finance === true) { 
          financeColor = 'error'
        }

        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <Stack direction="row" spacing={1}>
              {user == 'Manager' && <Chip label="Manager" color={managerColor} variant="outlined" />}
              <Chip label="Finance" color={financeColor} variant="outlined" />
            </Stack>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        let disableButtonFinance;
        let ableButtonInvoice = true;
        if (params.row.is_approved_manager === false && params.row.is_rejected_manager === false) {
          disableButtonFinance = true
        } 

        if (params.row.is_approved_manager === true && params.row.is_approved_finance === true) {
          ableButtonInvoice = false
        } 
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <IconButton 
              disabled={disableButtonFinance}
              edge="start" 
              aria-label="ThumbUpIcon">
                 <ThumbUpIcon/>
            </IconButton>
            <IconButton 
              edge="start" 
              aria-label="ThumbUpIcon">
                 <ThumbDownIcon/>
            </IconButton>
            {/* <IconButton 
              edge="end" 
              aria-label="receiptIcon">
                 <ReceiptIcon/>
            </IconButton> */}
            <Invoice ableButton={ableButtonInvoice}/>
            <IconButton 
              edge="end" 
              aria-label="edit">
                 <EditIcon/>
            </IconButton>
          
          </div>
        );
      },
    },
  ];
  return (
    <Box className="box" style={{ height: 400, width: '100%' }}>
    <div className="datatableTitle">
        Manage Procurement
      </div>
      <DataGrid
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row)=>row.id}
        className="datatable"
      />
    </Box>
  )
}

export default AdminProcurement