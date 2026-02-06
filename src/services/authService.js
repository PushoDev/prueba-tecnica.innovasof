import api from './api';

// Servicio de autenticación
const authService = {
  // Login
  login: async (username, password) => {
    try {
      const response = await api.post('/api/Authenticate/login', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Registro
  register: async (username, email, password) => {
    try {
      const response = await api.post('/api/Authenticate/register', {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
