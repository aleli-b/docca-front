import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  Button,
  Container,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

export function TurnoCheckOut({ doctor }) {
  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get("doctor");
  const turno = queryParams.get("turno");
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [preferenceId, setPreferenceId] = useState(null);
  const svHost = import.meta.env.VITE_HOST;

  initMercadoPago("TEST-2433162c-f145-4f69-990f-a4d97d50f2bc");

  const createPreference = async (price) => {
    try {
      const response = await axios.post(`${svHost}/mpcheckout/`, {
        description: "Consulta medica",
        price: price,
        quantity: 1,
      });

      const { id } = response.data;

      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async (price) => {
    const id = await createPreference(price);
    if (id) {
      console.log(id);
      setPreferenceId(id);
    }
  };
  const addTurno = async (date, userId, doctorId, price) => {
    try {
      handleBuy(price);
      const response = await axios.post(
        `${svHost}/turnos`,
        {
          date: date,
          userId,
          doctorId,
          price,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Turno sacado con exito!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      const status = error.response ? error.response.status : null;
      if (status === 400) {
        toast.error("El usuario ya tiene turno", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Error al sacar turno", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Container sx={{ width: "100%" }}>
      <Typography
        variant="h1"
        sx={{
          color: "#145C6C",
          textAlign: isMobile ? "center" : "left",
          fontFamily: "Work Sans",
          fontSize: "2.5rem",
          fontWeight: "700",
          pt: 4,
        }}
      >
        Abonar consulta
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "rgba(131, 131, 131, 0.22)",
          p: 4,
          width: "100%",
          borderRadius: 5,
          gap: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#5F5F5F",
            textAlign: isMobile ? "center" : "left",
            fontFamily: "Work Sans",
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          Detalle de la consulta
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              textAlign: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Avatar
                alt="img"
                sx={{
                  width: "80%",
                  height: "100%",
                  justifyContent: "center",
                  borderRadius: "5rem",
                }}
                srcSet={`${doctor.profile_picture_url}`}
              />
            </Box>

            <Typography
              variant="h1"
              sx={{
                color: "#fff",
                textAlign: "center",
                fontFamily: "Work Sans",
                fontSize: "1.25rem",
                fontWeight: "700",
                bgcolor: "#838383",
                p: 2,
                borderRadius: 5,
                boxSadhow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {turno ? turno : ""}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignContent: "center",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h1"
                sx={{
                  color: "#5F5F5F",
                  textAlign: isMobile ? "center" : "left",
                  fontFamily: "Work Sans",
                  fontSize: "1.75rem",
                  fontWeight: "700",
                }}
              >
                {`Dr. ${doctor.name} ${doctor.lastName}`}
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  color: "#5F5F5F",
                  textAlign: isMobile ? "center" : "left",
                  fontFamily: "Work Sans",
                  fontSize: "1.25rem",
                  fontWeight: "700",
                }}
              >
                {doctor.category}
              </Typography>
            </Box>
            {/*
            ---------- Luego utilizar esto para ingresar correo y método de pago --------
            <Box sx={{display:"flex", flexDirection:"column"}}>

            </Box>*/}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: isMobile ? "center" : "flex-end",
            gap: 4,
          }}
        >
          <Typography
            sx={{
              color: "#5F5F5F",
              textAlign: isMobile ? "center" : "right",
              fontFamily: "Work Sans",
              fontSize: "1.75rem",
              fontWeight: "700",
            }}
          >{`Total a Pagar: ${doctor.price}${
            doctor.price ? "USD" : ""
          }`}</Typography>
          <Box></Box>
          {preferenceId ? (
            <Wallet initialization={{ preferenceId }} />
          ) : (
            <Button
              sx={{ borderRadius: 5, width: "15rem" }}
              type="button"
              variant="contained"
              color="primary"
              onClick={() => {
                handleBuy(doctor.price);
              }}
            >
              Pagar
            </Button>
          )}
          <Button
            sx={{ borderRadius: 5, width: "15rem" }}
            type="button"
            variant="contained"
            color="primary"
            onClick={() => navigate("/especialistas")}
          >
            Volver a los horarios
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
