import React from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Divider, FormControlLabel, Grid, Paper, Rating, Stack, Typography, styled } from '@mui/material'
import titan from '../../../assets/titan.jpg'
import axios from 'axios';
import { TurnosCardPacientes } from '../../../components/TurnosCardPacientes/TurnosCardPacientes';
import { Mensajeria } from '../../../components/Mensajeria/Mensajeria';

export const PerfilPacientes = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    user.fullName = user.name + " " + user.lastName;
    // user.category = user.category[0].toUpperCase() + user.category.substring(1);
    user.userType = user.userType[0].toUpperCase() + user.userType.substring(1);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#D5DBDB  ',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', paddingX: '20px', margin: 3.2 }}>
            <Grid container spacing={2} sx={{ margin: '' }}>
                <Grid sx={{ display: "flex", flexDirection: "column", gap: 3 }} item md={4} >
                    <Card sx={{ display: "flex", gap: 3,  }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <CardMedia sx={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '2px', padding: 2, }}>
                                <Avatar
                                    alt={user.fullName}
                                    src={titan} 
                                    sx={{ width: 180, height: 180,  }} />
                            </CardMedia>
                            <Box className='text2' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h5" component="div" text-align="center">
                                    {user.fullName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis nostrum ut eos tenetur earum nobis animi quas
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Mensajeria />
                </Grid>
                <Grid item md={8}>
                    <Card sx={{  }}>
                        <CardContent >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid white 1px', padding: '18.7px' }}>
                                <Typography>Nombre:</Typography>
                                <Box sx={{ width: '25%' }}>
                                    <Stack spacing={2}>
                                        <Item>{user.name}</Item>
                                    </Stack>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid white 1px', padding: '18.7px' }}>
                                <Typography>Apellido:</Typography>
                                <Box sx={{ width: '25%' }}>
                                    <Stack spacing={2}>
                                        <Item>{user.lastName}</Item>
                                    </Stack>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid white 1px', padding: '18.7px' }}>
                                <Typography>Correo:</Typography>
                                <Box sx={{ width: '25%' }}>
                                    <Stack spacing={2}>
                                        <Item>{user.email}</Item>

                                    </Stack>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid white 1px', padding: '18.7px' }}>
                                <Typography>Tipo de Usuario:</Typography>
                                <Box sx={{ width: '25%' }}>
                                    <Stack spacing={2}>
                                        <Item>{user.userType}</Item>
                                    </Stack>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid white 1px', padding: '18.7px' }}>
                                <Typography>Telefono:</Typography>
                                <Box sx={{ width: '25%' }}>
                                    <Stack spacing={2}>
                                        <Item>381-420-3435</Item>
                                    </Stack>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid white 1px', padding: '18.7px' }}>
                                <Typography>Notificaciones:
                                    <FormControlLabel
                                        sx={{ borderBottom: 'solid white 1px', padding: '18.7px' }}
                                        control={<Checkbox defaultChecked />} label="Recibir" />
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <TurnosCardPacientes />
                </Grid>
            </Grid>
        </Box>
    )
}
