import React, { useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import { useSelector } from 'react-redux';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import axios from "axios";
import TextField from '@mui/material/TextField';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { setUser } from "../../stores/authSlice";

const userSchema = yup.object().shape({
});


const initialValuesUser = {
  name: "",
  picture: "",
};



export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  console.log("user :", user)

  const register = async (values, onSubmitProps, e) => {
    try {
      console.log("values :", values)
    const updateUser = {id: user.id, name: values.name, email: user.email, rolename: user.rolename, password: "manager", is_active: user.is_active }
    console.log("update user :", updateUser)

    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    console.log("formData  :", formData)
    // const savedUserResponse = await fetch(
    //   "http://localhost:3001/auth/register",
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // );
    // const savedUser = await savedUserResponse.json();
    // onSubmitProps.resetForm();



    // const userResponse = await axios.post(`https://user-service.procurement-capstone.site/api/v1/users`, updateUser,{
    //   headers: { Authorization : `Bearer ${token}` }
    // })
    // console.log("userResponse :", userResponse)
    // dispatch(setUser({ user: userResponse.data.data}))
    toast.success('Success', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    } catch (error) {
      console.log("error", error)
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

  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("🚀 ~ file: form.jsx:106 ~ handleFormSubmit ~ values", values);
    if (isRegister) await register(values, onSubmitProps);
  };

  const img = "https://www.shutterstock.com/image-vector/user-login-authenticate-icon-human-600w-1365533969.jpg"
  return (
    <React.Fragment>
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
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#1A1A1A',  height: '70vh', marginTop: 10, padding: 5, borderRadius: 10 }}>

        <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValuesUser}
              validationSchema={userSchema}
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
                    "& > div": { gridColumn: "span 4" },
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
                        sx={{ gridColumn: "span 2" }}
                      />
                      {/* <TextField
                        label="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: "span 2" }}
                      /> */}

                      <Box
                        gridColumn="span 4"
                        border={`1px solid #A3A3A3`}
                        borderRadius="5px"
                        p="1rem"
                      >
                        <Dropzone
                          acceptedFiles=".jpg,.jpeg,.png"
                          multiple={false}
                          onDrop={(acceptedFiles) =>
                            setFieldValue("picture", acceptedFiles[0])
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <Box
                              {...getRootProps()}
                              border={`2px dashed #00D5FA}`}
                              p="1rem"
                              sx={{ "&:hover": { cursor: "pointer" } }}
                            >
                              <input {...getInputProps()} />
                              {!values.picture ? (
                                <p>Add Picture Here</p>
                              ) : (
                                <FlexBetween>
                                  <Typography>{values.picture.name}</Typography>
                                  <EditOutlinedIcon />
                                </FlexBetween>
                              )}
                            </Box>
                          )}
                        </Dropzone>
                        {touched.picture && errors.email ? (
                          <div>{errors.email}</div>
                        ) : null}
                      </Box>
                      <Button  type="submit" size="small">Submit</Button>
                      <Button onClick={() => {
                         setPageType(isLogin ? "register" : "login")}} size="small">Cancel</Button>
                    </>
                  )}
                  </Box>
              </form>
            )}
          </Formik>
          {isRegister === false && (
            <>
          <Card sx={{ maxWidth: 560 }}>
            <CardMedia
              sx={{ height: 240 }}
              image={img}
              title="User Profile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              <Typography sx={{marginTop: 1}} variant="body2" color="text.secondary">
                {user.rolename}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => {
                setPageType(isLogin ? "register" : "login")}} size="small">Edit</Button>
              <Button size="small">Cancel</Button>
            </CardActions>
          </Card>
          </>
            )}

        </Box>

      </Container>
    </React.Fragment>
  );
}