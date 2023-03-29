import React, { useEffect, useState } from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

const EjemploDragDrop = () => {
    const [items, setItems] = useState ([
        { id: 'item-1', content: 'Item 1' },
        { id: 'item-2', content: 'Item 2' },
        { id: 'item-3', content: 'Item 3' }
      ]);

  const onDragEnd = (result) => {

    const reorder = (list, starIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(starIndex, 1);
        result.splice(endIndex, 0, removed)  
        return result;
    };


    const {source, destination} = result;
      if (!destination) {
        return;
      }
      if (
        source.index === destination.index && 
        source.droppableId === destination.droppableId) {
        return;
      }

      setItems(prevAcordion => reorder(prevAcordion, source.index, destination.index))
      console.log(result)
  };
  

const StrictModeDroppable = ({ children, ...props }) => {
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

    
    // const [tasks, setTasks] = useState(initialTaks);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable-1">
      {(provided) => (
        <div className='m-6 border-2 border-[#bd2f2f]' {...provided.droppableProps} ref={provided.innerRef}>
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div className='m-6 border-2 border-[#bdb82f]' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  {item.content}
                  {index === 1 && ( // Verificar si este es el segundo elemento principal
                    <StrictModeDroppable droppableId="droppable-2">
                      {(provided) => (
                        <div className='m-4 border-2 border-[#39bd2f]' {...provided.droppableProps} ref={provided.innerRef}>
                          {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided) => (
                                <div className='m-4 border-2 border-[#4b2fbd]' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  {item.content}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </StrictModeDroppable>
                  )}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
  )
}

export default EjemploDragDrop