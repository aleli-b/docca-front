import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Slide } from '@mui/material';

const dates = [
  { label: 'Hoy', day: '11 de julio', time: ['10:00', '11:00', '12:00', '13:00'] },
  { label: 'Mañana', day: '12 de julio', time: ['10:00', '11:00', '12:00', '13:00'] },
  { label: 'Jue', day: '13 de julio', time: ['10:00', '11:00', '12:00', '13:00'] },
  { label: 'Vie', day: '14 de julio', time: ['10:00', '11:00', '12:00', '13:00'] },
  { label: 'Sab', day: '15 de julio', time: ['10:00', '11:00', '12:00', '13:00'] },
  { label: 'Dom', day: '16 de julio', time: [] },
];

export const SacarTurnoCard = () => {
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = Math.min(startIndex + 4, dates.length);

  const handlePrevClick = () => {
    setStartIndex(Math.max(startIndex - 1, 0));
  };

  const handleNextClick = () => {
    setStartIndex(Math.min(startIndex + 1, dates.length - 4));
  };

  return (
    <div>
      <Slide direction="left" in={true}>
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'nowrap' }}>
          <IconButton onClick={handlePrevClick} disabled={startIndex === 0} sx={{ height: '50px', width: '50px', marginTop: 1 }}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          {dates.slice(startIndex, endIndex).map((date, i) => (
            <Grid item xs={3} key={i} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography component="div">{date.label}</Typography>
              <Typography variant="body2" gutterBottom color="text.secondary" component="div">
                {date.day}
              </Typography>
              {date.time.length > 0 &&
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {date.time?.map((time, j) => (
                    <Button key={j} variant="outlined">
                      {time}
                    </Button>
                  ))}
                </Box>
              }
            </Grid>
          ))}
          <IconButton onClick={handleNextClick} disabled={endIndex >= dates.length} sx={{ height: '50px', width: '50px', marginTop: 1 }}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Grid>
      </Slide>
    </div>
  );
};
