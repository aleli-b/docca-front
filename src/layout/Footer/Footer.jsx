import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import docca from '../../assets/Ic2.svg';
import './Footer.css';

export const Footer = () => {
  return (
      <AppBar
        position="static"        
        sx={{
          display: 'flex',
          flexDirection: 'row',          
          justifyContent:'center',
          top: 'auto',
          bottom: 0,              
          width: '100%',
          margin: '0 auto'
        }}
        id="footerNav"
      >
      <img src={docca} style={{ height: '5rem' }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 2,
          }}
        >
          <Typography variant="body2" color="black">
            &copy; {new Date().getFullYear()} Your Website. All rights reserved.
          </Typography>
        </Box>
      </AppBar>    
  );
};