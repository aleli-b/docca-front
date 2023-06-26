import React from 'react'
import { IconButton, AppBar, Typography, Toolbar as AppBarToolbar, createTheme, CssBaseline, Box } from '@mui/material';
import { AddBox, Category, Palette, People, ShoppingBasket } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const AdminNavbar = () => {
    return (
        <AppBar position="static" sx={{ marginBottom: "28px" }}>
            <AppBarToolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Panel Administrador
                </Typography>
                {/* <IconButton color="inherit">
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
                </Typography> */}
            </AppBarToolbar>
        </AppBar>
    )
}
