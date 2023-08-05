import { Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
const svHost = import.meta.env.VITE_HOST;

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
    <Rating value={promedioValoracion} readOnly sx={{ color: "#FF5C00" }} />
  );
}