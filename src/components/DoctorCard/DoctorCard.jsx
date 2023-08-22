import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Avatar, Box, } from '@mui/material';
import { SacarTurnoCard } from '../SacarTurnoCard/SacarTurnoCard';
import { Valoraciones } from '../Reviews/Reviews';
import { ReseñasCard } from '../ReseñasCard/ReseñasCard';

export const DoctorCard = ({ doctor, turnos, dates }) => {
    const doc = doctor;
    
    return (
        <Card sx={{ display: doc.subscription ? 'flex' : 'none', flexDirection: {xs: 'column', md: 'row'}, flexGrow: 1, flexWrap: 'noWrap'}}>            
                <CardContent sx={{  width: {xs: 'inherit', md: 1 / 2}, marginLeft: {xs: 'none', md: 2}, display: 'flex', flexDirection: 'column', gap: 1, borderRight: {sx: 'none', md: 'solid 1px gray'}, borderBottom: {xs: 'solid 1px gray', md: 'none'}}}>
                    <Box sx={{ display: 'flex', gap: 3, }}>
                        <Avatar src={doc.profile_picture_url} sx={{ height: 100, width: 100 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography variant="h5" component="div">
                                {doc.name + ' ' + doc.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {doc.category}
                            </Typography>
                            {/* <Rating name="read-only" value={5} readOnly /> */}
                        </Box>
                    </Box>
                    <Box sx={{display:"flex", flexDirection:"column", gap: 2}}>
                        <Typography variant='h5'>Dirección/es</Typography>
                        <Box sx={{ display: 'flex', gap: 1}}>
                            <AddLocationIcon />                        
                            <Typography>{`${doc.state}, ${doc.country}`} </Typography>
                            <Typography>{doc.adress? doc.addres : "(Aún no se ha agregado una dirección)"}</Typography>
                        </Box>
                        <Valoraciones doctorId={doctor.id}/>
                        <ReseñasCard doctorId={doctor.id}/>
                    </Box>
                </CardContent>
                <CardContent sx={{  width: {xs: 'inherit', md: 1 / 2} }}>
                    <SacarTurnoCard doc={doc} turnos={turnos} dates={dates}/>
                </CardContent>
        </Card >
    );
};