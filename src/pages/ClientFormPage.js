import React from 'react';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';

function ClientFormPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Formulario de Cliente
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Página en construcción - Aquí se mostrará el formulario para crear/editar clientes
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default ClientFormPage;
