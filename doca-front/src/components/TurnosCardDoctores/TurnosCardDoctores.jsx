import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../context/AuthContext';

export const TurnosCardDoctores = () => {
  const [turnos, setTurnos] = useState([]);

  const auth = useAuth();

  const svHost = import.meta.env.VITE_HOST;

  async function getBackendTurnos() {
    try {
      const response = await axios.post(`${svHost}/doctor-turnos`, {
        doctorId: auth.user.id
      })
      if (response.status === 200) {
        setTurnos(response.data)
      } else {
        console.log('Failed to fetch occupied turnos:', response.status);
      }
    } catch (error) {
      console.error('Error fetching occupied turnos:', error);
    }
  };

  useEffect(() => {
    getBackendTurnos();
  }, []);

  return (
    <Card sx={{ minHeight: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Turnos Reservados
        </Typography>
        <List sx={{ mt: 2 }}>
          {turnos.length > 0 ? (
            turnos.map((turno) => (
              <ListItem key={turno.id}>
                <ListItemText primary={turno.date} secondary={turno.paciente ? `Con el Paciente: ${turno.paciente.name} ${turno.paciente.lastName}` : 'Doctor no encontrado'} />
              </ListItem>
            ))
          ) : (
            <Typography>No hay turnos</Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
}