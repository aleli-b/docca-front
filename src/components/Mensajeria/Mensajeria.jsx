import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, FormControl, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useMessageContext } from '../context/MessageContext';
import { toast } from 'react-toastify';


export const Mensajeria = () => {
  const [open, setOpen] = useState(false);
  const [doctors, setDoctors] = React.useState([])
  const [messageContent, setMessageContent] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const { sendMessage, getMessages, joinConversation, conversations } = useMessageContext();

  const svHost = import.meta.env.VITE_HOST;

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {    
    conversations.forEach((conversation) => {
      joinConversation(conversation.id);
    });
  }, [conversations, joinConversation]);

  const getDoctors = async () => {
    const userData = await axios.get(`${svHost}/doctors`);
    setDoctors(userData.data);
  }
  useEffect(() => {
    getDoctors();
  }, []);

  const handleSubmit = async () => {
    setMessageContent('');
    if (selectedValue === '') {
      toast.error('Selecciona un usuario a mensajear');
    } else {      
        await sendMessage(messageContent, selectedValue);
        getMessages();
        toast.success('Mensaje enviado con exito');     
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ padding: 1 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Mensajeria
        </Typography>
        <Box>
          <Link target="_blank" rel="noopener noreferrer" underline="none" color="inherit">
            <div>
              <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Chat con Doctores
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Mensaje</DialogTitle>
                <DialogContent >
                  <FormControl variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <DialogContentText id="select-label">Selecciona un nombre</DialogContentText>
                    <Select
                      labelId="select-label"
                      id="select"
                      value={selectedValue}
                      onChange={handleChange}
                      label="asdasd"
                    >
                      {doctors.map((doctor) => (
                        <MenuItem key={doctor.id} value={doctor.id}>{`Dr. ${doctor.name} ${doctor.lastName}`}</MenuItem>
                      ))}
                    </Select>
                    <TextField
                      label="Type your message"
                      variant="outlined"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSubmit}>
                      Enviar
                    </Button>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
              </Dialog>
            </div>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
