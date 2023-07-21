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
        const backendTurnos = response.data.map((turno, i) => {
          const formattedDate = moment(turno.date).format('DD [de] MMMM');
          const hour = moment(turno.date).format('HH:mm');
          return { id: response.data[i].id, dateTime: `${formattedDate} ${hour}`, name: response.data[i].paciente };
        });
        setTurnos(backendTurnos)
        console.log(backendTurnos)
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
  // const turnos = [
  //   {
  //     id: 1,
  //     fecha: '2023-06-28',
  //     usuario: 'Juan Pérez',
  //     hora: '10:00'
  //   },
  //   {
  //     id: 2,
  //     fecha: '2023-06-30',
  //     usuario: 'María López',
  //     hora: '11:00'
  //   },
  //   {
  //     id: 3,
  //     fecha: '2023-07-02',
  //     usuario: 'Pedro Gómez',
  //     hora: '12:00'

  //   }
  // ];

  const style = {
    width: '100%',
    maxWidth: 2000,
    bgcolor: 'background.paper ',

  };
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
                <ListItemText primary={turno.dateTime} secondary={turno.name ? `Con el Paciente: ${turno.name.name} ${turno.name.lastName}` : 'Doctor no encontrado'} />
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