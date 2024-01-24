import { useEffect, useState } from "react";
import { api } from "../helpers/variablesGlobales";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Form, Formik } from "formik";
import { ComponentTipoCampo } from "../components/ComponentTipoCampo";
import { DialogConfirmacion } from "../../ui/components/DialogConfirmacion";
import useAuth from "../hooks/useAuth";
import { newRegister, updateRegister } from "../components/functions/Functions";
import { ComponentTipoCampoDashboard } from "../components/dashboard/ComponentTIpoCampoDashboard";

export const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [modalAceptarAbrirCerrar, setModaAceptarlAbrirCerrar] = useState(false);
  const [showAcordion, setShowAcordion] = useState(null);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState([]);
  const [dataProyectoSeleccionado, setDataProyectoSeleccionado] = useState([]);
  const [modalAbrirCerrar, setModalAbrirCerrar] = useState([]);
  const [files, setFiles] = useState([]);
  const [signatures, setSignatures] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [idCampo, setIdCampo] = useState([]);
  const [ventanaCarga, setVentanaCarga] = useState(false);

  const { clienteSeleccionado, setUserAuth, userAuth } = useAuth();

  const toggleShow = (index) => {
    if (index === showAcordion) {
      setShowAcordion(null);
    } else {
      setShowAcordion(index);
    }
  };

  const handleMensajeAceptar = (values) => {
    setVentanaCarga(true);
    setModaAceptarlAbrirCerrar(false);
    const newData = { ...dataProyectoSeleccionado };
    newData.listaAgrupaciones.forEach((agrupacion) => {
      agrupacion.campos.forEach((campo) => {
        if (values.hasOwnProperty(campo.nombreCampo)) {
          campo.valor = values[campo.nombreCampo];
        }
      });
    });

    //console.log(newData);

    // Suponiendo que tienes dataProyectoSeleccionado y deseas filtrar los campos válidos duplicados
    const arregloDuplicidad = newData.listaAgrupaciones.flatMap((agrupacion) =>
      agrupacion.campos.filter((item) => item.validarduplicidad === "TRUE")
    );

    fetch(
      `${api}/validar/valores/duplicados/${proyectoSeleccionado.proyecto.idproyecto}/${proyectoSeleccionado.idinventario}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arregloDuplicidad),
      }
    )
      .then((response) => response.text())
      .then(async (responseData) => {
        // Lógica adicional después de enviar los datos a la API
        // console.log('Respuesta de la API:', responseData);

        if (responseData != "SIN DUPLICADOS") {
          setModalMensajeDuplicidad(true);
          setDataMensajeDuplicidad(responseData);
        } else {
          const dataColeccion = {
            ind: 0,
            inventario: proyectoSeleccionado,
            usuario: userAuth[0],
            estatus: proyectoSeleccionado.estatus,
            listaAgrupaciones: newData.listaAgrupaciones,
            evidencias: files,
            firmas: signatures,
            fotos: photos,
          };

          if (dataColeccion.inventario.idinventario === 0) {
            
            setVentanaCarga(newRegister(dataColeccion, proyectoSeleccionado));
          } else {
            if (updateRegister(dataColeccion, proyectoSeleccionado)) {
              setVentanaCarga(false);
              setModalAbrirCerrar(false);
              setModalRegistroGuardado(true);
              setdataMensajeRegistroGuardado("Datos guardados");
              setSignatures([]);
            } else {
              console.log("todo no ok");
              setModalRegistroGuardado();
              setdataMensajeRegistroGuardado("Datos no guardados");
            }
          }
        }
      })
      .catch((error) => console.log(error));
      
  };

  const handleDataProyecto = () => {
    console.log(selectedProject)
    const data = {
      idproyecto: selectedProject.idproyecto,
      proyecto: selectedProject.proyecto,
      descripcion: selectedProject.tipoproyecto.descripcion,
      fechacreacion: selectedProject.fechacreacion,
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
      proyecto: selectedProject,
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
        setProyectoSeleccionado(newProject);
        setDataProyectoSeleccionado(responseData);
        setModalAbrirCerrar(true);
      })
      .catch((error) => console.log(error));
      
  };

  const getProjects = () => {
    fetch(`${api}/obtener/proyectos/dashboard`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setProjects(responseData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div className="pb-6">
        <h1 className="pt-2 xl:pt-6 pl-3 xl:pl-20 text-4xl font-black text-[#245A95]">
          DASHBOARD
        </h1>
        <div className="mx-4 xl:mx-20 my-4 px-4 py-2 shadow-md bg-white rounded-lg overflow-hidden">
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="p-inputgroup mt-3 lg:mt-6 ">
              <span className="p-float-label w-full mt-2">
                <Dropdown
                  className="w-full appearance-none focus:outline-none bg-transparent border-b-2 border-[#245A95] text-gray-700 transition-all duration-300 focus:border-[#245A95]"
                  name="proyecto"
                  options={projects}
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
                  handleDataProyecto()
                }
              >
                Crear asignacion
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        header={`PROYECTO: ${proyectoSeleccionado?.proyecto?.proyecto}`}
        visible={modalAbrirCerrar}
        baseZIndex={-1}
        style={{
          width: "90vw",
          maxWidth: "800px",
          height: "80vh",
          maxHeight: "600px",
        }}
        onHide={() => setModalAbrirCerrar(false)}
        className="mt-16"
      >
        
        <h1 className="xl:text-lg font-bold xl:mx-36">
          Registro:{" "}
          {proyectoSeleccionado ? proyectoSeleccionado.folio : "Cargando..."}
        </h1>
        <Formik initialValues={{}} onSubmit={handleMensajeAceptar}>
          {({ values }) => (
            <Form>
              {dataProyectoSeleccionado.listaAgrupaciones &&
                dataProyectoSeleccionado.listaAgrupaciones.length > 0 &&
                dataProyectoSeleccionado.listaAgrupaciones.map(
                  (itemagrupacion, indexAgrupacion) => (
                    
                    <div
                      key={indexAgrupacion}
                      className="bg-[#e2e2e2] rounded-md hs-accordion mt-4 xl:mx-36"
                    >
                      
                      <div
                        className="bg-[#245A95] flex items-center justify-around rounded-md cursor-pointer shadow-slate-900 shadow-md"
                        onClick={() => toggleShow(indexAgrupacion)}
                      >
                        <div
                          // onClick={() => toggleShow(index)}
                          className="rounded p-4 hs-accordion-toggle hs-accordion-active:text-blue-600 py-1 inline-flex items-center gap-x-2 w-full font-black text-left text-white xl:text-xl sm:text-sm transition hover:text-gray-300 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
                          aria-controls="hs-basic-nested-sub-collapse-one"
                        >
                          <div
                            className={`text-2xl text-white p-2 right-12 transform transition duration-300 ease-in-out ${
                              showAcordion === indexAgrupacion
                                ? "rotate-180"
                                : ""
                            }`}
                          >
                            <ion-icon name="chevron-down"></ion-icon>
                          </div>
                          {itemagrupacion.agrupacion}
                        </div>
                        <div className="pr-10"></div>
                      </div>
                      {showAcordion === indexAgrupacion && (
                        <div className="px-2 xl:px-10 py-3">
                          {itemagrupacion.campos.map((item, indexCampo) => (
                            <div key={item.idCampo} className="mt-3">
                              <span className="p-float-label">
                                <div className="grid xl:grid-cols-5 sm:grid-cols-1 ">
                                  <div className="col-span-2">
                                    <p className="text-sm text-[#245A95] font-semibold xl:text-right sm:text-left pr-5">
                                      {item.nombreCampo}:
                                    </p>
                                  </div>
                                  <div className="col-span-3">
                                    <ComponentTipoCampoDashboard
                                      dataProyectoSeleccionado={
                                        dataProyectoSeleccionado
                                      }
                                      itemagrupacion={itemagrupacion}
                                      campo={item}
                                      indexAgrupacion={indexAgrupacion}
                                      indexCampo={indexCampo}
                                      setFiles={setFiles}
                                      setIdCampo={setIdCampo}
                                      files={files}
                                      signatures={signatures}
                                      setSignatures={setSignatures}
                                      photos={photos}
                                      setPhotos={setPhotos}
                                    />
                                  </div>
                                </div>
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                )}
              <div className="cursor-pointer absolute inset-x-0 bottom-4 left-4 flex gap-3">
                <button
                  type="button"
                  className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                  onClick={() => {
                    setModaAceptarlAbrirCerrar(true);
                  }}
                >
                  Aceptar
                </button>
                <button
                  className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                  onClick={() => {
                    setSignatures([]);
                    setModalAbrirCerrar(false);
                  }}
                  type="button"
                >
                  Cancelar
                </button>

                <div className="flex ml-auto pr-8">
                  <button
                    type="button"
                    className="hover:shadow-slate-600 border h-10 px-4 bg-[#245A95] text-white text-lg font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-600"
                    onClick={() => setModalHistorialAbrirCerrar(true)}
                  >
                    <i className="pi pi-history"></i>
                  </button>
                </div>
              </div>
              <DialogConfirmacion
                handleMensajeAceptar={handleMensajeAceptar}
                modaAceptarlAbrirCerrar={modalAceptarAbrirCerrar}
                setModaAceptarlAbrirCerrar={setModaAceptarlAbrirCerrar}
              />
            </Form>
          )}
        </Formik>
      </Dialog>


                
    </>
  );
};
