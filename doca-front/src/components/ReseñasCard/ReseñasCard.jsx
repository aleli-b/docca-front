import React, { useEffect, useState } from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
const svHost = import.meta.env.VITE_HOST;

export const ReseñasCard = ({ doctorId }) => {
  const [reseñas, setReseñas] = useState([]);

  const doctorReseñas = async () => {
    try {
      const response = await axios.post(`${svHost}/getResenia`, {
        doctorId: doctorId,
      });
      setReseñas(response.data.valoraciones);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (doctorId) {
      doctorReseñas();
    }
  }, [doctorId]);


  return (
<Card sx={{}}>
  <CardContent>
    {reseñas.length !== 0 ? (
      <>
        <Typography variant="h6" component="div">
          Reseñas
        </Typography>
        {reseñas.slice(-3).map((reseña, i) => (
          <Box key={reseña.turnoId} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Avatar src={reseña.user.profile_picture_url ? reseña.user.profile_picture_url : null} alt={reseña.user.name} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle1" component="div">
                {reseña.user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {reseña.reseña}
              </Typography>
            </Box>
          </Box>
        ))}
      </>
    ) : (
      "Aun no hay reseñas"
    )}
  </CardContent>
</Card>
  );
};
