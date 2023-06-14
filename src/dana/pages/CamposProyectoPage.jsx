import React, { useEffect, useState } from 'react'
import AcordionCampos from '../components/AcordionCampos'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useContext } from 'react';
import { ExampleContex } from '../context/ExampleContext';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

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

   // Context del formulario crear proyecto
   const example = useContext(ExampleContex);
  //  console.log(example)

  // Context del archivo excel
  const { dataArchivoExcel, setDataArchivoExcel } = useContext(ExampleContex);
  console.log(dataArchivoExcel)

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

  const grupos = example.dataArchivoExcel.reduce((grupos, campo) => {
    const grupo = grupos.find(g => g.agrupacion === campo.agrupacion);
    if (grupo) {
      grupo.campos.push(campo);
    } else {
      grupos.push({
        agrupacion: campo.agrupacion,
        campos: [campo]
      });
    }
    // console.log(grupos)
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

  // console.log(dataArchivoExcel)
  // console.log(arreglo2)


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

  const handleDragEnd =(event) => {
    const {active, over} = event

    const oldIndex = dataArchivoExcel.findIndex(element => element.id === active.id); 
    const newIndex = dataArchivoExcel.findIndex(element => element.id === over.id);

    const newOrder = arrayMove(dataArchivoExcel, oldIndex, newIndex);

    setDataArchivoExcel(newOrder)
    console.log(newOrder)
  }


  return (
    <>
      <h1 className="pt-6 pb-8 pl-4 text-4xl font-black">Campos proyecto: { <span className='text-[#245A95]'>{example.dataCrearProyecto.proyecto}</span> }</h1>
      <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      >
        <div className='lg:w-8/12 lg:h-11/12 mx-auto bg-white shadow-lg p-8'>
          <div className='drop-shadow-lg flex flex-auto flex-col px-4 md:mx-10 md:px-5'>
              <SortableContext
                items={dataArchivoExcel}
                strategy={verticalListSortingStrategy}
              >
                {
                  dataArchivoExcel.map((item, index) => (
                    <AcordionCampos key={item.id} data={item} index={index}/>
                  ))          
                }
              </SortableContext>
            </div>
          </div>
      </DndContext>

    {/* <DragDropContext onDragEnd={onDragEnd}>
        <h1 className="p-5 text-2xl font-black">Campos proyecto: { <span className='text-[#245A95]'>{example.dataCrearProyecto.proyecto}</span> }</h1>
        <StrictModeDroppable droppableId='camposProyectos'>
          {(droppableProvided) => (
            <div 
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className='drop-shadow-md mx-2 min-h-[15rem] flex flex-col bg-white border rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]'
            >
              <div className='drop-shadow-lg flex flex-auto flex-col p-4 md:p-5'>
                <AcordionCampos dataArchivoExcel={example.dataArchivoExcel} arreglo2={arreglo2}/>
              </div>
            {droppableProvided.placeholder}
            </div>
          )}
        </StrictModeDroppable>  
      </DragDropContext> */}
    </>
  )
}

export default CamposProyectoPage