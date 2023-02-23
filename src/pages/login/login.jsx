import React from 'react'
import './login.scss'
import Form from './form';

import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { ToastContainer, toast, Slide } from 'react-toastify';


const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); 

  const isAuth = Boolean(useSelector((state) => state.auth.token));

  if (isAuth === true) {
    return <Navigate to="/procurement"/>
  }

  return (
    <div className='relative'>
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
      <div className='overlay '>
        <div>
          <div className='glassmorph'>
            <Box
              width="100%"
              // backgroundColor={theme.palette.background.alt}
              p="1rem 6%"
              textAlign="center"
            >

              <Typography fontWeight="bold" fontSize="32px" color={theme.palette.neutral.dark}>
                Login
              </Typography>
            </Box>

            <Box
            width={isNonMobileScreens ? "80%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
            >
              <Typography fontWeight="500" variant="h5" sx={{
                mb:"1.5rem"
              }} >
                Procurement Management System, Platform digital to Manage Procurement!
              </Typography>
              

              <Form/>
            </Box>

          </div>
        </div>
      </div>
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  )
}

export default Login