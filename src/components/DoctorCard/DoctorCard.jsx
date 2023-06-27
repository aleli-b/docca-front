import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import titan from '../../assets/titan.jpg'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';

export const DoctorCard = ({ doctor }) => {
    const doc = doctor;

    return (
        <Card sx={{ }}>
            <CardActionArea sx={{ display: "flex", flexDirection: 'row' }}>
                <CardMedia
                    component="img"
                    image={titan}
                    alt="green iguana"
                    sx={{ width: 1 / 2 }}
                />
                <CardContent sx={{ width: 1 / 2, marginLeft: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {doc.name + " " + doc.lastName}
                    </Typography>
                    <Rating
                        name="simple-controlled"
                        value={5}
                    />
                    <Typography variant="body2" color="text.secondary">
                        {doc.category}
                    </Typography>
                    <Button variant="contained" href="/turnos">
                        Solicitar Turno
                    </Button>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}