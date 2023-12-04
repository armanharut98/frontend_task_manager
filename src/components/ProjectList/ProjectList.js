import React from "react";
import ProjectItem from "../ProjectItem";
import './ProjectList.css'

const ProjectList = ({projects,onDelete,onProjectClick}) => {

   return (
      <div className="project_list__container">
          {
              projects.length > 0 
                ? projects.map((project) => { return <ProjectItem project={project} onDelete={onDelete} key={project._id} onProjectClick={onProjectClick} /> })
                : <h2> You have not created any projects </h2>
          }
      </div>
   )
}

export default ProjectList;