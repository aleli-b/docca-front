import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../components/context/AuthContext';
import './styles.css'
import { toast } from 'react-toastify';
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export const UploadImage = () => {
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

    async function handleFileUpload(event) {
        try {
            const file = event.target.files[0];
            setLoading(true);
            const base64 = await convertBase64(file)
            const response = await axios.post(`${svHost}/upload-image`, { file: base64, filename: 'test.jpg', id: user.id })
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

    return (
        <>
            <input
                type="file"
                style={{ display: 'none' }}
                id="fileInput"
                onChange={handleFileUpload}
                accept="image/*"
            />
            <label htmlFor="fileInput" >
                <Button
                    startIcon={<ModeEditIcon />}
                    disabled={loading}
                    sx={{color:"black", "&:hover":{bgcolor:"white"}}}
                >
                </Button>
            </label>
            {loading && <Typography variant="body1">Subiendo...</Typography>}            
        </>
    );
};
