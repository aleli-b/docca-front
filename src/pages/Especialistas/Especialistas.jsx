import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, CircularProgress, Container } from '@mui/material';
import CategoryNavbar from '../../components/CategoryNavbar/CategoryNavbar';
import axios from 'axios';
import { DoctorCard } from '../../components/DoctorCard/DoctorCard';
import './Especialistas.css'


export const Especialistas = () => {
    const [doctors, setDoctors] = React.useState([])
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        getDoctors();
    }, []);   

    const getDoctors = async () => {
        const userData = await axios.get('http://localhost:4000/doctors');
        setDoctors(userData.data);
    }

    const handleCategoryChange = async (category) => {
        try {
            setLoading(true);
            if (category === 'todos') {
                getDoctors();
            } else {
                const response = await axios.get(`http://localhost:4000/users/categories/${category}`);
                setDoctors(response.data);
            }
        } catch (error) {
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <CssBaseline />
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',                    
                }}>
                <CategoryNavbar onCategoryChange={handleCategoryChange} />
                <Box
                    sx={{
                        borderRadius: '12px',
                        padding: 4,
                    }}
                    id="doctor-container"
                >
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                            <CircularProgress />
                        </Box>
                    ) :
                        (<Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: 5,
                            borderRadius: '12px',
                        }}>
                            {
                                doctors.length > 0 ? (
                                    doctors.map(doctor => (
                                        <DoctorCard key={doctor.id} doctor={doctor} />
                                    ))
                                ) : (
                                    <Typography variant="body1">No se encontraron doctores en esta categoría.</Typography>
                                )
                            }
                        </Box>)}
                </Box>
            </Container>
        </>
    );
};


