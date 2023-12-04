const axios = require("axios");

let token = null;
let config = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`
    config = {
        headers: {Authorization: token}
    }
}

const getProject = async (projectId) => {
    const response = await axios.get(`http://localhost:3001/api/projects/${projectId}`, config);
    return response.data;
}

const createProject = async (projectData) => {
    const response = await axios.post("http://localhost:3001/api/projects", projectData, config);
    return response.data;
}

const updateProject = async (projectId, updatedData) => {
    const response = await axios.put(`http://localhost:3001/api/projects/${projectId}`, updatedData, config);
    return response.data;
}

const deleteProject = async (projectId) => {
    const response = await axios.delete(`http://localhost:3001/api/projects/${projectId}`, config)
    return response.data;
}

export default {
    getProject,
    createProject,
    updateProject,
    deleteProject,
    setToken
}
