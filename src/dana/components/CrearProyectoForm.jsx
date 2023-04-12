import { Formik, Form, Field, ErrorMessage } from "formik";
import * as XLSX from "xlsx"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExampleContex } from "../context/ExampleContext";


export const CrearProyectoForm = () => {

    const { dataArchivoExcel, setDataArchivoExcel } = useContext(ExampleContex);

    // Funcion que combierte el excel en un arreglo
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
  
        reader.onload = function (event) {
            const content = event.target.result;
            const workbook = XLSX.read(content, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);
    
        setDataArchivoExcel([
          {
            campo: "FOLIO",
            tipocampo: "ALFANUMERICO",
            agrupacion: "DATOS DEL REGISTRO",
            restriccion: "[N/A]",
            longitud: 10
          },...data,
          {
            campo: "FIRMA",
            tipocampo: "FIRMA",
            agrupacion: "FIRMAS",
            restriccion: "[N/A]",
            longitud: 10
          }
        ]);
    };
  
    reader.readAsBinaryString(file);
    }

    // Se obtiene el context para mandar el formulario resgistrar proyecto
    const { dataCrearProyecto, setDataCrearProyecto } = useContext(ExampleContex);

    // se usa el hook useNavigate de react-router-dom para navegar al vista de campos proyecto
    const navigate = useNavigate();

    // Funcion que hace navegar a campos proyecto usando el hook useNavigate de react-router-dom
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

                // aqui se mandan los valores del formulario al context para usarlos en la vista camposProyecto
                setDataCrearProyecto( valores.proyecto);

                // hace que los inputs del formulario se reinicien al estado inicial al hacer click 
                resetForm();

                // llamada a la funcion del naviate a campos proyecto
                handleSubmit();
                
            }}
        >
            {({values, errors, setFieldValue}) => (
                <Form>
                    <div className='bg-slate-50 m-5 px-8 py-5 rounded-3xl border-2 border-[#245A95]'>
                    <label className="text-lg font-medium">
                        Registrar proyecto
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="mt-8 flex flex-col gap-y-4">
                            <button download="" className="shadow-md bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] scroll-ml-5 w-14 h-14 active:scale-[.98] transition-all py-3 rounded-xl bg-[#245A95] text-4xl font-bold">
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
                            >
                                <option value="migraciones" defaultValue>MIGRACIONES</option>
                                <option value="inventario">INVENTARIO</option>
                                <option value="mentenimiento">MANTENIMIENTO</option>
                                <option value="otros">OTROS</option>
                            </Field>
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
                              className="ml-auto w-14 h-14 object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4">
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