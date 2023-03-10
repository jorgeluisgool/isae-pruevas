import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../../ui/components/Navbar'
import { HomeScreem } from '../pages/HomeScreem'
import ProyectosPage from '../pages/ProyectosPage'
import { RegistrosPage } from '../pages/RegistrosPage'

export const DanaRoutes = () => {
  return (
    <>
    <Navbar/>
      <div className='container mx-auto px-50'>
      <Routes>
            <Route path='menu' element={ <HomeScreem/>}/>
            <Route path='proyectos' element={ <ProyectosPage/>}/>
            <Route path='registros' element={ <RegistrosPage/>}/>
            <Route path='/' element={<Navigate to='menu'/>}/>
        </Routes>
      </div>
    </>
  )
}
