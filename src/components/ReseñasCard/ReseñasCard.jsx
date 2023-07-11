import React from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';

export const ReseñasCard = () => {
  const reseñas = [
    {
      id: 1,
      nombre: 'Usuario1',
      contenido: '¡Excelente servicio! Muy profesional y amable. Lo recomiendo sin duda.',
      avatar: 'avatar1.jpg'
    },
    {
      id: 2,
      nombre: 'Usuario2',
      contenido: 'Me encantó trabajar con esta persona. Hizo un trabajo increíble y cumplió con todas mis expectativas.',
      avatar: 'avatar2.jpg'
    },
    {
      id: 3,
      nombre: 'Usuario3',
      contenido: 'Muy satisfecho con el resultado. Sin duda volveré a contactar para futuros proyectos.',
      avatar: 'avatar3.jpg'
    }
  ];

  return (
    <Card sx={{  }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Reseñas
        </Typography>
        {reseñas.map(reseña => (
          <Box key={reseña.id} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Avatar alt={reseña.nombre} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle1" component="div">
                {reseña.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {reseña.contenido}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}