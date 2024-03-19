import { Dialog } from 'primereact/dialog'
import React from 'react'

export const DialogFoliosRepetidos = ({modalFoliosRep, setModalFoliosRep, foliosRepetidosArreglo}) => {
  return (
    <>

        <Dialog header='MENSAJE' visible={modalFoliosRep} style={{ zIndex: 1 }} onHide={() => setModalFoliosRep(false)} className='xl:mt-0 mx-3 b-6 sm:w-3/4 md:w-3/4 lg:w-3/4'>
            <div className=''>
                <div className='text-center'> 
                    <i className="text-yellow-400 pi pi-exclamation-triangle text-center" style={{ fontSize: '3rem' }}></i>
                </div>
              <h1 className='text-base font-bold'>Los siguientes folios se encuentran repetidos:</h1>
              <ul>
                {foliosRepetidosArreglo.map((folio, index) => (
                  <li key={index}>{folio}</li>
                ))}
              </ul>
              <h1 className='text-base font-bold'>Eliminalos para poder subir los registros.</h1>
            </div>
            
            <div className='mt-8 text-center'>
                <button 
                    type='button'
                    onClick={() => setModalFoliosRep(false)}
                    className='hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600'
                >
                    ACEPTAR
                </button>
            </div>
        </Dialog>
    </>
  )
}
