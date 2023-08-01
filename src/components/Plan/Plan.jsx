import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom';

export const Plan = () => {
    const { userType } = useParams();
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', marginTop: 5, alignItems: 'center', gap: 9 }}>
            <Box>
                <Typography sx={{ color: '#145C6C', fontWeight: 'bold', }} variant='h2'>Conviertete en un <br />{userType === 'doctor' ? 'doctor' : 'laboratorio'} en línea!</Typography>
            </Box>
            <Box>
                <Typography sx={{ color: '#145C6C' }} variant='h4'>Nuestra plataforma permite operar facilmente con los pacientes y recibir tus honorarios de manera rápida.</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#c2c2c2', borderRadius: '10px', }}>
                    <Typography sx={{ padding: 1, color: '#145C6C', fontWeight: 'bold', fontSize: '2rem' }} variant='body1'>PLAN 1</Typography>
                    <Typography sx={{ padding: 1, color: '#145C6C', fontWeight: 'bold', fontSize: '1.5rem' }} variant='body1'>Plan integral con una sola especialidad</Typography>
                    <Typography sx={{ padding: 1, color: '#145C6C', fontWeight: 'bold', fontSize: '1.5rem' }} variant='body1'>PRECIO FINAL: <br /> <span style={{ display: 'flex', justifyContent: 'center' }}> 100USD </span></Typography>
                    <Button variant='contained' sx={{ marginTop: 4, marginBottom: 1, minWidth: '100%', maxWidth: '100%'}}>Asociarme</Button>
                </Box>
            </Box>
        </Container>
    )
}
