import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../../ui/components/Navbar'
import CamposProyectoPage from '../pages/CamposProyectoPage'
import EjemploDragDrop from '../pages/EjemploDragDrop'
import { HomeScreem } from '../pages/HomeScreem'
import ProyectosPage from '../pages/ProyectosPage'
import { RegistrosPage } from '../pages/RegistrosPage'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

export const DanaRoutes = () => {

  

  return (
    <>
    <Navbar/>
      <div className='min-h-screen bg-[#E2E2E2] pt-20'>
      
      <Routes>
            <Route path='menu' element={ <HomeScreem/>}/>
            <Route path='proyectos' element={ <ProyectosPage/>}/>
            <Route path='camposproyecto' element={ <CamposProyectoPage/>}/>
            <Route path='registros' element={ <RegistrosPage/>}/>
            <Route path='ejemplo' element={ <EjemploDragDrop/>}/>
            <Route path='/' element={<Navigate to='login'/>}/>
        </Routes>
        
      </div>
    </>
  )
}
