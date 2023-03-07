import React from 'react'
import { AppRouter } from '../../router/AppRouter'
import { BotonMenu } from '../components/BotonMenu'

export const HomeScreem = () => {
  return (
    <>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
      <div className="place-self-center ...">
        <BotonMenu/>
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
