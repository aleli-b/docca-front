import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import titan from '../../assets/titan.jpg'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, Slide } from '@mui/material';
import { DateForm } from '../DateForm/DateForm';

export const DoctorCard = ({ doctor }) => {
    const [slideOpen, setSlideOpen] = React.useState(false);
    const doc = doctor;

    const handleClick = () => {
        setSlideOpen(true);
    };

    const handleSlideClose = () => {
        setSlideOpen(false);
    };

    return (
        <Card sx={{}}>
            <CardActionArea sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia component="img" image={titan} alt="green iguana" sx={{ width: 1 / 2 }} />
                <CardContent sx={{ width: 1 / 2, marginLeft: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {doc.name + ' ' + doc.lastName}
                    </Typography>
                    <Rating name="simple-controlled" value={5} />
                    <Typography variant="body2" color="text.secondary">
                        {doc.category}
                    </Typography>
                    <Box sx={{ marginTop: 1 }}>
                        <Button variant="contained" component="div" onClick={handleClick} sx={{ backgroundColor: '#82BF45', '&:hover': { backgroundColor: '#037F8C' } }}>
                            Solicitar Turno
                        </Button>
                    </Box>
                </CardContent>
            </CardActionArea>
            <Slide direction="up" in={slideOpen} mountOnEnter unmountOnExit timeout={500}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <DateForm />
                    <Box sx={{ marginTop: 2 }}>
                        <Button variant="contained" component="div" onClick={handleSlideClose}>
                            Cerrar
                        </Button>
                    </Box>
                </CardContent>
            </Slide>
        </Card>
    );
};
