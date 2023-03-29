import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const EjemploDragDrop222 = () => {

    const [items1, setItems1] = useState([
        { id: 'item1', content: 'Item 1' },
        { id: 'item2', content: 'Item 2' },
        { id: 'item3', content: 'Item 3' },
      ]);
    
      const [items2, setItems2] = useState([
        { id: 'item4', content: 'Item 4' },
        { id: 'item5', content: 'Item 5' },
        { id: 'item6', content: 'Item 6' },
      ]);


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
    <DragDropContext onDragEnd={onDragEnd}>
    <div className='m-6 border-2 border-[#bd2f2f]' style={{ display: 'flex', justifyContent: 'space-around' }}>
      <StrictModeDroppable droppableId="droppable-1">
        {(provided) => (
          <div className='m-6 border-2 border-[#bdb32f]' {...provided.droppableProps} ref={provided.innerRef}>
            {items1.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(providedElemento) => (
                  <div className='m-6 border-2 border-[#4bbd2f]' {...providedElemento.draggableProps} {...providedElemento.dragHandleProps} ref={providedElemento.innerRef}>
                    {item.content}
                    <DragDropContext onDragEnd={onDragEnd}>
                      <StrictModeDroppable droppableId="droppable-7">
                        {(p) => (
                         <div className='m-6 border-2 border-[#3e268d]' {...p.droppableProps} ref={p.innerRef}>
                          {[{ id: 'elemento1', content: 'Elemento 1' },{ id: 'elemento2', content: 'Elemento 2' }].map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(po) => (
                              <div className='m-6 border-2 border-[#4bbd2f]' {...po.draggableProps} {...po.dragHandleProps} ref={po.innerRef}>
                                {item.content}
                              </div>
                              )}
                            </Draggable>
                          ))}
                          {p.placeholder}
                        </div>
                        )}
                      </StrictModeDroppable>
                    </DragDropContext>
                  </div>  
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  </DragDropContext>
    </>
    

  )
}

export default EjemploDragDrop222