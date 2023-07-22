import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import titan from '../../assets/titan.jpg'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Avatar, Box, } from '@mui/material';
import { SacarTurnoCard } from '../SacarTurnoCard/SacarTurnoCard';

export const DoctorCard = ({ doctor, turnos }) => {
    const doc = doctor;
    doc.category = doc.category[0].toUpperCase() + doc.category.substring(1);

    return (
        <Card sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, flexGrow: 1, flexWrap: 'noWrap'}}>            
                <CardContent sx={{  width: {xs: 'inherit', md: 1 / 2}, marginLeft: {xs: 'none', md: 2}, display: 'flex', flexDirection: 'column', gap: 1, borderRight: {sx: 'none', md: 'solid 1px gray'}, borderBottom: {xs: 'solid 1px gray', md: 'none'}}}>
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
                    <Box sx={{ }}>
                        <Typography variant='h5'>Dirección/es</Typography>
                        <Box sx={{ display: 'flex', gap: 1, paddingTop: 2}}>
                            <AddLocationIcon />
                            <Typography>Corrientes 4567, CABA, Argentina</Typography>
                        </Box>
                    </Box>
                </CardContent>
                <CardContent sx={{  width: {xs: 'inherit', md: 1 / 2} }}>
                    <SacarTurnoCard doc={doc} turnos={turnos} />
                </CardContent>
        </Card >
    );
};