import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import clientService from '../services/clientService';
import interestService from '../services/interestService';
import { convertToBase64 } from '../utils/validators';
import { useAuth } from '../context/AuthContext';

function ClientEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [interests, setInterests] = useState([]);
  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    apellidos: '',
    sexo: '', // M, F, O
    fNacimiento: '',
    fAfiliacion: '',
    celular: '',
    otroTelefono: '',
    direccion: '',
    resennaPersonal: '',
    interesFK: '',
    imagen: '',
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const loadInterests = React.useCallback(async () => {
    try {
      const response = await interestService.listInterests();
      setInterests(response.data || response || []);
    } catch (err) {
      console.error('Error al cargar intereses:', err);
    }
  }, []);

  const loadClient = React.useCallback(async () => {
    try {
      const response = await clientService.getClient(id);
      const client = response.data || response;

      setFormData({
        identificacion: client.identificacion || '',
        nombre: client.nombre || '',
        apellidos: client.apellidos || '',
        sexo: client.sexo || '',
        fNacimiento: client.fNacimiento?.split('T')[0] || '',
        fAfiliacion: client.fAfiliacion?.split('T')[0] || '',
        celular: client.telefonoCelular || '',
        otroTelefono: client.otroTelefono || '',
        direccion: client.direccion || '',
        resennaPersonal: client.resenaPersonal || client.resennaPersonal || '',
        interesFK: client.interesesId || client.interesFK || '',
        imagen: client.imagen || '',
      });
    } catch (err) {
      showNotification('Error al cargar los datos del cliente', 'error');
    }
  }, [id]);

  useEffect(() => {
    loadInterests();
    loadClient();
  }, [loadInterests, loadClient]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setFormData({ ...formData, imagen: base64 });
      } catch (err) {
        showNotification('Error al procesar la imagen', 'error');
      }
    }
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotification({ ...notification, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        id: id,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        identificacion: formData.identificacion,
        celular: formData.celular,
        otroTelefono: formData.otroTelefono,
        direccion: formData.direccion,
        fNacimiento: formData.fNacimiento,
        fAfiliacion: formData.fAfiliacion,
        sexo: formData.sexo,
        resennaPersonal: formData.resennaPersonal || "",
        imagen: formData.imagen || null,
        interesFK: formData.interesFK,
        usuarioId: user?.userId || localStorage.getItem('userId') || '',
      };

      console.log('--- ACTUALIZANDO CLIENTE ---');
      console.log(JSON.stringify(payload, null, 2));

      await clientService.updateClient(payload);
      showNotification('¡Éxito! Cliente actualizado correctamente');

      setTimeout(() => navigate('/clientes'), 1500);
    } catch (err) {
      console.error('--- ERROR ACTUALIZACIÓN ---');
      if (err.response) {
        console.error('Status:', err.response.status);
        console.error('Data:', JSON.stringify(err.response.data, null, 2));
      }
      const errorMsg = err.response?.data?.message || err.message || 'Error al actualizar el cliente';
      showNotification(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Mantenimiento Clientes - Editar
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 2, borderBottom: '1px solid #eee' }}>
          <EditIcon sx={{ fontSize: 32, mr: 2, color: '#1976d2' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Modificar información del cliente
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth size="small" label="Identificación" name="identificacion" value={formData.identificacion} onChange={handleChange} required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth size="small" label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth size="small" label="Apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Género *</InputLabel>
                <Select name="sexo" value={formData.sexo} onChange={handleChange} label="Género *">
                  <MenuItem value="F">Femenino</MenuItem>
                  <MenuItem value="M">Masculino</MenuItem>
                  <MenuItem value="O">Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth size="small" type="date" label="Fecha de nacimiento" name="fNacimiento" value={formData.fNacimiento} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth size="small" type="date" label="Fecha de afiliación" name="fAfiliacion" value={formData.fAfiliacion} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth size="small" label="Teléfono Celular" name="celular" value={formData.celular} onChange={handleChange} required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth size="small" label="Teléfono Otro" name="otroTelefono" value={formData.otroTelefono} onChange={handleChange} required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Interés *</InputLabel>
                <Select name="interesFK" value={formData.interesFK} onChange={handleChange} label="Interés *" required>
                  <MenuItem value="">Seleccione</MenuItem>
                  {interests.map((i) => (
                    <MenuItem key={i.id} value={i.id}>{i.nombre || i.descripcion}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField fullWidth size="small" label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} required multiline rows={2} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth size="small" label="Reseña" name="resennaPersonal" value={formData.resennaPersonal} onChange={handleChange} multiline rows={2} />
            </Grid>

            <Grid size={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 3, borderTop: '1px solid #eee' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button variant="outlined" component="label" size="medium" sx={{ textTransform: 'none' }}>
                    Seleccionar Imagen
                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                  </Button>
                  {formData.imagen && <Typography variant="body2" color="success.main">✓ Imagen lista</Typography>}
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" startIcon={<SaveIcon />} type="submit" disabled={loading} sx={{ px: 4, textTransform: 'none' }}>Guardar</Button>
                  <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/clientes')} sx={{ px: 4, textTransform: 'none' }}>Regresar</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar open={notification.open} autoHideDuration={4000} onClose={handleCloseNotification} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled" sx={{ width: '100%', boxShadow: 3 }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ClientEditPage;
