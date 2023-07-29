// In your ForgotPasswordForm.js
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext';

export const ForgotPasswordForm = ({ onClose }) => {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

  const auth = useAuth();

  const validateEmail = (value) => {
    const emailRegex = /.+@.+\..+/;
    setEmail(value);
    setEmailError(!emailRegex.test(value));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!emailError) {
        await auth.forgotPassword(email);
        setIsSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="forgot-password-modal-title"
      aria-describedby="forgot-password-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none',
          minWidth: '300px',
        }}
      >
        <Typography variant="h6" id="forgot-password-modal-title" align="center">
          {isSent ? 'Correo Enviado' : 'Me olvidé mi contraseña'}
        </Typography>
        <Typography variant="body1" id="forgot-password-modal-description" align="center">
          {isSent
            ? 'Un mail de reinicio de contraseña ha sido enviado a tu correo.'
            : 'Ingresa tu dirección de correo para recibir un mail de reinicio de contraseña'}
        </Typography>
        {!isSent ? (
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => validateEmail(e.target.value)}
              value={email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              helperText={emailError ? 'Dirección de correo inválida' : ''}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Enviar Correo de Reinicio
            </Button>
          </form>
        ) : (
          <Button onClick={onClose} fullWidth variant="contained" sx={{ mt: 2 }}>
            Cerrar
          </Button>
        )}
      </Box>
    </Modal>
  );
};