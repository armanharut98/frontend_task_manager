import React, { useState } from "react";
import './TaskView.css';
import Card from "../Card";

const TaskView = ({task}) => {
    const [name, setName] = useState(task.name);
    const [description, setDescription] = useState(task.description);

    const onSubmitHandler = () => {
        console.log('sdsd')
    }

    return <div className="taskview__container">
        <Card className="lg">
            <div>
                {name}
            </div>
            <div>
                {description}
            </div>
            <button className="tm__button sm" type={"submit"} onClick={onSubmitHandler}>submit</button>
        </Card>
    </div>
}

export default TaskView;