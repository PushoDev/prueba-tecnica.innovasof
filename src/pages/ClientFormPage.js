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
  Alert,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import clientService from '../services/clientService';
import interestService from '../services/interestService';
import { convertToBase64 } from '../utils/validators';
import { useAuth } from '../context/AuthContext';

function ClientFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const isEdit = Boolean(id);

  const [interests, setInterests] = useState([]);
  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    apellidos: '',
    sexo: '', // Aligning with Create/Update
    fNacimiento: '', // Aligning with Create/Update
    fAfiliacion: '', // Aligning with Create/Update
    celular: '', // Aligning with Create/Update
    otroTelefono: '',
    direccion: '',
    resennaPersonal: '', // Aligning with Create/Update (double 'n')
    interesFK: '', // Aligning with Create/Update
    imagen: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInterests();
    if (isEdit) {
      loadClient();
    }
  }, [id, isEdit]);

  const loadInterests = async () => {
    try {
      const response = await interestService.listInterests();
      setInterests(response.data || response || []);
    } catch (err) {
      console.error('Error al cargar intereses:', err);
    }
  };

  const loadClient = async () => {
    try {
      const response = await clientService.getClient(id);
      const client = response.data || response;

      // Map DetalleCliente_DTO to form state (which matches Create/Update names)
      setFormData({
        identificacion: client.identificacion || '',
        nombre: client.nombre || '',
        apellidos: client.apellidos || '',
        sexo: client.sexo || '',
        fNacimiento: client.fNacimiento?.split('T')[0] || '',
        fAfiliacion: client.fAfiliacion?.split('T')[0] || '',
        celular: client.telefonoCelular || '', // Map from DTO
        otroTelefono: client.otroTelefono || '',
        direccion: client.direccion || '',
        resennaPersonal: client.resenaPersonal || client.resennaPersonal || '', // Map from DTO
        interesFK: client.interesesId || client.interesFK || '', // Map from DTO
        imagen: client.imagen || '',
      });
    } catch (err) {
      console.error('Error al cargar cliente:', err);
      setError('Error al cargar los datos del cliente');
    }
  };

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
        setFormData({
          ...formData,
          imagen: base64,
        });
      } catch (err) {
        setError('Error al procesar la imagen');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const clientData = {
        ...formData,
        usuarioId: user?.userId || '',
      };

      if (isEdit) {
        clientData.id = id;
        await clientService.updateClient(clientData);
        setSuccess('¡Éxito! Cliente actualizado correctamente');
      } else {
        await clientService.createClient(clientData);
        setSuccess('¡Éxito! Cliente creado correctamente');
      }

      setTimeout(() => {
        navigate('/clientes');
      }, 1500);
    } catch (err) {
      console.error('Error al guardar:', err);
      setError(err.response?.data?.message || 'Error al guardar el cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Mantenimiento Clientes
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 2, borderBottom: '1px solid #eee' }}>
          <PersonIcon sx={{ fontSize: 32, mr: 2, color: '#1976d2' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Mantenimiento de clientes
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Fila 1 */}
            <Grid size={4}>
              <TextField
                fullWidth
                size="small"
                label="Identificación"
                name="identificacion"
                value={formData.identificacion}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={4}>
              <TextField
                fullWidth
                size="small"
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={4}>
              <TextField
                fullWidth
                size="small"
                label="Apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Fila 2 */}
            <Grid size={4}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Género *</InputLabel>
                <Select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  label="Género *"
                >
                  <MenuItem value="Femenino">Femenino</MenuItem>
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={4}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Fecha de nacimiento"
                name="fNacimiento"
                value={formData.fNacimiento}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={4}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Fecha de afiliación"
                name="fAfiliacion"
                value={formData.fAfiliacion}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            {/* Fila 3 */}
            <Grid size={4}>
              <TextField
                fullWidth
                size="small"
                label="Teléfono Celular"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                fullWidth
                size="small"
                label="Teléfono Otro"
                name="otroTelefono"
                value={formData.otroTelefono}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Interés *</InputLabel>
                <Select
                  name="interesFK"
                  value={formData.interesFK}
                  onChange={handleChange}
                  label="Interés *"
                >
                  <MenuItem value="">Seleccione</MenuItem>
                  {interests.map((interest) => (
                    <MenuItem key={interest.id} value={interest.id}>
                      {interest.nombre || interest.descripcion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Dirección y Reseña */}
            <Grid size={12}>
              <TextField
                fullWidth
                size="small"
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                size="small"
                label="Reseña"
                name="resennaPersonal"
                value={formData.resennaPersonal}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>

            {/* Acciones */}
            <Grid size={12}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
                pt: 3,
                borderTop: '1px solid #eee'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    size="medium"
                    sx={{ textTransform: 'none' }}
                  >
                    Seleccionar Imagen
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                  {formData.imagen && (
                    <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                      ✓ Imagen lista
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    type="submit"
                    disabled={loading}
                    sx={{
                      px: 4,
                      textTransform: 'none',
                      backgroundColor: '#1976d2',
                      '&:hover': { backgroundColor: '#1565c0' }
                    }}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/clientes')}
                    sx={{
                      px: 4,
                      textTransform: 'none',
                      color: '#666',
                      borderColor: '#ccc',
                      '&:hover': { borderColor: '#999', backgroundColor: '#f5f5f5' }
                    }}
                  >
                    Regresar
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default ClientFormPage;
