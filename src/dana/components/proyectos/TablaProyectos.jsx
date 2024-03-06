import React, { useState } from 'react'
import { api } from '../../helpers/variablesGlobales';
import * as XLSX from "xlsx"

export const TablaProyectos = ({proyectos, searchTerm, setModalBase, setProyectoSeleccionado}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);
    const [ventanaCarga, setVentanaCarga] = useState(false);

    // Filtro para el search
    const filterUsuarios = proyectos.filter((proyecto) =>
        proyecto.proyecto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proyecto.fechacreacion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRows = filterUsuarios.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Obtener índice del último registro en la página actual
    const indexOfLastRow = currentPage * rowsPerPage;
    // Obtener índice del primer registro en la página actual
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    // Obtener los registros para la página actual
    const currentRows = filterUsuarios.slice(indexOfFirstRow, indexOfLastRow);

    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
     {ventanaCarga && (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex items-center transition duration-500 ease-in-out">
          <span className="hover:text-gray-400 duration-500 text-3xl text-slate-50">
            <img src="/src/assets/isae.png" alt="Icono" className="h-20 xl:h-40 mr-1 animate-spin"/>
          </span>
          <img src="/src/assets/letras_isae.png" alt="Icono" className="h-20 xl:h-40 mr-2" />
        </div>
        <div className='fixed pt-36 xl:pt-60'>
        <h1 className='text-[#C41420] text-4xl font-black animate-pulse'>Descargando Plantilla...</h1>
        </div>
      </div>
    )}
    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-[#245A95] text-white uppercase">
            <tr className='text-left'>
              <th scope="col" className="relative px-6 py-3 flex">
                <div className="items-center pl-12">
                  <span>Proyecto</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center">
                  <span>Descripción</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center">
                  <span>Fecha</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center">
                  <span> Plantilla</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center">
                  <span>Subir base</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center">
                  <span>Eliminar</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200" >
            {currentRows.map((proyecto, index) => (
              <tr 
                key={index} 
                // onClick={() => {
                //   //Click para mostrar informacion del usuario
                //   setUsuarioSeleccionado(registro);
                //   setFormularioState(true);
                // }}
                className='hover:bg-[#E2E2E2]'
              >
                <td className="px-6">
                  <div className="flex items-center">
                    <div className="ml-8">
                      <div className="text-sm font-medium text-gray-900 cursor-pointer">{proyecto.proyecto}</div>
                      {/* <div className="text-sm text-gray-500">{registro.email}</div> */}
                    </div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{proyecto?.tipoproyecto.descripcion}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{proyecto.fechacreacion}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4 justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setProyectoSeleccionado(proyecto);
                        setVentanaCarga(true);
                        fetch(
                          `${api}/obtener/datos/nuevo/registro`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(proyecto),
                          }
                        )
                          .then((response) => response.json())
                          .then((responseData) => {
                            console.log(responseData);
                    
                            const nombresCampos = responseData.listaAgrupaciones.flatMap((agrupacion) => {
                              return agrupacion.campos.map((campo) => campo.nombreCampo);
                            });
                    
                            console.log(nombresCampos);
                    
                            // Crear una matriz de datos en formato de hoja de cálculo
                            const datosParaExcel = [nombresCampos];
                    
                            responseData.listaAgrupaciones.forEach((agrupacion) => {
                              agrupacion.campos.forEach((campo) => {
                                datosParaExcel.push([campo.valor || '']);
                              });
                            });
                    
                            // Crear el contenido de un archivo Excel en formato CSV
                            const csvContent = datosParaExcel.map(row => row.join(',')).join('\n');
                            
                            // Crear un Blob a partir del contenido CSV
                            const blob = new Blob([csvContent], { type: 'text/csv' });
                    
                            // Concatenar el nombre del archivo con el texto deseado y el nombre del proyecto
                            const nombreArchivo = `PlantillaDatosProyecto-${proyecto.proyecto}.csv`;
                    
                            // Crear un objeto URL para el blob
                            const url = URL.createObjectURL(blob);
                    
                            // Crear un enlace de descarga
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = nombreArchivo; // nombre del archivo CSV
                    
                            // Agregar el enlace al documento y hacer clic para iniciar la descarga
                            document.body.appendChild(link);
                            link.click();
                    
                            // Limpiar el objeto URL y el enlace después de la descarga
                            URL.revokeObjectURL(url);
                            document.body.removeChild(link);

                            setVentanaCarga(false);
                          })
                          .catch((error) => {
                            setVentanaCarga(false);
                            console.log(error);
                          });
                      }}
                      className="hover:shadow-slate-600 hover:border
                      
                       h-8 w-8 bg-[#245A95] text-white text-xl font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-900"
                      style={{ borderRadius: '50%' }}
                    >
                      <ion-icon name="document-text" className="rounded-full"></ion-icon>
                    </button>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4 justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setModalBase(true);
                        setProyectoSeleccionado(proyecto);
                      }}
                      className="hover:shadow-slate-600 hover:border h-8 w-8 sm:h-8 sm:w-8 bg-[#245A95] text-white text-xl font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-sky-900"
                      style={{ borderRadius: '50%' }}
                    >
                      <ion-icon name="push" className="rounded-full"></ion-icon>
                    </button>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4 justify-center">
                    <button
                      type="button"
                    //   onClick={() => handleEliminarOpcion(index)}
                      className="hover:shadow-slate-600 hover:border h-8 w-8 bg-red-700 text-white text-xl font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-red-900"
                      style={{ borderRadius: '50%' }}
                    >
                      <ion-icon name="trash" className="rounded-full"></ion-icon>
                    </button>
                  </div>
                </td>
              </tr>
             ))}
          </tbody>
        </table>
        {/* PAGINATOR */}
        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
                <span className="mr-2 text-[#245A95] font-bold text-xs lg:text-lg">Filas por página:</span>
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
            <h1 className='text-[#245A95] font-bold text-xs lg:text-lg ml-24'>
                Total de registros:
                <span className='text-gray-700'> {totalRows}</span>
            </h1>
            <div className="flex items-center">
                <span className="mr-2 text-[#245A95] font-bold text-xs lg:text-lg ml-24">
                    Página <span className='text-gray-700'>{currentPage}</span> de <span className='text-gray-700'>{totalPages}</span>
                </span>
                <nav className="relative z-0 inline-flex shadow-sm rounded-md">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-l-md focus:outline-none ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-[#245A95]'
                            }`}
                    >
                        <div className='text-[#245A95] hover:text-white'>
                            <ion-icon name="caret-back-circle"></ion-icon>
                        </div>
                    </button>
                    <span className="px-3 py-1 bg-gray-300 text-gray-700">{currentPage}</span>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastRow >= totalRows}
                        className={`px-3 py-1 rounded-r-md focus:outline-none ${indexOfLastRow >= totalRows ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-[#245A95]'
                            }`}
                    >
                        <div className='text-[#245A95] hover:text-white'>
                            <ion-icon name="caret-forward-circle"></ion-icon>
                        </div>
                    </button>
                </nav>
            </div>
        </div>
    </>
  )
}














// {
//   "respuestaCheckBoxEvidencia": [],
//   "listaAgrupaciones": [
//       {
//           "idAgrupacion": 26,
//           "agrupacion": "DATOS DEL REGISTRO",
//           "idInventario": 0,
//           "campos": [
//               {
//                   "idCampo": 3944,
//                   "agrupacion": "DATOS DEL REGISTRO",
//                   "nombreCampo": "FOLIO",
//                   "validarduplicidad": "FALSE",
//                   "tipoCampo": "ALFANUMERICO",
//                   "restriccion": "[N/A]",
//                   "editable": "TRUE",
//                   "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
//                   "longitud": 10,
//                   "valor": null,
//                   "pordefecto": ""
//               }
//           ]
//       },
//       {
//           "idAgrupacion": 28,
//           "agrupacion": "DATOS GENERALES",
//           "idInventario": 0,
//           "campos": [
//               {
//                   "idCampo": 3945,
//                   "agrupacion": "DATOS GENERALES",
//                   "nombreCampo": "ID",
//                   "validarduplicidad": "FALSE",
//                   "tipoCampo": "ALFANUMERICO",
//                   "restriccion": "[N/A]",
//                   "editable": "TRUE",
//                   "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
//                   "longitud": 100,
//                   "valor": null,
//                   "pordefecto": ""
//               }
//           ]
//       },
//       {
//           "idAgrupacion": 112,
//           "agrupacion": "DATOS CLIENTE",
//           "idInventario": 0,
//           "campos": [
//               {
//                   "idCampo": 3946,
//                   "agrupacion": "DATOS CLIENTE",
//                   "nombreCampo": "NOMBRE",
//                   "validarduplicidad": "FALSE",
//                   "tipoCampo": "ALFANUMERICO",
//                   "restriccion": "[N/A]",
//                   "editable": "TRUE",
//                   "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
//                   "longitud": 100,
//                   "valor": null,
//                   "pordefecto": ""
//               },
//               {
//                   "idCampo": 3947,
//                   "agrupacion": "DATOS CLIENTE",
//                   "nombreCampo": "UNIDAD",
//                   "validarduplicidad": "FALSE",
//                   "tipoCampo": "CATALOGO",
//                   "restriccion": "[N/A]",
//                   "editable": "TRUE",
//                   "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
//                   "longitud": 100,
//                   "valor": null,
//                   "pordefecto": ""
//               },
//               {
//                   "idCampo": 3948,
//                   "agrupacion": "DATOS CLIENTE",
//                   "nombreCampo": "TELEFONO",
//                   "validarduplicidad": "FALSE",
//                   "tipoCampo": "NUMERICO",
//                   "restriccion": "[N/A]",
//                   "editable": "TRUE",
//                   "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
//                   "longitud": 20,
//                   "valor": null,
//                   "pordefecto": ""
//               },
//               {
//                   "idCampo": 3949,
//                   "agrupacion": "DATOS CLIENTE",
//                   "nombreCampo": "E-MAIL",
//                   "validarduplicidad": "FALSE",
//                   "tipoCampo": "ALFANUMERICO",
//                   "restriccion": "[N/A]",
//                   "editable": "TRUE",
//                   "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
//                   "longitud": 100,
//                   "valor": null,
//                   "pordefecto": ""
//               },
//               {
//                   "idCampo": 3950,
//                   "agrupacion": "DATOS CLIENTE",
//                   "nombreCampo": "CONTACTO",
//                   "validarduplicidad": "FALSE",
//                   "tipoCampo": "ALFANUMERICO",
//                   "restriccion": "[N/A]",
//                   "editable": "TRUE",
//                   "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
//                   "longitud": 100,
//                   "valor": null,
//                   "pordefecto": ""
//               },
//               {
//                   "idCampo": 3951,
//                   "agrupacion": "DATOS CLIENTE",
//                   "nombreCampo": "DIRECCION",
//                   "validarduplicidad": "FALSE",
//                   "tipoCampo": "ALFANUMERICO",
//                   "restriccion": "[N/A]",
//                   "editable": "TRUE",
//                   "alerta": "INSERTA LOS DATOS SOLICITADOS EN EL CAMPO",
//                   "longitud": 800,
//                   "valor": null,
//                   "pordefecto": ""
//               }
//           ]
//       },
//   ]
// }