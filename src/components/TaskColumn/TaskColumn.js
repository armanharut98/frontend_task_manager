
import TaskItem from "../TaskItem";
import { Droppable } from 'react-beautiful-dnd';
import './TaskColumn.css';
import STATUS_KEYS from '../../constants';

const TaskColumn = ({ col, onDeleteHandler , onTaskClick,setTask }) => {
  
    return (
        <Droppable droppableId={col.id}>
            {
                provided => (
                    <>
                    <div className={`card__container lg tasks-column ${col.id}`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <div className="task-column label">{STATUS_KEYS[col.id]}</div>
                        {col.list ? col.list.map((task, index) => {
                            return <TaskItem key={task.id} name={task.name} index={index} task={task} onDeleteHandler={onDeleteHandler} col={col} onTaskClick={onTaskClick} setTask={setTask}></TaskItem>
                        }) : ''}
                        {provided.placeholder}
                    </div>
                    </>
                )
            }
        </Droppable>)
}
export default TaskColumn;