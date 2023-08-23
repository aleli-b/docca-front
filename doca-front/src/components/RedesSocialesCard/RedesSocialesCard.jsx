import React from 'react';
import { Box, Card, CardContent, Grid, IconButton, Link, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const RedesSocialesCard = () => {
  const redesSociales = [
    {
      id: 1,
      nombre: 'Facebook',
      enlace: 'https://www.facebook.com/tu_perfil'
    },
    {
      id: 2,
      nombre: 'Instagram',
      enlace: 'https://www.instagram.com/tu_perfil'
    },
    {
      id: 3,
      nombre: 'LinkedIn',
      enlace: 'https://www.linkedin.com/in/tu_perfil'
    },    
  ];

  return (
    <Card sx={{ minHeight: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Redes
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
          {redesSociales.map(redSocial => (
            <Grid container spacing={1} alignItems="center" key={redSocial.id}>
              <Grid item>
                <IconButton sx={{ color: '#33333' }}>
                  {redSocial.nombre === 'Facebook' && <FacebookIcon />}
                  {redSocial.nombre === 'Instagram' && <InstagramIcon />}
                  {redSocial.nombre === 'LinkedIn' && <LinkedInIcon />}
                </IconButton>
              </Grid>
              <Grid item>
                <Link href={redSocial.enlace} target="_blank" rel="noopener noreferrer" underline="none" color="inherit">
                  {redSocial.nombre}
                </Link>
              </Grid>
            </Grid>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
