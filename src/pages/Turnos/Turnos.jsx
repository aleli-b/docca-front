import React, { useEffect, useState } from "react";
import { Typography, Box, TextField, FormControl, Button } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../components/context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Turnos = ({ location }) => {
  const [doctor, setDoctor] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get("doctor");
  const turno = queryParams.get("turno");
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const svHost = import.meta.env.VITE_HOST;

  useEffect(() => {
    getDoctor();
  }, []);

  const getDoctor = async () => {
    const backDoctor = await axios.get(`${svHost}/user/${doctorId}`);
    setDoctor(backDoctor.data);
  };

  const addTurno = async (date, userId, doctorId) => {
    try {
      console.log(date, userId, doctorId)
      const response = await axios.post(
        `${svHost}/turnos`,
        {
          date: date,
          userId,
          doctorId,
        },
        {
          headers: {
            authorization: token,
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
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
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

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh', justifyContent: 'center' }}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', }}>
        <Typography variant="h2">Sacar Turno</Typography>
        <TextField
          value={`Dr. ${doctor.name} ${doctor.lastName}`}
          margin="normal"
          disabled
          fullWidth
          id="firstName"
          label="Doctor"
          name="doctor"
          autoComplete="given-name"
          autoFocus
        />
        <TextField
          value={turno}
          margin="normal"
          disabled
          fullWidth
          id="turno"
          label="Fecha y Hora"
          name="date"
          autoComplete="family-name"
        />
        <Button type="button" variant="contained" color="primary" onClick={() => { addTurno(turno, user.id, doctor.id) }}>
          Agregar Turno
        </Button>
        <Typography sx={{ mt: 4}}>Si la informacion de arriba es incorrecta,</Typography>
        <Button type="button" variant="contained" color="primary" onClick={() => navigate('/') }>
          Volver al Inicio
        </Button>
      </Box>
    </Box>
  );
};
