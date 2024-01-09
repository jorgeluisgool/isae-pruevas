import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React from 'react'

export const CatalogosPage = () => {
  return (
    <>
        <div className="pb-6">
        <h1 className="pt-2 xl:pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Catalogo</h1>
            <div className='mx-4 xl:mx-20 my-4 px-4 py-2 bg-white rounded-lg overflow-hidden'>
                <div className="p-inputgroup mt-3 lg:mt-6 grid grid-cols-3">
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
                <h1 className="mt-8 xl:pt-6 pl-3 text-2xl font-black text-[#245A95]">Catalogo individual del proyecto</h1> 
                <div className="p-inputgroup mt-3 lg:mt-6 grid grid-cols-3 gap-8">
                  <span className='p-float-label w-full'>
                    <Dropdown
                        className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                        name="perfil"
                    />
                    <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                      <i className="pi pi-file-edit text-white font-light text-xl"></i>
                    </span>
                    <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                      Catalogos
                    </label>
                  </span>
                  <div className='grid grid-cols-2 gap-8'>
                    <span className='p-float-label  w-full'>
                      <InputText
                          className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                          name="perfil"
                      />
                      <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                        <i className="pi pi-file-edit text-white font-light text-xl"></i>
                      </span>
                      <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                        Contenido
                      </label>
                    </span>
                    <div className="">
                      <button
                        type="submit"  // Asegúrate de que el tipo sea 'submit'
                        className="hover:shadow-slate-600 border h-8 px-3 bg-[#245A95] text-white text-sm lg:text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                      >
                        <ion-icon name="save"></ion-icon> Guardar
                      </button>    
                    </div> 
                  </div>
                </div> 

                <h1 className="mt-8 xl:pt-6 pl-3 text-2xl font-black text-[#245A95]">Catalogo individual del proyecto</h1> 
                <div className="p-inputgroup mt-3 lg:mt-6 grid grid-cols-3 gap-8">
                  <span className='p-float-label w-full'>
                    <Dropdown
                        className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                        name="perfil"
                    />
                    <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                      <i className="pi pi-file-edit text-white font-light text-xl"></i>
                    </span>
                    <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                      Catalogos
                    </label>
                  </span>
                  <span className='p-float-label  w-full'>
                    <InputText
                        className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                        name="perfil"
                    />
                    <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                      <i className="pi pi-file-edit text-white font-light text-xl"></i>
                    </span>
                    <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                      Contenido
                    </label>
                  </span>
                </div>
            </div>
        </div>
    </>
  )
}
