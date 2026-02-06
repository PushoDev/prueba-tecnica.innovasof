import React from 'react';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';

function ClientListPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lista de Clientes
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Página en construcción - Aquí se mostrará la lista de clientes
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default ClientListPage;
