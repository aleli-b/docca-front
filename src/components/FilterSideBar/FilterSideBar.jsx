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
    };

    const options = [
        'Anestesiología',
        'Cardiología',
        'Cardiólogo',
        'Cirugía',
        'Dermatología',
        'Endocrinología',
        'Endocrinólogo',
        'Gastroenterología',
        'Gineco obstetricia',
        'Infectología',
        'Infectólogo',
        'Medicina Familiar',
        'Medicina General',
        'Medicina Intensiva',
        'Medicina del Estilo de Vida',
        'Medicina física y rehabilitación',
        'Médicina Interna',
        'Neumología',
        'Neurología',
        'Nefrología',
        'Oftalmología',
        'Oncología',
        'Ortopédico',
        'Otorrinolaringología',
        'Otorrinolaringólogo',
        'Odontólogo',
        'Patología',
        'Pediatría',
        'Psiquiatría',
        'Radiología',
        'Urología',
    ];

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2, position: { xs: 'inherit', md: 'sticky' }, top: '15px', gap: 2, minHeight: { sx: 'inherit', md: '43.2dvh' }, paddingBottom: 8 }}>
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
                <InputLabel htmlFor="select-option">Estado</InputLabel>
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
                        Estado: {selectedState}
                    </Typography>
                )}
            </FormControl>
            <Button variant='contained' type='submit' onClick={handleSubmit} sx={{ m: 2 }}>Buscar</Button>
        </Card>
    )
}
