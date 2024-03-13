import { Dialog } from 'primereact/dialog'
import React from 'react'
import { CrearProyectoForm } from '../CrearProyectoForm'

export const ModalFormularioNuevoProyecto = ({formularioState, setFormularioState}) => {
  return (
    <>
        <Dialog header='DAR DE ALTA NUEVO PROYECTO' visible={formularioState} baseZIndex={-1} onHide={() => setFormularioState(false)} className='xl:mt-0 b-6 sm:w-3/4 md:w-3/4 lg:w-3/4'>
            <CrearProyectoForm 
                setFormularioState={setFormularioState}
            />
        </Dialog>
    </>
  )
}
