import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import { StrictModeDroppable } from '../pages/CamposProyectoPage';
import AcordionSubCampos from './AcordionSubCampos';

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

const AcordionCampos = ({acordionEstate, setAcordionEstate}) => {

  // estado para abrir y cerrar el acordion principal
  const [show, setShow] = useState(null);

  // Funcion para abrir y cerrar el acordion principal
  const toggleShow = (index) => {
    if (index === show) {
      setShow(null)
    } else {
      setShow(index)
    }
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside of a droppable, do nothing
    if (!destination) {
      return;
    }

    // If dropped within the same droppable
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'droppable-1') {
        const newItems1 = Array.from(items1);
        const [removed] = newItems1.splice(source.index, 1);
        newItems1.splice(destination.index, 0, removed);
        setItems1(newItems1);
      } else if (source.droppableId === 'droppable-2') {
        const newItems2 = Array.from(items2);
        const [removed] = newItems2.splice(source.index, 1);
        newItems2.splice(destination.index, 0, removed);
        setItems2(newItems2);
      }
    }

    // If dropped between two droppables
    if (source.droppableId !== destination.droppableId) {
      const newItems1 = Array.from(items1);
      const newItems2 = Array.from(items2);

      const [removed] = source.droppableId === 'droppable-1' ? newItems1.splice(source.index, 1) : newItems2.splice(source.index, 1);

      if (destination.droppableId === 'droppable-1') {
        newItems1.splice(destination.index, 0, removed);
        setItems1(newItems1);
        setItems2(newItems2);
      } else if (destination.droppableId === 'droppable-2') {
        newItems2.splice(destination.index, 0, removed);
        setItems1(newItems1);
        setItems2(newItems2);
      }
    }
  };

  return (
    <>
    {acordionEstate.map((acordionData, index) => (
    <Draggable key={acordionData.id} draggableId={acordionData.id} index={index}>
    {(draggableProvided) => ( 
      <div 
        {...draggableProvided.draggableProps}
        {...draggableProvided.dragHandleProps}
        ref={draggableProvided.innerRef}
        className="hs-accordion-group bg-slate-50 px-5 py-3 my-2 rounded-2xl border-2 border-[#245A95]"
      >
        <DragDropContext onDragEnd={(result) => {
          console.log(result)
        }}>
        <StrictModeDroppable droppableId={acordionData.titulo}>
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
                  {acordionData.titulo}
             </div>

             {show === index && (  
                <AcordionSubCampos acordionData={acordionData} acordionEstate={acordionEstate} index={index}/>  
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