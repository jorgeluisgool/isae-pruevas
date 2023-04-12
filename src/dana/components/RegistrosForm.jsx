import { Field, Form, Formik } from 'formik'
import React from 'react'
import MultiSelect from './MultiSelect';

const options = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
  ];
  
  const initialValues = {
    multiSelectField: [],
  };
  
  const onSubmit = (values) => {
    console.log(values);
  };

const RegistrosForm = () => {

  return (
    <>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
            <Form>
                <div className='bg-slate-50 m-5 px-8 py-5 rounded-3xl border-2 border-[#245A95]'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="mt-8 flex flex-col gap-y-4">
                            <MultiSelect label="Usuario o usuarios:" name="multiSelectField" options={options} />
                        </div>
                        <div className="mt-8 flex flex-col gap-y-4">
                        <label htmlFor="" className="block text-[#245A95] font-bold mb-2">
                          Proyecto:
                        </label>
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
                        <div className="mt-8 flex flex-col gap-y-4">

                        </div>
                        <div className="mt-8 flex flex-col gap-y-4">

                        </div>
                    </div>
                    <div className="flex">
                        <button type="submit" disabled={!formik.dirty || formik.isSubmitting} className="ml-auto w-14 h-14 object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4">
                            <ion-icon name="search"></ion-icon>
                        </button>
                    </div>
                </div>
            </Form>
        )}
    </Formik>
    </>
  )
}

export default RegistrosForm