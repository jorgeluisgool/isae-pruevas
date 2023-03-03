import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomeScreem } from '../dana/pages/HomeScreem'
import ProyectosPage from '../dana/pages/ProyectosPage'
import { RegistrosPage } from '../dana/pages/RegistrosPage'

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path='home' element={ <HomeScreem/>}/>
            <Route path='proyectos' element={ <ProyectosPage/>}/>
            <Route path='registros' element={ <RegistrosPage/>}/>
            <Route path='/' element={ <ProyectosPage/>}/>
        </Routes>    
    </>
  )
}
