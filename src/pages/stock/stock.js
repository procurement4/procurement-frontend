import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import "./stock.scss";
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Stock = ({columns}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.data);

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

export default Stock