import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponseData(null);
    setLoading(true);

    try {
      const response = await authService.login(formData.username, formData.password);

      // Mostrar el JSON de respuesta
      console.log('Respuesta del servidor:', response);
      setResponseData(response);

      // Guardar en el contexto
      login(
        {
          token: response.token,
          userId: response.userid, // Match Swagger screenshot
          username: formData.username,
        },
        formData.rememberMe
      );

      // Redirigir al home
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (err) {
      console.error('Error en login:', err);
      setError(
        err.response?.data?.message ||
        'Error al iniciar sesión. Verifica tus credenciales.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Card elevation={3}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Iniciar Sesión
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
              Sistema de Gestión de Clientes - Innovasoft S.A.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {responseData && (
              <Alert severity="success" sx={{ mb: 2 }}>
                ¡Login exitoso! Redirigiendo...
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                required
                autoFocus
              />

              <TextField
                fullWidth
                label="Contraseña"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Recuérdame"
                sx={{ mt: 1 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  ¿No tienes cuenta?{' '}
                  <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                    Regístrate aquí
                  </Link>
                </Typography>
              </Box>
            </form>

            {responseData && (
              <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Respuesta del servidor (JSON):
                </Typography>
                <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                  {JSON.stringify(responseData, null, 2)}
                </pre>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default LoginPage;
