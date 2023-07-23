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
import { useAuth } from '../context/AuthContext';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const RegisterFormLab = () => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [ageError, setAgeError] = React.useState(false);
    const [category, setCategory] = React.useState('');

    const auth = useAuth();

    const validateEmail = (value) => {
        const emailRegex = /.+@.+\..+/;
        setEmail(value);
        setEmailError(!emailRegex.test(value));
    };

    const validateAge = (value) => {
        const ageRegex = /^[0-9]+$/;
        setAge(value);
        setAgeError(!ageRegex.test(value));
    };

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordError(value.length === 0);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!emailError && !passwordError) {
            const formData = new FormData(event.currentTarget);
            const data = {
                name: formData.get('firstName'),
                lastName: formData.get('lastName'),
                age: formData.get('age'),
                email: formData.get('email'),
                password: formData.get('password'),
                userType: 'lab',
                lab_category: category,
            };
            auth.register(data)
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ minHeight: '100dvh', display: 'flex', alignItems: 'center' }}>
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
                    Registrarme como laboratorio
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="category-label">Especialidad</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            value={category}
                            label="Especialidad"
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value="bioquimico">Bioquímico</MenuItem>
                            <MenuItem value="radiografia">Radiografía</MenuItem>
                            <MenuItem value="tomografia">Tomografía</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="Nombre"
                        name="firstName"
                        autoComplete="given-name"
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Apellido"
                        name="lastName"
                        autoComplete="family-name"
                    />
                    <TextField
                        onChange={(e) => validateAge(e.target.value)}
                        value={age}
                        margin="normal"
                        required
                        fullWidth
                        id="age"
                        label="Edad"
                        name="age"
                        autoComplete="family-name"
                        error={ageError}
                        helperText={ageError ? 'Edad inválida' : ''}
                    />
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
                        error={emailError}
                        helperText={emailError ? 'Dirección de correo electrónico inválida' : ''}
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
                        autoComplete="new-password"
                        error={passwordError}
                        helperText={passwordError ? 'Se requiere una contraseña' : ''}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Registrarme
                    </Button>
                    {/* <Grid container>
                        <Grid item xs>
                            <Link href="register-paciente" variant="body2">
                                Registrarme como paciente
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="register-doctor" variant="body2">
                                Registrarme como doctor
                            </Link>
                        </Grid>
                    </Grid> */}
                </Box>
            </Box>
        </Container>
    );
}
