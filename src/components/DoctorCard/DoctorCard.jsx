import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import titan from '../../assets/titan.jpg'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Avatar, Box, Button, CardActionArea, CardHeader, Slide } from '@mui/material';
import { SacarTurnoCard } from '../SacarTurnoCard/SacarTurnoCard';

export const DoctorCard = ({ doctor, turnos }) => {
    const doc = doctor;

    return (
        <Card sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>            
                <CardContent sx={{ width: 1 / 2, marginLeft: 2, display: 'flex', flexDirection: 'column', gap: 1, borderRight: 'solid 1px gray' }}>
                    <Box sx={{ display: 'flex', gap: 3, }}>
                        <Avatar src={titan} sx={{ height: 100, width: 100 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography variant="h5" component="div">
                                {doc.name + ' ' + doc.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {doc.category}
                            </Typography>
                            <Rating name="read-only" value={5} readOnly />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant='h5'>Dirección/es</Typography>
                        <Box sx={{ display: 'flex', gap: 1, paddingTop: 2}}>
                            <AddLocationIcon />
                            <Typography>Corrientes 4567, CABA, Argentina</Typography>
                        </Box>
                    </Box>
                </CardContent>
                <CardContent sx={{ width: 1 / 2 }}>
                    <SacarTurnoCard doc={doc} turnos={turnos} />
                </CardContent>
        </Card >
    );
};