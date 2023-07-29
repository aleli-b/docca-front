import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { token } = useParams();

  const svHost = import.meta.env.VITE_HOST

  const validatePassword = () => {
    setPasswordError(newPassword !== confirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        const response = await fetch(`${svHost}/reset-password/${token}`, { // Send the token as part of the URL
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newPassword }), // Don't include the token in the body
        });

        if (response.ok) {
          setSuccessMessage('Password reset successful. You can now log in with your new password.');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Password reset failed.');
        }
      } catch (error) {
        console.error(error);
        // Handle the error and display an error message to the user if needed
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="password"
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={validatePassword}
        margin="normal"
        required
        fullWidth
        error={passwordError}
        helperText={passwordError ? 'Passwords do not match.' : ''}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Reset Password
      </Button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};
