import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import { Button, Grid, Link } from '@mui/material';
import docca from '../../assets/DA1.jpg';
import esteto from '../../assets/esteto.png';
import './Home.css'

export const Home = () => {
  return (
    <>
      <div id="background">
        <CssBaseline />
        <Grid container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100dvh',
          }}>
          <Grid item md={4} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', height: '80dvh' }}>
            <img src={esteto} style={{ minHeight: '100%', }} />
          </Grid>
          <Grid item md={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: 1,
              height: '60dvh'
            }}>
            <Typography variant="h2" component="h1" textAlign='center'>
              Bienvenido <br /> a Docappoint.
            </Typography>
            <Typography variant="h4" component="h2" align="center">
              Tu bienestar es nuestra solución
            </Typography>
            <Box sx={{ display: 'flex', gap: 12}}>
              <Link sx={{ color: 'black' }} href='#'>
                <Button variant='contained' sx={{ borderRadius: '20px', width: '12em' }}>
                  Soy Doctor
                </Button>
              </Link>
              <Link sx={{ color: 'black' }} href='#'>
                <Button variant='contained' sx={{ borderRadius: '20px', width: '12em' }}>
                  Soy Laboratorio
                </Button>
              </Link>
            </Box>
            <Box>
              <Link href="/especialistas">
                <Button sx={{ gap: 2, backgroundColor: '#82BF45', '&:hover': { backgroundColor: '#037F8C' }, borderRadius: '20px' }} variant="contained" >
                  Encuentra a tu especialista <ArrowForwardIcon />
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};