import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { api } from '../helpers/variablesGlobales';
  
  const initialValues = {
    multiSelectField: [],
  };
  
  const onSubmit = (values) => {
    console.log(values);
  };

const RegistrosForm = ({usuarios, listaRegistros, setListaRegistros}) => {

  const [listaRegistrosValor, setListaRegistrosValor] = useState([]);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);
  const [listaProyectos, setListaProyectos] = useState([]);
  const [proyectosSeleccionados, setProyectosSeleccionados] = useState([]);
  const [listaCampos, setListaCampos] = useState([]);
  // const [listaRegistros, setListaRegistros] = useState([]);
  const [campoSeleccionado, setCampoSeleccionado] = useState([]);
  const [listaValores, setListaValores] = useState([]);
  const [valorSeleccionado, setValorSeleccionado] = useState([]);

  const [cargando, setCargando] = useState(false);

  // const ListaUsuariosProyectos = {usuarios: usuariosSeleccionados, proyectos: proyectosSeleccionados}

  const listaProyectosFiltrados = listaProyectos.filter((obj, index, self) =>
    index === self.findIndex((o) => o.proyecto === obj.proyecto)
  );


  useEffect(() => {
    if (usuariosSeleccionados.length > 0 && proyectosSeleccionados.length > 0) {
      const ListaUsuariosProyectos = {
        usuarios: usuariosSeleccionados,
        proyectos: proyectosSeleccionados,
      };

      // Obtener registros asignados a usuarios y proyectos seleccionados
      fetch(`${api}/obtener/registros/asignados/usuario/proyecto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ListaUsuariosProyectos),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          setListaRegistros(responseData);
          setListaRegistrosValor(responseData);
        })
        .catch((error) => console.log(error));
    }
  }, [usuariosSeleccionados, proyectosSeleccionados]);

  const cargarValores = (campo) => {
    setCampoSeleccionado(campo.target.value);
    setCargando(true);

    fetch(`${api}/obtener/valores/busqueda`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuarios: usuariosSeleccionados,
        proyecto: proyectosSeleccionados,
        campo: campo.target.value,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setListaValores(responseData);
        setCargando(false);
      })
      .catch((error) => {
        console.log(error);
        setCargando(false);
      });
  };

  return (
    <>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik, values ) => (
            <Form>
                <div className='mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden'>
                  <h1 className='mx-0 my-1 text-xl font-bold text-[#245A95]'>Buscar registro</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3">
                        <div className="mt-8 mx-4 flex flex-col">
                            <div className='p-inputgroup flex-1'>
                              <span className='p-float-label relative'>
                                <Field
                                  as={MultiSelect}
                                  name="usuarios"
                                  options={usuarios}
                                  optionLabel="usuario"
                                  filter
                                  emptyFilterMessage='No se encontarron usuarios'
                                  onChange={(usuario)=>{
                                    setUsuariosSeleccionados(usuario.target.value);
                                    // console.log(usuario.target.value);

                                    fetch(`${api}/obtener/proyectos/asignados/usuarios`, {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json' 
                                      },
                                      body: JSON.stringify(usuario.target.value) 
                                    })
                                      .then(response => response.json())
                                      .then(responseData => {
                                        // console.log(responseData)
                                        // obtenemos los proyectos
                                        setListaProyectos(responseData)
                                        
                                      })
                                      .catch(error => console.log(error));
                                  }}
                                  value={usuariosSeleccionados}
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
                                    name="listaProyectosFiltrados"
                                    options={listaProyectosFiltrados}
                                    optionLabel="proyecto"
                                    filter
                                    emptyFilterMessage='No se encontarron proyectos'
                                    onChange={(proyecto) => {
                                      setProyectosSeleccionados([proyecto.target.value]);
                                      const ListaUsuariosProyectos = {usuarios: usuariosSeleccionados, proyectos: [proyecto.target.value]}

                                      // obtencion de los registros de acuerdo a los usuarios selecionados y al proyecto seleccionado
                                      fetch(`${api}/obtener/registros/asignados/usuario/proyecto`, {
                                        method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json' 
                                        },
                                        body: JSON.stringify(ListaUsuariosProyectos) 
                                      })
                                        .then(response => response.json())
                                        .then(responseData => {
                                          console.log(responseData)
                                          setListaRegistros(responseData);
                                          setListaRegistrosValor(responseData);                
                                        })
                                        .catch(error => console.log(error)); 
                                        
                                        // obenemos los campos para el select de buscar por
                                        fetch(`${api}/obtener/campos/proyectos`, {
                                          method: 'POST',
                                          headers: {
                                            'Content-Type': 'application/json' 
                                          },
                                          body: JSON.stringify([proyecto.target.value]) 
                                        })
                                          .then(response => response.json())
                                          .then(responseData => {
                                            console.log(responseData)
                                            setListaCampos(responseData);                
                                          })
                                          .catch(error => console.log(error));
                                    }}
                                    value={proyectosSeleccionados[0]}
                                    
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
                          {
                            listaCampos.length === 0 ? <div></div> :
                            <div className='p-inputgroup flex-1'>
                                <span className='p-float-label relative'>
                                  <Field
                                    as={Dropdown}
                                    name="BuscarCampo"
                                    options={listaCampos}
                                    optionLabel='campo'
                                    filter
                                    emptyFilterMessage='Campo no encontradofh'
                                    filterPlaceholder='Campo'
                                    onChange={(campo) =>{

                                      setCampoSeleccionado(campo.target.value)
                                      fetch(`${api}/obtener/valores/busqueda`, {
                                        method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json' 
                                        },
                                        body: JSON.stringify({usuarios: usuariosSeleccionados, proyecto:proyectosSeleccionados, campo:campo.target.value}) 
                                      })
                                        .then(response => response.json())
                                        .then(responseData => {
                                          console.log(responseData)
                                          setListaValores(responseData);                  
                                        })
                                        .catch(error => console.log(error)); 
                                    }}
                                    value={campoSeleccionado}
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
                          }
                              
                            
                        </div>
                        <div className="mt-8 mx-4 flex flex-col">
                          {
                            listaValores.length === 0 ? <></> :
                            <div className='p-inputgroup flex-1'>
                                <span className='p-float-label relative'>
                                  <Field
                                    as={Dropdown}
                                    name="valores"
                                    options={listaValores}
                                    optionLabel="valor"
                                    filter
                                    emptyFilterMessage='Valor del campo no encontrado'
                                    filterPlaceholder='Nombre de proyecto'
                                    onChange={(valor) => {
                                      setValorSeleccionado(valor.target.value);
                                      console.log('listaRegistrosValor', [listaRegistrosValor[0]]);

                                      setListaRegistros([listaRegistrosValor[0]]);
                                    }}
                                    value={valorSeleccionado}
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
                          }       
                        </div>
                    </div>
                    <div className="flex py-2">
                      <button
                        type="submit"
                        // disabled={!formik.dirty || formik.isSubmitting}
                        className="m-auto h-12 px-4 py-2 bg-[#245A95] hover:bg-[#1F4973] text-white text-lg font-bold rounded-full uppercase shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#245A95] mt-4"
                        onClick={()=>{
                          console.log(listaRegistrosValor);
                          setListaRegistros(listaRegistrosValor);
                        }}
                      >
                        <ion-icon name="eye" className="mr-2 text-2xl"></ion-icon> Ver todos
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