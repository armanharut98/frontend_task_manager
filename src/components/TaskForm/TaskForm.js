import React, { useState } from "react";
import InputField from "../InputField";
import taskService from "../../services/tasks";
import Card from "../Card";
import './TaskForm.css'

const TaskForm = ({ project, setTasks, tasks }) => {
    const [taskName, setTaskName] = useState('');

    const onSubmitHandler = async (ev) => {
        ev.preventDefault()
        const newTaskRequest = {
            name: taskName,
            status: 'To Do',
            project: project._id,
            description: 'Please enter your description',
        }
        try {
            const result = await taskService.createTask(newTaskRequest);

            
            setTasks([...tasks, result])
        } catch (exception) {
            console.log(exception)
        }
    }


    return (
        <Card classNames={'sm task_form__card'}>
            <form className="task_form__container" onSubmit={(ev) => onSubmitHandler(ev)}>
                <InputField
                    inputType={"text"}
                    inputFunc={({ target }) => {
                        setTaskName(target.value);
                    }}
                    inputName={"name"}
                    inputPlaceholder={"Task name"}
                    inputValue={taskName}
                    errorMessage={"*Field cannot be empty"}>
                </InputField>
                <button type="submit" className="tm__button sm">Add Task</button>
            </form>
        </Card>
    )
}

export default TaskForm;