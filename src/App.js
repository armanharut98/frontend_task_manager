import React, { useState } from "react";
import loginService from "./services/login";
import registerService from "./services/register";
import projectService from "./services/project";
import taskService from "./services/tasks"
import Notification from "./components/Notification";
import Button from "./components/Button";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import ProjectList from "./components/ProjectList";
import ProjectForm from "./components/ProjectForm";
import Card from "./components/Card";
import ProjectView from "./components/ProjectView";
import TaskForm from "./components/TaskForm";
import TaskView from "./components/TaskView";

const testTask = {name:'task1', description: '', id: 1}


function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [needsRegistration, setNeedsRegistration] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState();
  const [task,setTask] = useState("");
  const [projectName, setProjectName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isWatchingTasks,setIsWatchingTasks] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false)


  const onDeleteProject = async (id) => {
    try {
      const filteredProjects = projects.filter((project) => { return project._id !== id });
      await projectService.deleteProject(id);
      setProjects([...filteredProjects])

    }
    catch (exception) {
      return;
    }
  }

  const onProjectClick = async (ev, project) => {
    
    try {
      const projectTasks = await taskService.getProjectTasks(project._id);
      setTasks(projectTasks.tasks);
      setActiveProject(project);
      setIsWatchingTasks(true)
    } catch (exception) {
      
    }
  };



  const login = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService({
        email: userEmail,
        password: userPassword,
      });

      projectService.setToken(user.token);
      taskService.setToken(user.token)
      setUser(user);
      setProjects([...user.projects]);
      setUserEmail("");
      setUserPassword("");
    }
    catch (exception) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      const user = await registerService({
        name: username,
        email: userEmail,
        password: userPassword,
      });
      setUsername("");
      setUserEmail("");
      setUserPassword("");
      setNeedsRegistration(false);
    }
    catch (exception) {
      setErrorMessage("Unable to register");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const registrationForm = (
    <RegistrationForm
      register={register}
      setUserEmail={setUserEmail}
      setUserPassword={setUserPassword}
      setUsername={setUsername}
      username={username}
      userEmail={userEmail}
      userPassword={userPassword}
    ></RegistrationForm>
  );

  const loginForm = (
    <LoginForm
      setUserEmail={setUserEmail}
      setUserPassword={setUserPassword}
      userEmail={userEmail}
      userPassword={userPassword}
      login={login}
    ></LoginForm>
  );
   

  const handleButtonChange = (e) => {
    e.preventDefault();
    setNeedsRegistration(!needsRegistration);
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const newProject = await projectService.createProject({
        user: user.id,
        name: projectName,
      });
      setProjects(projects.concat([newProject]));
    } catch (exception) {
      
    }
    setProjectName("");
  };

  if (user === null) {
    
    return (
      <div className="login__container">
        <Notification message={errorMessage}></Notification>
        {needsRegistration === true ? registrationForm : loginForm}
        <Button
          needsRegistration={needsRegistration}
          handleButtonChange={handleButtonChange}
        ></Button>
      </div>
    );
  } else {
    // if(isTaskOpen){
    //   return <TaskView task={task}></TaskView>
    // }
    return (
      !isWatchingTasks  ?
        <Card classNames={"lg"}>
          <ProjectList projects={projects} onDelete={onDeleteProject} onProjectClick={onProjectClick} />
          <ProjectForm
            projectName={projectName}
            setProjectName={setProjectName}
            createProject={createProject}
          />
        </Card> : <>
          <TaskForm setTasks={setTasks} tasks={tasks} project={activeProject}></TaskForm>
          <ProjectView tasks={tasks} setTasks={setTasks} onArrowClick={setIsWatchingTasks} onTaskClick={setIsTaskOpen} setTask={setTask}></ProjectView>
        </>
    );
  }
}

export default App;