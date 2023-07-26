import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useAuth } from '../context/AuthContext';
import moment from 'moment-timezone';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

moment.updateLocale('es', {
  months: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthsShort: [
    'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
  ]
});

export const SacarTurnoCard = React.memo(({ doc, turnos }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [numColumns, setNumColumns] = useState(4);

  const auth = useAuth();
  const doctor = doc;
  const occupiedTurnos = turnos;

  const svHost = import.meta.env.VITE_HOST;

  const updateNumColumns = () => {
    if (window.innerWidth < 600) {
      setNumColumns(1);
    } else if (window.innerWidth < 960) {
      setNumColumns(2);
    } else {
      setNumColumns(4);
    }
  }

  useEffect(() => {
    updateNumColumns();
    window.addEventListener('resize', updateNumColumns);
    return () => {
      window.removeEventListener('resize', updateNumColumns);
    };
  }, []);

  const generateDates = () => {
    const today = moment();
    const daysOfWeekSpanish = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const generatedDates = [];

    for (let i = 0; i < 30; i++) {
      const date = today.clone().add(i, 'days');
      const formattedDate = date.format('DD [de] MMMM');
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

  const endIndex = Math.min(startIndex + numColumns, dates.length);

  const handlePrevClick = () => {
    setStartIndex(Math.max(startIndex - 1, 0));
  };

  const handleNextClick = () => {
    setStartIndex(Math.min(startIndex + 1, dates.length - 4));
  };

  const addTurno = async (date, userId, doctorId) => {
    try {
      const formattedDateUTC = moment(date, 'D [de] MMMM HH:mm').format('YYYY-MM-DD HH:mm');
      const response = await axios.post(
        `${svHost}/turnos`,
        {
          date: formattedDateUTC,
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
        toast.success('Turno sacado con exito!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    } catch (error) {
      const status = error.response ? error.response.status : null;
      if (status === 400) {
        toast.error('El usuario ya tiene turno', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } else {
        toast.error('Error al sacar turno', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    }
  };

  const handleTimeClick = (dateTime) => {
    try {
      const userId = auth.user.id
      const doctorId = doctor.id
      addTurno(dateTime, userId, doctorId);
    } catch (error) {
      toast.error('Debes iniciar sesion', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
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
          <Grid item xs={12} md={3} key={i} sx={{ display: 'flex', flexDirection: 'column' }}>
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
});
