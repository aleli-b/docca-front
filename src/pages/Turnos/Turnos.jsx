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
import { useAuth } from "../../components/context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { TurnoCheckOut } from "../../components/SacarTurnoCard/TurnoCheckOut";

export const Turnos = ({ location }) => {
  const [doctor, setDoctor] = useState([]);

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
      const response = await axios.post(
        `${svHost}/mpcheckout/`,
        {
          price: price,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

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

  const getDoctor = async () => {
    try {
      if (!doctorId) {
        console.error("Doctor ID is null");
        return;
      }

      const response = await axios.get(`${svHost}/user/${doctorId}`);
      setDoctor(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDoctor();
  }, [doctorId]);

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
    <>
      <TurnoCheckOut doctor={doctor} />
    </>
  );
};
