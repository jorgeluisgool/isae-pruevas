import React, { useEffect, useState } from 'react'
import AcordionCampos from '../components/AcordionCampos'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useContext } from 'react';
import { ExampleContex } from '../context/ExampleContext';

// función que hace funcionar el Droppable //
export const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
      const animation = requestAnimationFrame(() => setEnabled(true));

      return () => {
          cancelAnimationFrame(animation);
          setEnabled(false);
      };
  }, []);

  if (!enabled) {
      return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

// función que reordena el acordion principal al hacer drog and drop
const reorder = (list, starIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(starIndex, 1);
  result.splice(endIndex, 0, removed)  
  return result;
};

/// COMPONETE ///
const CamposProyectoPage = () => {

  // Context del archivo excel
  const { dataArchivoExcel, setDataArchivoExcel } = useContext(ExampleContex);

  // Funcion que combierte a arreglo2
  // const arreglo2 = dataArchivoExcel.reduce((acumulador, objeto) => {
  //   const grupo = acumulador.find((elem) => elem.agrupacion === objeto.agrupacion);
  //   if (grupo) {
  //     grupo.campos.push(objeto);
  //   } else {
  //     acumulador.push({
  //       agrupacion: objeto.agrupacion,
  //       campos: [objeto]
  //     });
  //   }
  //   return acumulador;
  // }, []);

  const grupos = dataArchivoExcel.reduce((grupos, campo) => {
    const grupo = grupos.find(g => g.agrupacion === campo.agrupacion);
    if (grupo) {
      grupo.campos.push(campo);
    } else {
      grupos.push({
        agrupacion: campo.agrupacion,
        campos: [campo]
      });
    }
    return grupos;
  }, []);
  
  // Asignar un ID a cada grupo y a cada campo
  let grupoId = 1;
  let campoId = 1;
  const arreglo2 = grupos.map(grupo => ({
    id: `${grupoId++}`,
    agrupacion: grupo.agrupacion,
    campos: grupo.campos.map(campo => ({
      id: `${campoId++}`,
      ...campo
    }))
  }));

  
  // useEffect(() => {
  //   setDataArchivoExcel(arreglo2);
  // }, [arreglo2]);

  console.log(dataArchivoExcel)
  console.log(arreglo2)


  // Funcion que reordena el sub acordion
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const itemsCopy = Array.from(dataArchivoExcel);
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    setDataArchivoExcel(itemsCopy);
    console.log(result);
  };

  // Context del formulario crear proyecto
  const example = useContext(ExampleContex);

  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
        <h1 className="p-5 text-2xl font-black">Campos proyecto: { <span className='text-[#245A95]'>{example.dataCrearProyecto}</span> }</h1>
        <StrictModeDroppable droppableId='camposProyectos'>
          {(droppableProvided) => (
            <div 
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className='drop-shadow-md mx-2 min-h-[15rem] flex flex-col bg-white border rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]'
            >
              <div className='drop-shadow-lg flex flex-auto flex-col p-4 md:p-5'>
                <AcordionCampos dataArchivoExcel={dataArchivoExcel} arreglo2={arreglo2}/>
              </div>
            {droppableProvided.placeholder}
            </div>
          )}
        </StrictModeDroppable>  
      </DragDropContext>
    </>
  )
}

export default CamposProyectoPage