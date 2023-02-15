import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/header/Header'



function layoutAdmin() {
    return (
        < >
            <Header />
            <Outlet />
        </>
    )
}

export default layoutAdmin
