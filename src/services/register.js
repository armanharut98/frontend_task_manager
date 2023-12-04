const axios = require("axios");

const register = async (credentials) => {
    const response = await axios.post("http://localhost:3001/api/users", credentials);
    return response.data;
}

export default register;
