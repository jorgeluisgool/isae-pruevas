import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../../ui/components/Navbar'
import CamposProyectoPage from '../pages/CamposProyectoPage'
import EjemploDragDrop from '../pages/EjemploDragDrop'
import EjemploDragDrop222 from '../pages/EjemploDragDrop222'
import { HomeScreem } from '../pages/HomeScreem'
import ProyectosPage from '../pages/ProyectosPage'
import { RegistrosPage } from '../pages/RegistrosPage'

export const DanaRoutes = () => {

  return (
    <>
    <Navbar/>
      <div className='min-h-screen bg-[#E2E2E2] pt-20'>
      <Routes>
            <Route path='menu' element={ <HomeScreem/>}/>
            <Route path='proyectos' element={ <ProyectosPage/>}/>
            <Route path='camposproyecto' element={ <CamposProyectoPage/>}/>
            <Route path='ejemplo2' element={ <EjemploDragDrop222/>}/>
            <Route path='registros' element={ <RegistrosPage/>}/>
            <Route path='ejemplo' element={ <EjemploDragDrop/>}/>
            <Route path='/' element={<Navigate to='menu'/>}/>
        </Routes>
        
      </div>
    </>
  )
}
