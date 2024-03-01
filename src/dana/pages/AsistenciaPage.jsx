import { Formik, Form, Field } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { parse, format, isValid, parseISO } from "date-fns";
import { Image } from "primereact/image";
import { Calendar } from "primereact/calendar";
import { api } from "../helpers/variablesGlobales";
import useAuth from "../hooks/useAuth";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Player } from "@lottiefiles/react-lottie-player";

export const AsistenciaPage = () => {
  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [cargando, setCargando] = useState(false);

  const { setUserAuth } = useAuth();

  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaAsistencia, setListaAsistencia] = useState([]);
  const toast = useRef(null);
  const [ventanaCarga, setVentanaCarga] = useState(false);
  const [modalAsistencia, setModalAsistencia] = useState(false);

  //Pagination Table
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPageA, setCurrentPageA] = useState(1);
  const [rowsPerPageA, setRowsPerPageA] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = searchTerm
    ? listaUsuarios.filter((usuario) => {
        const term = searchTerm.toLowerCase();
        return (
          usuario.nombre.toLowerCase().includes(term) ||
          usuario.usuario.toLowerCase().includes(term) ||
          usuario.correo.toLowerCase().includes(term)
        );
      })
    : listaUsuarios;

  const totalRows = listaUsuarios.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Obtener índice del último registro en la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  // Obtener índice del primer registro en la página actual
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // Obtener los registros para la página actual
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  const totalRowsA = listaAsistencia.length;
  const totalPagesA = Math.ceil(totalRowsA / rowsPerPageA);

  // Obtener índice del último registro en la página actual
  const indexOfLastRowA = currentPageA * rowsPerPageA;
  // Obtener índice del primer registro en la página actual
  const indexOfFirstRowA = indexOfLastRowA - rowsPerPageA;
  // Obtener los registros para la página actual
  const currentRowsA = listaAsistencia.slice(indexOfFirstRowA, indexOfLastRowA);

  //Filtro de usuarios

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateA = (pageNumber) => setCurrentPageA(pageNumber);

  const parseDate = (dateString) => {
    const parsedDate = parse(dateString, "yyyy/MM/dd", new Date());
    return parsedDate;
  };

  const formatDateToString = (date) => {
    const formattedDate = format(date, "yyyy/MM/dd");
    return formattedDate;
  };

  const getAssistent = async (usuario) => {
    setVentanaCarga(true);
    const url = `${api}/obtener/asistencia/${
      usuario.idusuario
    }/${selectedDateStart.replaceAll("/", "-")}/${selectedDateEnd.replaceAll(
      "/",
      "-"
    )}`;
    //console.log(url);
    const options = {
      method: "GET",
      cache: "no-cache",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    };
    const data = await fetch(url, options)
      .then((resp) => {
        resp.json();
        setCargando(false);
      })
      .catch((resp) => {
        console.log("Error al ejecutar la consulta: ", resp);
      });
    //console.log(data);
    setListaAsistencia(data);
    setVentanaCarga(false);
    setModalAsistencia(true);
  };

  const getUserAssistance = () => {
    setCargando(true);
    fetch(
      `${api}/obtener/usuarios/asistencia/${selectedDateStart.replaceAll(
        "/",
        "-"
      )}/${selectedDateEnd.replaceAll("/", "-")}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData);
        setListaUsuarios(responseData);
        setCargando(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
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
              Cargando asistencia...
            </h1>
          </div>
        </div>
      )}
      <div className="pb-6">
        <h1 className="pt-2 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">
          Asistencia
        </h1>
        <div className="mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden">
        <h1 className="mt-2 pl-3 text-2xl font-black text-[#245A95]">
          Consulata de asistencia
        </h1>
        <h1 className="pt-2 xl:pt-6 pl-3 mb-6 text-base font-black text-neutral-900">
          <span className="text-[#245A95] text-4xl">1</span> Selecciona el rago de fechas que deseas consultar asistencia 
        </h1>
          <section>
          <div className="mt-6 grid md:grid-cols-2 sm:gap-12">
            <div className="p-inputgroup">
              <span className="p-float-label w-full mb-10">
                <Calendar
                  className="w-1/2 appearance-none focus:outline-none bg-transparent placeholder-gray-900 "
                  value={
                    selectedDateStart ? parseDate(selectedDateStart) : null
                  }
                  placeholder="Fecha de inicio"
                  dateFormat="dd/MM/yy"
                  onChange={(e) => {
                    const formattedDate = formatDateToString(e.value);
                    setSelectedDateStart(formattedDate); // Actualiza la variable de estado con la fecha seleccionada
                  }}
                />
                <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                  <i className="pi pi-file-edit text-white font-light text-xl"></i>
                </span>
                <label
                  htmlFor="nombrealberca"
                  className="lg:text-sm text-xs text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                >
                  Fecha inical
                </label>
              </span>      
            </div>
            <div className="p-inputgroup">
              <span className="p-float-label w-full mb-10">
                <Calendar
                  className="w-1/2 appearance-none focus:outline-none bg-transparent placeholder-gray-900"
                  value={selectedDateEnd ? parseDate(selectedDateEnd) : null}
                  placeholder="Fecha final"
                  dateFormat="dd/MM/yy"
                  onChange={(e) => {
                    const formattedDate = formatDateToString(e.value);
                    setSelectedDateEnd(formattedDate); // Actualiza la variable de estado con la fecha seleccionada
                  }}
                />
                <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                  <i className="pi pi-file-edit text-white font-light text-xl"></i>
                </span>
                <label
                  htmlFor="nombrealberca"
                  className="lg:text-sm text-xs text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                >
                  Fecha final
                </label>
              </span>
            </div> 
          </div>

          {
              selectedDateEnd != null ?  
              <div className="flex justify-center">
                <button
                  type="button"
                  className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                  onClick={getUserAssistance}
                >
                  <i className="pi pi-search text-white font-light text-xl"></i> Consultar
                </button>
              </div>
              : 
              <></>
            }
            {listaUsuarios.length > 0 ? (
                <div className="p-inputgroup md:px-40 lg:px-60 xl:px-80">
                <span className="p-float-label w-full mt-6">
                  <InputText
                    className="w-full appearance-none focus:outline-none bg-transparent"
                    name="perfil"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                    <i className="pi pi-search text-white font-light text-xl"></i>
                  </span>
                  <label
                    htmlFor="nombrealberca"
                    className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                  >
                    Buscar usuario
                  </label>
                </span>
                </div>
              ) : (
                <></>
              )}
          </section>
          <section>
            {listaUsuarios.length == 0 ? (
              <div>
                <h1 className="text-2xl font-bold text-[#245A95] pb-4 mt-6 text-center">
                  Sin registros para este intervalo de fechas
                </h1>
                <div className="text-center">
                  <Player
                    src="https://lottie.host/c1aad2d9-3bf6-4e0b-b6c4-98ded9d781ff/EvaN0zVB0C.json"
                    className="player"
                    loop
                    autoplay
                    style={{ height: "250px", width: "250px" }}
                  />
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md mt-6">
                  <thead className="bg-[#245A95] text-white uppercase">
                    <tr className="text-left">
                      <th scope="col" className="relative px-6 py-3">
                        <div className="items-center pl-12">
                          <span>Nombre</span>
                        </div>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <div className="items-center">
                          <span>Usuario</span>
                        </div>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <div className="items-center">
                          <span>Correo</span>
                        </div>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <div className="items-center">
                          <span>Perfil</span>
                        </div>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <div className="items-center">
                          <span>Estatus</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Array.isArray(currentRows) &&
                      currentRows.map((usuario, index) => (
                        <tr
                          key={index}
                          onClick={async () => {
                            setCargando(true);
                            const url = `${api}/obtener/asistencia/${
                              usuario.idusuario
                            }/${selectedDateStart.replaceAll(
                              "/",
                              "-"
                            )}/${selectedDateEnd.replaceAll("/", "-")}`;
                            //console.log(url);
                            const options = {
                              method: "GET",
                              cache: "no-cache",
                              headers: {
                                "content-type":
                                  "application/json; charset=UTF-8",
                              },
                            };
                            const data = await fetch(url, options)
                              .then((resp) => resp.json())
                              .catch((resp) => {
                                console.log(
                                  "Error al ejecutar la consulta: ",
                                  resp
                                );
                              });
                            //console.log(data);
                            setListaAsistencia(data);
                            setVentanaCarga(false);
                            setModalAsistencia(true);
                            setCargando(false);
                          }}
                          className="cursor-pointer hover:bg-[#E2E2E2]"
                        >
                          <td className="px-6 py-2">
                            <div className="flex items-center">
                              <div className="ml-8">
                                <div className="lg:text-sm text-xs font-medium text-gray-900 cursor-pointer">
                                  {usuario.nombre}
                                </div>
                                {/* <div className="lg:text-sm text-xs text-gray-500">{registro.email}</div> */}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-2">
                            <div className="flex space-x-4">
                              <div className="lg:text-sm text-xs font-medium text-gray-900">
                                {usuario.usuario}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-2">
                            <div className="flex space-x-4">
                              <div className="lg:text-sm text-xs font-medium text-gray-900">
                                {usuario.correo}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-2">
                            <div className="flex space-x-4">
                              <div className="lg:text-sm text-xs font-medium text-gray-900">
                                {usuario.perfile.perfil}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-2">
                            <div className="flex space-x-4">
                              {usuario.status === "ACTIVO" ? (
                                <div className="lg:text-sm text-xs font-medium text-green-600">
                                  <ion-icon name="radio-button-on-outline"></ion-icon>{" "}
                                  {usuario.status}
                                </div>
                              ) : (
                                <div className="lg:text-sm text-xs font-medium text-red-600">
                                  <ion-icon name="radio-button-off-outline"></ion-icon>{" "}
                                  {usuario.status}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-[#245A95] font-bold text-xs lg:text-lg">
                      Filas por página:
                    </span>
                    <select
                      className="border border-gray-300 rounded px-3 py-1"
                      value={rowsPerPage}
                      onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                  <h1 className="text-[#245A95] font-bold text-xs lg:text-lg ml-24">
                    Total de asistencias:
                    <span className="text-gray-700"> {totalRows}</span>
                  </h1>
                  <div className="flex items-center pl-4">
                    <span className="mr-2 text-[#245A95] font-bold text-xs lg:text-lg ml-24">
                      Página{" "}
                      <span className="text-gray-700">{currentPage}</span> de{" "}
                      <span className="text-gray-700">{totalPages}</span>
                    </span>
                    <nav className="relative z-0 inline-flex shadow-sm rounded-md">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-l-md focus:outline-none ${
                          currentPage === 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-white hover:bg-[#245A95]"
                        }`}
                      >
                        <div className="text-[#245A95] hover:text-white">
                          <ion-icon name="caret-back-circle"></ion-icon>
                        </div>
                      </button>
                      <span className="px-3 py-1 bg-gray-300 text-gray-700">
                        {currentPage}
                      </span>
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastRow >= totalRows}
                        className={`px-3 py-1 rounded-r-md focus:outline-none ${
                          indexOfLastRow >= totalRows
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-white hover:bg-[#245A95]"
                        }`}
                      >
                        <div className="text-[#245A95] hover:text-white">
                          <ion-icon name="caret-forward-circle"></ion-icon>
                        </div>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
      <Dialog
        header={`Asistencias`}
        visible={modalAsistencia}
        baseZIndex={-1}
        style={{ width: "90vw", height: "auto", maxWidth: "1000px" }}
        onHide={() => setModalAsistencia(false)}
        className="pt-16"
      >
        {
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-[#245A95] text-white uppercase">
                <tr className="text-left">
                  <th scope="col" className="relative px-6 py-3">
                    <div className="items-center pl-12">
                      <span>Nombre</span>
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <div className="items-center">
                      <span>Usuario</span>
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <div className="items-center">
                      <span>Fecha</span>
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <div className="items-center">
                      <span>Hora de entrada</span>
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <div className="items-center">
                      <span>Hora de salida</span>
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <div className="items-center">
                      <span>Foto</span>
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <div className="items-center">
                      <span>Ubicacion</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentRowsA.map((asistencia, index) => (
                  <tr key={index} className="cursor-pointer hover:bg-[#E2E2E2]">
                    <td className="px-6 py-2">
                      <div className="flex items-center">
                        <div className="ml-8">
                          <div className="lg:text-sm text-xs font-medium text-gray-900 cursor-pointer">
                            {asistencia.usuario.nombre}
                          </div>
                          {/* <div className="lg:text-sm text-xs text-gray-500">{registro.email}</div> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex space-x-4">
                        <div className="lg:text-sm text-xs font-medium text-gray-900">
                          {asistencia.usuario.usuario}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex space-x-4">
                        <div className="lg:text-sm text-xs font-medium text-gray-900">
                          {asistencia.dia}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex space-x-4">
                        <div className="lg:text-sm text-xs font-medium text-gray-900">
                          {asistencia.horaDeEntrada}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex space-x-4">
                        <div className="lg:text-sm text-xs font-medium text-gray-900">
                          {asistencia.horaDeSalida}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex space-x-4 items-center justify-center">
                        <Image
                          src={asistencia.urlFoto}
                          zoomSrc={asistencia.urlFoto}
                          preview
                          pt={{
                            image: { className: "w-15rem" },
                            toolbar: { style: { padding: "5rem" } },
                          }}
                          width="40"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex space-x-4 items-center justify-center">
                        <button
                          onClick={(event) => {
                            const inputString = asistencia.coordenadasFoto;

                            // Buscar el índice del primer paréntesis
                            const startIndex = inputString.indexOf("(");

                            // Buscar el índice de la coma que separa los números
                            const commaIndex = inputString.indexOf(",");

                            // Buscar el índice del último paréntesis
                            const endIndex = inputString.indexOf(")");

                            // Extraer los números de la cadena original usando los índices encontrados
                            const latitude = inputString
                              .substring(startIndex + 1, commaIndex)
                              .trim();
                            const longitude = inputString
                              .substring(commaIndex + 1, endIndex)
                              .trim();

                            window.open(
                              `https://maps.google.com/?q=${latitude},${longitude}`,
                              "_blank"
                            );
                          }}
                          className="w-14 h-14 object-cover active:scale-[.98] py-3 bg-transparent hover:bg-[#245A95] hover:text-white text-[#245A95] text-2xl font-bold inline-block rounded-full bg-primary p-2 uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mt-4"
                        >
                          <i
                            className="pi pi-map-marker"
                            style={{ fontSize: "1.5rem" }}
                          ></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <span className="mr-2 text-[#245A95] font-bold text-lg">
                  Filas por página:
                </span>
                <select
                  className="border border-gray-300 rounded px-3 py-1"
                  value={rowsPerPageA}
                  onChange={(e) => setRowsPerPageA(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
              <h1 className="text-[#245A95] font-bold xl:text-lg text-base">
                Total de asistencias:
                <span className="text-gray-700"> {totalRowsA}</span>
              </h1>
              <div className="flex items-center pl-4">
                <span className="mr-2 text-[#245A95] font-bold text-lg">
                  Página <span className="text-gray-700">{currentPageA}</span>{" "}
                  de <span className="text-gray-700">{totalPagesA}</span>
                </span>
                <nav className="relative z-0 inline-flex shadow-sm rounded-md">
                  <button
                    onClick={() => paginateA(currentPageA - 1)}
                    disabled={currentPageA === 1}
                    className={`px-3 py-1 rounded-l-md focus:outline-none ${
                      currentPageA === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-white hover:bg-[#245A95]"
                    }`}
                  >
                    <div className="text-[#245A95] hover:text-white">
                      <ion-icon name="caret-back-circle"></ion-icon>
                    </div>
                  </button>
                  <span className="px-3 py-1 bg-gray-300 text-gray-700">
                    {currentPageA}
                  </span>
                  <button
                    onClick={() => paginateA(currentPageA + 1)}
                    disabled={indexOfLastRowA >= totalRowsA}
                    className={`px-3 py-1 rounded-r-md focus:outline-none ${
                      indexOfLastRowA >= totalRowsA
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-white hover:bg-[#245A95]"
                    }`}
                  >
                    <div className="text-[#245A95] hover:text-white">
                      <ion-icon name="caret-forward-circle"></ion-icon>
                    </div>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        }
      </Dialog>
    </>
  );
};
