import React from 'react'
import RegistrosForm from '../components/RegistrosForm'

export const RegistrosPage = () => {
  return (
    <>
    <h1 className="p-5 text-2xl font-black">Registros</h1>
    <div className="m-12 container mx-auto">
        <RegistrosForm/>
    </div>
    </>
    
  )
}
