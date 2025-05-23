import axios from 'axios';
import { BASE_URL } from '../config';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// Interceptor de REQUEST para agregar token si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de RESPONSE para manejar expiración de sesión
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && (response.status === 401 || response.status === 403)) {
      // Elimina token y datos de sesión
      localStorage.removeItem('token');
      sessionStorage.clear();

      // Evita múltiples redirecciones
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login')) {
        window.location.href = '/login?expired=true';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
