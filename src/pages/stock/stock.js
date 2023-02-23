import React, { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FlexBetween from "../../components/FlexBetween";

import { DataGrid } from '@mui/x-data-grid';
import "./stock.scss";
import IconButton from '@mui/material/IconButton';
import useFetch from "../../hooks/useFetch";
import EditIcon from '@mui/icons-material/Edit';
import Edit from './components/editProcurement/editProduct';

const Stock = ({columns}) => {

  const {data, loading, error} = useFetch(`https://product-service.procurement-capstone.site/api/v1/products`)
  const [list, setList] = useState()

  useEffect(() => {
    setList(data.data)
  },[data])
console.log("data stock :", data)
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <Edit idProduct={params.row.id}/>
          </div>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="md">
          <Box sx={{  height: '70vh', padding: 5, borderRadius: 10 }}>
           <div className="datatableTitle">
            Stock Table
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
          </Box>
       </Container>
    </React.Fragment>
  )
}

export default Stock