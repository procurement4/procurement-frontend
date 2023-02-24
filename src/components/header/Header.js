import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Mui Component
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
// import { red } from '@mui/material/colors';
import { Link, useNavigate } from "react-router-dom";

import { setLogout } from '../../stores/authSlice';

const pages = ['Home', 'Procurement', 'Stock'];
const menus = ['Admin Procurement', 'Procurement', 'Stock', 'Users'];
const settings = ['Profile', 'Logout'];

export function Header() {

  const dispatch = useDispatch();
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          {/* <AdbIcon  sx={{ display: {xs : 'none', md:'flex'}, mr:1}} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 'auto',
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'White',
              textDecoration: 'none',
            }}
          >
            PROCUREMENT MANAGEMENT SYSTEM
          </Typography>

          <Box
          sx={{display: { xs: 'none', md: 'flex' },mr:2}}
          >
<<<<<<< HEAD
               <Link to="/adminprocurement" style={{  color: "white", textDecoration: 'none' }}>
=======
               <Link to="/adminprocurement" style={{  color: "white" }}>
>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3
                <MenuItem>
                  <Typography textAlign="center">Admin Procurement</Typography>
                </MenuItem>
                </Link>
<<<<<<< HEAD
                <Link to="/procurement" style={{  color: "white", textDecoration: 'none'}}>
=======
                <Link to="/procurement" style={{  color: "white"}}>
>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3
                <MenuItem>
                  <Typography textAlign="center">Procurement</Typography>
                </MenuItem>
                </Link>
<<<<<<< HEAD
                <Link to="/stock" style={{  color: "white", textDecoration: 'none'}}>
=======
                <Link to="/stock" style={{  color: "white"}}>
>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3
                <MenuItem>
                  <Typography textAlign="center">Stock</Typography>
                </MenuItem>
                </Link>
<<<<<<< HEAD
                <Link to="/adminusers" style={{  color: "white", textDecoration: 'none'}}>
=======
                <Link to="/adminusers" style={{  color: "white"}}>
>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3
                <MenuItem>
                  <Typography textAlign="center">Users</Typography>
                </MenuItem>
                </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>

          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          PROCUREMENT
          </Typography>
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box> */}


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p:0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
<<<<<<< HEAD
            >   
             
                <MenuItem >
                  <Link to="/userprofile" style={{  color: "white", textDecoration: 'none'}}>
                  <Typography textAlign="center">Profile</Typography>
                  </Link>
                </MenuItem>
         
                <MenuItem onClick={() => dispatch(setLogout())} >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
=======
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => dispatch(setLogout())} >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3
            </Menu>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}