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

  const [show, setShow] = useState(null);

  const toggleShow = (index) => {
    if (index === show) {
      setShow(index)
    } else {
      setShow(index)
    }
  }

  const reorder = (list, starIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(starIndex, 1);
    result.splice(endIndex, 0, removed)  
    return result;
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
        <StrictModeDroppable droppableId='camposProyectosSub'>
          {(droppableSubProvided) => (
        <div className='border-2 border-[#bd2f2f]' {...droppableSubProvided.droppableProps} ref={droppableSubProvided.innerRef}>
          <span className='absolute right-8 text-2xl text-[#7e2495]'>
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
          {<div/>}
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