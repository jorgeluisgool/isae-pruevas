import { Checkbox } from 'primereact/checkbox';
import React from 'react'

export const TablaRelacionCatalogo2 = ({searchCatalogo2, listaOpcionesCatalogo2Relacion, checkedItems, setCheckedItems, valoresCatalogoHijo, setValoresCatalogoHijo, setSelectedOption2, selectedOptionIndex2, setSelectedOptionIndex2}) => {

    console.log(valoresCatalogoHijo)

  // Función para manejar cambios en los checkboxes
  const handleCheckboxChange = (catalogoOpcion, indexCatalogo) => {

    // Comprobar si la opción ya está en el arreglo de opciones seleccionadas
    const index = valoresCatalogoHijo?.indexOf(catalogoOpcion);
    if (index === -1) {
      // Si la opción no está en el arreglo, agregarla
      setValoresCatalogoHijo([...(valoresCatalogoHijo || []), catalogoOpcion]);
    } else {
      // Si la opción ya está en el arreglo, quitarla
      const updatedOptions = [...(valoresCatalogoHijo || [])];
      updatedOptions.splice(index, 1);
      setValoresCatalogoHijo(updatedOptions);
    }
    
  };
    // const handleCheckboxChange = (index, catalogoOpcion) => {
    //     setCheckedItems((prevState) => ({
    //     //   ...prevState,
    //       [catalogoOpcion]: !prevState[catalogoOpcion], // Invierte el estado del checkbox en el índice especificado
    //     }));
    //   };
 
   // Filtro para el search
   const filterOpcionesCatalogo2 = listaOpcionesCatalogo2Relacion?.filter((opcion) =>
   opcion.toLowerCase().includes(searchCatalogo2.toLowerCase()) 
  );

  return (
    <>
    <div className="max-h-screen overflow-y-auto shadow-md">
    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
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
            className='cursor-pointer hover:bg-[#E2E2E2]'
          >
            <td className="px-6 text-center"> {/* Centra el contenido horizontalmente */}
              <Checkbox 
                inputId={`checkbox${catalogoOpcion}`} 
                name={`checkbox${index}`} 
                value={catalogoOpcion}
                onChange={() => handleCheckboxChange(catalogoOpcion, index)} 
                checked={valoresCatalogoHijo?.includes(catalogoOpcion)} // Comprueba si la opción está en el arreglo de opciones seleccionadas
              />
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
    </div>
    </>
  )
}


