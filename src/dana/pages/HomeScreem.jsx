import React from 'react'
import { Link } from 'react-router-dom'
import { BotonMenu } from '../components/BotonMenu'

export const HomeScreem = ({titulo}) => {
  return (
    <>
    <div className="bg-[#E2E2E2] h-full grid grid-cols-2 sm:grid-cols-3 gap-14 pt-20">
      <div className="place-self-center ...">
        <Link to='/Proyectos'>
          <BotonMenu titulo='PROYECTOS' icono='archive-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center'>PROYECTOS</p>
        </div>
      </div>
      <div className="place-self-center ...">
        <Link to='/menu'>
          <BotonMenu titulo='USUARIOS' icono='person-add-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center'>USUARIOS</p>
        </div>
      </div>
      <div className="place-self-center">
        <Link to='/'>
          <BotonMenu titulo='CATALOGO' icono='clipboard-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center'>CATALOGO</p>
        </div>
      </div>
      <div className="place-self-center ...">
        <Link to='/'>
          <BotonMenu titulo='ASIGNACIONES' icono='accessibility-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center'>ASIGNACIONES</p>
        </div>
      </div>
      <div className="place-self-center ...">
        <Link to='/registros'>
          <BotonMenu titulo='REGISTROS' icono='list-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center'>REGISTROS</p>
        </div>
      </div>
      <div className="place-self-center ...">
        <Link to='/'>
          <BotonMenu titulo='ASISTENCIA' icono='person-circle-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center'>ASISTENCIA</p>
        </div>
      </div>
      <div className="place-self-center">
        <Link to='/'>
          <BotonMenu titulo='DASHBORAD' icono='extension-puzzle-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center'>DASHBORAD</p>
        </div>
      </div>
      <div className="place-self-center">
        <Link to='/'>
          <BotonMenu titulo='BALANCE' icono='extension-puzzle-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center'>BALANCE</p>
        </div>
      </div>
      <div className="place-self-center">
        <div className=''>
          <Link to='/'>
            <BotonMenu titulo='DUPLICADOS' icono='copy-outline'/>
          </Link>
        </div>
        <div className='pt-5'>
          <p className='text-center'>DUPLICADOS</p>
        </div>
      </div>
    </div>    
    </>
  
  )
}
