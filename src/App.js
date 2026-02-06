import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, isAuthenticated } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sistema de Gestión de Clientes
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Innovasoft S.A.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1">
            Estado de autenticación: {isAuthenticated() ? 'Autenticado' : 'No autenticado'}
          </Typography>
          {user && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Usuario: {user.username || user.userId}
            </Typography>
          )}
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            ✅ API configurada correctamente
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ✅ Context API funcionando
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ✅ Material UI integrado
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
