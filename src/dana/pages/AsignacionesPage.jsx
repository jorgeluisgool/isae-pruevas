import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { api } from "../helpers/variablesGlobales";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Player } from "@lottiefiles/react-lottie-player";

export const AsignacionesPage = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [registers, setRegisters] = useState([]);
  const [userRegisters, setUserRegisters] = useState([]);
  const [projectfields, setProjectFields] = useState([]);
  const [valuesField, setValuesField] = useState([]);
  const [selectedValueField, setSelectedValueField] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [usersProjects, setUsersProjects] = useState([]);
  const [selectedUsersProjects, setSelectedUsersProjects] = useState([]);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [deleteProject, setDeleteProject] = useState("");
  const [modalAssignment, setModalAssignment] = useState(false);
  const [showTable, setShowTable] = useState(false);

  //Pagination Table
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPageA, setCurrentPageA] = useState(1);
  const [rowsPerPageA, setRowsPerPageA] = useState(10);
  const [currentPageB, setCurrentPageB] = useState(1);
  const [rowsPerPageB, setRowsPerPageB] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);

  const totalRows = usersProjects.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Obtener índice del último registro en la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  // Obtener índice del primer registro en la página actual
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // Obtener los registros para la página actual
  const currentRows = usersProjects.slice(indexOfFirstRow, indexOfLastRow);

  const totalRowsA = registers.length;
  const totalPagesA = Math.ceil(totalRowsA / rowsPerPageA);

  // Obtener índice del último registro en la página actual
  const indexOfLastRowA = currentPageA * rowsPerPageA;
  // Obtener índice del primer registro en la página actual
  const indexOfFirstRowA = indexOfLastRowA - rowsPerPageA;
  // Obtener los registros para la página actual
  const currentRowsA = registers.slice(indexOfFirstRowA, indexOfLastRowA);

  const totalRowsB = userRegisters.length;
  const totalPagesB = Math.ceil(totalRows / rowsPerPage);

  // Obtener índice del último registro en la página actual
  const indexOfLastRowB = currentPage * rowsPerPage;
  // Obtener índice del primer registro en la página actual
  const indexOfFirstRowB = indexOfLastRow - rowsPerPage;
  // Obtener los registros para la página actual
  const currentRowsB = userRegisters.slice(indexOfFirstRowB, indexOfLastRowB);

  //Filtro de usuarios

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateA = (pageNumber) => setCurrentPageA(pageNumber);
  const paginateB = (pageNumber) => setCurrentPageB(pageNumber);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    console.log(selectedItems);
  };

  useEffect(() => {
    fetch(`${api}/obtener/usuarios`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setUsers(responseData);
      })
      .catch((error) => console.log(error));

    fetch(`${api}/obtener/proyectos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setProjects(responseData);
      });
  }, []);

  /* useEffect(() =>{

    const filteredProjects = projects.filter(project => !usersProjects.some(userProject => userProject.idproyecto === project.idproyecto));
    setProjects(filteredProjects);

  },[selectedUser]) */

  const getUsersProjects = (id) => {
    if (id != null) {
      fetch(`${api}/obtener/proyectos/asignados/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);

          setUsersProjects(responseData);
        })
        .catch((error) => console.log(error));
    }
  };

  const deleteAssignmentProject = (iduser, idproject) => {
    setModalConfirmar(false);
    setCargando(true);
    fetch(`${api}/eliminar/asignacion/proyecto/${iduser}/${idproject}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        getUsersProjects(iduser);
        setCargando(false);
      })
      .catch((error) => console.log(error));
  };

  const assignmentProject = (iduser, idproject) => {
    if (iduser != null && idproject != null) {
      fetch(`${api}/asignar/proyecto/${iduser}/${idproject}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          getUsersProjects(iduser);
          setModalAssignment(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const getProjectFields = (idproject) => {
    fetch(`${api}/obtener/campos/busqueda/proyecto/${idproject}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setProjectFields(responseData);
      })
      .catch((error) => console.log(error));
  };

  const getFieldValues = (idproject, field) => {
    fetch(`${api}/obtener/datos/busqueda/proyecto/${idproject}/${field}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setValuesField(responseData);
      })
      .catch((error) => console.log(error));
  };

  const getRegistersField = (idproject, value) => {
    fetch(`${api}/obtener/registros/busqueda/${idproject}/${value}`, {
      method: "GET",
      headers: {
        "Content-type": "applicattion/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setRegisters(responseData);
      })
      .catch((error) => console.log(error));
  };

  const getRegisters = (idproject) => {
    fetch(`${api}/obtener/registros/${idproject}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setRegisters(responseData);
      });
  };

  const getUserRegisters = () => {
    fetch(`${api}/`);
  };

  const assignRegisters = (iduser) => {
    console.log(selectedItems);
    fetch(`${api}/asignar/registro/${iduser}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(selectedItems),
    })
      .then((response) => response.json)
      .then((responseData) => console.log(responseData))
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
              Eliminando...
            </h1>
          </div>
        </div>
      )}
      <div className="pb-6">
        <h1 className="pt-2 xl:pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">
          Asignaciones
        </h1>
        <div
          className="mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden"
          onClick={() => setShowTable(true)}
        >
          <h1 className="pt-2 xl:pt-6 pl-3 xl:pl-0 text-2xl font-black text-[#245A95]">
            Asignación de proyectos
          </h1>
          <section>
            <div className="p-inputgroup mt-3 lg:mt-6 grid sm:grid-cols-3 gap-8">
              <div className="">
                <span className="p-float-label w-full mt-2">
                  <Dropdown
                    className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                    name="usuario"
                    options={users}
                    optionLabel="usuario"
                    value={selectedUser}
                    filter
                    onChange={(eve) => {
                      console.log(eve.target.value);

                      setSelectedUser(eve.target.value);
                      getUsersProjects(eve.target.value.idusuario);
                    }}
                  />
                  <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                    <i className="pi pi-file-edit text-white font-light text-xl"></i>
                  </span>
                  <label
                    htmlFor="nombrealberca"
                    className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                  >
                    Usuarios
                  </label>
                </span>
              </div>

              <div className="">
                <span className="p-float-label w-full mt-2">
                  <Dropdown
                    className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                    name="proyecto"
                    options={projects.filter(
                      (project) =>
                        !usersProjects.some(
                          (userProject) =>
                            userProject.idproyecto === project.idproyecto
                        )
                    )}
                    optionLabel="proyecto"
                    value={selectedProject}
                    filter
                    onChange={(eve) => {
                      console.log(eve.target.value);
                      setSelectedProject(eve.target.value);
                    }}
                  />
                  <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                    <i className="pi pi-file-edit text-white font-light text-xl"></i>
                  </span>
                  <label
                    htmlFor="nombrealberca"
                    className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                  >
                    Proyectos
                  </label>
                </span>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="button"
                  className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 rounded-full"
                  onClick={() =>
                    assignmentProject(
                      selectedUser.idusuario,
                      selectedProject.idproyecto
                    )
                  }
                >
                  Asignar
                </button>
              </div>
            </div>
            <div
              className={`transition-opacity duration-500 ${
                showTable ? "opacity-100" : "opacity-0"
              }`}
            >
              {showTable ? (
                <div>
                  <h1>Proyectos asignados</h1>
                  <div class="flex justify-center">
                    <table class="w-full bg-white shadow-md">
                      <thead className="bg-[#245A95] text-white uppercase">
                        <tr className="text-left">
                          <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                              <span>USUARIO</span>
                            </div>
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                              <span>PROYECTO</span>
                            </div>
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                              <span>TIPO DE PROYECTO</span>
                            </div>
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                              <span>FECHA CREACION</span>
                            </div>
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                              <span>ELIMINAR</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {Array.isArray(currentRows) &&
                          currentRows.map((project, index) => (
                            <tr key={index}>
                              <td className="px-6 py-2">
                                <div className="flex items-center">
                                  <div className="ml-8">
                                    <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                                      {selectedUser.usuario}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-2">
                                <div className="flex items-center">
                                  <div className="ml-8">
                                    <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                                      {project.proyecto}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-2">
                                <div className="flex items-center">
                                  <div className="ml-8">
                                    <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                                      {project.tipoproyecto.descripcion}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-2">
                                <div className="flex items-center">
                                  <div className="ml-8">
                                    <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                                      {project.fechacreacion}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-2">
                                <div className="flex items-center">
                                  <div className="ml-8">
                                    <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                                      <Button
                                        icon="pi pi-trash"
                                        className="p-button-rounded p-button-danger"
                                        onClick={() => {
                                          setDeleteProject(project);
                                          setModalConfirmar(true);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
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
              ) : (
                <></>
              )}
            </div>
          </section>
        </div>
        <div
          className="mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden"
          onClick={() => setShowTable(false)}
        >
          <h1 className="pt-2 xl:pt-6 pl-3 xl:pl-0 text-2xl font-black text-[#245A95]">
            Asignación de registros
          </h1>
          <section>
            <div className="p-inputgroup mt-3 lg:mt-6 grid sm:grid-cols-4 gap-8">
              <div className="">
                <span className="p-float-label w-full mt-2">
                  <Dropdown
                    className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                    name="usuario"
                    options={users}
                    optionLabel="usuario"
                    value={selectedUser}
                    filter
                    onChange={(eve) => {
                      console.log(eve.target.value);

                      setSelectedUser(eve.target.value);
                      getUsersProjects(eve.target.value.idusuario);
                    }}
                  />
                  <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                    <i className="pi pi-file-edit text-white font-light text-xl"></i>
                  </span>
                  <label
                    htmlFor="nombrealberca"
                    className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                  >
                    Usuarios
                  </label>
                </span>
              </div>

              <div className="">
                <span className="p-float-label w-full mt-2">
                  <Dropdown
                    className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                    name="proyecto"
                    options={usersProjects}
                    optionLabel="proyecto"
                    value={selectedUsersProjects}
                    filter
                    onChange={(eve) => {
                      console.log(eve.target.value);
                      setSelectedUsersProjects(eve.target.value);
                      getProjectFields(eve.target.value.idproyecto);
                      getRegisters(eve.target.value.idproyecto);
                    }}
                  />
                  <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                    <i className="pi pi-file-edit text-white font-light text-xl"></i>
                  </span>
                  <label
                    htmlFor="nombrealberca"
                    className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                  >
                    Proyectos
                  </label>
                </span>
              </div>

              <div className="">
                <span className="p-float-label w-full mt-2">
                  <Dropdown
                    className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                    name="proyecto"
                    options={projectfields}
                    value={selectedField}
                    filter
                    onChange={(eve) => {
                      console.log(eve.target.value);
                      setSelectedField(eve.target.value);
                      getFieldValues(
                        selectedUsersProjects.idproyecto,
                        eve.target.value
                      );
                    }}
                  />
                  <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                    <i className="pi pi-file-edit text-white font-light text-xl"></i>
                  </span>
                  <label
                    htmlFor="nombrealberca"
                    className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                  >
                    Buscar en el campo:
                  </label>
                </span>
              </div>

              <div className="">
                <span className="p-float-label w-full mt-2">
                  <Dropdown
                    className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                    name="proyecto"
                    options={valuesField}
                    value={selectedValueField}
                    filter
                    onChange={(eve) => {
                      console.log(eve.target.value);
                      setSelectedValueField(eve.target.value);
                    }}
                  />
                  <span className=" bg-[#245A95] p-2 px-3 rounded-r-lg shadow-md">
                    <i className="pi pi-file-edit text-white font-light text-xl"></i>
                  </span>
                  <label
                    htmlFor="nombrealberca"
                    className="text-sm text-[#245A95] font-extrabold absolute top-2 left-3 transition-all duration-300"
                  >
                    Buscar:
                  </label>
                </span>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="button"
                  className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 rounded-full"
                  onClick={() => assignRegisters(selectedUser.idusuario)}
                >
                  Asignar
                </button>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="button"
                  className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 rounded-full"
                  onClick={() =>
                    getRegistersField(
                      selectedUsersProjects.idproyecto,
                      selectedValueField
                    )
                  }
                >
                  Buscar
                </button>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="button"
                  className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600 rounded-full"
                  onClick={() =>
                    getRegistersField(
                      selectedUsersProjects.idproyecto,
                      selectedValueField
                    )
                  }
                >
                  Mostrar todos
                </button>
              </div>
            </div>
            <div
              className={`transition-opacity duration-500 ${
                !showTable ? "opacity-100" : "opacity-0"
              }`}
            >
              {!showTable ? (
                <div>
                  <h1>Registros</h1>
                  <div class="flex justify-center">
                    <table class="w-full bg-white shadow-md">
                      <thead className="bg-[#245A95] text-white uppercase">
                        <tr className="text-left">
                          <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                              <span>seleccionar</span>
                            </div>
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                              <span>FOLIO</span>
                            </div>
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                              <span>FECHA CREACION</span>
                            </div>
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                              <span>ESTATUS</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {Array.isArray(currentRowsA) &&
                          currentRowsA.map((registers, index) => (
                            <tr key={index}>
                              <td className="px-6 py-2">
                                <input
                                  type="checkbox"
                                  checked={selectedItems.includes(
                                    registers.idinventario
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(registers.idinventario)
                                  }
                                />
                              </td>
                              <td className="px-6 py-2">
                                <div className="flex items-center">
                                  <div className="ml-8">
                                    <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                                      {registers.folio}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-2">
                                <div className="flex items-center">
                                  <div className="ml-8">
                                    <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                                      {registers.fechacreacion}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-2">
                                <div className="flex items-center">
                                  <div className="ml-8">
                                    <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                                      {registers.estatus}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <span className="mr-2 text-[#245A95] font-bold text-xs lg:text-lg">
                        Filas por página:
                      </span>
                      <select
                        className="border border-gray-300 rounded px-3 py-1"
                        value={rowsPerPageA}
                        onChange={(e) =>
                          setRowsPerPageA(Number(e.target.value))
                        }
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                      </select>
                    </div>
                    <h1 className="text-[#245A95] font-bold text-xs lg:text-lg ml-24">
                      Total de asistencias:
                      <span className="text-gray-700"> {totalRowsA}</span>
                    </h1>
                    <div className="flex items-center pl-4">
                      <span className="mr-2 text-[#245A95] font-bold text-xs lg:text-lg ml-24">
                        Página{" "}
                        <span className="text-gray-700">{currentPageA}</span> de{" "}
                        <span className="text-gray-700">{totalPagesA}</span>
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
                          {currentPage}
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
              ) : (
                <></>
              )}
            </div>

            <div
              className={`transition-opacity duration-500 ${
                !showTable ? "opacity-100" : "opacity-0"
              }`}
            >
              {!showTable ? (
                <div>
                  <h1>Registros</h1>
                  <div class="flex justify-center">
                    <table class="w-full bg-white shadow-md">
                      <thead className="bg-[#245A95] text-white uppercase">
                        <tr className="text-left">
                          <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                              <span>seleccionar</span>
                            </div>
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                              <span>FOLIO</span>
                            </div>
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                              <span>FECHA CREACION</span>
                            </div>
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <div className="items-center">
                              <span>ESTATUS</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {Array.isArray(currentRowsA) &&
                          currentRowsA.map((registers, index) => (
                            <tr key={index}>
                              <td className="px-6 py-2">
                                <input
                                  type="checkbox"
                                  checked={selectedItems.includes(
                                    registers.idinventario
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(registers.idinventario)
                                  }
                                />
                              </td>
                              <td className="px-6 py-2">
                                <div className="flex items-center">
                                  <div className="ml-8">
                                    <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                                      {registers.folio}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-2">
                                <div className="flex items-center">
                                  <div className="ml-8">
                                    <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                                      {registers.fechacreacion}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-2">
                                <div className="flex items-center">
                                  <div className="ml-8">
                                    <div className="lg:text-sm text-xs text-xs font-medium text-gray-900 cursor-pointer">
                                      {registers.estatus}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <span className="mr-2 text-[#245A95] font-bold text-xs lg:text-lg">
                        Filas por página:
                      </span>
                      <select
                        className="border border-gray-300 rounded px-3 py-1"
                        value={rowsPerPageB}
                        onChange={(e) =>
                          setRowsPerPageA(Number(e.target.value))
                        }
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                      </select>
                    </div>
                    <h1 className="text-[#245A95] font-bold text-xs lg:text-lg ml-24">
                      Total de asistencias:
                      <span className="text-gray-700"> {totalRowsB}</span>
                    </h1>
                    <div className="flex items-center pl-4">
                      <span className="mr-2 text-[#245A95] font-bold text-xs lg:text-lg ml-24">
                        Página{" "}
                        <span className="text-gray-700">{currentPageB}</span> de{" "}
                        <span className="text-gray-700">{totalPagesB}</span>
                      </span>
                      <nav className="relative z-0 inline-flex shadow-sm rounded-md">
                        <button
                          onClick={() => paginateA(currentPageB - 1)}
                          disabled={currentPageB === 1}
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
                          {currentPage}
                        </span>
                        <button
                          onClick={() => paginateA(currentPageB + 1)}
                          disabled={indexOfLastRowB >= totalRowsB}
                          className={`px-3 py-1 rounded-r-md focus:outline-none ${
                            indexOfLastRowB >= totalRowsB
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
              ) : (
                <></>
              )}
            </div>
          </section>
        </div>
      </div>

      <Dialog
        header="MENSAJE"
        visible={modalConfirmar}
        footer={
          <div>
            <Button
              label="Sí"
              icon="pi pi-check"
              onClick={() =>
                deleteAssignmentProject(
                  selectedUser.idusuario,
                  deleteProject.idproyecto
                )
              }
              className="p-button-danger"
            />
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => setModalConfirmar(false)}
              className="p-button-secondary"
            />
          </div>
        }
        style={{
          width: "350px", // Ajusta el ancho del Dialog

          zIndex: 9999, // Asegúrate de que el zIndex sea superior para que se muestre por encima de otros elementos
          borderRadius: "20px", // Agrega bordes redondeados para un aspecto más agradable
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Agrega una sombra para el efecto de elevación
          backgroundColor: "#ffffff", // Ajusta el color de fondo del Dialog
        }}
        onHide={() => setModalConfirmar(false)}
      >
        <div className="text-center">
          <Player
            src="https://lottie.host/70f5786c-4f21-4ac7-9cb1-9784660692bf/8fx4ftXnv8.json"
            className="player"
            loop
            autoplay
            style={{ height: "150px", width: "150px" }}
          />
          <h1 className="text-lg font-bold">
            ¿Desea eliminar la asignacion del proyecto {deleteProject.proyecto}?
          </h1>
        </div>

        <div className="mt-8"></div>
      </Dialog>

      <Dialog
        header="MENSAJE"
        visible={modalAssignment}
        style={{
          // position: 'fixed',
          // top: '20px', // Ajusta la distancia desde la parte superior
          // right: '20px', // Ajusta la distancia desde la parte derecha
          width: "350px", // Ajusta el ancho del Dialog
          // height: '300px',
          zIndex: 9999, // Asegúrate de que el zIndex sea superior para que se muestre por encima de otros elementos
          borderRadius: "20px", // Agrega bordes redondeados para un aspecto más agradable
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Agrega una sombra para el efecto de elevación
          backgroundColor: "#ffffff", // Ajusta el color de fondo del Dialog
        }}
        onHide={() => setModalAssignment(false)}
      >
        <div className="text-center">
          <Player
            src="https://lottie.host/05e47727-2361-4ac4-883f-9fc1199e6b61/WAnbSOkbP0.json"
            className="player"
            loop
            autoplay
            style={{ height: "150px", width: "150px" }}
          />
          <h1 className="text-lg font-bold">Proyecto asignado...</h1>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => setModalAssignment(false)}
            className="hover:shadow-slate-600 border h-7 px-4 bg-[#245A95] text-white text-xs font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
          >
            ACEPTAR
          </button>
        </div>
      </Dialog>
    </>
  );
};
