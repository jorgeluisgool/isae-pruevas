import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const CrearProyecto = ({excelData, handleFileUpload}) => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/camposproyecto');
    }

    return (
        <>
        <Formik 
            initialValues={{
                proyecto: '',
                tipo: 'MIGRACIONES',
                agregarArchivo: '',
            }}

            validate={(valores) => {
                let errores = {};

                // Validacion input nombre proyecto
                if(!valores.proyecto) {
                    errores.proyecto = 'Ingrese el nombre del proyecto'
                } else if(!/^[A-Za-z0-9]+$/.test(valores.proyecto)) {
                    errores.proyecto = 'El nombre del proyecto solo acepta: letras y numeros'
                }

                // Validacion input Agregar archivo
                if (!valores.agregarArchivo) {
                    errores.agregarArchivo = "Debes adjuntar un archivo"
                }

                return errores;
            }}

            onSubmit={(valores, {resetForm}) => {

                // hace que los inputs del formulario se reinicien al estado inicial al hacer click 
                resetForm();

                // llamada a la funcion del naviate a campos proyecto
                handleSubmit();
                
                console.log(valores);
            }}
        >
            {({values, errors, handleChange, handleBlur, setFieldValue}) => (
                <Form>
                    <div className='bg-slate-50 m-5 px-8 py-5 rounded-3xl border-2 border-[#245A95]'>
                    <label className="text-lg font-medium">
                        Registrar Proyecto
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="mt-8 flex flex-col gap-y-4">
                            <button className="scroll-ml-5 w-14 h-14 active:scale-[.98] transition-all py-3 rounded-xl bg-[#245A95] hover:bg-sky-700 text-white text-lg font-bold">
                                <ion-icon name="archive-sharp"></ion-icon>
                            </button>
                        </div>
                        <div className="mt-8 flex flex-col gap-y-1 w-full">
                            <Field 
                                className='w-full border-2 border-gray-300 rounded-xl py-3 bg-transparet'
                                type='text'
                                placeholder='  Proyecto'
                                name='proyecto'
                                value={values.proyecto.toUpperCase()}
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                            />
                            <ErrorMessage name="proyecto" component={() => (
                                <span className="text-red-600"><ion-icon name="alert-circle-sharp"></ion-icon> {errors.proyecto}</span>
                            )}/>
                        </div>
                        <div className="mt-8 flex flex-col gap-y-4">
                                <Field
                                    className="border-2 border-gray-300 rounded-xl py-3 bg-transparet"
                                    as="select"
                                    name="tipo"
                                    // value={values.tipo}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                >
                                    <option value="migraciones" defaultValue>MIGRACIONES</option>
                                    <option value="inventario">INVENTARIO</option>
                                    <option value="mentenimiento">MANTENIMIENTO</option>
                                    <option value="otros">OTROS</option>
                                </Field>
                                {errors.tipo && <span className="text-red-600">{errors.tipo}</span>}
                        </div>
                        <div className="mt-8 flex flex-col gap-y-1">
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
                                // value={values.agregarArchivo}
                                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange={(event) => {
                                    setFieldValue("agregarArchivo", event.currentTarget.files[0]); handleFileUpload(event);
                                }}
                            />
                            <ErrorMessage name="agregarArchivo" component={() => (
                                <span className="text-red-600"><ion-icon name="alert-circle-sharp"></ion-icon> {errors.agregarArchivo}</span>
                            )}/>
                        </div>
                        
                        </div>
                        <div className="flex">
                            <button
                              type="submit"
                            //   onClick={handleSubmit}
                              className="ml-auto w-14 h-14 object-cover active:scale-[.98] py-3 bg-[#245A95] hover:bg-sky-700 text-white text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4">
                              <ion-icon name="arrow-forward"></ion-icon>
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        
        </Formik>
        
                
        </>
    )
}