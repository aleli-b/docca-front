import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography } from '@mui/material/';
import CircularProgress from '@mui/material/CircularProgress';

export const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passwordConfirmErrorMsg, setPasswordConfirmErrorMsg] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const svHost = import.meta.env.VITE_HOST

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    setPasswordError(!passwordRegex.test(newPassword));
    setPasswordErrorMsg("Recuerda, al menos una mayúscula, y un número.");
  };

  const validateConfirmPassword = () => {
    setPasswordConfirmError(newPassword !== confirmPassword);
    setPasswordConfirmErrorMsg("Las contraseñas no coinciden.");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!passwordError && !passwordConfirmError) {
      try {
        setLoading(true);
        const response = await fetch(`${svHost}/reset-password/${token}`, { // Send the token as part of the URL
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newPassword }), // Don't include the token in the body
        });

        if (response.ok) {
          setSuccessMessage('Contraseña cambiada con éxito. Ya puedes iniciar sesión con tu nueva información.');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al cambiar contraseña.');
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setPasswordErrorMsg('Ha habido un error, intente de nuevo mas tarde.');
      }
    }
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', justifyContent: 'center', }}>
      <Typography variant="h2" sx={{ fontSize: '3em' }}>Cambia tu contraseña</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="password"
          label="Nueva contraseña"
          value={newPassword}
          onBlur={validatePassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
          required
          fullWidth
          error={passwordError}
          helperText={passwordError ? passwordErrorMsg : ''}
        />
        <TextField
          type="password"
          label="Confirme la nueva contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={validateConfirmPassword}
          margin="normal"
          required
          fullWidth
          error={passwordConfirmError}
          helperText={passwordConfirmError ? passwordConfirmErrorMsg : ''}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          {loading
            ?
            <CircularProgress />
            :
            <Button type="submit" variant="contained" color="primary" fullWidth >
              CAMBIAR CONTRASEÑA
            </Button>
          }
          {successMessage && <p>{successMessage}</p>}
        </Box>
      </form>
    </Container>
  );
};
