import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { api } from "../helpers/variablesGlobales";
import { TablaCatalogos } from "../components/catalogo/TablaCatalogos";
import { TablaRelacionCatalogos } from "../components/catalogo/TablaRelacionCatalogos";
import { DialogConfirmacionOpcionesCatalogo } from "../../ui/components/DialogConfirmacionOpcionesCatalogo";
import { VentanaCargaIsae } from "../../ui/components/VentanaCargaIsae";
import { TablaRelacionCatalogo2 } from "../components/catalogo/TablaRelacionCatalogo2";
import { DialogConfirmacion } from "../../ui/components/DialogConfirmacion";

export const CatalogosPage = () => {
  const [proyectos, setProyectos] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState({});
  const [catalogoProyecto, setCatalogoProyecto] = useState([]);
  const [catalogoProyectoSeleccionado, setCatalogoProyectoSeleccionado] = useState([]);
  const [catalogoRelacion1ProyectoSeleccionado, setCatalogoRelacion1ProyectoSeleccionado] = useState([]);
  const [catalogoRelacion2ProyectoSeleccionado, setCatalogoRelacion2ProyectoSeleccionado] = useState([]);
  const [nuevoValorCatalo, setNuevoValorCatalo] = useState("");
  const [listaCatalogoProyecto, setListaCatalogoProyecto] = useState([]);
  const [nuevoArregloOpcionesCatalogo, setNuevoArregloOpcionesCatalogo] = useState([]);
  const [nuevoArregloOpcionesCatalogo2, setNuevoArregloOpcionesCatalogo2] = useState([]);
  const [searchCatalogoAsignacion, setSearchCatalogoAsignacion] = useState('');
  const [searchCatalogo1, setSearchCatalogo1] = useState('');
  const [searchCatalogo2, setSearchCatalogo2] = useState('');
  const [mensajeConfirmacionOpcionCatalogo, setMensajeConfirmacionOpcionCatalogo] = useState(false);
  const [ventanaDeCarga, setVentanaDeCarga] = useState(false);
  const [listaOpcionesCatalogo1Relacion, setListaOpcionesCatalogo1Relacion] = useState([]);
  const [listaOpcionesCatalogo2Relacion, setListaOpcionesCatalogo2Relacion] = useState([]);
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [selectedOptionIndex2, setSelectedOptionIndex2] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [valoresCatalogoHijo, setValoresCatalogoHijo] = useState([]);
  const [modaAceptarlAbrirCerrar, setModaAceptarlAbrirCerrar] = useState(false);

  const handleSearchAsignacion = (event) => {
    setSearchCatalogoAsignacion(event.target.value);
  };

  const handleSearchCatalogo1Relacion = (event) => {
    setSearchCatalogo1(event.target.value);
  };

  const handleSearchCatalogo2Relacion = (event) => {
    setSearchCatalogo2(event.target.value);
  };

  // OBTENER TODOS LOS PROYECTOS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/obtener/proyectos`);
        const jsonData = await response.json();
        // console.log(jsonData)
        setProyectos(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  // OBTENER LAS OPCIONES DE CATALOGOS DE ACUERDO AL PROYECTO SELECCIONADO
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${api}/obtener/catalogo/campos/proyecto`,
          {
            method: "POST", // o 'PUT', 'DELETE', etc., según el método que debas usar
            headers: {
              "Content-Type": "application/json", // o el tipo de contenido adecuado
              // otras cabeceras según sea necesario
            },
            body: JSON.stringify(proyectoSeleccionado),
          }
        );

        const jsonData = await response.json();
        // console.log(jsonData);
        setCatalogoProyecto(jsonData);
        setCatalogoProyectoSeleccionado(jsonData);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [proyectoSeleccionado]);

  // Obtener Opciones Catalogo del catalogo seleccionado tabla 1
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${api}/obtener/catalogo/datos/proyecto/${catalogoProyectoSeleccionado}`,
          {
            method: "POST", // o 'PUT', 'DELETE', etc., según el método que debas usar
            headers: {
              "Content-Type": "application/json", // o el tipo de contenido adecuado
              // otras cabeceras según sea necesario
            },
            body: JSON.stringify(proyectoSeleccionado),
          }
        );

        const jsonData = await response.json();
        console.log(jsonData);
        setListaCatalogoProyecto(jsonData);

        setNuevoArregloOpcionesCatalogo(jsonData.catalogo ?? []);
        setCatalogoRelacion1ProyectoSeleccionado(jsonData.catalogo ?? []);
        // setCatalogoRelacion2ProyectoSeleccionado(jsonData.catalogo ?? []);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [catalogoProyectoSeleccionado]);

  // Obtener Opciones Catálogo del catalogo seleccionado tabla 1 Relacion 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${api}/obtener/catalogo/datos/proyecto/${catalogoRelacion1ProyectoSeleccionado}`,
          {
            method: "POST", // o 'PUT', 'DELETE', etc., según el método que debas usar
            headers: {
              "Content-Type": "application/json", // o el tipo de contenido adecuado
              // otras cabeceras según sea necesario
            },
            body: JSON.stringify(proyectoSeleccionado),
          }
        );

        const jsonData = await response.json();
        console.log(jsonData);
        setListaCatalogoProyecto(jsonData);

        // setNuevoArregloOpcionesCatalogo2(jsonData.catalogo ?? []);
        setListaOpcionesCatalogo1Relacion(jsonData.catalogo ?? []);

      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [catalogoRelacion1ProyectoSeleccionado]);


  // console.log(catalogoRelacion2ProyectoSeleccionado)
  // Obtener Opciones Catálogo del catalogo seleccionado tabla 2 Relacion 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${api}/obtener/catalogo/datos/proyecto/${catalogoRelacion2ProyectoSeleccionado}`,
          {
            method: "POST", // o 'PUT', 'DELETE', etc., según el método que debas usar
            headers: {
              "Content-Type": "application/json", // o el tipo de contenido adecuado
              // otras cabeceras según sea necesario
            },
            body: JSON.stringify(proyectoSeleccionado),
          }
        );

        const jsonData = await response.json();
        console.log(jsonData);
        setListaCatalogoProyecto(jsonData);

        // setNuevoArregloOpcionesCatalogo2(jsonData.catalogo ?? []);
        setListaOpcionesCatalogo2Relacion(jsonData.catalogo ?? [])

      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [catalogoRelacion2ProyectoSeleccionado]);

  // FUNCION QUE VA AGREGANDO LOS VALORES NUEVOS AL NUEVO ARREGLO
  const handleAgregar = () => {

    // Verificar que haya un valor en nuevoValorCatalo antes de agregarlo
    if (nuevoValorCatalo.trim() !== "") {
      // Agregar el nuevo valor al estado nuevoArregloOpcionesCatalogo que se muestran en la tabla
      setNuevoArregloOpcionesCatalogo((prevState) => [
        ...prevState,
        nuevoValorCatalo,
      ]);
      // Agregar el nuevo valor al estado nuevoArregloOpcionesCatalogo que se envia
      setNuevoArregloOpcionesCatalogo2((prevState) => [
        ...prevState,
        nuevoValorCatalo.toUpperCase(),
      ]);

      // Limpiar el valor de nuevoValorCatalo
      setNuevoValorCatalo("");
      // fetchData();
    }
  };

  // Funcion de guardar las nuevas opciones del catalogo seleccionado
  const handleGuardar = () => {

    setVentanaDeCarga(true);
    setCatalogoRelacion2ProyectoSeleccionado([])

    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/crear/catalogo/${proyectoSeleccionado.idproyecto}/${catalogoProyectoSeleccionado}`, {
          method: 'POST', // o 'PUT', 'DELETE', etc., según el método que debas usar
          headers: {
            'Content-Type': 'application/json', // o el tipo de contenido adecuado
            // otras cabeceras según sea necesario
          },
          body: JSON.stringify(nuevoArregloOpcionesCatalogo2),
        });

        setVentanaDeCarga(false);
        setMensajeConfirmacionOpcionCatalogo(false);
        setNuevoArregloOpcionesCatalogo2([]);

      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  };

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${api}/obtener/catalogorelacionado/${proyectoSeleccionado.idproyecto}`, {
            method: 'POST', // o 'PUT', 'DELETE', etc., según el método que debas usar
            headers: {
              'Content-Type': 'application/json', // o el tipo de contenido adecuado
              // otras cabeceras según sea necesario
            },
            body: JSON.stringify({
              "tipoCatalogoPadre": catalogoRelacion1ProyectoSeleccionado,
              "catalogoPadre": selectedOption,
              "tipoCatalogoHijo": null,
              "catalogoHijo": []
            }),
          });
  
          const jsonData = await response.json();
          console.log(jsonData);
          setValoresCatalogoHijo(jsonData.catalogoHijo)
          setVentanaDeCarga(false);
          
        } catch (error) {
          console.log('Error:', error);
          setVentanaDeCarga(false);
        }
      };
  
      fetchData();
    }, [catalogoRelacion1ProyectoSeleccionado, selectedOption]);
  
    const handleGuardarRelacion = () => {

      setVentanaDeCarga(true);
      setModaAceptarlAbrirCerrar(false)
  
      const fetchData = async () => {
        try {
          const response = await fetch(`${api}/crear/catalogo/relacionado/${proyectoSeleccionado.idproyecto}`, {
            method: 'POST', // o 'PUT', 'DELETE', etc., según el método que debas usar
            headers: {
              'Content-Type': 'application/json', // o el tipo de contenido adecuado
              // otras cabeceras según sea necesario
            },
            body: JSON.stringify(
              { "tipoCatalogoPadre": catalogoRelacion1ProyectoSeleccionado,
                "catalogoPadre": selectedOption,
                "tipoCatalogoHijo": catalogoRelacion2ProyectoSeleccionado,
                "catalogoHijo": valoresCatalogoHijo
              }
            ),
          });
  
          setVentanaDeCarga(false);
          // setMensajeConfirmacionOpcionCatalogo(false);
          // setNuevoArregloOpcionesCatalogo2([]);
  
        } catch (error) {
          console.log('Error:', error);
        }
      };
  
      fetchData();
    };

  return (
    <>
      <VentanaCargaIsae 
        ventanaDeCarga={ventanaDeCarga}
      />

      <DialogConfirmacionOpcionesCatalogo 
        mensajeConfirmacionOpcionCatalogo={mensajeConfirmacionOpcionCatalogo} 
        setMensajeConfirmacionOpcionCatalogo={setMensajeConfirmacionOpcionCatalogo}
        nuevoArregloOpcionesCatalogo2={nuevoArregloOpcionesCatalogo2}
        catalogoProyectoSeleccionado={catalogoProyectoSeleccionado}
        handleGuardar={handleGuardar}
      />
      <div className="">
        <h1 className="pt-2 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">
          Catálogos
        </h1>
        <div className="mx-4 xl:mx-20 my-4 px-4 pb-6 bg-white rounded-lg overflow-hidden">
          <h1 className="pt-2 xl:pt-6 pl-3 text-base font-black text-neutral-900">
          <span className="text-[#245A95] text-4xl">1</span> Selecciona el proyecto
          </h1>
          <div className="p-inputgroup mt-6 grid md:grid-cols-3">
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
          </div>
          </div>
          <div className="mx-4 xl:mx-20 my-4 px-4 pb-6 bg-white rounded-lg overflow-hidden">
          <h1 className="mt-4 pl-3 text-lg lg:text-2xl font-black text-[#245A95]">
            Asigna una opción al catálogo del proyecto:{" "}
            {Object.keys(proyectoSeleccionado).length === 0 ? (
              <span></span>
            ) : (
              <span className="text-black">{proyectoSeleccionado.proyecto}</span>
            )}
          </h1>
          
            <div className="mt-4 grid sm:grid-cols-3 gap-8">
              <div className="">
                <h1 className="pt-2 pl-3 text-base font-black text-neutral-900">
                  <span className="text-[#245A95] text-4xl">2</span> Selecciona el catálogo al que deseas asignar una opción
                </h1>
                <div className="p-inputgroup">
                  <span className="p-float-label w-full mt-6">
                    <Dropdown
                      className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                      name="catalogos"
                      options={catalogoProyecto}
                      filter
                      value={catalogoProyectoSeleccionado}
                      onChange={(e) => {
                        setCatalogoProyectoSeleccionado(e.target.value);
                        setNuevoArregloOpcionesCatalogo2([]);
                      }}
                      disabled={Object.keys(proyectoSeleccionado).length === 0}
                    />
                    <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                      <i className="pi pi-file-edit text-white font-light text-xl"></i>
                    </span>
                    <label
                      htmlFor="nombrealberca"
                      className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                    >
                      Catálogos
                    </label>
                  </span>
                </div>
                <h1 className="pt-2 pl-3 text-base font-black text-neutral-900">
                  <span className="text-[#245A95] text-4xl">3</span> Agregar el valor a el catálogo seleccionado
                </h1>
                <div className="p-inputgroup">
                  <span className="p-float-label w-full mt-6">
                    <InputText
                      className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                      name="perfil"
                      value={nuevoValorCatalo.toUpperCase()}
                      onChange={(e) => {
                        setNuevoValorCatalo(e.target.value.toUpperCase());
                      }}
                      disabled={Object.keys(proyectoSeleccionado).length === 0}
                    />
                    <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                      <i className="pi pi-file-edit text-white font-light text-xl"></i>
                    </span>
                    <label
                      htmlFor="nombrealberca"
                      className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                    >
                      Valor
                    </label>
                  </span>
                </div>
                {
                  nuevoValorCatalo.length === 0 ?
                  <div></div>
                  :
                  <div className="pt-6 cursor-pointer inset-x-0 bottom-4 right-6 flex gap-3 justify-center xl:justify-end">
                  <button
                    type="button" // Asegúrate de que el tipo sea 'submit'
                    className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-sm xl:text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                    onClick={handleAgregar}
                  >
                    <ion-icon name="add-circle"></ion-icon> Agregar
                  </button>
                </div>
                }
              </div>
              <div className="lg:col-span-2 lg:mt-8 flex flex-col items-center">
                <div className="p-inputgroup lg:px-16 pb-8">
                  <span className='p-float-label w-full'>
                      <InputText
                          className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                          name="searchCatalogoAsignacion"
                          value={searchCatalogoAsignacion}
                          onChange={handleSearchAsignacion}
                          disabled={Object.keys(proyectoSeleccionado).length === 0}
                      /> 
                      <span className="bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                        <i className="pi pi-search text-white font-light text-xl"></i>
                      </span>
                      <label htmlFor="name" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                        Buscar la opción del catalogo
                      </label>
                  </span>
                </div>
                <TablaCatalogos
                  searchCatalogoAsignacion={searchCatalogoAsignacion}
                  listaCatalogoProyecto={listaCatalogoProyecto}
                  nuevoArregloOpcionesCatalogo={nuevoArregloOpcionesCatalogo}
                  setNuevoArregloOpcionesCatalogo={setNuevoArregloOpcionesCatalogo}
                />
                {
                  nuevoArregloOpcionesCatalogo2.length === 0 ? 
                  <div></div>
                  :
                  <div className="mt-8 cursor-pointer inset-x-0 bottom-4 right-6 flex gap-3 justify-center xl:justify-end">
                  <button
                    type="button" // Asegúrate de que el tipo sea 'submit'
                    className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-sm xl:text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                    onClick={() => setMensajeConfirmacionOpcionCatalogo(true)}
                  >
                    <ion-icon name="save"></ion-icon> Guardar
                  </button>
                </div>
                }
                
              </div>
            </div>
          
        </div>
        {/* //////////////////////////////////////// */}
        {/* SEGUNDA SECCIÓN DE RELACIÓN DE CATALOGOS */}
        {/* //////////////////////////////////////// */}
        <div className="mx-4 xl:mx-20 my-4 px-4 pb-16 bg-white rounded-lg overflow-hidden relative" id="tuDivContenedor">
        <DialogConfirmacion 
          modaAceptarlAbrirCerrar={modaAceptarlAbrirCerrar}
          setModaAceptarlAbrirCerrar={setModaAceptarlAbrirCerrar}
          handleGuardarRelacion={handleGuardarRelacion}
        />
        <h1 className="mt-2 pl-3 text-2xl font-black text-[#245A95]">
          Relación de catálogos del proyecto:{' '}
          {Object.keys(proyectoSeleccionado).length === 0 ? (
              <span></span>
            ) : (
              <span className="text-black">{proyectoSeleccionado.proyecto}</span>
            )} 
        </h1> 
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="">
              <h1 className="pt-2 xl:pt-6 pl-3 mb-6 text-base font-black text-neutral-900">
                <span className="text-[#245A95] text-4xl">2</span> Catálogo 1: Opción a relacionar
              </h1>
              <div className="p-inputgroup lg:px-16">
                <span className="p-float-label w-full">
                  <Dropdown
                    className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                    name="catalogo1"
                    options={catalogoProyecto}
                    filter
                    value={
                      catalogoRelacion1ProyectoSeleccionado                    
                    }
                    onChange={(e) => {
                      setCatalogoRelacion1ProyectoSeleccionado(e.target.value);
                      setListaOpcionesCatalogo2Relacion([]);
                      setCatalogoRelacion2ProyectoSeleccionado([]);
                      setSelectedOptionIndex(null);
                    }}
                    disabled={Object.keys(proyectoSeleccionado).length === 0}
                  />
                  <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                    <i className="pi pi-file-edit text-white font-light text-xl"></i>
                  </span>
                  <label
                    htmlFor="nombrealberca"
                    className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                  >
                    Catálogos
                  </label>
                </span>
              </div>
              <div className="p-inputgroup lg:px-16 pt-8">
                <span className='p-float-label w-full'>
                    <InputText
                        className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                        name="searchCatalogo1"
                        value={searchCatalogo1}
                        onChange={(handleSearchCatalogo1Relacion)}
                        disabled={Object.keys(proyectoSeleccionado).length === 0}
                    /> 
                    <span className="bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                      <i className="pi pi-search text-white font-light text-xl"></i>
                    </span>
                    <label htmlFor="name" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                      Buscar la opción del catálogo
                    </label>
                </span>
                      {/* <p className="text-xs lg:text-base text-[#245A95] font-semibold">Puedes buscar el usuario por su nombre o nombre de usuario</p> */}
              </div>
              <div className="mt-4 flex justify-center">
                <TablaRelacionCatalogos
                  searchCatalogo1={searchCatalogo1}
                  selectedOptionIndex={selectedOptionIndex}
                  setSelectedOptionIndex={setSelectedOptionIndex}
                  catalogoRelacion1ProyectoSeleccionado={catalogoRelacion1ProyectoSeleccionado}
                  listaOpcionesCatalogo1Relacion={listaOpcionesCatalogo1Relacion}
                  setSelectedOption={setSelectedOption}
                  catalogoRelacion2ProyectoSeleccionado={catalogoRelacion2ProyectoSeleccionado}
                  setVentanaDeCarga={setVentanaDeCarga}
                />
              </div>
            </div>
            {
              catalogoRelacion1ProyectoSeleccionado.length != 0 ?
              <div className="">
              <h1 className="pt-2 xl:pt-6 pl-3 mb-6 text-base font-black text-neutral-900">
                <span className="text-[#245A95] text-4xl">3</span> Catálogo 2: Opción u opciones relacionadas
              </h1>
              <div className="p-inputgroup lg:px-16">
                <span className="p-float-label w-full">
                  <Dropdown
                    className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                    name="catalogo2"
                    options={catalogoProyecto.filter(opcion => opcion != catalogoRelacion1ProyectoSeleccionado)}
                    filter
                    value={
                      catalogoRelacion2ProyectoSeleccionado
                    }
                    onChange={(e) => {
                      setCatalogoRelacion2ProyectoSeleccionado(e.target.value);
                    }}
                  />
                  <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                    <i className="pi pi-file-edit text-white font-light text-xl"></i>
                  </span>
                  <label
                    htmlFor="nombrealberca"
                    className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                  >
                    Catálogos
                  </label>
                </span>
              </div>
              <div className="p-inputgroup lg:px-16 pt-8">
                <span className='p-float-label w-full'>
                    <InputText
                        className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                        name="searchCatalogo2"
                        value={searchCatalogo2}
                        onChange={handleSearchCatalogo2Relacion}
                    /> 
                    <span className="bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                      <i className="pi pi-search text-white font-light text-xl"></i>
                    </span>
                    <label htmlFor="name" className='text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300'>
                      Buscar la opción del catálogo
                    </label>
                </span>
                      {/* <p className="text-xs lg:text-base text-[#245A95] font-semibold">Puedes buscar el usuario por su nombre o nombre de usuario</p> */}
              </div>
              <div className="mt-4 flex justify-center">
                <TablaRelacionCatalogo2
                  searchCatalogo2={searchCatalogo2}
                  // nuevoArregloOpcionesCatalogo2={nuevoArregloOpcionesCatalogo2}
                  catalogoRelacion2ProyectoSeleccionado={catalogoRelacion2ProyectoSeleccionado}
                  listaOpcionesCatalogo2Relacion={listaOpcionesCatalogo2Relacion}
                  setCheckedItems={setCheckedItems}
                  checkedItems={checkedItems}
                  valoresCatalogoHijo={valoresCatalogoHijo}
                  setValoresCatalogoHijo={setValoresCatalogoHijo}
                  setSelectedOption2={setSelectedOption2}
                  selectedOptionIndex2={selectedOptionIndex2}
                  setSelectedOptionIndex2={setSelectedOptionIndex2}
                />
              </div>
            </div>
            :
            <>
            </>
            }
            
          </div>
          {valoresCatalogoHijo != undefined && (
                <div className="absolute inset-x-0 right-6 flex gap-3 justify-center pt-4">
                    <button
                        type="button"
                        className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-sm xl:text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                        onClick={() => setModaAceptarlAbrirCerrar(true)}
                    >
                        <ion-icon name="git-compare"></ion-icon> Relacionar
                    </button>
                </div>
            )}
        </div>
      </div>
    </>
  );
};








// /crear/catalogo/relacionado/234

// {
//   "tipoCatalogoPadre": "ESTADO",
//   "catalogoPadre": "TOLUCA",
//   "tipoCatalogoHijo": "EDIFICIO",
//   "catalogoHijo": [
//       "SUCURSAL REGIONAL METROPOLITANA"
//   ]
// }