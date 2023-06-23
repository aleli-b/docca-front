import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const categories = [
  { label: 'Todos', value: 'todos' },
  { label: 'Otorrinolaringólogo', value: 'otorrinolaringologo' },
  { label: 'Cardiólogo', value: 'cardiologo' },
  { label: 'Infectólogo', value: 'infectologo' },
  { label: 'Odontólogo', value: 'odontologo' },
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
