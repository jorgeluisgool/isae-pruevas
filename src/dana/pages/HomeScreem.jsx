import React from 'react'
import { Link } from 'react-router-dom'
import { BotonMenu } from '../components/BotonMenu'

export const HomeScreem = () => {
  return (
    <>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-20 pt-40">
      <div className="place-self-center ...">
        <Link to='/Proyectos'>
          <BotonMenu titulo='PROYECTOS' icono='archive-outline'/>
        </Link>
      </div>
      <div className="place-self-center ...">
        <Link to='/'>
          <BotonMenu titulo='USUARIOS' icono='person-add-outline'/>
        </Link>
      </div>
      <div className="place-self-center ...">
        <Link to='/'>
          <BotonMenu titulo='CATALOGO' icono='clipboard-outline'/>
        </Link>
      </div>
      <div className="place-self-center ...">
        <Link to='/'>
          <BotonMenu titulo='ASIGNACIONES' icono='accessibility-outline'/>
        </Link>
      </div>
      <div className="place-self-center ...">
        <Link to='/registros'>
          <BotonMenu titulo='REGISTROS' icono='list-outline'/>
        </Link>
      </div>
      <div className="place-self-center ...">
        <Link to='/'>
          <BotonMenu titulo='ASISTENCIA' icono='person-circle-outline'/>
        </Link>
      </div>
      <div className="place-self-center ...">
        <Link to='/'>
          <BotonMenu titulo='DASHBORAD' icono='extension-puzzle-outline'/>
        </Link>
      </div>
      <div className="place-self-center ...">
        <Link to='/'>
          <BotonMenu titulo='BALANCE' icono='extension-puzzle-outline'/>
        </Link>
      </div>
      <div className="place-self-center ...">
        <Link to='/'>
          <BotonMenu titulo='DUPLICADOS' icono='copy-outline'/>
        </Link>
      </div>
    </div>    
    </>
  
  )
}
