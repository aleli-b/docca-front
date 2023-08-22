import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './styles.css'
import { toast } from 'react-toastify';
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export const UploadCed = () => {
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();

    const svHost = import.meta.env.VITE_HOST

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

    async function handleCedUpload(event) {
        try {
            const file = event.target.files[0];
            setLoading(true);
            const base64 = await convertBase64(file);
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const filename = fileExtension === 'pdf' ? 'cedula.pdf' : 'cedula.jpg';
            const response = await axios.post(`${svHost}/upload-ced`, { file: base64, filename: filename, id: user.id })
                .then(() => {
                    toast.success('Cedula Subida con Exito');
                })
                .then(() => setLoading(false))
                .catch(console.log)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error uploading file:', error);
        }
    }

    return (
        <>
            <input
                type="file"
                style={{ display: 'none' }}
                id="fileInputCed"
                onChange={handleCedUpload}
                accept="image/*, application/pdf"
            />
            <label htmlFor="fileInputCed" >
                <Button
                    component='span'
                    startIcon={<ModeEditIcon />}
                    disabled={loading}
                    sx={{ color: "black", "&:hover": { bgcolor: "white" } }}
                >
                </Button>
            </label>
            {loading && <Typography variant="body1">Subiendo...</Typography>}
        </>
    );
};
