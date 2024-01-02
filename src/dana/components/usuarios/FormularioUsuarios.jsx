import { Formik, Field, Form} from 'formik';
import { Dialog } from 'primereact/dialog';
import React from 'react'
import useAuth from '../../hooks/useAuth';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
        

export const FormularioUsuarios = ({formularioState, setFormularioState}) => {

    const { userAuth: usuarioLogiado} = useAuth();

    const initialValues = {
        nombre: "",
        perfil: "",
        correo: "",
        ubicacion: "",
        telefono: "", 
        jefeinmediato: ""
    };

    const onSubmit = (values) => {
        console.log(values)
    }

  return (
    <>
        <Dialog header='DAR DE ALTA NUEVO USUARIO' visible={formularioState} baseZIndex={-1} onHide={() => setFormularioState(false)} className='mt-20 xl:mt-0 mx-3 b-6 sm:w-3/4 md:w-3/4 lg:w-3/4'>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, handleChange }) => (
                <Form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-10">   
                        <div className="p-inputgroup mt-6 xl:mt-6 shadow-xl">
                          <span className='p-float-label w-full'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                                as={InputText}
                                name="nombre"
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
                              Nombre completo*
                            </label>
                          </span>
                        </div>
                        <div className="p-inputgroup mt-3 lg:mt-6 shadow-xl">
                          <span className='p-float-label  w-full'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                                as={Dropdown}
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
                              Perfil*
                            </label>
                          </span>
                        </div>
                        <div className="p-inputgroup mt-3 lg:mt-6 shadow-xl">
                          <span className='p-float-label  w-full'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                                as={InputText}
                                name="correo"
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
                              Correo*
                            </label>
                          </span>
                        </div>
                        <div className="p-inputgroup mt-3 xl:mt-6 shadow-xl">
                          <span className='p-float-label  w-full'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                                as={InputText}
                                name="ubicacion"
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
                              Ubicación*
                            </label>
                          </span>
                        </div>
                        <div className="p-inputgroup mt-3 xl:mt-6 shadow-xl">
                          <span className='p-float-label  w-full'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                                as={InputText}
                                name="telefono"
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
                              Teléfono*
                            </label>
                          </span>
                        </div>
                        <div className="p-inputgroup mt-3 xl:mt-6 shadow-xl">
                          <span className='p-float-label  w-full'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                                as={Dropdown}
                                name="jefeinmediato"
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
                              Jefe inmediato*
                            </label>
                          </span>
                        </div>
                    </div>
                    <div className="cursor-pointer absolute inset-x-0 bottom-4 right-6 flex gap-3 justify-end">
        <button
          type="submit"  // Asegúrate de que el tipo sea 'submit'
          className="hover:shadow-slate-600 border h-8 px-3 bg-[#245A95] text-white text-sm lg:text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
        >
          <ion-icon name="save"></ion-icon> Guardar
        </button>    
        <button
          className="hover:shadow-slate-600 border h-8 px-3 bg-[#245A95] text-white text-sm lg:text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
          onClick={() => {
            setFormularioState(false);
          }}
          type='button'
        >
          <ion-icon name="close-circle"></ion-icon> Cancelar
        </button>
      </div> 
                </Form>
            )}
            </Formik>
        </Dialog>
    </>
  )
}
