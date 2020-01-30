import axios from 'axios'

const api = axios.create({
    baseURL: "http://10.10.2.246:3333"
});

export default api;