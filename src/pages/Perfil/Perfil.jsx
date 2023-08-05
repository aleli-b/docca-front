import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Typography,
  useMediaQuery,
  SvgIcon,
} from "@mui/material";
import { useAuth } from "./../../components/context/AuthContext";
import { UploadImage } from "../UploadImage/UploadImage";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Valoraciones } from "../../components/Valoraciones/Valoraciones";

const reseñas = [
  {
    nombre: "John Doe",
    descripcion:
      "Excelente servicio, muy profesional y amable. Lo recomiendo totalmente.",
  },
  {
    nombre: "Jane Smith",
    descripcion:
      "Increíble experiencia, el mejor lugar para visitar. Sin duda volveré.",
  },
  {
    nombre: "Alice Johnson",
    descripcion: "El personal es muy atento y servicial. Me encantó mi visita.",
  },
  {
    nombre: "Robert Brown",
    descripcion:
      "Los precios son asequibles y la calidad del servicio es excepcional.",
  },
  {
    nombre: "Emily Davis",
    descripcion:
      "Ambiente acogedor y relajante. Me sentí muy bien atendida durante mi visita.",
  },
];

export function Perfil() {
  const { user, editUser } = useAuth();
  const isMobile = useMediaQuery("(max-width: 900px)");
  return (
    <Container
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        p: 2,
        gap: 4,
      }}
    >
      <Box
        className="topContainer"
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <Box
          className="patientCard"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: isMobile ? "100%" : "90%",
            p: 2.5,

            bgcolor: "white",
            borderRadius: 2,
          }}
        >
          <Avatar
            alt={user.fullName}
            src={user.profile_picture_url}
            sx={{ mt: 3, width: 180, height: 180 }}
          />
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <UploadImage />
          </Box>

          <Typography variant="h5" component="div" text-align="center">
            {user.fullName}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "rgba(131, 131, 131, 0.22)",
            width: "100%",
            borderRadius: 2,
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#145C6C",
                fontWeight: "bold",
                fontFamily: "work sans",
              }}
            >
              {user.name
                ? `${user.name} ${user.lastName}`
                : "Nombre no disponible"}
            </Typography>
            <Button sx={{color:"black", "&:hover":{bgcolor:"gray"}}}>
              <ModeEditIcon />
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography sx={{ color: "#145C6C", fontFamily: "work sans" }}>
              {user.userType === "doctor" ? user.category : "Laboratorio"}
            </Typography>
            <Typography sx={{ color: "#145C6C", fontFamily: "work sans" }}>
              {user.typeUser === "doctor" ? "Graduado en la Univerisad Nacional de Litoral":"Certificación ISO 15189"}
            </Typography>
            <Typography sx={{ color: "#145C6C", fontFamily: "work sans", display: user.typeUser === "doctor" ? "visible":"none"}}>
            {user.typeUser === "doctor" ? "Número de cédula xxxx-xxxx-xxxx":null}
            </Typography>
            <Typography sx={{ color: "#145C6C", fontFamily: "work sans" }}>
              {`Nacionalidad: ${user.pais ? user.pais : "Argentina"}`}
            </Typography>
            {user.userType === "doctor" ?  <Valoraciones doctorId={user.id}/> : null}
           
          </Box>
        </Box>
      </Box>
      <Box
        className="bottomContainer"
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            gap: 1.5,
            width: isMobile ? "100%" : "90%",
            p: 2.5,
            bgcolor: "rgba(131, 131, 131, 0.22)",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#145C6C",
                fontWeight: "bold",
                fontFamily: "work sans",
              }}
            >
              Contacto
            </Typography>
            <Button sx={{ color: "black", "&:hover": { bgcolor: "gray" } }}>
              <ModeEditIcon />
            </Button>
          </Box>

          <Typography sx={{ color: "#145C6C", fontFamily: "work sans" }}>
            {user.email ? user.email : "No hay información de contacto"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#145C6C",
                fontWeight: "bold",
                fontFamily: "work sans",
              }}
            >
              Sobre mí
            </Typography>
            <Button sx={{ color: "black", "&:hover": { bgcolor: "gray" } }}>
              <ModeEditIcon />
            </Button>
          </Box>
          <Typography
            sx={{
              color: "#145C6C",
              fontFamily: "work sans",
            }}
          >
            {user.description ? user.description : "No hay descripción"}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "rgba(131, 131, 131, 0.22)",
            width: "100%",
            borderRadius: 2,
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#145C6C",
              fontWeight: "bold",
              fontFamily: "work sans",
            }}
          >
            Reseñas
          </Typography>
          {reseñas.slice(-2).map((reseña, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar src={user.profile_picture_url} />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h7"
                  sx={{
                    color: "#145C6C",
                    fontWeight: "bold",
                    fontFamily: "work sans",
                  }}
                >
                  {reseña.nombre}
                </Typography>
                <Typography
                  sx={{
                    color: "#145C6C",
                    fontFamily: "work sans",
                  }}
                >
                  {reseña.descripcion}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
