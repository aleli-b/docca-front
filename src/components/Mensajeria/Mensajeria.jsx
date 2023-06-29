import React from 'react';
import { Autocomplete, Avatar, Box, Card, CardContent, Grid, IconButton, Link, Typography } from '@mui/material';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export const Mensajeria = () => {
  const redesSociales = [
    {
      id: 1,
      nombre: 'Facebook',
      enlace: 'https://www.facebook.com/tu_perfil'
    },
    {
      id: 2,
      nombre: 'Instagram',
      enlace: 'https://www.instagram.com/tu_perfil'
    },
    {
      id: 3,
      nombre: 'LinkedIn',
      enlace: 'https://www.linkedin.com/in/tu_perfil'
    },
    {
      id: 4,
      nombre: 'GitHub',
      enlace: 'https://github.com/tu_perfil'
    },
    {
      id: 5,
      nombre: 'Twitter',
      enlace: 'https://twitter.com/tu_perfil'
    }
  ];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const top100Films = [
    { label: 'Doctor 1 Cardiologo', year: 1994 },
    { label: 'Doctor 2 Otorrinolaringolo', year: 1972 },
    { label: 'Doctor 3 Medico Clinico', year: 1974 },]
  return (
    <Card sx={{ border: 'solid black 1px',padding:1 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Mensajeria
        </Typography>
        <Box>


          <Link target="_blank" rel="noopener noreferrer" underline="none" color="inherit">
            {/* {redSocial.nombre} */}
            <div>
              <Button   variant="contained" color="primary" onClick={handleClickOpen}>
                Chat con Doctores
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Mensaje</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Seleccione Un Doctor Para Chatear
                  </DialogContentText>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Doctores" />}
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Mensaje"
                    type="email"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button  onClick={handleClose}>Cancelar</Button>
                  <Button   onClick={handleClose}>Enviar</Button>
                </DialogActions>
              </Dialog>
            </div>

          </Link>



        </Box>
      </CardContent>
    </Card>
  );
}
