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
    genero: '',
    fechaNacimiento: '',
    fechaAfiliacion: '',
    telefonoCelular: '',
    telefonoOtro: '',
    direccion: '',
    resena: '',
    interesFK: '',
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
  }, [id]);

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
      setFormData({
        identificacion: client.identificacion || '',
        nombre: client.nombre || '',
        apellidos: client.apellidos || '',
        genero: client.genero || '',
        fechaNacimiento: client.fechaNacimiento?.split('T')[0] || '',
        fechaAfiliacion: client.fechaAfiliacion?.split('T')[0] || '',
        telefonoCelular: client.telefonoCelular || '',
        telefonoOtro: client.telefonoOtro || '',
        direccion: client.direccion || '',
        resena: client.resena || '',
        interesFK: client.interesFK || '',
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
        setSuccess('Cliente actualizado exitosamente');
      } else {
        await clientService.createClient(clientData);
        setSuccess('Cliente creado exitosamente');
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

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <PersonIcon sx={{ fontSize: 40, mr: 2, color: '#666' }} />
          <Typography variant="h6">Mantenimiento de clientes</Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Fila 1 */}
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Género *</InputLabel>
                <Select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  label="Género *"
                >
                  <MenuItem value="Femenino">Femenino</MenuItem>
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Fecha de nacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Fecha de afiliación"
                name="fechaAfiliacion"
                value={formData.fechaAfiliacion}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            {/* Fila 3 */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Teléfono Celular"
                name="telefonoCelular"
                value={formData.telefonoCelular}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Teléfono Otro"
                name="telefonoOtro"
                value={formData.telefonoOtro}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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

            {/* Dirección */}
            <Grid item xs={12}>
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

            {/* Reseña */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Reseña"
                name="resena"
                value={formData.resena}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>

            {/* Imagen */}
            <Grid item xs={12}>
              <Button variant="outlined" component="label">
                Seleccionar Imagen
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {formData.imagen && (
                <Typography variant="caption" sx={{ ml: 2 }}>
                  Imagen cargada
                </Typography>
              )}
            </Grid>

            {/* Botones */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<SaveIcon />}
                  type="submit"
                  disabled={loading}
                >
                  Guardar
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate('/clientes')}
                >
                  Regresar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default ClientFormPage;
