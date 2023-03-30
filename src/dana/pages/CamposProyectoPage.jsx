import React, { useEffect, useState } from 'react'
import AcordionCampos from '../components/AcordionCampos'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const initialAcordion = [
  {
      id: "1",
      titulo: 'DATOS DEL REGISTRO',
      subtitulo: 'FOLIO'
  },
  {
      id: '2',
      titulo: 'DATOS PERSONALES',
      subtitulo: 'AAA'
  },
  {
      id: '3',
      titulo: 'FIRMAS',
      subtitulo: 'TÍTULO FIRMA'
  },
  {
    id: '4',
    titulo: 'OTRO',
    subtitulo: '1234'
  },
  {
    id: '5',
    titulo: 'EJEMPLO',
    subtitulo: 'LLLLL'
  },
]

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

// función que reordena la lista al hacer drog and drop
const reorder = (list, starIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(starIndex, 1);
  result.splice(endIndex, 0, removed)  
  return result;
};

const CamposProyectoPage = () => {

  const [acordionEstate, setAcordionEstate] = useState(initialAcordion);

  return (
    <>
    <DragDropContext onDragEnd={(result) => {
      const {source, destination} = result;
      if (!destination) {
        return;
      }
      if (
        source.index === destination.index && 
        source.droppableId === destination.droppableId) {
        return;
      }

      setAcordionEstate(prevAcordion => reorder(prevAcordion, source.index, destination.index))
      console.log(result)
    }}>
      <h1 className="p-5 text-2xl font-black">Campos proyecto: </h1>
      <StrictModeDroppable droppableId='camposProyectos'>
      {(droppableProvided) => (
        <div {...droppableProvided.droppableProps}
        ref={droppableProvided.innerRef}
        className='drop-shadow-md mx-2 min-h-[15rem] flex flex-col bg-white border rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]'
      >
          <div className='drop-shadow-lg flex flex-auto flex-col p-4 md:p-5'>
            <AcordionCampos acordionEstate={acordionEstate} setAcordionEstate={setAcordionEstate}/>
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