import React, { useState, useEffect } from 'react';
import { IconButton, AppBar, Typography, Toolbar as AppBarToolbar, createTheme, CssBaseline, Box } from '@mui/material';
import { AddBox, Category, Palette, People, ShoppingBasket } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import axios from 'axios';
import { AdminTable } from '../../../components/Admin/AdminTable';

export const UserAdmin = () => {
    const [users, setUsers] = useState([])

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1a237e', // Customize your primary color
            },
            secondary: {
                main: '#f57c00', // Customize your secondary color
            },
        },
    });

    const handleUserBanState = async (id) => {
        try {
            // setLoading(true);                        
            await axios.patch(`http://localhost:4000/users/${id}`);            
            getUsers()            
        }
        catch (error) {
            console.log(error);
        } 
    };

    const getUsers = async () => {
        const userData = await axios.get('http://localhost:4000/users')
        setUsers(userData.data)
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ height: '100vh', }}>
                <AppBar position="static" sx={{ marginBottom: "28px" }}>
                    <AppBarToolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Panel Administrador
                        </Typography>
                        <IconButton color="inherit">
                            <AddBox sx={{ fontSize: '1.5rem' }} />
                        </IconButton>
                        <Typography variant="subtitle1" component={Link} to="/admin/createproduct" sx={{ cursor: 'pointer', fontSize: '0.8rem', color: 'white', textDecoration: 'none', marginRight: '8px' }}>
                            Nuevo Producto
                        </Typography>
                        <IconButton color="inherit">
                            <Category sx={{ fontSize: '1.5rem' }} />
                        </IconButton>
                        <Typography variant="subtitle1" component={Link} to="/admin/createcategoria" sx={{ cursor: 'pointer', fontSize: '0.8rem', color: 'white', textDecoration: 'none', marginRight: '8px' }}>
                            Nueva Categoría
                        </Typography>
                        <IconButton color="inherit">
                            <Palette sx={{ fontSize: '1.5rem' }} />
                        </IconButton>
                        <Typography variant="subtitle1" component={Link} to="/admin/createcolor" sx={{ cursor: 'pointer', fontSize: '0.8rem', color: 'white', textDecoration: 'none', marginRight: '8px' }}>
                            Nuevo Color
                        </Typography>
                        <IconButton color="inherit">
                            <People sx={{ fontSize: '1.5rem' }} />
                        </IconButton>
                        <Typography variant="subtitle1" component={Link} to="/admin/usuarios" sx={{ cursor: 'pointer', fontSize: '0.8rem', color: 'white', textDecoration: 'none', marginRight: '8px' }}>
                            Usuarios
                        </Typography>
                        <IconButton color="inherit">
                            <ShoppingBasket sx={{ fontSize: '1.5rem' }} />
                        </IconButton>
                        <Typography variant="subtitle1" component={Link} to="/admin/ventas" sx={{ cursor: 'pointer', fontSize: '0.8rem', color: 'white', textDecoration: 'none', marginRight: '8px' }}>
                            Ventas
                        </Typography>
                    </AppBarToolbar>
                </AppBar>
                <AdminTable users={users} handleUserBanState={handleUserBanState} />
            </Box>
        </ThemeProvider>
    )
}