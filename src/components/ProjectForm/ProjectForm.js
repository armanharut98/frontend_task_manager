import React from "react";
import InputField from "../InputField";
import './ProjectForm.css';

const ProjectForm = ({
    setProjectName,
    projectName,
    createProject
}) => {
    return (
        <div className="projectform__container">
            <form onSubmit={createProject} className="projectform_form">
               <InputField
                    inputType="text"
                    errorMessage="*Field cannot be empty"
                    inputValue={projectName}
                    inputName={projectName}
                    inputPlaceholder={"Project Name"}
                    inputFunc={({target}) => {setProjectName(target.value)}}>
               </InputField>
               <button className="tm__button sm" type="submit">Create Project</button>
            </form>
        </div>
    )
};

export default ProjectForm;