import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 150px)',
        textAlign: 'center',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 120, color: '#2196f3', mb: 2 }} />
      <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 700, color: '#2196f3' }}>
        404
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ color: '#666', mt: 2 }}>
        Oops... Page Not Found!
      </Typography>
      <Button variant="contained" size="large" onClick={() => navigate('/home')} sx={{ mt: 4 }}>
        Volver al Inicio
      </Button>
    </Box>
  );
}

export default NotFoundPage;

