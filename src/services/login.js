const axios = require("axios");

const login = async (credentials) => {
    const response = await axios.post("http://localhost:3001/api/login", credentials);
    
    localStorage.setItem('user',response.data);
    return response.data;
};

export default login;
