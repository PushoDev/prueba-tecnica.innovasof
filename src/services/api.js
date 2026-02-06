import axios from 'axios';

// Base URL de la API
const API_BASE_URL = 'https://pruebareactjs.test-class.com/Api';

// Crear instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error de respuesta:', error.response.data);

      // Si el token expiró o es inválido (401), redirigir al login
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('Error de red:', error.request);
    } else {
      // Algo pasó al configurar la petición
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
