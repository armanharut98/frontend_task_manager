import React, { useState } from "react";
import Card from "../Card";
import projectService from "../../services/project";
import "./ProjectItem.css";

const ProjectItem = ({ project, onDelete, onProjectClick }) => {
  const [beingEddited, setBeingEddited] = useState(false);
  const [projectName, setProjectName] = useState(project.name);

  const onChangeHandler = (ev) => {
    setProjectName(ev.target.value);
  };

  const textInput = beingEddited ? (
    <form
      className="project_edit_form__container"
      onSubmit={(ev) => onSubmitHandler(ev)}
    >
      <input
        required={true}
        value={projectName}
        className="text_input"
        onClick={(ev) => ev.stopPropagation()}
        onChange={(ev) => onChangeHandler(ev)}
        maxLength={25}
      ></input>
    </form>
  ) : (
    <b>{projectName}</b>
  );

  const onEditClickHandler = (ev) => {
    ev.stopPropagation();
    setBeingEddited(true);
  };
  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    try {
      setBeingEddited(false);
      await projectService.updateProject(project._id, { newName: projectName });
    } catch (exception) {
      setBeingEddited(true);
    }
  };

  const dateItem = <div className={"date__container"}>{project.created}</div>
  return (
    <Card
      classNames={"sm project_item"}
      onClickHandler={(ev) => onProjectClick(ev,project)}
    >
      <div className="project_item__container">
        {dateItem}
        {textInput}
        <div className="icons__container">
          <i className="fal fa-pen" onClick={onEditClickHandler}></i>
          <i
            className="fas fa-trash-alt"
            onClick={(ev) => {
              ev.stopPropagation();
              onDelete(project._id);
            }}
          ></i>
        </div>
        
      </div>
    </Card>
  )
};

export default ProjectItem;
