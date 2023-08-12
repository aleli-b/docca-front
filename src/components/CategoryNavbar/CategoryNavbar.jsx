import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const categories = [
  { label: 'Todos', value: 'todos' },
  { label: 'Otorrinolaringólogo', value: 'Otorrinolaringólogo' },
  { label: 'Cardiólogo', value: 'Cardiólogo' },
  { label: 'Infectólogo', value: 'Infectólogo' },
  { label: 'Odontólogo', value: 'Odontólogo' },
  { label: 'Medicina Familiar', value: 'Medicina Familiar' },
  { label: 'Médicina Interna', value: 'Médicina Interna' },
  { label: 'Endocrinología', value: 'Endocrinología' },
  { label: 'Pediatría', value: 'Pediatría' },
  { label: 'Gineco obstetricia', value: 'Gineco obstetricia' },
  { label: 'Cirugía', value: 'Cirugía' },
  { label: 'Psiquiatría', value: 'Psiquiatría' },
  { label: 'Cardiología', value: 'Cardiología' },
  { label: 'Dermatología', value: 'Dermatología' },
  { label: 'Gastroenterología', value: 'Gastroenterología' },
  { label: 'Infectología', value: 'Infectología' },
  { label: 'Nefrología', value: 'Nefrología' },
  { label: 'Oftalmología', value: 'Oftalmología' },
  { label: 'Otorrinolaringología', value: 'Otorrinolaringología' },
  { label: 'Neumología', value: 'Neumología' },
  { label: 'Neurología', value: 'Neurología' },
  { label: 'Radiología', value: 'Radiología' },
  { label: 'Anestesiología', value: 'Anestesiología' },
  { label: 'Oncología', value: 'Oncología' },
  { label: 'Patología', value: 'Patología' },
  { label: 'Urología', value: 'Urología' },
  { label: 'Medicina física y rehabilitación', value: 'Medicina física y rehabilitación' },
  { label: 'Medicina Intensiva', value: 'Medicina Intensiva' },
];

const CategoryNavbar = ({ onCategoryChange }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    const selectedCategory = categories[newValue].value;    
    onCategoryChange(selectedCategory);
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      indicatorColor="primary"
      textColor="primary"
      aria-label="Category Navbar"
    >
      {categories.map((category, index) => (
        <Tab
          key={index}
          label={category.label}
          value={index}
        />
      ))}
    </Tabs>
  );
};

export default CategoryNavbar;
