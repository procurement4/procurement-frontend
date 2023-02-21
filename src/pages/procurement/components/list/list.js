import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddBox } from '@mui/icons-material';
import { cloneElement, useState } from 'react';
import {
  useTheme,
  useMediaQuery,
} from '@mui/material';
import "./list.scss";

import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { addProcurementProducts } from '../../../../stores/productSlice';


function generate(element) {
  return [0, 1, 2].map((value) =>
    cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
}));


const StockList = ({dataCategory}) => {
const theme = useTheme();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] =useState(false);
 
  const dispatch = useDispatch();
  const handleClick = async e => {
    e.preventDefault();
   
    try {
      console.log("Button Add Clicked")
      dispatch(addProcurementProducts({id: Math.random(), title: 'test', completed: false}))
      // const newTodos = [...todos, {id: todos.length +1, title: todo, completed: false} ]
      // setTodos(newTodos)
      // setTodo('')
    } catch (err) {
    }
  }



  return (
    <Box className='listBox' sx={{ flexGrow: 1, maxWidth: 382, marginTop: 2}}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
            Product Added to Procurement  
          </Typography>
          <Demo>
            <List dense={dense}>
              {dataCategory.map((item, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton 
                    onClick={() => dispatch(addProcurementProducts({id: item.id, name: item.name, category: item.category, quantity: '', price: '', priority: 'Select Priority', notes: ''}))} 
                    edge="end" 
                    aria-label="add">
                      <AddBox/>
                    </IconButton>
                  }
                >
                  {/* <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={item.name}
                    secondary={"Stock " + item.stock}
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  )
}

export default StockList