import React, { useState, useEffect } from 'react';
import { IconButton, AppBar, Typography, Toolbar as AppBarToolbar, createTheme, CssBaseline, Box } from '@mui/material';
import { AddBox, Category, Palette, People, ShoppingBasket } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import axios from 'axios';
import { AdminTable } from '../../../components/Admin/AdminTable';
import { AdminNavbar } from '../../../components/Admin/AdminNavbar';

export const UserAdmin = () => {
    const [users, setUsers] = useState([]);

    const svHost = import.meta.env.VITE_HOST;

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
            await axios.patch(`${svHost}/users/${id}`);            
            getUsers()            
        }
        catch (error) {
            console.log(error);
        } 
    };

    const getUsers = async () => {
        const userData = await axios.get(`${svHost}/users`)
        setUsers(userData.data)
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ height: '100vh', }}>
                <AdminNavbar></AdminNavbar>
                <AdminTable users={users} handleUserBanState={handleUserBanState} />
            </Box>
        </ThemeProvider>
    )
}