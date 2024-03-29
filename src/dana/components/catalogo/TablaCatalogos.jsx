import React from 'react'

export const TablaCatalogos = ({listaCatalogoProyecto, nuevoArregloOpcionesCatalogo, setNuevoArregloOpcionesCatalogo, searchCatalogoAsignacion}) => {
    
  const handleEliminarOpcion = (index) => {
    const nuevoArreglo = [...nuevoArregloOpcionesCatalogo];
    nuevoArreglo.splice(index, 1); // Elimina el elemento en el índice proporcionado
    setNuevoArregloOpcionesCatalogo(nuevoArreglo);
  };

  const filterOpcionesSearchCatalogo = nuevoArregloOpcionesCatalogo.filter((opcion) =>
   opcion.toLowerCase().includes(searchCatalogoAsignacion.toLowerCase()) 
  );

  return (
    <>
      <table className="bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-[#245A95] text-white uppercase">
          <tr className='text-left'>
            <th scope="col" className="relative px-3 py-2">
              <div className="items-center pl-3">
                <span>Opciones del catálogo:</span>
              </div>
            </th>
          </tr>
        </thead>
        <div className="max-h-[10rem] overflow-y-auto">
            <tbody className="w-full block divide-y divide-gray-200">
              {filterOpcionesSearchCatalogo?.map((catalogoOpcion, index) => (
                <tr 
                  key={index} 
                  // onClick={(event) => handleTableRowClick(event, registro)}
                  className='cursor-pointer hover:bg-[#E2E2E2]'
                >
                  <td className="px-6">
                    <div className="flex space-x-4">
                      <div className="text-xs font-medium text-gray-900"><span className='text-[#245A95] font-bold '>{index + 1}-</span> {catalogoOpcion}</div>
                    </div>
                  </td>
                    <td className="pl-6">
                      <div className="flex space-x-4 justify-end">
                        <button
                          type="button"
                          // onClick={() => handleEliminarOpcion(index)}
                          className="hover:shadow-slate-600 border h-6 w-6 bg-orange-600 text-white text-xs xl:text-base font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-orange-500 ml-auto"
                          style={{ borderRadius: '50%' }}
                        >
                          <i className="pi pi-file-edit"></i>
                        </button>
                      </div>
                    </td>
                    <td className="pl-4 pr-4">
                      <div className="flex space-x-4 justify-end">
                        <button
                          type="button"
                          onClick={() => handleEliminarOpcion(index)}
                          className="hover:shadow-slate-600 border h-6 w-6 bg-red-700 text-white text-xs xl:text-base font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-red-500 ml-auto"
                          style={{ borderRadius: '50%' }}
                        >
                          <ion-icon name="trash" className="rounded-full"></ion-icon>
                        </button>
                      </div>
                    </td>
                </tr>
              ))}
            </tbody>
        </div>
      </table>
    </>
  )
}
