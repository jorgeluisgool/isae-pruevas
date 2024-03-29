import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { api } from "../helpers/variablesGlobales";

const initialValues = {
  multiSelectField: [],
};

const onSubmit = (values) => {
  console.log(values);
};

const RegistrosForm = ({
  usuarios,
  listaRegistros,
  setListaRegistros,
  usuariosSeleccionados,
  setUsuariosSeleccionados,
  proyectosClientes,
  setDataProyectoSeleccionado,
  setModalAbrirCerrar,
  setProyectoSeleccionado,
  proyectoSeleccionado,
}) => {
  const [listaRegistrosValor, setListaRegistrosValor] = useState([]);
  const [listaProyectos, setListaProyectos] = useState([]);
  const [proyectosSeleccionados, setProyectosSeleccionados] = useState([]);
  const [listaCampos, setListaCampos] = useState([]);
  // const [listaRegistros, setListaRegistros] = useState([]);
  const [campoSeleccionado, setCampoSeleccionado] = useState([]);
  const [listaValores, setListaValores] = useState([]);
  const [valorSeleccionado, setValorSeleccionado] = useState([]);

  const [cargando, setCargando] = useState(false);

  // const [lista, setLista] = useState([]);

  // console.log(proyectosSeleccionados);

  const listaProyectosFiltrados = listaProyectos.filter(
    (obj, index, self) =>
      index === self.findIndex((o) => o.proyecto === obj.proyecto)
  );

  const listaValoresFiltrados = listaValores.filter(
    (obj, index, self) =>
      index === self.findIndex((o) => o.valor.trim() === obj.valor.trim())
  );

  //console.log(proyectosSeleccionados);

  const handleDataProyecto = () => {
    const data = {
      idproyecto: proyectosSeleccionados[0].idproyecto,
      proyecto: proyectosSeleccionados[0].proyecto,
      descripcion: proyectosSeleccionados[0].tipoproyecto.descripcion,
      fechacreacion: proyectosSeleccionados[0].fechacreacion,
    };

    const fechaActual = new Date();

    const año = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0"); // Los meses van de 0 a 11, por lo que sumamos 1
    const dia = fechaActual.getDate().toString().padStart(2, "0");

    // Formatear la fecha en el formato deseado (YYYY-MM-DD)
    const fechaFormateada = `${año}-${mes}-${dia}`;

    const newProject = {
      estatus: "NUEVO",
      fechacreacion: fechaFormateada,
      folio: "REGISTRO",
      idinventario: 0,
      proyecto: proyectosSeleccionados[0],
    };

    fetch(`${api}/obtener/datos/nuevo/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setDataProyectoSeleccionado(responseData);
        setProyectoSeleccionado(newProject);
        setModalAbrirCerrar(true);
      })
      .catch((error) => console.log(error));

    /* fetch(`${api}/obtener/datos/nuevo/registro`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then((response) => response.json()).
    then((responseData) =>{
      setDataProyectoSeleccionado(responseData);
      setModaAceptarlAbrirCerrar(true);
    }).catch((error) => console.log(error)); */
  };

  const handleProyectoCliente = (proyecto) => {
    fetch(`${api}/obtener/proyectos/cliente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ListaUsuariosProyectos),
    })
      .then((response) => response.json())

      .then((response) => response.json())
      .then((responseData) => {
        setListaValores(responseData);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setCargando(false); // Desactivar ventana de carga una vez que se complete la carga
      });
  };

  const handleUsuarioChange = (usuario) => {
    setUsuariosSeleccionados(usuario.target.value);
    if (usuario.target.value.length !== 0) {
      setCargando(true); // Activar ventana de carga
      const fetchPromises = usuario.target.value.map(async (usuario) => {
        const response = await fetch(
          `${api}/obtener/registros/asignados/usuario/proyecto/${usuario.idusuario}/${proyectosSeleccionados[0].idproyecto}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return await response.json();
      });

      Promise.all(fetchPromises)
        .then((responsesData) => {
          //console.log(responsesData);
          const lista = responsesData.flat();
          setCargando(false); // Desactivar ventana de carga una vez que se complete la carga
          setListaRegistros(lista);
        })
        .catch((error) => console.log(error));
    } else {
      setListaRegistros(listaRegistrosValor);
    }
  };

  const handleProyectoChange = (proyecto) => {
    setProyectosSeleccionados([proyecto.target.value]);
    setProyectoSeleccionado([proyecto.target.value]);
    //console.log([proyecto.target.value]);
    setCargando(true); // Activar ventana de carga

    const ListaUsuariosProyectos = {
      usuarios: usuariosSeleccionados,
      proyectos: [proyecto.target.value],
    };

    Promise.all([
      fetch(`${api}/obtener/registros/proyecto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proyecto.target.value),
      }).then((response) => response.json()),

      fetch(`${api}/obtener/campos/proyectos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([proyecto.target.value]),
      }).then((response) => response.json()),
    ])
      .then(([registrosData, camposData]) => {
        setListaRegistros(registrosData);
        setListaRegistrosValor(registrosData);
        setListaCampos(camposData);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setCargando(false); // Desactivar ventana de carga una vez que se complete la carga
      });
  };

  const handleCampoChange = (campo) => {
    setCampoSeleccionado(campo.target.value);
    setCargando(true); // Activar ventana de carga
    /* console.log(usuariosSeleccionados.length);
    console.log(proyectosSeleccionados.idproyecto);
    console.log(campo.target.value.campo); */

    /* if(usuariosSeleccionados == 0){
      fetch(`${api}/obtener/valores/busqueda/141/0`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: campo.target.value.campo,
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          setListaValores(responseData);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setCargando(false); // Desactivar ventana de carga una vez que se complete la carga
        });
    } */
    fetch(`${api}/obtener/valores/busqueda`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuarios: usuariosSeleccionados ? usuariosSeleccionados : [],
        proyecto: proyectosSeleccionados,
        campo: campo.target.value,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setListaValores(responseData);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setCargando(false); // Desactivar ventana de carga una vez que se complete la carga
      });
  };

  return (
    <>
      {/* Ventana de carga */}
      {cargando && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex items-center transition duration-500 ease-in-out">
            <span className="hover:text-gray-400 duration-500 text-3xl text-slate-50">
              <img
                src="/src/assets/isae.png"
                alt="Icono"
                className="h-20 xl:h-40 mr-1 animate-spin"
              />
            </span>
            <img
              src="/src/assets/letras_isae.png"
              alt="Icono"
              className="h-20 xl:h-40 mr-2"
            />
          </div>
          <div className="fixed pt-36 xl:pt-60">
            <h1 className="text-[#C41420] text-4xl font-black animate-pulse">
              Cargando...
            </h1>
          </div>
        </div>
      )}
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik, values) => (
          <Form>
            <div className="mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden">
              <h1 className="mx-0 my-1 text-xl font-bold text-[#245A95]">
                Buscar registro
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="mt-8 mx-4 flex flex-col">

                {/* <div className="p-inputgroup mt-6 grid md:grid-cols-3">
                  <span className="p-float-label  w-full">
                    <Dropdown
                      className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                      name="proyecto"
                      options={proyectos}
                      optionLabel="proyecto"
                      filter
                      value={proyectoSeleccionado}
                      onChange={(e) => {
                        setProyectoSeleccionado(e.target.value);
                        setListaOpcionesCatalogo1Relacion([]);
                        // catalogoRelacion2ProyectoSeleccionado([]);
                      }}
                    />
                    <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                      <i className="pi pi-file-edit text-white font-light text-xl"></i>
                    </span>
                    <label
                      htmlFor="nombrealberca"
                      className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                    >
                      Proyecto
                    </label>
                  </span>
                </div> */}

                  <div className="p-inputgroup">
                    <span className="p-float-label w-full">
                      <Field
                        as={Dropdown}
                        name="listaProyectosFiltrados"
                        options={proyectosClientes}
                        optionLabel="proyecto"
                        filter
                        emptyFilterMessage="No se encontarron proyectos"
                        onChange={handleProyectoChange}
                        // onChange={(proyecto) => {
                        //   setProyectosSeleccionados([proyecto.target.value]);
                        //   const ListaUsuariosProyectos = {usuarios: usuariosSeleccionados, proyectos: [proyecto.target.value]}

                        //   // obtencion de los registros de acuerdo a los usuarios selecionados y al proyecto seleccionado
                        //   fetch(`${api}/obtener/registros/asignados/usuario/proyecto`, {
                        //     method: 'POST',
                        //     headers: {
                        //       'Content-Type': 'application/json'
                        //     },
                        //     body: JSON.stringify(ListaUsuariosProyectos)
                        //   })
                        //     .then(response => response.json())
                        //     .then(responseData => {
                        //       console.log(responseData)
                        //       setListaRegistros(responseData);
                        //       setListaRegistrosValor(responseData);
                        //     })
                        //     .catch(error => console.log(error));

                        //     // obenemos los campos para el select de buscar por
                        //     fetch(`${api}/obtener/campos/proyectos`, {
                        //       method: 'POST',
                        //       headers: {
                        //         'Content-Type': 'application/json'
                        //       },
                        //       body: JSON.stringify([proyecto.target.value])
                        //     })
                        //       .then(response => response.json())
                        //       .then(responseData => {
                        //         console.log(responseData)
                        //         setListaCampos(responseData);
                        //       })
                        //       .catch(error => console.log(error));
                        // }}
                        value={proyectosSeleccionados[0]}
                        className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                      />
                      <span className="bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                        <i className="pi pi-file text-white font-light text-xl"></i>
                      </span>
                      <label
                        htmlFor="name"
                        className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                      >
                        Nombre de proyecto
                      </label>
                    </span>
                  </div>
                </div>
                <div className="mt-8 mx-4 flex flex-col">
                  {listaCampos.length === 0 ? (
                    <div></div>
                  ) : (
                    <div className="p-inputgroup">
                      <span className="p-float-label w-full">
                        <Field
                          as={MultiSelect}
                          name="usuarios"
                          options={usuarios}
                          optionLabel="usuario"
                          filter
                          emptyFilterMessage="No se encontraron usuarios"
                          onChange={handleUsuarioChange}
                          // onChange={(usuario)=>{
                          //   setUsuariosSeleccionados(usuario.target.value);
                          //   // console.log(usuario.target.value);

                          //   fetch(`${api}/obtener/proyectos/asignados/usuarios`, {
                          //     method: 'POST',
                          //     headers: {
                          //       'Content-Type': 'application/json'
                          //     },
                          //     body: JSON.stringify(usuario.target.value)
                          //   })
                          //     .then(response => response.json())
                          //     .then(responseData => {
                          //       // console.log(responseData)
                          //       // obtenemos los proyectos
                          //       setListaProyectos(responseData)

                          //     })
                          //     .catch(error => console.log(error));
                          // }}
                          value={usuariosSeleccionados}
                          display="chip"
                          className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                        />
                        <span className="bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                          <i className="pi pi-users text-white font-light text-xl"></i>
                        </span>
                        <label
                          htmlFor="name"
                          className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                        >
                          Usuarios
                        </label>
                      </span>
                    </div>
                  )}
                </div>
                      
                <div className="mt-8 mx-4 flex flex-col">
                  {listaCampos.length === 0 ? (
                    <div></div>
                  ) : (
                    <div className="p-inputgroup">
                      <span className="p-float-label w-full">
                        <Field
                          as={Dropdown}
                          name="BuscarCampo"
                          options={listaCampos}
                          optionLabel="campo"
                          filter
                          emptyFilterMessage="Campo no encontradofh"
                          filterPlaceholder="Campo"
                          onChange={handleCampoChange}
                          // onChange={(campo) =>{

                          //   setCampoSeleccionado(campo.target.value)
                          //   fetch(`${api}/obtener/valores/busqueda`, {
                          //     method: 'POST',
                          //     headers: {
                          //       'Content-Type': 'application/json'
                          //     },
                          //     body: JSON.stringify({usuarios: usuariosSeleccionados, proyecto:proyectosSeleccionados, campo:campo.target.value})
                          //   })
                          //     .then(response => response.json())
                          //     .then(responseData => {
                          //       console.log(responseData)
                          //       setListaValores(responseData);
                          //     })
                          //     .catch(error => console.log(error));
                          // }}
                          value={campoSeleccionado}
                          display="chip"
                          className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                        />
                        <span className="bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                          <i className="pi pi-search text-white font-light text-xl"></i>
                        </span>
                        <label
                          htmlFor="name"
                          className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                        >
                          Buscar por:
                        </label>
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 mx-4 flex flex-col">
                  {listaValores.length === 0 ? (
                    <div></div>
                  ) : (
                    <div className="p-inputgroup flex-1">
                      <span className="p-float-label w-full">
                        <Field
                          as={Dropdown}
                          name="valores"
                          options={listaValoresFiltrados}
                          optionLabel="valor"
                          filter
                          emptyFilterMessage="Valor del campo no encontrado"
                          filterPlaceholder="Nombre de proyecto"
                          onChange={(valor) => {
                            setValorSeleccionado(valor.target.value);

                            const resultados = listaValores.filter(
                              (item) =>
                                item.valor.trim() ===
                                valor.target.value.valor.trim()
                            );

                            setListaRegistros(
                              resultados.map((item) => item.inventario)
                            );
                          }}
                          value={valorSeleccionado}
                          display="chip"
                          className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                        />
                        <span className="bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                          <i className="pi pi-search text-white font-light text-xl"></i>
                        </span>
                        <label
                          htmlFor="name"
                          className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                        >
                          Buscar:
                        </label>
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {
                proyectoSeleccionado && (
                  <div className="flex py-2 mt-6 justify-end">
                    <button
                      type="submit"
                      // disabled={!formik.dirty || formik.isSubmitting}
                      className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                      onClick={() => {
                        //console.log(listaRegistrosValor);
                        setListaRegistros(listaRegistrosValor);
                      }}
                    >
                      <ion-icon name="eye" className="mr-2 text-2xl"></ion-icon> Ver
                      todos
                    </button>
                    <button
                      type="button"
                      // disabled={!formik.dirty || formik.isSubmitting}
                      className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                      onClick={() => handleDataProyecto()}
                    >
                      <ion-icon name="add-circle"></ion-icon>{" "}
                      Nuevo registro
                    </button>
                  </div>
                )
              }

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
  );
};

export default RegistrosForm;
