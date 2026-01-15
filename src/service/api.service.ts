import axios from 'axios';

export const uriBase = 'http://localhost:5103'
// export const uriBase = 'https://api.pasbem.com.br'
export const baseURL = `${uriBase}/api`;

export const api = axios.create({
    baseURL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
});

export default api;