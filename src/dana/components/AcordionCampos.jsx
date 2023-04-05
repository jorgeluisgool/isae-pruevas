import React, { useContext, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AcordionSubCampos from './AcordionSubCampos';
import { ExampleContex } from '../context/ExampleContext';

// Arreglo del Sub acordion
const arrayejemplo = [{ id: 'elemento1', content: 'Elemento 1' },{ id: 'elemento2', content: 'Elemento 2' }]

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

/// COMPONENTE ///
const AcordionCampos = ({acordionEstate, setAcordionEstate}) => {

  const { dataArchivoExcel, setDataArchivoExcel } = useContext(ExampleContex);
  console.log(dataArchivoExcel);

  // Estado del sub acordion
  const [arregloSub, setArregloSub] = useState(arrayejemplo);

  // Estado para abrir y cerrar el acordion principal
  const [show, setShow] = useState(null);

  // Funcion para abrir y cerrar el acordion principal
  const toggleShow = (index) => {
    if (index === show) {
      setShow(null)
    } else {
      setShow(index)
    }
  }

  // Funcion que reordena el sub acordion
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const itemsCopy = Array.from(arregloSub);
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    setArregloSub(itemsCopy);
    console.log(result);
  };




  // const agrupacionesMostradas = {};

  // const elementosJSX = dataArchivoExcel.map((objeto) => {
  //   if (agrupacionesMostradas[objeto.agrupacion]) {
  //     return null; // La agrupación ya ha sido mostrada, no mostrarla de nuevo
  //   } else {
  //     agrupacionesMostradas[objeto.agrupacion] = true; // Marcar la agrupación como mostrada
  //     return <div key={objeto.agrupacion}>{objeto.agrupacion}</div>; // Mostrar la agrupación
  //   }
  // });
  const agrupaciones = dataArchivoExcel
    .map((item) => item.agrupacion)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <>
    
    {agrupaciones.map((acordionData, index) => (
      <Draggable key={acordionData} draggableId={acordionData} index={index}>
        {(draggableProvided) => ( 
          <div 
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            ref={draggableProvided.innerRef}
            className="hs-accordion-group bg-slate-50 px-5 py-3 my-2 rounded-2xl border-2 border-[#245A95]"
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <StrictModeDroppable droppableId={acordionData}>
                {(droppableSubProvided) => (
                <div className='' {...droppableSubProvided.droppableProps} ref={droppableSubProvided.innerRef}>
                  <span className='absolute right-8 text-2xl text-[#245A95]'>
                    <ion-icon name="reorder-three-outline"></ion-icon>
                  </span>
                  <div className="hs-accordion active" id="hs-basic-nested-heading-one">
                    <div onClick={() => toggleShow(index)} className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400" aria-controls="hs-basic-nested-collapse-one">
                       <div className={`text-2xl text-[#245A95] ${show === index? "rotate-180" : ""}`}>
                       <ion-icon name="chevron-down"></ion-icon>
                       </div>
                         {acordionData}
                    </div>

                      {show === index && (  
                        <AcordionSubCampos arregloSub={arregloSub} setArregloSub={setArregloSub} acordionData={acordionData} acordionEstate={acordionEstate} index={index}/>  
                      )} 
                  </div>
                    {droppableSubProvided.placeholder}
                </div>
                )}
              </StrictModeDroppable>
            </DragDropContext>
          </div> 
          )}
      </Draggable>
      ))}
    </>
  )
}

export default AcordionCampos