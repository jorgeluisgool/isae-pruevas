import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import React from 'react'

export const ModalSubirBaseProyecto = ({modalBase, setModalBase}) => {
  return (
        <Dialog header='SUBIR REGISTROS' visible={modalBase} baseZIndex={-1} onHide={() => setModalBase(false)} className='xl:mt-0 mx-3 b-6 sm:w-3/4 md:w-3/4 lg:w-3/4'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-10"> 
                <div className="">
                    <h1 className="text-base font-black text-[#245A95]">1. Selecciona un usuario</h1> 
                    <div className="p-inputgroup mt-3 lg:mt-6 shadow-xl">
                      <span className='p-float-label  w-full'>
                        <Dropdown
                            className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                            name="usuarios"
                            // options={perfiles}
                            // optionLabel="perfil"
                        />
                        <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                          <i className="pi pi-file-edit text-white font-light text-xl"></i>
                        </span>
                        <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                          Usuario*
                        </label>
                      </span>
                    </div>
                </div> 
                <div className="">
                <h1 className="text-base font-black text-[#245A95] pb-5">2. Selecciona el excel con los registros</h1> 
                    <input 
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#245A95] file:text-white
                        hover:file:bg-sky-700
                        form-input border border-gray-300 bg-whit py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" 
                        id="archivo"
                        type="file" 
                        name="agregarArchivo"
                        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        // onChange={(event) => {
                        //     setFieldValue("agregarArchivo", event.currentTarget.files[0]); handleFileUpload(event);
                        // }}
                    />
                </div> 
            </div>
        </Dialog>
  )
}
