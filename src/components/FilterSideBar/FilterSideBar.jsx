import { Card, Typography, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material'
import React, { useState } from 'react'

export const FilterSideBar = ({ handleCategoryChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleCategoryChange(selectedOption);
    }

    const options = ['Otorrinolaringólogo', 'Odontólogo', 'Endocrinólogo', 'Infectólogo', 'Cardiólogo', 'Ortopédico'];


    return (
        <Card sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2, position: {xs: 'inherit', md: 'sticky'}, top: '15px', gap: 2, minHeight: {sx: 'inherit', md: '100dvh'} }}>
            <Typography variant='p'>Filtrar Por:</Typography>
            <FormControl sx={{minWidth: '80%', margin: 2}}>
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
                <Button variant='contained' type='submit' onClick={handleSubmit} sx={{ marginTop: 3}}>Buscar</Button>
            </FormControl>
        </Card>
    )
}
