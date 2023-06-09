import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';

    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];
  
  const initialValues = {
    multiSelectField: [],
  };
  
  const onSubmit = (values) => {
    console.log(values);
  };

const RegistrosForm = () => {

  const [selectedCountries, setSelectedCountries] = useState(null);

  return (
    <>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
            <Form>
                <div className='bg-slate-50 mx-6 my-4 px-4 py-2 rounded-3xl border-2 border-[#245A95] shadow-md'>
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3">
                        <div className="mt-8 mx-4 flex flex-col">
                            <div className='p-inputgroup flex-1'>
                              <span className='p-float-label relative'>
                                <Field
                                  as={MultiSelect}
                                  name="countries"
                                  options={countries}
                                  optionLabel="name"
                                  filter
                                  filterPlaceholder='Nombre de proyecto'
                                  // onChange={handleChange}
                                  // value={values.razonsocial}
                                  display="chip"
                                  className="w-full appearance-none focus:outline-none bg-transparent"
                                />
                                <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                  <i className="pi pi-users text-[#245A95] font-bold text-2xl"></i>
                                </span>
                                <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                  Usuarios
                                </label>
                              </span>
                            </div>
                        </div>
                        <div className="mt-8 mx-4 flex flex-col">
                            
                              <div className='p-inputgroup flex-1'>
                                <span className='p-float-label relative'>
                                  <Field
                                    as={Dropdown}
                                    name="countries"
                                    options={countries}
                                    optionLabel="name"
                                    filter
                                    filterPlaceholder='Nombre de proyecto'
                                    // onChange={handleChange}
                                    // value={values.razonsocial}
                                    display="chip"
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                  />
                                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                    <i className="pi pi-file text-[#245A95] font-bold text-2xl"></i>
                                  </span>
                                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    Nombre de proyecto
                                  </label>
                                </span>
                              </div>
                            
                        </div>
                        <div className="mt-8 mx-4 flex flex-col">
                            
                              <div className='p-inputgroup flex-1'>
                                <span className='p-float-label relative'>
                                  <Field
                                    as={Dropdown}
                                    name="countries"
                                    options={countries}
                                    optionLabel="name"
                                    filter
                                    filterPlaceholder='Nombre de proyecto'
                                    // onChange={handleChange}
                                    // value={values.razonsocial}
                                    display="chip"
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                  />
                                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                    <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                                  </span>
                                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    Buscar por:
                                  </label>
                                </span>
                              </div>
                            
                        </div>
                        <div className="mt-8 mx-4 flex flex-col">
                            
                              <div className='p-inputgroup flex-1'>
                                <span className='p-float-label relative'>
                                  <Field
                                    as={Dropdown}
                                    name="countries"
                                    options={countries}
                                    optionLabel="name"
                                    filter
                                    filterPlaceholder='Nombre de proyecto'
                                    // onChange={handleChange}
                                    // value={values.razonsocial}
                                    display="chip"
                                    className="w-full appearance-none focus:outline-none bg-transparent"
                                  />
                                  <span className="p-inputgroup-addon border border-gray-300 p-2 rounded-md">
                                    <i className="pi pi-search text-[#245A95] font-bold text-2xl"></i>
                                  </span>
                                  <label htmlFor="name" className='text-lg text-[#245A95] font-semibold absolute top-0 left-0 transform'>
                                    Buscar:
                                  </label>
                                </span>
                              </div>
                            
                        </div>
                    </div>
                    <div className="flex py-2">
                      <button
                        type="submit"
                        disabled={!formik.dirty || formik.isSubmitting}
                        className="m-auto h-12 px-4 py-2 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full uppercase shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95] mt-4"
                      >
                        <ion-icon name="search" className="mr-2 text-2xl"></ion-icon> Buscar
                      </button>
                    </div>
                    {/* <div className="flex">
                        <button type="submit" disabled={!formik.dirty || formik.isSubmitting} className="ml-auto w-14 h-14 object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4">
                            <ion-icon name="search"></ion-icon>
                        </button>
                    </div> */}
                </div>
            </Form>
        )}
    </Formik>
    </>
  )
}

export default RegistrosForm