const axios = require("axios");

let token = null;
let config = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`
    config = {
        headers: {Authorization: token}
    }
}

const getProjectTasks = async (projectId) => {
  const response = await axios.get(`http://localhost:3001/api/projects/${projectId}/`, config);
  return response.data;
} 

const createTask = async (taskData) => {
    const response = await axios.post(`http://localhost:3001/api/tasks/`, taskData, config);
    return response.data;
}

const updateTask = async (taskId, updatedData) => {
    const response = await axios.put(`http://localhost:3001/api/tasks/${taskId}`, updatedData, config);
    return response.data;
}

const deleteTask = async (taskId) => {
    const response = await axios.delete(`http://localhost:3001/api/tasks/${taskId}`, config);
    return response.data;
}

export default {
    getProjectTasks,
    createTask,
    updateTask,
    deleteTask,
    setToken
}