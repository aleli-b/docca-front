import { Card, Typography, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material'
import { provincesOfMexico } from '../RegisterForm/ProvincesofMexico';
import React, { useState } from 'react'

export const FilterSideBar = ({ handleCategoryChange }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        handleCategoryChange(selectedOption, selectedState);
    }

    const options = [
        'Otorrinolaringólogo',
        'Odontólogo',
        'Endocrinólogo',
        'Infectólogo',
        'Cardiólogo',
        'Ortopédico',
        'Medicina Familiar',
        'Médicina Interna',
        'Endocrinología',
        'Pediatría',
        'Gineco obstetricia',
        'Cirugía',
        'Psiquiatría',
        'Cardiología',
        'Dermatología',
        'Gastroenterología',
        'Infectología',
        'Nefrología',
        'Oftalmología',
        'Otorrinolaringología',
        'Neumología',
        'Neurología',
        'Radiología',
        'Anestesiología',
        'Oncología',
        'Patología',
        'Urología',
        'Medicina física y rehabilitación',
        'Medicina Intensiva',
    ];

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2, position: { xs: 'inherit', md: 'sticky' }, top: '15px', gap: 2, minHeight: { sx: 'inherit', md: '100dvh' } }}>
            <Typography variant='p'>Filtrar Por:</Typography>
            <FormControl sx={{ minWidth: '80%', margin: 2 }}>
                <InputLabel htmlFor="select-option">Especialidad</InputLabel>
                <Select
                    value={selectedOption}
                    onChange={handleChange}
                    label="Select Option"
                    id="select-option"
                >
                    <MenuItem value="">
                        <em>Ninguna</em>
                    </MenuItem>
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                {selectedOption && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Especialidad: {selectedOption}
                    </Typography>
                )}
            </FormControl>
            <FormControl sx={{ minWidth: '80%', margin: 2 }}>
                <InputLabel htmlFor="select-option">Provincias</InputLabel>
                <Select
                    value={selectedState}
                    onChange={handleStateChange}
                    label="Select Option"
                    id="select-option"
                >
                    <MenuItem value="">
                        <em>Ninguna</em>
                    </MenuItem>
                    {provincesOfMexico.map((province) => (
                        <MenuItem key={province} value={province}>
                            {province}
                        </MenuItem>
                    ))}
                </Select>
                {selectedState && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Provincia: {selectedState}
                    </Typography>
                )}
            </FormControl>
            <Button variant='contained' type='submit' onClick={handleSubmit} sx={{ marginTop: 3 }}>Buscar</Button>
        </Card>
    )
}
