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
      <div className='pt-20 bg-[#E2E2E2]'>
      <Routes>
            <Route path='menu' element={ <HomeScreem/>}/>
            <Route path='proyectos' element={ <ProyectosPage/>}/>
            <Route path='registros' element={ <RegistrosPage/>}/>
            <Route path='/' element={<Navigate to='login'/>}/>
        </Routes>
      </div>
    </>
  )
}
