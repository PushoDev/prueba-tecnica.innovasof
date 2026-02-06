import api from './api';

// Servicio de intereses
const interestService = {
  // Listar intereses
  listInterests: async () => {
    try {
      const response = await api.get('/api/Intereses/Listado');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default interestService;
