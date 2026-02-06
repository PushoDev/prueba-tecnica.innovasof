import api from './api';

// Servicio de clientes
const clientService = {
  // Listar clientes
  listClients: async (filters = {}) => {
    try {
      const response = await api.post('/api/Cliente/Listado', filters);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un cliente por ID
  getClient: async (id) => {
    try {
      const response = await api.get(`/api/Cliente/Obtener/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Crear cliente
  createClient: async (clientData) => {
    try {
      const response = await api.post('/api/Cliente/Crear', clientData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar cliente
  updateClient: async (clientData) => {
    try {
      const response = await api.post('/api/Cliente/Actualizar', clientData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar cliente
  deleteClient: async (id) => {
    try {
      const response = await api.delete(`/api/Cliente/Eliminar/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default clientService;
