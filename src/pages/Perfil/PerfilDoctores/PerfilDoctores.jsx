import React, { useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material'
import titan from '../../../assets/titan.jpg'
import { RedesSocialesCard } from '../../../components/RedesSocialesCard/RedesSocialesCard';
import { TurnosCardDoctores } from '../../../components/TurnosCardDoctores/TurnosCardDoctores';
import { useAuth } from '../../../components/context/AuthContext';
import { EditModal } from '../../../components/EditModal/EditModal';
import EditIcon from '@mui/icons-material/Edit';
import './styles.css'
import axios from 'axios';

export const PerfilDoctores = () => {
    const { user, editUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState('');
    const [newValue, setNewValue] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    user.fullName = user.name + " " + user.lastName;
    user.userType = user.userType[0].toUpperCase() + user.userType.substring(1);

    const svHost = import.meta.env.VITE_HOST;

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleSaveField = (field, value) => {
        try {
            editUser({ [field]: value });
        } catch (error) {
            console.error('Ha habido un error')
        }
    };

    const handleImageUpload = () => {
        const formData = new FormData();
        formData.append('image', selectedImage);

        axios.post(`${svHost}/upload/${user.id}`, formData)
            .then((response) => {
                console.log('Image uploaded successfully:', response.data);
                // Handle any success response from the backend if needed
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
                // Handle any error that occurred during the upload
            });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', paddingX: '20px', margin: 3.2, minHeight: '77.5dvh' }}>
            <Grid container spacing={2} sx={{ margin: '' }}>
                <Grid item md={4} xs={12} sx={{}}>
                    <Card sx={{ minHeight: "100%" }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <CardMedia
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                    borderRadius: '2px',
                                    padding: 2,
                                    position: 'relative', // Add position relative to the CardMedia container
                                }}
                            >
                                <Avatar alt={user.fullName} src={user.profile_picture_url} sx={{ width: 180, height: 180 }} />
                                {isHovered && ( // Show the prompt when the avatar is hovered
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'rgba(0, 0, 0, 0.7)',
                                            color: '#fff',
                                            padding: '8px 12px',
                                            borderRadius: '4px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Subir Foto (No disponible)
                                    </Box>
                                )}
                            </CardMedia>

                            <Box className='text2' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h5" component="div" text-align="center">
                                    {user.fullName}
                                </Typography>
                                {/* <Rating
                                    name="simple-controlled"
                                    value={5}
                                /> */}
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
                </Grid>
                <Grid item md={8} xs={12}>
                    <Card sx={{ minHeight: '100%' }}>
                        <CardContent >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>Nombre:</Typography>
                                <Typography>{user.name}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>Apellido:</Typography>
                                <Typography>{user.lastName}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>Correo:</Typography>
                                <Typography>{user.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>Tipo de Usuario:</Typography>
                                <Typography>{user.userType}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>Especialidad:</Typography>
                                <Typography>{user.category}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '18.7px' }}>
                                <Typography>Teléfono:</Typography>
                                <Box>
                                    {user.phone || 'No has añadido un teléfono'}
                                    <Button onClick={() => {
                                        setFieldToEdit('phone');
                                        setNewValue(user.phone || '');
                                        setEditing(true);
                                    }}>
                                        <EditIcon />
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <RedesSocialesCard />
                </Grid>
                {/* <Grid item md={4} xs={12}>
                    <ReseñasCard />
                </Grid> */}
                <Grid item md={8} xs={12}>
                    <TurnosCardDoctores />
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
