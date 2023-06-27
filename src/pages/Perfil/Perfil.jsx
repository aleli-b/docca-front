import React from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material'
import titan from '../../assets/titan.jpg'
import axios from 'axios';

export const Perfil = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    user.fullName = user.name + " " + user.lastName;

    return (
        <>
            <Grid container sx={{ height: '100dvh' }}>
                <Grid item md={8} sx={{ display: 'flex', alignItems: 'center', gap: 3, flexDirection: {xs: 'column', md: 'row'}}}>
                    
                        {/* <CardMedia
                                component="img"
                                sx={{}}
                                alt={user.name + " " + user.lastName}
                                // height="240"
                                image={titan}
                                className='perfil1'
                            /> */}
                            <Avatar alt={user.fullName} src={titan} sx={{ width: 200, height: 200, border: 'solid white 5px' }} />
                            <Box className='text2'>
                                <Typography gutterBottom variant="h5" component="div" text-align="center">
                                    {user.fullName}
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div" text-align="center">
                                    {user.category}
                                </Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={5}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis nostrum ut eos tenetur earum nobis animi quas
                                </Typography>
                        {/* <CardActions>
                            <Button size='large' variant='outlined' color='primary'>Contacto</Button>
                            <Button size='large' variant='outlined' color='error'>Reportar</Button>
                        </CardActions> */}
                        </Box>                    
                </Grid>
                {/* <Grid item md={4}>
                    <Card>
                        <CardContent >
                            <Avatar alt={user.fullName} src={titan} sx={{ width: 200, height: 200, border: 'solid white 5px' }} />
                            <Box className='text2'>
                                <Typography gutterBottom variant="h5" component="div" text-align="center">
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
                </Grid> */}
            </Grid>
            <Grid container>

            </Grid>
        </>
    )
}
