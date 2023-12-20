import React, { useState } from 'react'
import { TablaUsuarios } from '../components/usuarios/TablaUsuarios'
import { InputText } from 'primereact/inputtext'
import { FormularioUsuarios } from '../components/usuarios/FormularioUsuarios';

export const UsuariosPage = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [formularioState, setFormularioState] = useState(false);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

  return (
    <>
    <h1 className="pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">Usuarios</h1>
      <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
        <div className='gap-8 m-4'>
            <div className="overflow-x-auto">
                <div className=" mx-4 xl:mx-10">
                    <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8'>
                        <div className="p-inputgroup mb-5 mt-8 col-span-3 xl:col-start-3">
                            <div className="flex flex-col">
                                <span className='p-float-label relative pt-2'>
                                    <InputText
                                        className="w-full appearance-none focus:outline-none bg-transparent"
                                        name="direccion"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    /> 
                                    <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                      <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                                    </span>
                                    <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                      Busca el usuario
                                    </label>
                                </span>
                                <p className="text-base text-[#245A95] font-semibold">Puedes buscar el usuario por su nombre o nombre de usuario</p>
                            </div>
                        </div>     
                    </div>
                    <div className="flex justify-end pb-1">
                        <button
                          type="button"
                          className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                          onClick={()=>{
                            setFormularioState(true);
                          }}
                        >
                          <ion-icon name="person-add"></ion-icon> Nuevo usuario
                        </button>
                    </div>
                    <TablaUsuarios searchTerm = {searchTerm}/>  
                </div>
            </div>
        </div>
      </div>
      {/* FORMULARIO */}
      <FormularioUsuarios 
        setFormularioState = {setFormularioState}
        formularioState = {formularioState}
      />
    </>
  )
}
