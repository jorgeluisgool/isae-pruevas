import { Dropdown } from 'primereact/dropdown'
import React from 'react'

export const CatalogosPage = () => {
  return (
    <>
        <div className="pb-6">
        <h1 className="pt-2 xl:pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Catalogo</h1>
            <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
                <div className="p-inputgroup mt-3 lg:mt-6 shadow-xl grid grid-cols-3">
                    <span className='p-float-label  w-full'>
                      <Dropdown
                          className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                          name="perfil"
                          // value={values.nombrealberca.toUpperCase()}
                          // disabled={
                          //   albercaSeleccionada != undefined &&
                          //   editFields
                          // }
                      />
                      <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                        <i className="pi pi-file-edit text-white font-light text-xl"></i>
                      </span>
                      <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                        Proyecto
                      </label>
                    </span>
                </div>   
            </div>
        </div>
    </>
  )
}
