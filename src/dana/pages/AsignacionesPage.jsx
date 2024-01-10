import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { api } from "../helpers/variablesGlobales";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Player } from "@lottiefiles/react-lottie-player";

export const AsignacionesPage = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [usersProjects, setUsersProjects] = useState([]);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [deleteProject, setDeleteProject] = useState("");
  const [modalAssignment, setModalAssignment] = useState([]);

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
    if (selectedUser != null) {
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
        <div className="mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden">
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
                  onClick={() => assignmentProject(selectedUser.idusuario, selectedProject.idproyecto)}
                >
                  Asignar
                </button>
              </div>
            </div>

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
                    {Array.isArray(usersProjects) &&
                      usersProjects.map((project, index) => (
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
