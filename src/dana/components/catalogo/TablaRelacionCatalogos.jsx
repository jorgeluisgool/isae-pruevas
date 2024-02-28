import React, { useState } from 'react'
import { Checkbox } from 'primereact/checkbox';
        


export const TablaRelacionCatalogos = ({searchCatalogo1, listaOpcionesCatalogo1Relacion, selectedOptionIndex, setSelectedOptionIndex, setSelectedOption, catalogoRelacion2ProyectoSeleccionado, checkValorSeleccionado}) => {

  const handleOptionClick = (index, catalogoOpcion) => {
    setSelectedOptionIndex(index === selectedOptionIndex ? null : index);
    setSelectedOption(index === selectedOptionIndex ? null : catalogoOpcion);
  };
  
 
   // Filtro para el search
   const filterOpcionesCatalogo2 = listaOpcionesCatalogo1Relacion.filter((opcion) =>
   opcion.toLowerCase().includes(searchCatalogo1.toLowerCase()) 
  );

  return (
    <>
    <div className="max-h-screen overflow-y-auto shadow-md">
    <table className="min-w-ful bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-[#245A95] text-white uppercase">
          <tr className='text-left'>
            <th scope="col" className="px-7 py-2 w-12"> {/* Ancho fijo */}
              <ion-icon name="checkbox"></ion-icon>
            </th>
            <th scope="col" className="px-3 py-2">
              <span>Opciones del catálogo:</span>
            </th>
          </tr>
        </thead>
        <tbody className="w-full divide-y divide-gray-200">
          {filterOpcionesCatalogo2?.map((catalogoOpcion, index) => (
          <tr 
            key={index} 
            // onClick={(event) => handleTableRowClick(event, registro)}
            className={`${catalogoRelacion2ProyectoSeleccionado.length === 0 ? '' : 'cursor-pointer'} hover:bg-[#E2E2E2]`}
          >
            <td className="px-6 text-center"> {/* Centra el contenido horizontalmente */}
              <Checkbox 
                inputId={`option-${index}`}
                checked={index === selectedOptionIndex}
                onChange={() => handleOptionClick(index, catalogoOpcion)}
                disabled={catalogoRelacion2ProyectoSeleccionado.length === 0}
              />
            </td>
            <td className="px-2">
  <div className={`text-xs font-medium ${catalogoRelacion2ProyectoSeleccionado.length === 0 ? 'text-gray-400' : 'text-black'} overflow-hidden`}>
    <span className={`font-bold ${catalogoRelacion2ProyectoSeleccionado.length === 0 ? 'text-gray-400' : 'text-[#245A95]'}`}>
      {index + 1}- 
    </span> 
    {catalogoOpcion}
  </div>
</td>
          </tr>
          ))} 
        </tbody>
      </table>
    </div>
    </>
  )
}
