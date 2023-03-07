import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import { DanaRoutes } from '../dana/routes/DanaRoutes'
import { HomeScreem } from '../dana/pages/HomeScreem'
import ProyectosPage from '../dana/pages/ProyectosPage'
import { RegistrosPage } from '../dana/pages/RegistrosPage'
import { Navbar } from '../ui/components/Navbar'

export const AppRouter = () => {
  return (
    <>
    {/* <Navbar/> */}
        <Routes>
            <Route path='Login' element={<LoginPage/>}/>
            <Route path='/*' element={<DanaRoutes/>}/>
            {/* <Route path='home' element={ <HomeScreem/>}/>
            <Route path='proyectos' element={ <ProyectosPage/>}/>
            <Route path='registros' element={ <RegistrosPage/>}/>
            <Route path='/' element={ <ProyectosPage/>}/> */}
        </Routes>    
    </>
  )
}
