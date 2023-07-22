import React, { useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, CardMedia, Checkbox, FormControlLabel, Grid, Paper, Stack, Typography, styled } from '@mui/material'
import titan from '../../../assets/titan.jpg'
import { TurnosCardPacientes } from '../../../components/TurnosCardPacientes/TurnosCardPacientes';
import { Mensajeria } from '../../../components/Mensajeria/Mensajeria';
import { useAuth } from '../../../components/context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import { EditModal } from '../../../components/EditModal/EditModal';

export const PerfilPacientes = () => {
    const { user, editUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState('');
    const [newValue, setNewValue] = useState('');

    user.fullName = user.name + " " + user.lastName;
    user.userType = user.userType[0].toUpperCase() + user.userType.substring(1);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#D5DBDB  ',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleSaveField = (field, value) => {
        try {
            editUser({ [field]: value });
        } catch (error) {
            console.error('Ha habido un error')
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingX: '20px', gap: 2, minHeight: '100dvh', marginY: 2 }}>
            <Grid container spacing={2} sx={{ margin: '' }}>
                <Grid item sx={{ display: "flex", flexDirection: "column", gap: 2 }} md={4} >
                    <Card>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <CardMedia sx={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '2px', padding: 2, }}>
                                <Avatar
                                    alt={user.fullName}
                                    src={titan}
                                    sx={{ width: 180, height: 180, }} />
                            </CardMedia>
                            <Box className='text2' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h5" component="div" text-align="center">
                                    {user.fullName}
                                </Typography>
                                {user.description ? <Typography> {user.description} </Typography> : (
                                    <Button
                                        onClick={() => {
                                            setFieldToEdit('description');
                                            setNewValue(user.description || '');
                                            setEditing(true);
                                        }}
                                    >
                                        Añade una breve descripción
                                    </Button>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                    <Mensajeria />
                </Grid>
                <Grid item md={8} xs={12}>
                    <Card sx={{}}>
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
                                        <Item>{user.userType === 'Patient' && 'Paciente'}</Item>
                                    </Stack>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid white 1px', padding: '18.7px' }}>
                                <Typography>Telefono:</Typography>
                                <Box sx={{ width: '25%' }}>
                                    <Stack spacing={2}>
                                        <Item>
                                            {user.phone || 'No has añadido un teléfono'}
                                            <Button onClick={() => {
                                                setFieldToEdit('phone');
                                                setNewValue(user.phone || '');
                                                setEditing(true);
                                            }}>
                                                <EditIcon />
                                            </Button>
                                        </Item>
                                    </Stack>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid white 1px', padding: '18.7px' }}>
                                {/* <Typography>Notificaciones:
                                    <FormControlLabel
                                        sx={{ borderBottom: 'solid white 1px', padding: '18.7px' }}
                                        control={<Checkbox defaultChecked />} label="Recibir" />
                                </Typography> */}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                    <TurnosCardPacientes />
                </Grid>
            </Grid>
            <EditModal
                field={fieldToEdit}
                open={editing}
                newValue={newValue}
                setNewValue={setNewValue}
                onClose={() => setEditing(false)}
                onSave={handleSaveField}
            />
        </Box>
    )
}
