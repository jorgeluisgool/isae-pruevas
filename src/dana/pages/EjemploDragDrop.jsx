import React, { useEffect, useState } from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

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


const initialTaks = [
    {
        id: "1",
        text: 'react'
    },
    {
        id: '2',
        text: 'html'
    },
    {
        id: '3',
        text: 'aws'
    },
    {
        id: '4',
        text: 'javascript'
    },
]

const EjemploDragDrop = () => {
    
    
    const [tasks, setTasks] = useState(initialTaks);
  return (
    // <DragDropContext onDragEnd={(result) => console.log(result)}>
        <div className=''>
            <h1>EjemploDragDrop</h1>
            <StrictModeDroppable droppableId='tasks'>
                {(droppableProvided) => (
                    <ul 
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        className=''
                    >
                        {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(draggableProvided) => ( 
                            <li 
                                {...draggableProvided.draggableProps}
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.dragHandleProps}
                                className='bg-red-500 m-2 text-white'
                            >
                                {task.text}
                            </li>
                            )}
                        </Draggable>
                    ))}
                    {droppableProvided.placeholder}  
                </ul>
                )}
            </StrictModeDroppable>
        </div>
    // </DragDropContext>
    
    
  )
}

export default EjemploDragDrop