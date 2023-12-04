import React, { useState, useEffect } from "react";
import "./ProjectView.css";
import { DragDropContext } from 'react-beautiful-dnd';
import TaskColumn from "../TaskColumn";
import taskServices from '../../services/tasks';
import STATUS_KEYS from '../../constants';


const ProjectView = ({ tasks, setTasks, onArrowClick ,onTaskClick, setTask}) => {
  const initialColumns = (tasks) => ({
    todo: {
      id: 'todo',
      list: tasks.filter(value => value.status === 'To Do')
    },
    inprogress: {
      id: 'inprogress',
      list: tasks.filter(value => value.status === 'In Progress')
    },
    done: {
      id: 'done',
      list: tasks.filter(value => value.status === 'Done')
    },
  })
  
  const [columns, setColumns] = useState(initialColumns(tasks))
  const allTasks = [...columns.todo.list,...columns.inprogress.list,...columns.done.list]
  
  useEffect(() => {
    setColumns(initialColumns(tasks))
  }, [tasks])

  const onDeleteHandler = async (task, col) => {
    try {
      setColumns((prev) => ({
        ...prev,
        [col.id]: {
          id: col.id,
          list: [...columns[col.id].list.filter(value => value.id !== task.id)]
        }
      }))
      const filteredTasks = tasks.filter(value => value.id !== task.id)
      setTasks(filteredTasks)
      await taskServices.deleteTask(task.id)
    }
    catch (exception) {
    }
  }

  const onDragEnd = async ({ source, destination }) => {

    if (destination === undefined || destination === null) return null;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return null
    }

    const start = columns[source.droppableId]
    const end = columns[destination.droppableId]


    if (start === end) {
      const newList = start.list.filter((task, index) => {
        return index !== source.index
      });

      newList.splice(destination.index, 0, start.list[source.index])

      const newCol = {
        id: start.id,
        list: newList,
      }

      setColumns(state => ({ ...state, [newCol.id]: newCol }))
      return null
    } else {
      try {
        const updatedTask = {
          ...start.list[source.index],
          "status": STATUS_KEYS[end.id]
        }

        const newStartList = start.list.filter((task, index) => index !== source.index)
        const newStartCol = {
          id: start.id,
          list: newStartList
        }

        const newEndList = end.list


        newEndList.splice(destination.index, 0, start.list[source.index])

        const newEndCol = {
          id: end.id,
          list: newEndList
        }

        setColumns(state => ({
          ...state,
          [newStartCol.id]: newStartCol,
          [newEndCol.id]: newEndCol
        }))

        const filteredTasks = tasks.filter((task)=>{
          return task.id !== updatedTask.id
        })

        setTasks([...filteredTasks,updatedTask])
        
        
        await taskServices.updateTask(updatedTask.id, updatedTask)

      } catch (exception) {

      }

      return null
    }
  };







  return (
    <div className="project_tasks__container">
      <div className="arrow_back" onClick={()=>onArrowClick(false)}>
        <i className="far fa-angle-double-left" ></i>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.values(columns).map((col, index) => (
          <TaskColumn col={col} key={index} onDeleteHandler={onDeleteHandler} onTaskClick={onTaskClick} setTask={setTask}>{col.id}
          </TaskColumn>
        ))}
      </DragDropContext>
    </div>
  );
};

export default ProjectView;
