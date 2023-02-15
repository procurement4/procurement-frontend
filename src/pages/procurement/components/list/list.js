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


const list = ({data, dataCategory, list}) => {

const theme = useTheme();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] =useState(false);

  return (
    <Box className='listBox' sx={{ flexGrow: 1, maxWidth: 382, marginLeft: 40}}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Product Added to Procurement  
          </Typography>
          <Demo>
            <List dense={dense}>
              {dataCategory.map((item, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <AddBox />
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
                    secondary={item.stock}
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

export default list