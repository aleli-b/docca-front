import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import titan from '../../assets/titan.jpg'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export const DoctorCard = ({ doctor }) => {
    const doc = doctor;

    return (
        <Card sx={{ width: 345}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={titan}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {doc.username}
                    </Typography>
                    <Rating
                        name="simple-controlled"
                        value={5}
                        />
                    <Typography variant="body2" color="text.secondary">
                        {doc.category}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}