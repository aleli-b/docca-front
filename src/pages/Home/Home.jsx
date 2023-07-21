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
            justifyContent: 'space-around',
            minHeight: '100vh',
            width: '100%'
          }}>
          <Grid item md={6} sx={{ display: {xs: 'none', md: 'flex'}, justifyContent: 'center', padding: 4, height: '80dvh'  }}>
            <img src={esteto} style={{ minHeight: '100%', }} />
          </Grid>
          <Grid item md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: 1,
              height: '80dvh'
            }}>
            <Typography variant="h2" component="h1" textAlign='center'>
              Bienvenido <br/> a Docappoint.
            </Typography>
            <Typography variant="h4" component="h2" align="center">
              Tu bienestar es nuestra solución
            </Typography>
            <Box>
            <Link href="/especialistas">
              <Button sx={{ gap: 2, backgroundColor: '#82BF45', '&:hover': { backgroundColor: '#037F8C' } }} variant="contained" >
                Encuentra a tu especialista <ArrowForwardIcon />
              </Button>
            </Link>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link sx={{ gap: 2, color: 'black' }} href='#' underline='hover'>
                Soy Doctor
              </Link>
              <Link sx={{ gap: 2, color: 'black' }} href='#' underline='hover'>
                Soy Laboratorio
              </Link>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};