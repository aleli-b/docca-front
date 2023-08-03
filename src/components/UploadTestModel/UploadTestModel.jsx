import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Input,
    InputLabel,
    MenuItem,
} from '@mui/material';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export const UploadTestModal = ({ open, onClose }) => {
    const [users, setUsers] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedUser, setSelectedUser] = useState('');

    const svHost = import.meta.env.VITE_HOST

    useEffect(() => {
        getUsers();
    });

    const getUsers = async () => {
        const dbUsers = await axios.get(`${svHost}/users`);
        setUsers(dbUsers.data);
    };

    const handleClose = () => {
        onClose();
    };

    const handleUpload = () => {
        // Implement your logic for handling the file upload here
        // For example, you can access the file from the input using event.target.files[0]
        // You can then perform the necessary actions with the file data.
        console.log('Selected user:', selectedDoctor);
        handleClose();
    };

    const handleSelectDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelectedUser(event.target.value);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Sube tus estudios</DialogTitle>
            <DialogContent>
                <InputLabel id="user-label">Selecciona un usuario</InputLabel>
                <Select
                    labelId="user-label"
                    id="user-select"
                    value={selectedDoctor}
                    onChange={handleSelectDoctorChange}
                    label="Selecciona un usuario"
                    style={{ minWidth: '200px' }}
                >
                    {users.map((user) => (
                        user.userType === 'doctor' &&
                        <MenuItem key={user.id} value={user.id}>
                            Dr. {user.name} {user.lastName}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    labelId="user-label"
                    id="user-select"
                    value={selectedUser}
                    onChange={handleSelectChange}
                    label="Selecciona un usuario"
                    style={{ minWidth: '200px' }}
                >
                    {users.map((user) => (
                        user.userType === 'patient' &&
                        <MenuItem key={user.id} value={user.id}>
                            {user.name} {user.lastName}
                        </MenuItem>
                    ))}
                </Select>
                <input
                    type="file"
                    style={{ display: 'none' }}
                    id="fileInput"
                    accept="image/*"
                />
                <label htmlFor="fileInput">
                    <Button component="span" variant='contained'>Subir Estudios</Button>
                </label>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleUpload} color="primary">
                    Subir
                </Button>
            </DialogActions>
        </Dialog>
    );
};