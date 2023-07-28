import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../context/AuthContext';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [passwordMatchError, setPasswordMatchError] = React.useState(false);

    const auth = useAuth();

    const getPasswordStrength = (value) => {
        if (value.length < 8) {
            return 'Débil';
        } else if (value.length < 12) {
            return 'Media';
        } else {
            return 'Segura';
        }
    };

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
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        setPasswordError(!passwordRegex.test(value));
    };

    const validateConfirmPassword = (value) => {
        setConfirmPassword(value);
        setPasswordMatchError(value !== password);
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
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
                        error={passwordError}
                        helperText={passwordError ? 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.' : ''}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Typography variant="body2" gutterBottom color="text.secondary">
                        Seguridad de la contraseña: {getPasswordStrength(password)}
                    </Typography>
                    <TextField
                        onChange={(e) => validateConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        error={passwordMatchError}
                        helperText={passwordMatchError ? 'Las contraseñas no coinciden.' : ''}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Registrarme
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}