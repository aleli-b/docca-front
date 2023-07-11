import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

export const TurnosCard = () => {
  const turnos = [
    {
      id: 1,
      fecha: '2023-06-28',
      usuario: 'Juan Pérez'
    },
    {
      id: 2,
      fecha: '2023-06-30',
      usuario: 'María López'
    },
    {
      id: 3,
      fecha: '2023-07-02',
      usuario: 'Pedro Gómez'
    }
  ];

  return (
    <Card sx={{  }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Turnos Ocupados
        </Typography>
        <List sx={{ mt: 2 }}>
          {turnos.map(turno => (
            <ListItem key={turno.id}>
              <ListItemText primary={turno.fecha} secondary={`Usuario: ${turno.usuario}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}