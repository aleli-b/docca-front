import React from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material'
import titan from '../../assets/titan.jpg'
import axios from 'axios';
import { ReseñasCard } from '../../components/ReseñasCard/ReseñasCard';
import { RedesSocialesCard } from '../../components/RedesSocialesCard/RedesSocialesCard';
import { TurnosCard } from '../../components/TurnosCard/TurnosCard';

export const Perfil = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    user.fullName = user.name + " " + user.lastName;
    user.category = user.category[0].toUpperCase() + user.category.substring(1);
    user.userType = user.userType[0].toUpperCase() + user.userType.substring(1);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', paddingX: '20px', margin: 3.2 }}>
            <Grid container spacing={2} sx={{ margin: '' }}>
                <Grid item md={4} sx={{ marginRight: '', }}>
                    <Card sx={{ border: 'solid black 1px' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <CardMedia sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'gray', width: '100%', borderRadius: '2px', padding: 2 }}>
                            <Avatar alt={user.fullName} src={titan} sx={{ width: 180, height: 180, border: 'solid white 5px' }} />

                        </CardMedia>
                            <Box className='text2' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h5" component="div" text-align="center">
                                    {user.fullName}
                                </Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={5}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis nostrum ut eos tenetur earum nobis animi quas
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={8}>
                    <Card sx={{ border: 'solid black 1px' }}>
                        <CardContent >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid white 1px', padding: '18.7px' }}>
                                <Typography>Nombre:</Typography>
                                <Typography>{user.name}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid white 1px', padding: '18.7px' }}>
                                <Typography>Apellido:</Typography>
                                <Typography>{user.lastName}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid white 1px', padding: '18.7px' }}>
                                <Typography>Correo:</Typography>
                                <Typography>{user.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid white 1px', padding: '18.7px' }}>
                                <Typography>Tipo de Usuario:</Typography>
                                <Typography>{user.userType}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid white 1px', padding: '18.7px' }}>
                                <Typography>Especialidad:</Typography>
                                <Typography>{user.category}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <RedesSocialesCard />
                </Grid>
                <Grid item md={4}>
                    <ReseñasCard />
                </Grid>
                <Grid item md={4}>
                    <TurnosCard />
                </Grid>
            </Grid>
        </Box>
    )
}
