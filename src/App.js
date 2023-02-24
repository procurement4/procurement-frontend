import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';


import Layout from './layout/layout';
// import LayoutAdmin from './layout/layout-admin';
// import Home from './pages/home/home';
import Procurement from './pages/procurement/procurement';
// import Admin from './pages/admin/admin';
import Login from './pages/login/login';
import PageNotFound from './pages/404/pageNotFound';
import Stock from './pages/stock/stock';
import AdminUsers from './pages/adminUsers/adminUsers';
import AdminProcurement from './pages/adminProcurement/adminProcurement';
import UserProfile from './pages/userProfile/userProfile';

import { procurementColumns, stockColumns, usersColumns } from "./datatable";



function App() {
  const mode = useSelector((state) => state.auth.mode);
  // console.log("🚀 ~ file: App.js:22 ~ App ~ mode", mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Navigate to="/procurement" replace />} />
            {/* <Route path='home' element={ isAuth ? <Home /> : <Navigate to="/login"/>} /> */}
            <Route path='procurement' element={isAuth ? <Procurement /> : <Navigate to="/login"/>}/>
<<<<<<< HEAD
            <Route path='stock' element={isAuth ? <Stock columns={stockColumns} /> : <Navigate to="/login"/>} />
=======
            <Route path='stockprocurement' element={isAuth ? <Stock columns={stockColumns} /> : <Navigate to="/login"/>} />
>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3
            <Route path='adminusers' element={isAuth ? <AdminUsers columns={usersColumns} /> : <Navigate to="/login"/>} />
            <Route path='adminprocurement' element={ isAuth ?  <AdminProcurement columns={procurementColumns} /> : <Navigate to="/login"/> } />
            <Route path='userprofile' element={isAuth ? <UserProfile /> : <Navigate to="/login"/> } />
            {/* router guard !isAuth direct to login page */}
            {/* <Route path='home' element={ isAuth ? <Home /> : <Navigate to="/login"/> } /> */}
          </Route>

<<<<<<< HEAD
=======
          {/* <Route path='/admin' element={ isAuth ? <LayoutAdmin /> : <Navigate to="/login"/>} >
            <Route index element={<Admin />} >
            </Route>
          </Route> */}

>>>>>>> 5109643ab88ba5e225a093921940c9b60d05adc3
          <Route path='/login' element={<Login />} >
          </Route>
          <Route path='*' element={<PageNotFound />} >
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
