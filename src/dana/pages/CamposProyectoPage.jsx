import React from 'react'
import AcordionCampos from '../components/AcordionCampos'

const CamposProyectoPage = () => {
  return (
    <>
      <h1 className="p-5 text-2xl font-black">Campos proyecto: </h1>
      <AcordionCampos titulo="DATOS DEL REGISTRO" subTitulo="FOLIO"/>
      <AcordionCampos titulo="DATOS PERSONALES" subTitulo=""/>
      <AcordionCampos titulo="FIRMAS" subTitulo="TÍTULO FIRMA"/>
    </>
  )
}

export default CamposProyectoPage