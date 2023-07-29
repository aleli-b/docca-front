import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext';

const ForgotPasswordForm = ({ onClose }) => {
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
          {isSent ? 'Password Reset Email Sent' : 'Forgot Password'}
        </Typography>
        <Typography variant="body1" id="forgot-password-modal-description" align="center">
          {isSent
            ? 'A password reset email has been sent to your email address.'
            : 'Enter your email address to receive a password reset link.'}
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
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              helperText={emailError ? 'Invalid email address' : ''}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Send Reset Link
            </Button>
          </form>
        ) : (
          <Button onClick={onClose} fullWidth variant="contained" sx={{ mt: 2 }}>
            Close
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default ForgotPasswordForm;
