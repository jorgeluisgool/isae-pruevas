import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../../ui/components/Navbar'
import CamposProyectoPage from '../pages/CamposProyectoPage'
import { HomeScreem } from '../pages/HomeScreem'
import ProyectosPage from '../pages/ProyectosPage'
import { RegistrosPage } from '../pages/RegistrosPage'
import ExampleContexProvider from '../context/ExampleContext'
import { ProtectedRoutes } from '../../router/ProtectedRoutes'
import EjemploFormularioRegistros from '../components/EjemploFormularioRegistros'
import { ClientesRegistrosPage } from '../pages/ClientesRegistrosPage'

export const DanaRoutes = () => {

  return (
    <>
    <Navbar/>
      <div className='min-h-screen bg-[#E2E2E2] pt-20'>
        
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path='menu' element={ <HomeScreem/>}/>
              <Route path='proyectos' element={ <ProyectosPage/>}/>
              <Route path='ejemploformulario' element={ <EjemploFormularioRegistros/>}/>
              <Route path='camposproyecto' element={ <CamposProyectoPage/>}/>
              <Route path='registros' element={ <RegistrosPage/>}/>
              <Route path='clientes' element={ <ClientesRegistrosPage/>}/>
              <Route path='/' element={<Navigate to='menu'/>}/>
            </Route>
          </Routes>
        
      </div>
    </>
  )
}
