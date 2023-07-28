import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [showForgotPassword, setShowForgotPassword] = React.useState(false);


    const auth = useAuth();

    const validateEmail = (value) => {
        const emailRegex = /.+@.+\..+/;
        setEmail(value);
        setEmailError(!emailRegex.test(value));
    };

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordError(value.length === 0);
    };

    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            if (!emailError && !passwordError) {
                const formData = new FormData(event.currentTarget);
                const data = {
                    email: formData.get('email'),
                    password: formData.get('password'),
                };
                auth.login(data);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleForgotPasswordLinkClick = () => {
        setShowForgotPassword(true);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Inicio de Sesión
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        onChange={(e) => validateEmail(e.target.value)}
                        value={email}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={emailError}
                        helperText={emailError ? 'Invalid email address' : ''}
                    />
                    <TextField
                        onChange={(e) => validatePassword(e.target.value)}
                        value={password}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={passwordError}
                        helperText={passwordError ? 'Password is required' : ''}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Ingresar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link onClick={handleForgotPasswordLinkClick} variant="body2">
                                ¿Olvidaste la contraseña?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register-paciente" variant="body2">
                                {"¿No tienes cuenta? Registrarme"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {showForgotPassword && (
                <ForgotPasswordForm onClose={() => setShowForgotPassword(false)} />
            )}
        </Container>
    );
}