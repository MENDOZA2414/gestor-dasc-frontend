import axios from 'axios';
import { BASE_URL } from './config';

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true  // Esto es opcional si solo manejas JWT en los headers
});

// Interceptor para agregar el token JWT en las peticiones
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Obtén el token de localStorage

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;  // Agrega el token al header
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
