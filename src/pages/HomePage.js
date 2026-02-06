import React from 'react';
import { Box, Typography } from '@mui/material';

function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 150px)',
      }}
    >
      <Typography variant="h1" component="h1" sx={{ fontWeight: 700, color: '#333' }}>
        Bienvenido
      </Typography>
    </Box>
  );
}

export default HomePage;

