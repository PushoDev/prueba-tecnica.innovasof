import React from 'react';
import { Container, Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Bienvenido al Sistema de Gestión de Clientes
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" gutterBottom>
          Innovasoft S.A.
        </Typography>

        {user && (
          <Typography variant="body1" align="center" sx={{ mt: 2, mb: 4 }}>
            Usuario: <strong>{user.username || user.userId}</strong>
          </Typography>
        )}

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <PeopleIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Lista de Clientes
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Ver, buscar y gestionar todos los clientes registrados en el sistema
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/clientes')}
                >
                  Ver Clientes
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <PersonAddIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Nuevo Cliente
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Registrar un nuevo cliente en el sistema con toda su información
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/clientes/nuevo')}
                >
                  Crear Cliente
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage;
