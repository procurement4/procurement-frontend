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

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
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
  const [age, setAge] = useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    // const formData = new FormData();
    // for (let value in values) {
    //   formData.append(value, values[value]);
    // }
    // formData.append("picturePath", values.picture.name);

    // const savedUserResponse = await fetch(
    //   "http://localhost:3001/auth/register",
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // );
    // const savedUser = await savedUserResponse.json();
    // onSubmitProps.resetForm();
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await axios.post("https://user-service.procurement-capstone.site/api/v1/auth/login", values)

    // const loggedInResponse = await fetch("https://user-service.procurement-capstone.site/api/v1/auth/login", {
    //   method: "POST",
    //   mode: "cors",
    //   withCredentials: false,
    //   body: JSON.stringify(values),
    // });
    // user: loggedIn.user,
    const userResponse = await axios.get(`https://user-service.procurement-capstone.site/api/v1/users/${loggedInResponse.data.data.user_id}`, { withCredentials: true })
    console.log("res",loggedInResponse);
    console.log("token",loggedInResponse.data.data.token);
    console.log("userResponse : ", userResponse)
    onSubmitProps.resetForm();
    if (loggedInResponse) {
      dispatch(
        setLogin({
          token: loggedInResponse.data.data.token,
        })
      );
      navigate("/");
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
                    <FormControlLabel value="staff" control={<Radio />} label="Staff" />
                    <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                    <FormControlLabel value="finance" control={<Radio />} label="Finance" />
                  </RadioGroup>
               
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          {/* BUTTONS */}

          <Box>
            <Button
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
            </Button>

            <Typography
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
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
