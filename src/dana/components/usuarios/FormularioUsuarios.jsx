import { Formik, Field, Form, ErrorMessage} from 'formik';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { api } from '../../helpers/variablesGlobales';
        

export const FormularioUsuarios = ({initialValues, formularioState, setFormularioState, usuarioSeleccionado, setVentanaCarga}) => {

    const [perfiles, setPerfiles] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [estados, setEstados] = useState([]);

    console.log(usuarios);

    console.log(usuarioSeleccionado);

    // Obtener los perfiles
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${api}/obtener/perfiles`);
          const jsonData = await response.json();
          setPerfiles(jsonData);
        } catch (error) {
          console.log('Error:', error);
        }
      };
 
      fetchData();
    }, []);

    // OBTENER USUARIOS
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${api}/obtener/usuarios`);
          const jsonData = await response.json();
          setUsuarios(jsonData);
        } catch (error) {
          console.log('Error:', error);
        }
      };
 
      fetchData();
    }, []);

    // OBTENER ESTADOS 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${api}/obtener/estados`);
          const jsonData = await response.json();
          setEstados(jsonData);
        } catch (error) {
          console.log('Error:', error);
        }
      };
 
      fetchData();
    }, []);

    const handleSubmit = (values, { resetForm }) => {
    //   values.correo = correo;
      values.nombre = values.nombre.toUpperCase();
      values.usuario = values.usuario.toUpperCase();
      
      console.log(values);

      setVentanaCarga(true);

      fetch(`${api}/crear/usuario`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(values) 
        })
          .then(response => response.json())
          .then(responseData => {
            //  setModalCrearEditarUsuario(false);
            setVentanaCarga(false);
            setFormularioState(false);
  
          console.log('Respuesta de la API:', responseData);
            return 'Correcto';
        })
        .catch(error =>{ 
            console.log(error);
            return 'Error';
        }
        );

        resetForm();
    };

  return (
    <>
        <Dialog header='DAR DE ALTA NUEVO USUARIO' visible={formularioState} baseZIndex={-1} onHide={() => setFormularioState(false)} className='pt-20 xl:mt-0 b-6 sm:w-3/4 md:w-3/4 lg:w-3/4'>
            <Formik
              initialValues={ usuarioSeleccionado === undefined ? initialValues : usuarioSeleccionado}  
              onSubmit={handleSubmit}
              validate={(values) => {
                const errors = {};

                if (!values.nombre) {
                  errors.nombre = 'El nombre es obligatorio';
                }
                if (!values.perfile || Object.keys(values.perfile).length === 0) {
                  errors.perfile = 'Este campo es obligatorio';
                }
                if (!values.correo) {
                    errors.correo = 'El correo es obligatorio';
                }
                if (!values.usuario) {
                    errors.usuario = 'El usuario es obligatorio';
                }
                if (!values.ubicacion || Object.keys(values.ubicacion).length === 0) {
                    errors.ubicacion = 'Este campo es obligatorio';
                }
                if (!values.telefono) {
                    errors.telefono = 'El teléfono es obligatorio';
                }
                if (!values.jefeinmediato || Object.keys(values.jefeinmediato).length === 0) {
                    errors.jefeinmediato = 'Este campo es obligatorio';
                }
                return errors
            }}
            >
            {({ values, handleChange }) => (
                <Form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-10">   
                        <div className="p-inputgroup mt-6 xl:mt-6 shadow-xl">
                          <span className='p-float-label w-full'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95] uppercase"
                                as={InputText}
                                name="nombre"
                            />
                            <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                              <i className="pi pi-file-edit text-white font-light text-xl"></i>
                            </span>
                            <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                              Nombre completo*
                            </label>
                            <div className="absolute left-2 mt-10">
                                <ErrorMessage
                                    name="nombre"
                                    render={(msg) => (
                                    <div className="flex items-center">
                                        <div className="text-xs lg:text-base text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md">
                                            <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                                        </div>
                                    </div>
                                    )}
                                />
                            </div>
                          </span>
                          
                        </div>
                        <div className="p-inputgroup mt-3 lg:mt-6 shadow-xl">
                          <span className='p-float-label  w-full'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                                as={Dropdown}
                                name="perfile"
                                options={perfiles}
                                optionLabel="perfil"
                            />
                            <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                              <i className="pi pi-file-edit text-white font-light text-xl"></i>
                            </span>
                            <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                              Perfil*
                            </label>
                            <div className="absolute left-2 mt-10">
                                <ErrorMessage
                                    name="perfile"
                                    render={(msg) => (
                                    <div className="flex items-center">
                                        <div className="text-xs lg:text-base text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md">
                                            <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                                        </div>
                                    </div>
                                    )}
                                />
                            </div>
                          </span>
                        </div>
                        <div className="p-inputgroup mt-3 lg:mt-6 shadow-xl">
                          <span className='p-float-label  w-full'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                                as={InputText}
                                name="correo"
                            />
                            <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                              <i className="pi pi-file-edit text-white font-light text-xl"></i>
                            </span>
                            <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                              Correo*
                            </label>
                            <div className="absolute left-2 mt-10">
                                <ErrorMessage
                                    name="correo"
                                    render={(msg) => (
                                    <div className="flex items-center">
                                        <div className="text-xs lg:text-base text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md">
                                            <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                                        </div>
                                    </div>
                                    )}
                                />
                            </div>
                          </span>
                        </div>
                        <div className="p-inputgroup mt-3 lg:mt-6 shadow-xl">
                          <span className='p-float-label  w-full'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95] uppercase"
                                as={InputText}
                                name="usuario"
                            />
                            <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                              <i className="pi pi-file-edit text-white font-light text-xl"></i>
                            </span>
                            <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                              Usuario*
                            </label>
                            <div className="absolute left-2 mt-10">
                                <ErrorMessage
                                    name="usuario"
                                    render={(msg) => (
                                    <div className="flex items-center">
                                        <div className="text-xs lg:text-base text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md">
                                            <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                                        </div>
                                    </div>
                                    )}
                                />
                            </div>
                          </span>
                        </div>
                        <div className="p-inputgroup mt-3 xl:mt-6 shadow-xl">
                          <span className='p-float-label  w-full'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                                as={Dropdown}
                                name="ubicacion"
                                options={estados}
                                filter
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
                            <div className="absolute left-2 mt-10">
                                <ErrorMessage
                                    name="ubicacion"
                                    render={(msg) => (
                                    <div className="flex items-center">
                                        <div className="text-xs lg:text-base text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md">
                                            <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                                        </div>
                                    </div>
                                    )}
                                />
                            </div>
                          </span>
                        </div>
                        <div className="p-inputgroup mt-3 xl:mt-6 shadow-xl">
                          <span className='p-float-label  w-full'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                                as={InputText}
                                name="telefono"
                                keyfilter="pint"
                                maxLength={10}
                            />
                            <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                              <i className="pi pi-file-edit text-white font-light text-xl"></i>
                            </span>
                            <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                              Teléfono*
                            </label>
                            <div className="absolute left-2 mt-10">
                                <ErrorMessage
                                    name="telefono"
                                    render={(msg) => (
                                    <div className="flex items-center">
                                        <div className="text-xs lg:text-base text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md">
                                            <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                                        </div>
                                    </div>
                                    )}
                                />
                            </div>
                          </span>
                        </div>
                        <div className="p-inputgroup mt-3 xl:mt-6 shadow-xl">
                          <span className='p-float-label  w-full'>
                            <Field
                                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                                as={Dropdown}
                                name="jefeinmediato"
                                options={usuarios.map(usuario => usuario.usuario)}
                                // optionLabel="usuario"
                                filter
                            />
                            <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                              <i className="pi pi-file-edit text-white font-light text-xl"></i>
                            </span>
                            <label htmlFor="nombrealberca" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                              Jefe inmediato*
                            </label>
                            <div className="absolute left-2 mt-10">
                                <ErrorMessage
                                    name="jefeinmediato"
                                    render={(msg) => (
                                    <div className="flex items-center">
                                        <div className="text-xs lg:text-base text-red-500 bg-red-100 border border-red-400 rounded px-2 shadow-md">
                                            <ion-icon name="alert-circle-outline"></ion-icon> {msg}
                                        </div>
                                    </div>
                                    )}
                                />
                            </div>
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
