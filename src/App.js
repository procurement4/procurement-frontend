import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';


import Layout from './layout/layout';
import LayoutAdmin from './layout/layout-admin';
import Home from './pages/home/home';
import Procurement from './pages/procurement/procurement';
import Admin from './pages/admin/admin';
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
            <Route index element={<Navigate to="/home" replace />} />
            <Route path='home' element={ isAuth ? <Home /> : <Navigate to="/login"/>} />
            <Route path='procurement' element={ <Procurement /> } />
            <Route path='stock' element={ <Stock columns={stockColumns} /> } />
            <Route path='adminusers' element={ <AdminUsers columns={usersColumns} /> } />
            <Route path='adminprocurement' element={ <AdminProcurement columns={procurementColumns} /> } />
            <Route path='userprofile' element={ <UserProfile /> } />
            {/* router guard !isAuth direct to login page */}
            {/* <Route path='home' element={ isAuth ? <Home /> : <Navigate to="/login"/> } /> */}
          </Route>

          <Route path='/admin' element={ isAuth ? <LayoutAdmin /> : <Navigate to="/login"/>} >
            <Route index element={<Admin />} >
            </Route>
          </Route>

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
