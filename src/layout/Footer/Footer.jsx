import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Define your custom dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a237e', // Customize your primary color
    },
    secondary: {
      main: '#f57c00', // Customize your secondary color
    },
  },
});

export const Footer = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        position="static"
        color="default"
        sx={{
          top: 'auto',
          bottom: 0,
          bgcolor: darkTheme.palette.grey[800], 
          color: darkTheme.palette.grey[100],
          width: '100%',
          margin: '0 auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 2,
          }}
        >
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} Your Website. All rights reserved.
          </Typography>
        </Box>
      </AppBar>
    </ThemeProvider>
  );
};