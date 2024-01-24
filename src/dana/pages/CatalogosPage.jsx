import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { api } from "../helpers/variablesGlobales";
import { TablaCatalogos } from "../components/catalogo/TablaCatalogos";

export const CatalogosPage = () => {
  const [proyectos, setProyectos] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState({});
  const [catalogoProyecto, setCatalogoProyecto] = useState([]);
  const [catalogoProyectoSeleccionado, setCatalogoProyectoSeleccionado] =
    useState({});
  const [nuevoValorCatalo, setNuevoValorCatalo] = useState("");
  const [listaCatalogoProyecto, setListaCatalogoProyecto] = useState([]);
  const [nuevoArregloOpcionesCatalogo, setNuevoArregloOpcionesCatalogo] =
    useState([]);

  // console.log(listaCatalogoProyecto);
  console.log(nuevoArregloOpcionesCatalogo);

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
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [proyectoSeleccionado]);

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
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [catalogoProyectoSeleccionado]);

  // useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(`${api}/crear/catalogo/datos/proyecto`, {
  //           method: 'POST', // o 'PUT', 'DELETE', etc., según el método que debas usar
  //           headers: {
  //             'Content-Type': 'application/json', // o el tipo de contenido adecuado
  //             // otras cabeceras según sea necesario
  //           },
  //           body: JSON.stringify(proyectoSeleccionado),
  //         });

  //         const jsonData = await response.json();
  //         // console.log(jsonData);
  //         setListaCatalogoProyecto(jsonData);

  //         setNuevoArregloOpcionesCatalogo(jsonData.catalogo ?? [])
  //       } catch (error) {
  //         console.log('Error:', error);
  //       }
  //     };

  //     fetchData();
  //   }, [catalogoProyectoSeleccionado]);

  // FUNCION QUE VA AGREGANDO LOS VALORES NUEVOS AL NUEVO ARREGLO
  const handleAgregar = () => {
    // Verificar que haya un valor en nuevoValorCatalo antes de agregarlo
    if (nuevoValorCatalo.trim() !== "") {
      // Agregar el nuevo valor al estado nuevoArregloOpcionesCatalogo
      setNuevoArregloOpcionesCatalogo((prevState) => [
        ...prevState,
        nuevoValorCatalo,
      ]);

      // Limpiar el valor de nuevoValorCatalo
      setNuevoValorCatalo("");
    }
  };

  const handleGuardar = () => {};

  return (
    <>
      <div className="pb-6">
        <h1 className="pt-2 xl:pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">
          Catálogo
        </h1>
        <div className="mx-4 xl:mx-20 my-4 px-4 py-2 bg-white rounded-lg overflow-hidden">
          <h1 className="pt-2 xl:pt-6 pl-3 text-base font-black text-[#245A95]">
            1. Selecciona el proyecto
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
          <h1 className="mt-4 xl:pt-6 pl-3 text-lg lg:text-2xl font-black text-[#245A95]">
            Asigna una opción al catálogo del proyecto:{" "}
            {Object.keys(proyectoSeleccionado).length === 0 ? (
              <span></span>
            ) : (
              proyectoSeleccionado.proyecto
            )}
          </h1>
          <div>
            <div className="mt-4 grid sm:grid-cols-3 gap-8">
              <div className="">
                <h1 className="pt-2 pl-3 text-base font-black text-[#245A95]">
                  2. Selecciona el catálogo al que deseas asignar una opción
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

                <h1 className="pt-2 pl-3 text-base font-black text-[#245A95]">
                  3. Agregar el valor a el catálogo seleccionado
                </h1>
                <div className="p-inputgroup">
                  <span className="p-float-label w-full mt-6">
                    <InputText
                      className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                      name="perfil"
                      value={nuevoValorCatalo.toUpperCase()}
                      onChange={(e) => {
                        setNuevoValorCatalo(e.target.value);
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
                      Contenido
                    </label>
                  </span>
                </div>
                <div className="pt-6 cursor-pointer inset-x-0 bottom-4 right-6 flex gap-3 justify-center xl:justify-end">
                  <button
                    type="button" // Asegúrate de que el tipo sea 'submit'
                    className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-sm xl:text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                    onClick={handleAgregar}
                  >
                    <ion-icon name="add-circle"></ion-icon> Agregar
                  </button>
                </div>
              </div>
              <div className="lg:col-span-2 lg:mt-8 flex flex-col items-center">
                <TablaCatalogos
                  listaCatalogoProyecto={listaCatalogoProyecto}
                  nuevoArregloOpcionesCatalogo={nuevoArregloOpcionesCatalogo}
                  setNuevoArregloOpcionesCatalogo={
                    setNuevoArregloOpcionesCatalogo
                  }
                />
                <div className="mt-8 cursor-pointer inset-x-0 bottom-4 right-6 flex gap-3 justify-center xl:justify-end">
                  <button
                    type="button" // Asegúrate de que el tipo sea 'submit'
                    className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-sm xl:text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                    onClick={handleAgregar}
                  >
                    <ion-icon name="save"></ion-icon> Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h1 className="mt-8 xl:pt-6 pl-3 text-2xl font-black text-[#245A95]">
            Catalogo individual del proyecto
          </h1>
          <div className="p-inputgroup mt-3 lg:mt-6 grid grid-cols-3 gap-8">
            <span className="p-float-label w-full">
              <Dropdown
                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                name="perfil"
              />
              <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                <i className="pi pi-file-edit text-white font-light text-xl"></i>
              </span>
              <label
                htmlFor="nombrealberca"
                className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
              >
                Catalogos
              </label>
            </span>
            <span className="p-float-label  w-full">
              <InputText
                className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                name="perfil"
              />
              <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                <i className="pi pi-file-edit text-white font-light text-xl"></i>
              </span>
              <label
                htmlFor="nombrealberca"
                className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
              >
                Contenido
              </label>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
