import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Box } from '@mui/material';

export const Login = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center'}}>
        <LoginForm />
    </Box>
  )
}
