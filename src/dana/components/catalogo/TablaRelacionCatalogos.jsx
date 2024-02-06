import React from 'react'

export const TablaRelacionCatalogos = ({nuevoArregloOpcionesCatalogo}) => {
  return (
    <>
    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
  <thead className="bg-[#245A95] text-white uppercase">
    <tr className='text-left'>
      <th scope="col" className="px-7 py-2 w-12"> {/* Ancho fijo */}
        <ion-icon name="checkmark-circle"></ion-icon>
      </th>
      <th scope="col" className="px-3 py-2">
        <span>Opciones del catálogo:</span>
      </th>
    </tr>
  </thead>
  <tbody className="w-full divide-y divide-gray-200 max-h-[10rem] overflow-y-auto">
    {nuevoArregloOpcionesCatalogo?.map((catalogoOpcion, index) => (
    <tr 
      key={index} 
      // onClick={(event) => handleTableRowClick(event, registro)}
      className='cursor-pointer hover:bg-[#E2E2E2]'
    >
      <td className="px-6 text-center"> {/* Centra el contenido horizontalmente */}
        <button
          // onClick={() => handleEliminarOpcion(index)}
          className="hover:shadow-slate-600 border border-green-700 h-6 w-6 bg-white text-white hover:text-white text-xs xl:text-base font-bold rounded-full shadow-md duration-150 ease-in-out focus:outline-none active:scale-[1.20] transition-all hover:bg-green-700"
          style={{ borderRadius: '50%' }}
        >
          <ion-icon name="checkmark-circle"></ion-icon>
        </button>
      </td>
      <td className="px-2">
        <div className="text-xs font-medium text-gray-900 overflow-hidden"> {/* Limita el texto y agrega desbordamiento */}
        <span className='text-[#245A95] font-bold '>{index + 1}- </span> {catalogoOpcion}
        </div>
      </td>
    </tr>
    ))} 
  </tbody>
</table>




    </>
  )
}
