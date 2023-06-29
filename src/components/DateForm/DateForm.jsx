import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography, Box, Button, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export const DateForm = () => {
    const [occupiedDates, setOccupiedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const auth = useAuth();

    useEffect(() => {
        const fetchOccupiedDates = async () => {
            try {
                const response = await axios.get('http://localhost:4000/turnos', {
                    headers: {
                        authorization: auth.token
                    }
                });
                // const backendOccupiedDates = response.data;
                const backendOccupiedDates = ['2023-06-29', '2023-07-05', '2023-07-10'];
                console.log(backendOccupiedDates.data)
                setOccupiedDates(backendOccupiedDates);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOccupiedDates();
    }, []);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedDate) {
            return;
        }

        try {
            setSubmitting(true);
            // Realiza la llamada a tu endpoint utilizando Axios
            await axios.post('http://localhost:4000/turnos', { date: selectedDate, userId: auth.user.id }, {
                headers: {
                    authorization: auth.token
                }
            }); // Reemplaza 'API_ENDPOINT' por la URL de tu endpoint
            // Realiza las acciones necesarias después de enviar los datos, como mostrar una notificación de éxito, redireccionar, etc.
            console.log('Formulario enviado con éxito');
        } catch (error) {
            console.log('Error al enviar el formulario:', error);
            // Realiza las acciones necesarias en caso de error, como mostrar un mensaje de error, etc.
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
            <Typography variant="h6" component="h2" gutterBottom>
                Seleccione una fecha:
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
                                occupiedDates.map((date) => (
                                    <MenuItem key={date} value={date} disabled>
                                        <Typography variant="body2">{date} (Ocupada)</Typography>
                                    </MenuItem>
                                ))
                            )}
                            {Array.from({ length: 30 }).map((_, index) => {
                                const date = new Date();
                                date.setDate(date.getDate() + index);
                                const formattedDate = date.toISOString().split('T')[0];
                                return (
                                    !occupiedDates.includes(formattedDate) && (
                                        <MenuItem key={formattedDate} value={formattedDate}>
                                            {formattedDate}
                                        </MenuItem>
                                    )
                                );
                            })}
                        </Select>
                    </FormControl>
                    <Box sx={{ marginTop: 2 }}>
                        <Button type="submit" variant="contained" disabled={submitting} sx={{ backgroundColor: '#82BF45', '&:hover': {backgroundColor: '#037F8C'} }}>
                            {submitting ? <CircularProgress size={24} /> : 'Enviar'}
                        </Button>
                    </Box>
                </form>
            )}
        </Box>
    );
};
