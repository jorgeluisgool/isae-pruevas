import { Dialog } from 'primereact/dialog'
import React from 'react'

export const DialogConfirmacionOpcionesCatalogo = ({mensajeConfirmacionOpcionCatalogo, setMensajeConfirmacionOpcionCatalogo, nuevoArregloOpcionesCatalogo2, catalogoProyectoSeleccionado, handleGuardar}) => {
  
    return (
    <>
      <Dialog
        header='MENSAJE'
        visible={mensajeConfirmacionOpcionCatalogo}
        baseZIndex={-1}
        onHide={() => setMensajeConfirmacionOpcionCatalogo(false)}
        className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto z-10"
      >
        <div className='text-left'>
    
    <h1 className='text-base font-bold mb-4'>¿SEGURO QUE QUIERES AGREGAR LOS VALORES:</h1>
    <h2 className='text-sm text-black font-semibold overflow-y-auto max-h-24'>
        <ul>
            {nuevoArregloOpcionesCatalogo2.map((elemento, index) => (
                <li key={index}><ion-icon name="send"></ion-icon> {elemento}</li>
            ))}
        </ul>
    </h2>
    <h1 className='text-base font-bold mt-4'>AL CATÁLOGO <span className='text-black'>'{catalogoProyectoSeleccionado}'</span>?</h1>
</div>
        <div className='mt-8'>
          <button
            type='submit'
            onClick={handleGuardar}
            className='hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto'
          >
            ACEPTAR
          </button>
          <button
            type='button'
            onClick={() => setMensajeConfirmacionOpcionCatalogo(false)}
            className='hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 w-full sm:w-auto'
          >
            CANCELAR
          </button>
        </div>
      </Dialog>
    </>
  )
}