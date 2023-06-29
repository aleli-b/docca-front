import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography, Box, Button, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export const DateForm = ({ doc }) => {
    const [occupiedDates, setOccupiedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [availableHours, setAvailableHours] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);

    const auth = useAuth();
    const doctor = doc;

    useEffect(() => {
        const fetchOccupiedDates = async () => {
            try {
                const response = await axios.post('http://localhost:4000/turnos-ocupados', {
                    doctorId: doctor.id
                },
                {
                        headers: {
                            authorization: auth.token
                        }
                    });
                const backendOccupiedDates = response.data.map(turno => {
                    const date = new Date(turno.date);
                    const formattedDate = date.toISOString().split('T')[0];
                    const hour = date.toISOString().split('T')[1].slice(0, 5);
                    return { formattedDate, hour, doctorId: turno.doctorId };
                });
                setOccupiedDates(backendOccupiedDates);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };


        fetchOccupiedDates();
    }, []);

    useEffect(() => {
        const getAvailableDates = async () => {
            try {
                setLoading(true);
                // Simulación de llamada al backend con un retardo de 1 segundo
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Aquí debes obtener las horas disponibles del backend y establecerlas en el estado
                const backendAvailableDates = ['2023-06-27', '2023-06-26', '2023-06-25', '2023-06-24', '2023-06-23'];
                setAvailableDates(backendAvailableDates);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        }

        getAvailableDates();

        if (selectedDate) {
            // Aquí puedes realizar una llamada a tu backend para obtener las horas disponibles para la fecha seleccionada
            const getAvailableHours = async () => {
                try {
                    setLoading(true);
                    // Simulación de llamada al backend con un retardo de 1 segundo
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Aquí debes obtener las horas disponibles del backend y establecerlas en el estado
                    const backendAvailableHours = ['10:00', '11:00', '14:00', '15:00', '17:00'];
                    setAvailableHours(backendAvailableHours);

                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

            getAvailableHours();


        }

    }, [selectedDate]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setSelectedHour('');
    };

    const handleHourChange = (event) => {
        setSelectedHour(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedDate || !selectedHour) {
            return;
        }

        const [hour, minute] = selectedHour.split(':');
        const formattedDate = new Date(selectedDate);
        formattedDate.setHours(hour, minute, 0);

        try {
            setSubmitting(true);
            console.log('id de doctor: ', doctor.id, 'id de paciente', auth.user.id);
            await axios.post(
                'http://localhost:4000/turnos',
                { date: formattedDate.toISOString(), userId: auth.user.id, doctorId: doctor.id },
                {
                    headers: {
                        authorization: auth.token
                    }
                }
            );
            console.log('Formulario enviado con éxito');
        } catch (error) {
            console.log('Error al enviar el formulario:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
            <Typography variant="h6" component="h2" gutterBottom>
                Seleccione una fecha y hora:
            </Typography>
            {loading ? (
                <CircularProgress /> // Muestra un indicador de carga mientras se obtienen las fechas ocupadas
            ) : (
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                        <InputLabel id="date-select-label">Fecha</InputLabel>
                        <Select
                            labelId="date-select-label"
                            value={selectedDate}
                            onChange={handleDateChange}
                            label="Fecha"
                        >
                            <MenuItem value="">
                                <em>Seleccione una fecha</em>
                            </MenuItem>
                            {occupiedDates.length === 0 ? (
                                <MenuItem disabled>
                                    <em>No hay fechas ocupadas</em>
                                </MenuItem>
                            ) : (
                                occupiedDates.map(({ formattedDate }) => (
                                    <MenuItem key={formattedDate} disabled value={formattedDate}>
                                        {formattedDate}
                                    </MenuItem>
                                ))
                            )}
                            {availableDates.map((date) => (
                                <MenuItem key={date} value={date}>
                                    {date}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    {selectedDate && (
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <InputLabel id="hour-select-label">Hora</InputLabel>
                            <Select
                                labelId="hour-select-label"
                                value={selectedHour}
                                onChange={handleHourChange}
                                label="Hora"
                            >
                                <MenuItem value="">
                                    <em>Seleccione una hora</em>
                                </MenuItem>
                                {availableHours.length === 0 ? (
                                    <MenuItem disabled>
                                        <em>No hay horas disponibles</em>
                                    </MenuItem>
                                ) : (
                                    availableHours.map((hour) => (
                                        <MenuItem key={hour} value={hour}>
                                            {hour}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    )}
                    <Box sx={{ marginTop: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={submitting || !selectedDate || !selectedHour}
                            sx={{
                                backgroundColor: '#82BF45',
                                '&:hover': { backgroundColor: '#037F8C' },
                            }}
                        >
                            {submitting ? <CircularProgress size={24} /> : 'Enviar'}
                        </Button>
                    </Box>
                </form>
            )}
        </Box>
    );
};
