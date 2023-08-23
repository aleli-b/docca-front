import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const categories = [
  { label: 'Dirección 1', value: 'direc-1' },
  { label: 'Dirección 2', value: 'direc-2' },
];

export const AdressBar = ({ onCategoryChange }) => {
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
