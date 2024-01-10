import { Formik, Form, Field } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { parse, format, isValid, parseISO } from "date-fns";
import { Image } from "primereact/image";
import { Calendar } from "primereact/calendar";
import { api } from "../helpers/variablesGlobales";
import useAuth from "../hooks/useAuth";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export const AsistenciaPage = () => {
  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);

  const { setUserAuth } = useAuth();

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaAsistencia, setListaAsistencia] = useState([]);
  const toast = useRef(null);
  const [ventanaCarga, setVentanaCarga] = useState(false);
  const [modalAsistencia, setModalAsistencia] = useState(false);
  const [sedeSeleccionada, setSedeSeleccionada] = useState({});

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

  useEffect(() => {}, []);

  const getUserAssistance = () => {
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
        console.log(responseData);
        setListaUsuarios(responseData);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div>
        <section>
          <Formik
            initialValues={{
              startDate: selectedDateStart,
              endDate: selectedDateEnd,
            }}
            onSubmit={(values) => {
              console.log(values);
              getUserAssistance();
            }}
          >
            {() => (
              <Form>
                <div className="xl:flex flex-row  gap-4 p-4 justify-center items-center">
                  <div className="flex-1 flex justify-center mb-5 xl:mb-0">
                    <div className=" bg-[#245A95]	rounded-l-lg w-40 justify-center items-center">
                      <label className="text-sm font-semibold text-white mb-1 mr-3 ml-3 mt-3 block flex justify-center ">
                        Fecha de inicio
                      </label>
                    </div>
                    <Field name="startDate">
                      {({ field, form }) => (
                        <Calendar
                          className="w-1/2 appearance-none focus:outline-none bg-transparent placeholder-gray-900"
                          value={
                            selectedDateStart
                              ? parseDate(selectedDateStart)
                              : null
                          }
                          placeholder="Fecha de inicio"
                          dateFormat="dd/MM/yy"
                          onChange={(e) => {
                            const formattedDate = formatDateToString(e.value);
                            setSelectedDateStart(formattedDate); // Actualiza la variable de estado con la fecha seleccionada
                            form.setFieldValue(field.name, formattedDate); // Aquí asumo que tienes la variable 'form' disponible en el scope de tu componente
                          }}
                        />
                      )}
                    </Field>
                  </div>

                  <div className="flex-1 flex justify-center mb-5 md:mb-0">
                    <div className=" bg-[#245A95]	rounded-l-lg w-40 justify-center items-center">
                      <label className="text-sm font-semibold text-white mb-1 mr-3 ml-3 mt-3 block flex justify-center ">
                        Fecha final
                      </label>
                    </div>
                    <Field name="endDate">
                      {({ field, form }) => (
                        <Calendar
                          className="w-1/2 appearance-none focus:outline-none bg-transparent placeholder-gray-900"
                          value={
                            selectedDateEnd ? parseDate(selectedDateEnd) : null
                          }
                          placeholder="Fecha final"
                          dateFormat="dd/MM/yy"
                          onChange={(e) => {
                            const formattedDate = formatDateToString(e.value);
                            setSelectedDateEnd(formattedDate); // Actualiza la variable de estado con la fecha seleccionada
                            form.setFieldValue(field.name, formattedDate); // Aquí asumo que tienes la variable 'form' disponible en el scope de tu componente
                          }}
                        />
                      )}
                    </Field>
                  </div>
                  {listaUsuarios.length > 0 ? (
                    <div className="flex-1 flex justify-center mb-5 md:mb-0">
                      <div className=" bg-[#245A95]	rounded-l-lg w-40 justify-center items-center">
                        <label className="text-sm font-semibold text-white mb-1 mr-3 ml-3 mt-3 block flex justify-center ">
                          Buscar usuario
                        </label>
                      </div>
                      <Field
                        as={InputText}
                        className="w-1/2 appearance-none focus:outline-none bg-transparent"
                        name="searchTerm"
                        placeholder="Buscar usuario..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                  >
                    Buscar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
        <section>
          {listaUsuarios.length == 0 ? (
            <h1 className="text-2xl font-bold text-[#245A95] pb-4 mt-6">
              Sin registros para este intervalo de fechas
            </h1>
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
                          console.log(usuario);

                          setVentanaCarga(true);
                          const url = `${api}/obtener/asistencia/${
                            usuario.idusuario
                          }/${selectedDateStart.replaceAll(
                            "/",
                            "-"
                          )}/${selectedDateEnd.replaceAll("/", "-")}`;
                          console.log(url);
                          const options = {
                            method: "GET",
                            cache: "no-cache",
                            headers: {
                              "content-type": "application/json; charset=UTF-8",
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
                          console.log(data);
                          setListaAsistencia(data);
                          setVentanaCarga(false);

                          setModalAsistencia(true);
                        }}
                        className="cursor-pointer hover:bg-[#E2E2E2]"
                      >
                        <td className="px-6 py-2">
                          <div className="flex items-center">
                            <div className="ml-8">
                              <div className="text-sm font-medium text-gray-900 cursor-pointer">
                                {usuario.nombre}
                              </div>
                              {/* <div className="text-sm text-gray-500">{registro.email}</div> */}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex space-x-4">
                            <div className="text-sm font-medium text-gray-900">
                              {usuario.usuario}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex space-x-4">
                            <div className="text-sm font-medium text-gray-900">
                              {usuario.correo}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex space-x-4">
                            <div className="text-sm font-medium text-gray-900">
                              {usuario.perfile.perfil}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex space-x-4">
                            {usuario.status === "ACTIVO" ? (
                              <div className="text-sm font-medium text-green-600">
                                <ion-icon name="radio-button-on-outline"></ion-icon>{" "}
                                {usuario.status}
                              </div>
                            ) : (
                              <div className="text-sm font-medium text-red-600">
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
                  <span className="mr-2 text-[#245A95] font-bold text-lg">
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
                <h1 className="text-[#245A95] font-bold text-lg">
                  Total de asistencias:
                  <span className="text-gray-700"> {totalRows}</span>
                </h1>
                <div className="flex items-center pl-4">
                  <span className="mr-2 text-[#245A95] font-bold text-lg">
                    Página <span className="text-gray-700">{currentPage}</span>{" "}
                    de <span className="text-gray-700">{totalPages}</span>
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

      <Dialog
        header={`Asistencias`}
        visible={modalAsistencia}
        baseZIndex={-1}
        style={{ width: "90vw", height: "auto", maxWidth: "1000px" }}
        onHide={() => setModalAsistencia(false)}
        className="pt-16"
      >
        {
          <div>
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
                          <div className="text-sm font-medium text-gray-900 cursor-pointer">
                            {asistencia.usuario.nombre}
                          </div>
                          {/* <div className="text-sm text-gray-500">{registro.email}</div> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex space-x-4">
                        <div className="text-sm font-medium text-gray-900">
                          {asistencia.usuario.usuario}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex space-x-4">
                        <div className="text-sm font-medium text-gray-900">
                          {asistencia.dia}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex space-x-4">
                        <div className="text-sm font-medium text-gray-900">
                          {asistencia.horaDeEntrada}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex space-x-4">
                        <div className="text-sm font-medium text-gray-900">
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
              <h1 className="text-[#245A95] font-bold text-lg">
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
