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
    Typography,
} from '@mui/material';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const UploadTestModal = ({ open, onClose, users }) => {
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const svHost = import.meta.env.VITE_HOST;
    const { user } = useAuth();

    const handleClose = () => {
        onClose();
    };

    async function convertBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        })
    }

    async function handleUpload(event) {
        try {
            const file = event.target.files[0];
            setLoading(true);
            const base64 = await convertBase64(file)
            const response = await axios.post(`${svHost}/labtests`, { file: base64, filename: 'test.pdf', labId: user.id, doctorId: selectedDoctor, userId: selectedUser })
                .then(() => {
                    toast.success('Imagen subida, los cambios se efectuarán la próxima vez que inicie sesión.');
                })
                .then(() => setLoading(false))
                .catch(console.log)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error uploading file:', error);
        }
    }


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
                    label="Selecciona un paciente"
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
                onChange={handleUpload}
                accept="application/pdf"
            />
            <label htmlFor="fileInput" >
                <Button
                    component='span'
                    disabled={loading}
                    sx={{ color: "black", "&:hover": { bgcolor: "white" } }}
                >
                SUBIR PDF
                </Button>
            </label>
            {loading && <Typography variant="body1">Subiendo...</Typography>}
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