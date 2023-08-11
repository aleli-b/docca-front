import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Avatar, Box, } from '@mui/material';
import { SacarTurnoCard } from '../SacarTurnoCard/SacarTurnoCard';

export const DoctorCard = ({ doctor, turnos, dates }) => {
    const doc = doctor;
    
    return (
        <Card sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, flexGrow: 1, flexWrap: 'noWrap'}}>            
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
                    <Box sx={{ }}>
                        <Typography variant='h5'>Dirección/es</Typography>
                        <Box sx={{ display: 'flex', gap: 1, paddingTop: 2}}>
                            <AddLocationIcon />
                            <Typography>{doc.adress || "Aún no se ha agregado una dirección"}</Typography>
                        </Box>
                    </Box>
                </CardContent>
                <CardContent sx={{  width: {xs: 'inherit', md: 1 / 2} }}>
                    <SacarTurnoCard doc={doc} turnos={turnos} dates={dates}/>
                </CardContent>
        </Card >
    );
};