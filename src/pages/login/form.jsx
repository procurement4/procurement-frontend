import React, { useState } from "react";

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../stores/authSlice";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import Select from '@mui/material/Select';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import { ToastContainer, toast, Slide } from 'react-toastify';

const loginSchema = yup.object().shape({
  email: yup.string().required("required"),
  password: yup.string().required("required"),
});

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  rolename: yup.string().required("required"),
  email: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const initialValuesRegister = {
  name: "",
  rolename: "",
  email: "",
  password: "",
};

const Form = () => {
  const [email, setEmail] = useState('');
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
console.log("Email :", email)
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const isReset = pageType === "reset";

  const register = async (values, onSubmitProps) => {
    try {
      const registerAcc = await axios.post("https://user-service.procurement-capstone.site/api/v1/register", values)
      console.log("reset password email : ", registerAcc)
      console.log("register : ", values)
      toast.success('Success, Check Your Mail To Activate Your Account', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        onSubmitProps.resetForm();
    } catch (error) {
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

    // const uploadRes = await axios.post('https://procurement-service.procurement-capstone.site/api/v1/procurements', values)
   
  };

  const resetPassword = async e => {
    try {
      console.log("reset this email : ", email)
      const resetPass = await axios.post("https://user-service.procurement-capstone.site/api/v1/reset_password", {email: email})
      console.log("reset password email : ", resetPass)
      setEmail('')
      toast.success('Success, Password Reset. Check Your Mail To Change Your Account', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } catch (error) {
      console.log("error :",error)
      // toast.error('Wrong Email', {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      //   });
    }
  };


  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await axios.post("https://user-service.procurement-capstone.site/api/v1/auth/login", values)
      const userResponse = await axios.get(`https://user-service.procurement-capstone.site/api/v1/users/${loggedInResponse.data.data.user_id}`, 
      {
        headers: { Authorization : `Bearer ${loggedInResponse.data.data.token}` }
      }
    )
      console.log("res",loggedInResponse);
      console.log("userResponse :",userResponse.data.data);
      // console.log("userResponse : ", userResponse)
      onSubmitProps.resetForm();
      if (loggedInResponse) {
        dispatch(
          setLogin({
            token: loggedInResponse.data.data.token,
            user: userResponse.data.data,
          })
        );
        navigate("/");
      }
    } catch (err) {
      console.log("error : ", err)
    }

    
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("Values : ", values)
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={
                    Boolean(touched.name) && Boolean(errors.name)
                  }
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
                <FormLabel sx={{ gridColumn: "span 4" }} id="demo-row-radio-buttons-group-label">Role Name</FormLabel>
                  <RadioGroup
                    sx={{ gridColumn: "span 4" }}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"

                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.rolename}
                    name="rolename"
                  >
                    <FormControlLabel value="Staff" control={<Radio />} label="Staff" />
                    <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
                    <FormControlLabel value="Finance" control={<Radio />} label="Finance" />
                  </RadioGroup>
               
              </>
            )}

            {isReset === false &&
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />}
            {isReset === true && 
            <TextField
              label="Email"
              onChange={handleChangeEmail}
              value={email}
              name="email"
              sx={{ gridColumn: "span 4" }}
            />}
          {isReset === false && <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />}
          </Box>
          {/* BUTTONS */}

          <Box>
            {isReset === false &&<Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>}

            {isReset === true &&<Button
              onClick={resetPassword}
              fullWidth
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {"RESET"}
            </Button>}

            {isReset === false && <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>}

           {isRegister === false &&  <Typography
              onClick={() => {
                setPageType(isReset ? "login" : "reset");
                resetForm();
              }}
              sx={{
                marginTop: 2,
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isReset
                ? "Already have an account? Login here."
                : "Reset Password"}
            </Typography>}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
