import { Box, Rating, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
const svHost = import.meta.env.VITE_HOST;

const labels = {
  1: "Muy mala",
  2: "Mala",
  3: "Regular",
  4: "Buena",
  5: "Excelente",
};


export const Valoraciones = ({ doctorId }) => {
  const [promedioValoracion, setPromedioValoracion] = useState(0);
  const doctorValoration = async () => {
    try {
      const response = await axios.post(`${svHost}/getValoration`, {doctorId: doctorId});
      const { promedioValoracion } = response.data;
      setPromedioValoracion(promedioValoracion > 0 ? promedioValoracion : 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (doctorId) {
      doctorValoration();
    }
  }, [doctorId]);

  return (
    <Box sx={{display:"flex", flexDirection:"row"}}>
     <Rating value={promedioValoracion}  readOnly sx={{ color: "#FF5C00" }} />
    <Box sx={{ ml: 2 }}>{promedioValoracion !== 0 ? labels[promedioValoracion]: "No hay valoraciones"}</Box> 
    </Box>
    
  );
}