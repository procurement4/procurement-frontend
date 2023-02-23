import React, { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FlexBetween from "../../components/FlexBetween";

import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import "./adminUsers.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
// primary.dark

const shapeStyles = { bgcolor: 'neutral.main', width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: '50%' };
const circle = (
  <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
);

const AdminUsers = ({columns}) => {
  const dispatch = useDispatch();
  const data = [
    {
    "id": "1",
    "name" : "superadaamin",
    "email": "superadmin@gmail.com",
    "rolename" : "superadmin",
    "is_active": true
  },
  {
    "id": "2",
    "name" : "Finance",
    "email": "Finance@gmail.com",
    "rolename" : "finance",
    "password" : "finance",
    "is_active": true
  },
  {
    "id": "3",
    "name" : "Manager",
    "email": "Manager@gmail.com",
    "rolename" : "manager",
    "password" : "manager",
    "is_active": false
  },
  {
    "id": "4",
    "name" : "Staff",
    "email": "Staff@gmail.com",
    "rolename" : "staff",
    "password" : "staff",
    "is_active": false
  }
]

  const actionColumn = [
    {
      field: "is_active",
      headerName: "Active",
      width: 120,
      renderCell: (params) => {
        console.log("user params", params)
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <Chip label={params.row.is_active ? "True" : "False"} color={params.row.is_active ? "success" : "warning"} variant="outlined" />
          </div>
        );
      },
    },
    {
      field: "Online",
      headerName: "Online",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            {circle}
          </div>
        );
      },
    },
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
            <IconButton 
              edge="end" 
              aria-label="add">
                 <DeleteIcon/>
            </IconButton>
          </div>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{  height: '70vh', padding: 5, borderRadius: 10 }}>
          <div className="datatableTitle">
          Manage Users
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
      </Container>
    </React.Fragment>
  )
}

export default AdminUsers