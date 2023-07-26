import { Dialog } from 'primereact/dialog'
import React, { useState } from 'react'
import { useFormikContext } from 'formik';

export const DialogConfirmacion = ({handleMensajeAceptar, modaAceptarlAbrirCerrar, setModaAceptarlAbrirCerrar}) => { 
    const formik = useFormikContext();

    const handleChildSubmit = () => {
        // Lógica para ejecutar el submit del formulario desde el componente hijo
        formik.handleSubmit();
    };

  return (
    <>
        <Dialog header='MENSAJE' visible={modaAceptarlAbrirCerrar} style={{ width: '35vw', zIndex: 1 }} onHide={() => setModaAceptarlAbrirCerrar(false)}>
            <h1 className='text-base font-bold'><i className="text-yellow-400 pi pi-exclamation-triangle"></i> ¿SEGURO QUE QUIERES GUARDAR LOS CAMBIOS?</h1>
            <div className='mt-8'>
                <button 
                    type='submit'
                    onClick={handleChildSubmit}
                    className='active:scale-[1.20] transition-all py-2 px-2 mr-3 rounded-full bg-[#245A95] hover:bg-sky-600 text-white text-lg font-bold'
                >
                    ACEPTAR
                </button>
                <button 
                    type='button'
                    onClick={() => setModaAceptarlAbrirCerrar(false)}
                    className='active:scale-[1.20] transition-all py-2 px-2 mr-3 rounded-full bg-[#245A95] hover:bg-sky-600 text-white text-lg font-bold'
                >
                    CANCELAR
                </button>
            </div>
        </Dialog>
    </>
  )
}
