import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import { Button, Container } from '@mui/material';
import docca from '../../assets/DA1.jpg';
import './Home.css'

export const Home = () => {
  return (
    <>
      <div id="background">
        <CssBaseline />
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '100vh',
            width: '100%'
          }}>
          <img src={docca} style={{ height: 200 }} />
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
            <Button sx={{ gap: 2, backgroundColor: '#82BF45', '&:hover': { backgroundColor: '#037F8C' } }} variant="contained" href="/especialistas">
              Encuentra a tu especialista <ArrowForwardIcon />
            </Button>
          </Box>
          <Box>
          </Box>
        </Container>
      </div>
    </>
  );
};