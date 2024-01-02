import React, { useState } from 'react'
import { useFetchUsers } from '../../hooks/useFetchUsers';

export const TablaUsuarios = ({searchTerm}) => {

    const { data: listaUsuarios, loading: loadingUsuarios } = useFetchUsers();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);

    // Filtro para el search
    const filterUsuarios = listaUsuarios.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.usuario.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRows = listaUsuarios.length;
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
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center pl-12">
                  <span>id</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center">
                  <span>Nombre</span>
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <div className="items-center">
                  <span>Usuario</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200" >
            {currentRows.map((registro, index) => (
              <tr 
                // key={index} 
                // onClick={(event) => handleTableRowClick(event, registro)}
                
                className='cursor-pointer hover:bg-[#E2E2E2]'
              >
                <td className="px-6">
                  <div className="flex items-center">
                    {/* <div className="flex-shrink-0 h-4 w-4">
                      <input
                        type="checkbox"
                        className=" top-3 left-3 p-2"
                        checked={isSelected(index)}
                        onChange={() => onSelectedRow(index)}
                      />
                    </div> */}
                    {/* <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://firebasestorage.googleapis.com/v0/b/isae-de6da.appspot.com/o/Sesion%2FUsuarios%2Febdicentral%2F1493-ebdicentral.png?alt=media&token=1493-ebdicentral.png.png"
                        alt=""
                      />
                    </div> */}
                    <div className="ml-8">
                      <div className="text-sm font-medium text-gray-900 cursor-pointer">{registro.idusuario}</div>
                      {/* <div className="text-sm text-gray-500">{registro.email}</div> */}
                    </div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{registro.nombre}</div>
                  </div>
                </td>
                <td className="px-6">
                  <div className="flex space-x-4">
                  <div className="text-sm font-medium text-gray-900">{registro.usuario}</div>
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
