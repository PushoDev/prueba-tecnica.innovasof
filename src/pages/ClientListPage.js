import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import clientService from '../services/clientService';
import { useAuth } from '../context/AuthContext';

function ClientListPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clients, setClients] = useState([]);
  const [filters, setFilters] = useState({
    nombre: '',
    identificacion: '',
  });
  const [loading, setLoading] = useState(false);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await clientService.listClients({
        nombre: filters.nombre,
        identificacion: filters.identificacion,
        usuarioId: user?.userId || '',
      });
      console.log('Clientes:', response);
      setClients(response.data || response || []);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    fetchClients();
  };

  const handleReset = () => {
    setFilters({ nombre: '', identificacion: '' });
    setTimeout(() => fetchClients(), 100);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este cliente?')) {
      try {
        await clientService.deleteClient(id);
        fetchClients();
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Consulta de clientes
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              size="small"
              label="Nombre"
              name="nombre"
              value={filters.nombre}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              size="small"
              label="Identificación"
              name="identificacion"
              value={filters.identificacion}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <IconButton
              color="primary"
              onClick={handleSearch}
              sx={{
                backgroundColor: '#f0f0f0',
                '&:hover': { backgroundColor: '#e0e0e0' },
              }}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ mb: 2 }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => navigate('/clientes/nuevo')}
          >
            Agregar
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
          >
            Regresar
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#2196f3' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                  Identificación
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                  Nombre completo
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }} align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Cargando...
                  </TableCell>
                </TableRow>
              ) : clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No hay clientes registrados
                  </TableCell>
                </TableRow>
              ) : (
                clients.map((client) => (
                  <TableRow key={client.id || client.identificacion}>
                    <TableCell>{client.identificacion}</TableCell>
                    <TableCell>
                      {`${client.nombre || ''} ${client.apellidos || ''}`.trim()}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/clientes/editar/${client.id}`)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(client.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default ClientListPage;
