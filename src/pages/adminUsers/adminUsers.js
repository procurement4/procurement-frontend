import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import "./adminUsers.scss";
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
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
      field: "Online",
      headerName: "Online",
      width: 200,
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
    <Box className="box" style={{ height: 400, width: '100%' }}>
    <div className="datatableTitle">
        Stock Table
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

export default AdminUsers