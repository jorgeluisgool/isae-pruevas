import React from 'react'
import { Link } from 'react-router-dom'
import { BotonMenu } from '../components/BotonMenu'
import useAuth from '../hooks/useAuth';

export const HomeScreem = ({titulo}) => {

  const { userAuth, setUserAuth } = useAuth();

  console.log(userAuth);

  return (
    <>
    <div className="bg-[#E2E2E2] h-full grid grid-cols-2 sm:grid-cols-3 gap-14 pt-20">
      <div className="place-self-center ...">
        <Link to='/Proyectos'>
          <BotonMenu titulo='PROYECTOS' icono='library-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center text-[#245A95] font-bold'>PROYECTOS</p>
        </div>
      </div>
      <div className="place-self-center ...">
        <Link to='/usuarios'>
          <BotonMenu titulo='USUARIOS' icono='person-add-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center text-[#245A95] font-bold'>USUARIOS</p>
        </div>
      </div>
      <div className="place-self-center">
        <Link to='/'>
          <BotonMenu titulo='CATALOGO' icono='clipboard-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center text-[#245A95] font-bold'>CATALOGO</p>
        </div>
      </div>
      <div className="place-self-center ...">
        <Link to='/'>
          <BotonMenu titulo='ASIGNACIONES' icono='accessibility-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center text-[#245A95] font-bold'>ASIGNACIONES</p>
        </div>
      </div>
      <div className="place-self-center ...">
        <Link to='/clientes'>
          <BotonMenu titulo='REGISTROS' icono='create-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center text-[#245A95] font-bold'>REGISTROS</p>
        </div>
      </div>
      <div className="place-self-center ...">
        <Link to='/'>
          <BotonMenu titulo='ASISTENCIA' icono='id-card-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center text-[#245A95] font-bold'>ASISTENCIA</p>
        </div>
      </div>
      <div className="place-self-center">
        <Link to='/'>
          <BotonMenu titulo='DASHBORAD' icono='extension-puzzle-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center text-[#245A95] font-bold'>DASHBORAD</p>
        </div>
      </div>
      <div className="place-self-center">
        <Link to='/'>
          <BotonMenu titulo='BALANCE' icono='bar-chart-outline'/>
        </Link>
        <div className='pt-5'>
          <p className='text-center text-[#245A95] font-bold'>BALANCE</p>
        </div>
      </div>
      <div className="place-self-center">
        <div className=''>
          <Link to='/'>
            <BotonMenu titulo='DUPLICADOS' icono='documents-outline'/>
          </Link>
        </div>
        <div className='pt-5'>
          <p className='text-center text-[#245A95] font-bold'>DUPLICADOS</p>
        </div>
      </div>
    </div>    
    </>
  
  )
}
