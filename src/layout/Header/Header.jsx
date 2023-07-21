import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { useMessageContext } from '../../components/context/MessageContext';
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
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useAuth } from '../../components/context/AuthContext';
import './Header.css'
import { useNavigate } from 'react-router-dom';
import docca from '../../assets/Ic2.svg'

export const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElReg, setAnchorElReg] = React.useState(null);

    React.useEffect(() => {
        handleCloseUserMenu(); // This will close the user menu when the component mounts
        return () => {
          handleCloseUserMenu(); // This will also close the user menu when navigating away from the current page
        };
      }, []);

    const auth = useAuth();
    const { conversations } = useMessageContext();
    const navigate = useNavigate();

    const totalMessages = conversations.reduce(
        (total, conversation) => total + conversation.messages.length,
        0
    );

    const handleProfile = () => {
        navigate('/perfil');
    };

    const handleAdmin = () => {
        navigate('/admin');
    };

    const handleMessages = () => {
        navigate('/messages')
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenRegMenu = (event) => {
        setAnchorElReg(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseRegMenu = () => {
        setAnchorElReg(null);
    };

    const handleRegister = (userValue) => {
        navigate(`/register-${userValue}`);
    }

    return (
        <AppBar position="static" id='navBar'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={docca} style={{ height: '5rem', width: '5rem' }} />
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
                            id="nav-appbar"
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
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">ESPECIALISTAS</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'none' },
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
                                <Container id='kilombero' sx={{ display: 'flex', alignItems: 'center', gap: 2, }}>
                                    <Container sx={{ display: 'flex', alignItems: 'center', }}>
                                        <Button sx={{ color: 'white', }} onClick={() => { handleMessages() }}>
                                            <QuestionAnswerIcon />
                                            <div style={{ backgroundColor: 'red', borderRadius: 100, textAlign: 'center', minHeight: '1.5rem', minWidth: '1.5rem ', position: 'relative', bottom: '8px' }}>{totalMessages}</div>
                                        </Button>
                                    </Container>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="user-appbar"
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
                                        <MenuItem onClick={() => { handleCloseUserMenu(); handleProfile() }}>
                                            <Typography textAlign="center">PERFIL</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleCloseUserMenu() }}>
                                            <Typography textAlign="center">MIS CONSULTAS</Typography>
                                        </MenuItem>
                                        {
                                            auth.user.userType === 'doctor' &&
                                            <MenuItem onClick={() => { handleCloseUserMenu() }}>
                                                <Typography textAlign="center">AGENDA</Typography>
                                            </MenuItem>
                                        }
                                        <MenuItem onClick={() => { handleCloseUserMenu() }}>
                                            <Typography textAlign="center">MEDIOS DE PAGO</Typography>
                                        </MenuItem>
                                        {
                                            auth.user.userType === 'doctor' &&
                                            <MenuItem onClick={() => { handleCloseUserMenu(); handleAdmin() }}>
                                                <Typography textAlign="center">ADMIN</Typography>
                                            </MenuItem>
                                        }

                                        <MenuItem onClick={auth.logout}>
                                            <Typography textAlign="center">CERRAR SESION</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Container>
                                :
                                <Container sx={{ display: 'flex' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ mr: 2, color: 'white', display: 'block', }}
                                        href="login"
                                    >
                                        INICIO SESION
                                    </Button>
                                    <Tooltip title="Ver Opciones">
                                        <Button
                                            onClick={handleOpenRegMenu}
                                            sx={{ mr: 2, color: 'white', display: 'block' }}
                                        >
                                            REGISTRARSE
                                        </Button>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="reg-appbar"
                                        anchorEl={anchorElReg}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElReg)}
                                        onClose={handleCloseRegMenu}
                                    >
                                        <MenuItem onClick={() => { handleRegister('doctor'); handleCloseRegMenu() }}>
                                            <Typography textAlign="center">COMO DOCTOR</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleRegister('laboratorio'); handleCloseRegMenu() }}>
                                            <Typography textAlign="center">COMO LABORATORIO</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleRegister('paciente'); handleCloseRegMenu() }}>
                                            <Typography textAlign="center">COMO PACIENTE</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Container>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
