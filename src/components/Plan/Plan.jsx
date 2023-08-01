import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { toast } from "react-toastify";

export const Plan = () => {
  const { user } = useAuth();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const { userType } = useParams();
  const svHost = import.meta.env.VITE_HOST;
  const mpKey = import.meta.env.mpKey;
  initMercadoPago(mpKey);

  const createPreference = async (price) => {
    if (user) {
      axios
        .post(`${svHost}/mpcheckoutSubscription`, { user: user, price: price })
        .then(
          (response) =>
            (window.location.href = response.data.response.body.init_point)
        )
        .catch((error) => {
          console.error(error);
        });
      console.log(user);
    } else {
      toast.warning("Debes iniciar sesión", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        marginTop: 5,
        alignItems: "center",
        gap: 5,
      }}
    >
      <Box>
        <Typography
          sx={{ color: "#145C6C", fontWeight: "bold", textAlign: "center" }}
          variant={isMobile ? "h3" : "h2"}
        >
          Conviertete en un
        </Typography>
        <Typography
          sx={{ color: "#145C6C", fontWeight: "bold", textAlign: "center" }}
          variant={isMobile ? "h3" : "h2"}
        >
          {userType === "doctor" ? "doctor" : "laboratorio"} en línea!
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{ color: "#145C6C", textAlign: "center", fontWeight: "bold" }}
          variant={isMobile ? "h5" : "h4"}
        >
          Nuestra plataforma permite operar facilmente
        </Typography>
        <Typography
          sx={{ color: "#145C6C", textAlign: "center", fontWeight: "bold" }}
          variant={isMobile ? "h5" : "h4"}
        >
          {" "}
          con los pacientes y recibir tus honorarios de
        </Typography>
        <Typography
          sx={{ color: "#145C6C", textAlign: "center", fontWeight: "bold" }}
          variant={isMobile ? "h5" : "h4"}
        >
          {" "}
          manera rápida.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: 5,
          pb: isMobile ? 5 : "",
          mb: isMobile ? "" : 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#c2c2c2",
            borderRadius: "10px",
            width: isMobile ? "90vw" : "28rem",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              color: "#145C6C",
              fontWeight: "bold",
              fontSize: "2rem",
              mt: 2,
            }}
            variant="body1"
          >
            PLAN 1
          </Typography>
          <Typography
            sx={{ color: "#145C6C", fontWeight: "bold", fontSize: "1.5rem" }}
            variant="body1"
          >
            Plan integral con más
          </Typography>
          <Typography
            sx={{ color: "#145C6C", fontWeight: "bold", fontSize: "1.5rem" }}
            variant="body1"
          >
            {" "}
            de una especialidad
          </Typography>
          <Typography
            sx={{ color: "#145C6C", fontWeight: "bold", fontSize: "1.5rem" }}
            variant="body1"
          >
            PRECIO FINAL:
          </Typography>
          <Typography
            sx={{ color: "#145C6C", fontWeight: "bold", fontSize: "1.5rem" }}
          >
            {" "}
            999USD{" "}
          </Typography>
          <Button
            variant="contained"
            onClick={() => createPreference(999)}
            sx={{ marginTop: 1, minWidth: "100%", maxWidth: "100%" }}
          >
            Asociarme
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
