import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import { Button, Container } from '@mui/material';

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

export const Home = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '100vh',
          background: darkTheme.palette.background.default,
          color: darkTheme.palette.text.primary,
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
          <Typography variant="h4" component="h1" >
            Bienvenido a DoccaPoint
          </Typography>
          <Typography variant="body1" component="p" align="center">
            Encuentra con rapidez el doctor que mas se adecue a tus necesidades medicas
          </Typography>
          <Button sx={{ gap: 2 }} variant="contained" href="/especialistas">
            Encuentra a tu especialista <ArrowForwardIcon />
          </Button>
        </Box>
        <Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};


