import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Slide } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import moment from 'moment';
import axios from 'axios';

export const SacarTurnoCard = ({ doc }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [occupiedTurnos, setOccupiedTurnos] = useState([]);

  const auth = useAuth();
  const doctor = doc;

  const svHost = import.meta.env.VITE_HOST;

  useEffect(() => {
    fetchOccupiedTurnos();
  }, []);

  useEffect(() => {
    console.log('Component re-rendered.');
  }, []);

  useEffect(() => {
    console.log('Updated occupiedTurnos state:', occupiedTurnos);
  }, [occupiedTurnos]);

  const fetchOccupiedTurnos = async () => {
    try {
      const response = await axios.get(`${svHost}/turnos-ocupados?doctorId=${doc.id}`);
      console.log('esta es la response: ', response)
      console.log('esta es la response.data: ', response.data)
      if (response.status === 200) {
        const backendOccupiedDates = response.data.map((turno) => {
          const formattedDate = moment(turno.date).format('DD [de] MMMM');
          const hour = moment(turno.date).format('HH:mm');
          return { dateTime: `${formattedDate} ${hour}`, doctorId: turno.doctorId };
        });
        setOccupiedTurnos(backendOccupiedDates);
        console.log('este es el backendOccupiedDates: ', backendOccupiedDates)
        console.log('este es el state de los turnos: ', occupiedTurnos)
      } else {
        console.log('Failed to fetch occupied turnos:', response.status);
      }
    } catch (error) {
      console.error('Error fetching occupied turnos:', error);
    }
  };


  const generateDates = () => {
    const today = moment();
    const daysOfWeekSpanish = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const generatedDates = [];

    for (let i = 0; i < 30; i++) {
      const date = today.clone().add(i, 'days');
      const formattedDate = date.format('D [de] MMMM');
      const dayOfWeek = daysOfWeekSpanish[date.day()];

      const timeSlots = [];
      const startTime = moment('09:00', 'HH:mm');
      const endTime = moment('13:00', 'HH:mm');
      const interval = moment.duration(1, 'hours');

      while (startTime <= endTime) {
        timeSlots.push(startTime.format('HH:mm'));
        startTime.add(interval);
      }

      let label;
      if (i === 0) {
        label = 'Hoy';
      } else if (i === 1) {
        label = 'Mañana';
      } else {
        label = dayOfWeek;
      }

      generatedDates.push({ label, day: formattedDate, time: timeSlots });
    }

    return generatedDates;
  };

  const dates = generateDates();

  const endIndex = Math.min(startIndex + 4, dates.length);

  const handlePrevClick = () => {
    setStartIndex(Math.max(startIndex - 1, 0));
  };

  const handleNextClick = () => {
    setStartIndex(Math.min(startIndex + 1, dates.length - 4));
  };

  const addTurno = async (date, userId, doctorId) => {
    try {
      const response = await axios.post(
        `${svHost}/turnos`,
        {
          date,
          userId,
          doctorId,
        },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log('Turno added successfully:', data);
      } else {
        console.log('Failed to add turno:', response.status);
      }
    } catch (error) {
      console.error('Error adding turno:', error);
    }
  };

  const handleTimeClick = (dateTime) => {
    const userId = auth.user.id;
    const doctorId = doctor.id;

    addTurno(dateTime, userId, doctorId);
  };

  const isTurnoOccupied = (dateTime) => {
    const occupied = occupiedTurnos.find((turno) => {
      return turno.dateTime === dateTime && turno.doctorId === doctor.id;
    });

    return occupied ? true : false;
  };



  return (
    <div>      
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'nowrap' }}>
          <IconButton onClick={handlePrevClick} disabled={startIndex === 0} sx={{ height: '50px', width: '50px', marginTop: 1 }}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          {dates.slice(startIndex, endIndex).map((date, i) => (
            <Grid item xs={3} key={i} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography component="div">{date.label}</Typography>
              <Typography variant="body2" gutterBottom color="text.secondary" component="div">
                {date.day}
              </Typography>
              {date.time.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {date.time?.map((time, j) => (
                    <Button
                      key={j}
                      variant="outlined"
                      onClick={() => handleTimeClick(`${date.day} ${time}`)}
                      disabled={isTurnoOccupied(`${date.day} ${time}`)}
                      sx={{
                        textDecoration: isTurnoOccupied(`${date.day} ${time}`) ? 'line-through' : 'none',
                      }}
                    >
                      {time}
                    </Button>
                  ))}
                </Box>
              )}
            </Grid>
          ))}
          <IconButton onClick={handleNextClick} disabled={endIndex >= dates.length} sx={{ height: '50px', width: '50px', marginTop: 1 }}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Grid>
    </div>
  );
};
