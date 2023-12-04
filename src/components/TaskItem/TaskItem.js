import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


const TaskItem = ({ name, col, index, task, onDeleteHandler, onTaskClick, setTask }) => {
    console.log(task)
    return (
        <Draggable draggableId={`${task.id}`} index={index} >
            {provided => (
                <div ref={provided.innerRef}
                    onClick={(ev) => {

                        ev.stopPropagation();

                        setTask({ ...task })
                        onTaskClick(true)
                    }}
                    className='card__container sm task'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className='project_item__container'>
                        <b>{name}</b>
                        <i className='fas fa-trash-alt' onClick={(ev) => { 
                            ev.stopPropagation();
                            onDeleteHandler(task, col) 
                            }}></i>
                    </div>
                </div>
            )}
        </Draggable>
    )
}
export default TaskItem;