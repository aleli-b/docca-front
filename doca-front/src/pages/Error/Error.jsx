import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const Error = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px', minHeight:'100dvh' }}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Page Not Found</Typography>
      <Typography variant="subtitle1" style={{ marginTop: '16px' }}>
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        style={{ marginTop: '16px' }}
      >
        Go to Home
      </Button>
    </div>
  );
};
