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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
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

  // Modal & Notification State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchClients = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await clientService.listClients({
        nombre: filters.nombre,
        identificacion: filters.identificacion,
        usuarioId: user?.userId || localStorage.getItem('userId') || '',
      });
      setClients(response.data || response || []);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      showNotification('Error al cargar la lista de clientes', 'error');
      setClients([]);
    } finally {
      setLoading(false);
    }
  }, [filters.nombre, filters.identificacion, user?.userId]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

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

  const openDeleteConfirmation = (id) => {
    setSelectedClientId(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setSelectedClientId(null);
    setDeleteDialogOpen(false);
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotification({ ...notification, open: false });
  };

  const handleDelete = async () => {
    if (!selectedClientId) return;
    try {
      await clientService.deleteClient(selectedClientId);
      showNotification('¡Éxito! Cliente eliminado correctamente');
      fetchClients();
    } catch (error) {
      console.error('Error al eliminar:', error);
      showNotification('Error al eliminar el cliente', 'error');
    } finally {
      closeDeleteConfirmation();
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Consulta de clientes
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 5 }}>
            <TextField
              fullWidth
              size="small"
              label="Nombre"
              name="nombre"
              value={filters.nombre}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <TextField
              fullWidth
              size="small"
              label="Identificación"
              name="identificacion"
              value={filters.identificacion}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }} sx={{ display: 'flex', justifyContent: 'center' }}>
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

      <Paper sx={{ mb: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => navigate('/clientes/nuevo')}
            sx={{ textTransform: 'none' }}
          >
            Agregar
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
            sx={{ textTransform: 'none' }}
          >
            Regresar
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
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
                  <TableRow key={client.id || client.identificacion} hover>
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
                        onClick={() => openDeleteConfirmation(client.id)}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteConfirmation}
        PaperProps={{
          sx: { borderRadius: 2, p: 1, minWidth: 320 }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <WarningAmberIcon color="warning" sx={{ fontSize: 32 }} />
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={closeDeleteConfirmation}
            variant="outlined"
            sx={{ textTransform: 'none', color: '#666', borderColor: '#ccc' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            autoFocus
            sx={{ textTransform: 'none' }}
          >
            Eliminar Cliente
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%', boxShadow: 3 }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ClientListPage;
