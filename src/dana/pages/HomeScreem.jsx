import React from 'react'
import { Link } from 'react-router-dom'
import { BotonMenu } from '../components/BotonMenu'

export const HomeScreem = () => {
  return (
    <>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
      <div className="place-self-center ...">
        <Link to='/Proyectos'>
          <BotonMenu/>
        </Link>
      </div>
      <div className="place-self-center ...">
        <BotonMenu/>
      </div>
      <div className="place-self-center ...">
        <BotonMenu/>
      </div>
    </div>  
    </>
  
  )
}
