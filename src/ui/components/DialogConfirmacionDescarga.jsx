import { Dialog } from 'primereact/dialog'
import React from 'react'

export const DialogConfirmacionDescarga = ({modaAceptarlAbrirCerrar, setModaAceptarlAbrirCerrar, mensaje}) => {
  return (
    <>
      <Dialog
        header='MENSAJE'
        visible={modaAceptarlAbrirCerrar}
        style={{ zIndex: 1 }}
        onHide={() => setModaAceptarlAbrirCerrar(false)}
        className="sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto"
      >
        <div className='text-center'>
          {/* <i className="text-yellow-400 pi pi-exclamation-triangle text-center" style={{ fontSize: '2rem' }}></i> */}
          <h1 className='text-base font-bold'>{ mensaje }</h1>
        </div>

        <div className='mt-8 text-center'>
          <button
            type='submit'
            // onClick={
            //   /* handleChildSubmit */
            //   (handleChildSubmit,
            //   handleGuardarRelacion)   
            // }
            className='hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto'
          >
            ACEPTAR
          </button>
          <button
            type='button'
            onClick={() => setModaAceptarlAbrirCerrar(false)}
            className='hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 w-full sm:w-auto'
          >
            CANCELAR
          </button>
        </div>
      </Dialog>
    </>
  )
}
