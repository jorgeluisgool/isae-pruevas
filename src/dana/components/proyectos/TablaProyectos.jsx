import React, { useState } from 'react'

export const TablaProyectos = ({proyectos, searchTerm}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);

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
                className='cursor-pointer hover:bg-[#E2E2E2]'
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
                  <div className="text-sm font-medium text-gray-900">{proyecto.tipoproyecto.descripcion}</div>
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
                    //   onClick={() => handleEliminarOpcion(index)}
                      className="hover:shadow-slate-600 border h-6 w-6 bg-red-700 text-white text-xs xl:text-base font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-red-500"
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
