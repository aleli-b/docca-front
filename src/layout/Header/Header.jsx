import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useAuth } from '../../components/context/AuthContext';
import './Header.css'
import { useNavigate } from 'react-router-dom';
import docca from '../../assets/Ic2.svg'

export const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const auth = useAuth();
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate('/perfil');
    };

    const handleAdmin = () => {
        navigate('/admin');
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="static" id='navBar'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>                    
                    <img src={docca} style={{ height: '5rem', width: '5rem'}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                            marginRight: '1.5em'
                        }}
                    >
                        DOCAPPOINT
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            {/* <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">CONSULTA RAPIDA</Typography>
                            </MenuItem> */}

                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">ESPECIALISTAS</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                    <LocalHospitalIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DOCAPPOINT
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        {/* <Button
                            variant="text"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            href="/consulta"
                        >
                            CONSULTA RAPIDA
                        </Button> */}

                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            href="/especialistas"
                        >
                            ESPECIALISTAS
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', flexGrow: 0, flexDirection: 'row', }}>
                        {
                            auth.user
                                ?
                                <div>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={() => {handleCloseUserMenu(); handleProfile()}}>
                                            <Typography textAlign="center">PERFIL</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => {handleCloseUserMenu()}}>
                                            <Typography textAlign="center">MIS CONSULTAS</Typography>
                                        </MenuItem>
                                        {
                                            auth.user.userType === 'doctor' &&
                                        <MenuItem onClick={() => {handleCloseUserMenu()}}>
                                            <Typography textAlign="center">AGENDA</Typography>
                                        </MenuItem>
                                        }
                                        <MenuItem onClick={() => {handleCloseUserMenu()}}>
                                            <Typography textAlign="center">MEDIOS DE PAGO</Typography>
                                        </MenuItem>
                                        {
                                            auth.user.userType === 'doctor' &&
                                        <MenuItem onClick={() => {handleCloseUserMenu(); handleAdmin()}}>
                                            <Typography textAlign="center">ADMIN</Typography>
                                        </MenuItem>
                                        }

                                        <MenuItem onClick={auth.logout}>
                                            <Typography textAlign="center">CERRAR SESION</Typography>
                                        </MenuItem>

                                    </Menu>
                                </div>
                                :
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ mr: 2, color: 'white', display: 'block', }}
                                    href="login"
                                >
                                    INICIO SESION
                                </Button>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
