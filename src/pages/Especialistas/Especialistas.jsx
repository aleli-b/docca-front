import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, CircularProgress, Grid } from '@mui/material';
import CategoryNavbar from '../../components/CategoryNavbar/CategoryNavbar';
import axios from 'axios';
import { DoctorCard } from '../../components/DoctorCard/DoctorCard';
import { FilterSideBar } from '../../components/FilterSideBar/FilterSideBar';
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
            if (category === '') {
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
            <Grid container
                sx={{
                    display: 'flex',
                    minHeight: '100vh',
                    padding: 4,
                    justifyContent: 'center'
                }} spacing={2}>
                {/* <CategoryNavbar onCategoryChange={handleCategoryChange} /> */}
                <Grid item md={2}>
                    <FilterSideBar handleCategoryChange={handleCategoryChange} />
                </Grid>
                <Grid item
                    sx={{
                        
                    }}
                    id="doctor-container"
                    md={10}
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
                </Grid>                
            </Grid>
        </>
    );
};


