import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { api } from "../helpers/variablesGlobales";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Player } from "@lottiefiles/react-lottie-player";
import { TableProjects } from "../components/asignaciones/TableProjects";
import { TableRegisters } from "../components/asignaciones/TableRegisters";
import { TableUserRegisters } from "../components/asignaciones/TableUserRegisters";

export const AsignacionesPage = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [registers, setRegisters] = useState([]);
  const [deleteRegister, setDeteleteRegister] = useState([]);
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
  const [modalDeleteRegister, setModalDeleteRegister] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [tables, setTables] = useState(false);
  const [deleteProject, setDeleteProject] = useState("");
  const [modalAssignment, setModalAssignment] = useState(false);
  const [modalAssignmentRegister, setModalAssignmentRegister] = useState(false);
  const [showTable, setShowTable] = useState(false);

  //Pagination Table
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPageA, setCurrentPageA] = useState(1);
  const [rowsPerPageA, setRowsPerPageA] = useState(5);
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

  const registersnotassign = registers.filter(
    (reg) => !userRegisters.includes(reg.folio)
  );

  //const totalRowsA = registers.length;
  const totalRowsA = registersnotassign.length;
  const totalPagesA = Math.ceil(totalRowsA / rowsPerPageA);

  // Obtener índice del último registro en la página actual
  const indexOfLastRowA = currentPageA * rowsPerPageA;
  // Obtener índice del primer registro en la página actual
  const indexOfFirstRowA = indexOfLastRowA - rowsPerPageA;
  // Obtener los registros para la página actual
  //const currentRowsA = registers.slice(indexOfFirstRowA, indexOfLastRowA);
  const currentRowsA = registersnotassign.slice(
    indexOfFirstRowA,
    indexOfLastRowA
  );

  //User Registers

  const arrayFilter = registers.filter((reg) =>
    userRegisters.includes(reg.folio)
  );

  const totalRowsB = arrayFilter.length;
  const totalPagesB = Math.ceil(totalRowsB / rowsPerPageB);

  // Obtener índice del último registro en la página actual
  const indexOfLastRowB = currentPageB * rowsPerPageB;
  // Obtener índice del primer registro en la página actual
  const indexOfFirstRowB = indexOfLastRowB - rowsPerPageB;
  // Obtener los registros para la página actual
  const currentRowsB = arrayFilter.slice(indexOfFirstRowB, indexOfLastRowB);

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

  const getUsersProjects = (id) => {
    setTables(true);
    if (id != null) {
      fetch(`${api}/obtener/proyectos/asignados/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setUsersProjects(responseData);
          setTables(false);
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
        setRegisters(responseData);
      })
      .catch((error) => console.log(error));
  };

  const getRegisters = (idproject) => {
    setTables(true);
    fetch(`${api}/obtener/registros/${idproject}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setRegisters(responseData);
        setTables(false);
      });
  };

  const getUserRegisters = (iduser) => {
    fetch(`${api}/obtener/registros/asignados/${iduser}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setUserRegisters(responseData);
      })
      .catch((error) => console.log(error));
  };

  const assignRegisters = (iduser) => {
    fetch(`${api}/asignar/registro/${iduser}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(selectedItems),
    })
      .then((response) => response.json)
      .then((responseData) => {
        setSelectedItems([]);
        getUserRegisters(iduser);
        setModalAssignmentRegister(true);
      })
      .catch((error) => console.log(error));
  };

  const deleteAssigmentRegister = (iduser, idproject) => {
    fetch(`${api}/eliminar/asignacion/registro/${iduser}/${idproject}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        getUserRegisters(iduser);
        setModalDeleteRegister(false);
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
          <h1 className="mt-2 pl-3 text-2xl font-black text-[#245A95]">
            Asignación de proyectos
          </h1>
          <section>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="p-inputgroup mt-3 lg:mt-6 ">
                <span className="p-float-label w-full mt-2">
                  <Dropdown
                    className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                    name="usuario"
                    options={users}
                    optionLabel="usuario"
                    value={selectedUser}
                    filter
                    onChange={(eve) => {
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

              <div className="p-inputgroup mt-3 lg:mt-6 ">
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

            {tables && showTable ? (
              <div className="flex items-center justify-center flex-col my-12">
                <img
                  src="/src/assets/isae.png"
                  alt="Icono"
                  className="h-40 animate-spin xl:my-0"
                />
                <h1 className="text-lg font-black text-[#245A95] animate-pulse">
                  Cargando tabla
                </h1>
              </div>
            ) : (
              <TableProjects
                showTable={showTable}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                totalPages={totalPages}
                indexOfLastRow={indexOfLastRow}
                setModalConfirmar={setModalConfirmar}
                setDeleteProject={setDeleteProject}
                setRowsPerPage={setRowsPerPage}
                selectedUser={selectedUser}
                currentRows={currentRows}
                currentPage={currentPage}
                paginate={paginate}
              />
            )}
          </section>
        </div>
        <div
          className="mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden"
          onClick={() => setShowTable(false)}
        >
          <h1 className="mt-2 pl-3 text-2xl font-black text-[#245A95]">
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
                      setSelectedUsersProjects(eve.target.value);
                      getProjectFields(eve.target.value.idproyecto);
                      getRegisters(eve.target.value.idproyecto);
                      getUserRegisters(selectedUser.idusuario);
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
            </div>
            <div className="mt-5 lg:mt-6 grid sm:grid-cols-3 gap-8">
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
                  onClick={() => getRegisters(selectedUsersProjects.idproyecto)}
                >
                  Mostrar todos
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
            </div>
            {tables && !showTable ? (
              <div className="flex items-center justify-center flex-col my-12">
                <img
                  src="/src/assets/isae.png"
                  alt="Icono"
                  className="h-40 animate-spin xl:my-0"
                />
                <h1 className="text-lg font-black text-[#245A95] animate-pulse">
                  Cargando tabla
                </h1>
              </div>
            ) : (
              <div className="overflow-x-auto lg:flex ">
                <div className="p-1 mx-auto">
                  <TableRegisters
                    showTable={showTable}
                    rowsPerPageA={rowsPerPageA}
                    totalRowsA={totalRowsA}
                    totalPagesA={totalPagesA}
                    indexOfLastRowA={indexOfLastRowA}
                    setRowsPerPageA={setRowsPerPageA}
                    selectedUser={selectedUser}
                    currentRowsA={currentRowsA}
                    currentPageA={currentPageA}
                    paginateA={paginateA}
                    handleCheckboxChange={handleCheckboxChange}
                    selectedItems={selectedItems}
                  />
                </div>
                <div className="p-1 mx-auto">
                  <TableUserRegisters
                    showTable={showTable}
                    rowsPerPageB={rowsPerPageB}
                    totalRowsB={totalRowsB}
                    totalPagesB={totalPagesB}
                    indexOfLastRowA={indexOfLastRowB}
                    setRowsPerPageB={setRowsPerPageB}
                    currentRowsB={currentRowsB}
                    currentPageB={currentPageB}
                    paginateB={paginateB}
                    setDeteleteRegister={setDeteleteRegister}
                    setModalDeleteRegister={setModalDeleteRegister}
                  />
                </div>
              </div>
            )}
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
        visible={modalDeleteRegister}
        footer={
          <div>
            <Button
              label="Sí"
              icon="pi pi-check"
              onClick={() =>
                deleteAssigmentRegister(
                  selectedUser.idusuario,
                  deleteRegister.idinventario
                  //deleteProject.idproyecto
                )
              }
              className="p-button-danger"
            />
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => setModalDeleteRegister(false)}
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
        onHide={() => setModalDeleteRegister(false)}
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
            ¿Desea eliminar la asignacion del registro {deleteRegister.folio}?
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

      <Dialog
        header="MENSAJE"
        visible={modalAssignmentRegister}
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
        onHide={() => setModalAssignmentRegister(false)}
      >
        <div className="text-center">
          <Player
            src="https://lottie.host/05e47727-2361-4ac4-883f-9fc1199e6b61/WAnbSOkbP0.json"
            className="player"
            loop
            autoplay
            style={{ height: "150px", width: "150px" }}
          />
          <h1 className="text-lg font-bold">Registros asignados...</h1>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => setModalAssignmentRegister(false)}
            className="hover:shadow-slate-600 border h-7 px-4 bg-[#245A95] text-white text-xs font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
          >
            ACEPTAR
          </button>
        </div>
      </Dialog>
    </>
  );
};
