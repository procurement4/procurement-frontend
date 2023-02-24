import React, { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FlexBetween from "../../components/FlexBetween";

import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import "./adminProcurement.scss";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DangerousIcon from '@mui/icons-material/Dangerous';
import InfoIcon from '@mui/icons-material/Info';
// primary.dark
import Invoice from './components/invoice/invoice';
import Edit from './components/editProcurement/editProcurement';
import Detail from './components/detailProcurement/detailProcurement';
import { ToastContainer, toast, Slide } from 'react-toastify';
import useFetch from "../../hooks/useFetch";

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';



const AdminProcurement = ({columns}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const {data, loading, error} = useFetch(`https://procurement-service.procurement-capstone.site/api/v1/procurements`)
  const [list, setList] = useState()
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setList(data.data)
  },[data])

console.log("list :",list)
  
  const handleClick = async (id, status) => {
    try {
      setLoad(true)
      // let test = { "id": "aa82f2cd-8ee5-4ba7-b4ce-1a7833b5a642",
      // "name": "Test 3",
      // "procurement_detail": [
      //     {
      //         "id": "d0e779be-c0c6-42a9-b234-5ad61cc45f5f",
      //         "product_detail": null,
      //         "product_id": "52c5d70f-6cd4-431e-89a7-c432dfd3ea09",
      //         "quantity": 10,
      //         "price": 10000.0,
      //         "subtotal": 100000.0,
      //         "priority": "medium",
      //         "notes": "ini notes book",
      //         "user_id": "b9c24b1d-3565-4404-9486-b974ac3731a9",
      //         "is_deleted": false,
      //         "created_at": "2023-02-22T06:31:30.258+00:00",
      //         "updated_at": "2023-02-22T06:31:30.258+00:00",
      //         "created_by": "b9c24b1d-3565-4404-9486-b974ac3731a9",
      //         "updated_by": "b9c24b1d-3565-4404-9486-b974ac3731a9"
      //     },
      //     {
      //         "id": "8da109fd-2f0b-4b23-965f-e566e3ee6f8d",
      //         "product_detail": null,
      //         "product_id": "822aa93a-74dc-49ff-9cc0-4852f4ed61c8",
      //         "quantity": 10,
      //         "price": 10000.0,
      //         "subtotal": 100000.0,
      //         "priority": "low",
      //         "notes": "ini notes pen",
      //         "user_id": "b9c24b1d-3565-4404-9486-b974ac3731a9",
      //         "is_deleted": false,
      //         "created_at": "2023-02-22T06:31:30.267+00:00",
      //         "updated_at": "2023-02-22T06:31:30.267+00:00",
      //         "created_by": "b9c24b1d-3565-4404-9486-b974ac3731a9",
      //         "updated_by": "b9c24b1d-3565-4404-9486-b974ac3731a9"
      //     }
      // ],
      // "is_approved_manager": false,
      // "is_approved_finance": false,
      // "is_rejected_manager": false,
      // "is_rejected_finance": false,
      // "is_deleted": false,
      // "created_at": "2023-02-22 06:31:29.805",
      // "updated_at": "2023-02-22T06:31:29.805+00:00",
      // "created_by": "b9c24b1d-3565-4404-9486-b974ac3731a9",
      // "updated_by": "b9c24b1d-3565-4404-9486-b974ac3731a9"}
      let data = await axios.get(`https://procurement-service.procurement-capstone.site/api/v1/procurements/${id}`)
      let procurement = data.data.data
      let newProcurement;
      if (user.rolename == "Manager") {
        if (status == "accept") {
          const {id, name, is_approved_manager, is_rejected_manager, procurement_detail, ...otherDetails} = procurement
          let newProcurementDetail = [] 
          newProcurementDetail = procurement_detail.map((detail) => {
            const {product_id, quantity, price, priority, notes,...others} = detail
            return {
              product_id, quantity, price, priority, notes
            }
          })
          console.log("newProcurementDetail :", newProcurementDetail)
          newProcurement = {id, name, user_id: user.id, is_approved_manager: true, is_rejected_manager: false, detail_procurement:newProcurementDetail}
      } else if (status == "reject") {
          const {id, name, is_approved_manager, is_rejected_manager,  procurement_detail, ...otherDetails} = procurement
          let newProcurementDetail = [] 
          newProcurementDetail = procurement_detail.map((detail) => {
            const {product_id, quantity, price, priority, notes,...others} = detail
            return {
              product_id, quantity, price, priority, notes
            }
          })
          console.log("newProcurementDetail :", newProcurementDetail)
          newProcurement = {id, name, user_id: user.id, is_approved_manager: false, is_rejected_manager: true, detail_procurement:newProcurementDetail}
      }
      } else if (user.rolename == "Finance") {
        if (status == "accept") {
          const {id, name, is_approved_finance, is_rejected_finance, procurement_detail, ...otherDetails} = procurement
          let newProcurementDetail = [] 
          newProcurementDetail = procurement_detail.map((detail) => {
            const {product_id, quantity, price, priority, notes,...others} = detail
            return {
              product_id, quantity, price, priority, notes
            }
          })
          newProcurement = {id, name, is_approved_finance: true, is_rejected_finance: false, user_id: user.id ,detail_procurement:newProcurementDetail}
      } else if (status == "reject") {
        const {id, name, is_approved_finance, is_rejected_finance, procurement_detail, ...otherDetails} = procurement
        let newProcurementDetail = [] 
        newProcurementDetail = procurement_detail.map((detail) => {
          const {product_id, quantity, price, priority, notes,...others} = detail
          return {
            product_id, quantity, price, priority, notes
          }
        })
        newProcurement = {id, name, is_approved_finance: false, is_rejected_finance: true, user_id: user.id ,detail_procurement:newProcurementDetail}
      }
      }
      setList(list)
      console.log("id :", id)
      console.log("old procurement :", procurement)
      console.log("new procurement :", newProcurement)

      // const userResponse = await axios.get(`https://procurement-service.procurement-capstone.site/api/v1/procurements/${idProcurement}`)
      // const procurement = {name: nameProcurement.name, user_id: user.id, detail_procurement}
      // console.log("procurement : ", procurement)
      
      const uploadRes = await axios.post('https://procurement-service.procurement-capstone.site/api/v1/update_procurements', newProcurement)
      console.log("new procurement : ", uploadRes)
      setLoad(false)
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
        let managerColor;
        if (params.row.is_approved_manager === false && params.row.is_rejected_manager === false) {
          managerColor = 'warning'
        } else if (params.row.is_approved_manager === true) {
          managerColor = 'success'
        } else if (params.row.is_rejected_manager === true) { 
          managerColor = 'error'
        }

        let financeColor;
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
              {/* {user == 'Manager' &&  */}
              <Chip label="Manager" color={managerColor} variant="outlined" />
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
        let disableButton;
        let ableButtonInvoice = true;
        if (params.row.is_approved_manager === true || params.row.is_rejected_manager === true) {
          disableButton = true
        } else if (params.row.is_approved_finance === true || params.row.is_rejected_finance === true) {
          disableButton = true
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
             onClick={() => handleClick(params.row.id, "accept")}
              disabled={disableButton}
              edge="start" 
              aria-label="Accept Procurement">
                 <CheckCircleIcon/>
            </IconButton>
            <IconButton 
            disabled={disableButton}
               onClick={() => handleClick(params.row.id, "reject")}
              edge="start" 
              aria-label="Reject Procurement">
                 <DangerousIcon/>
            </IconButton>
            {/* <IconButton 
              edge="end" 
              aria-label="receiptIcon">
                 <ReceiptIcon/>
            </IconButton> */}
            <Invoice idProcurement={params.row.id} ableButton={ableButtonInvoice}/>
            <Edit idProcurement={params.row.id}/>
            <Detail idProcurement={params.row.id}/>
          
          </div>
        );
      },
    },
  ];
  return (
    <React.Fragment>
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
       
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{  height: '70vh', padding: 5, borderRadius: 10 }}>
          { load === true && <CircularProgress />}
    {/* <Box className="box" style={{ height: 400, width: '100%' }}> */}
          <div className="datatableTitle">
              Manage Procurement
            </div>
            {list &&<DataGrid
              rows={list}
              columns={columns.concat(actionColumn)}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              getRowId={(row)=>row.id}
              className="datatable"
            />}
    {/* </Box> */}
      </Box>
      </Container>
    </React.Fragment>
  )
}

export default AdminProcurement