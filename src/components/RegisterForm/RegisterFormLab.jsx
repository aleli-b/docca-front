import * as React from "react";
import Avatar from "@mui/material/Avatar";

import { useAuth } from "../context/AuthContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  FormControl,
  Typography,
  Container,
  InputLabel,
  MenuItem,
  Select,
  SvgIcon,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export const RegisterFormLab = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [ageError, setAgeError] = React.useState(false);
  const [category, setCategory] = React.useState("");

  const auth = useAuth();
  const isMobile = useMediaQuery("(max-width:600px)");
  const validateEmail = (value) => {
    const emailRegex = /.+@.+\..+/;
    setEmail(value);
    setEmailError(!emailRegex.test(value));
  };

  const validateAge = (value) => {
    const ageRegex = /^[0-9]+$/;
    setAge(value);
    setAgeError(!ageRegex.test(value));
  };

  const validatePassword = (value) => {
    setPassword(value);
    setPasswordError(value.length === 0);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailError && !passwordError) {
      const formData = new FormData(event.currentTarget);
      const data = {
        name: formData.get("firstName"),
        lastName: formData.get("lastName"),
        age: formData.get("age"),
        email: formData.get("email"),
        password: formData.get("password"),
        userType: "lab",
        lab_category: category,
      };
      auth.register(data);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ minHeight: "100dvh", display: "flex", alignItems: "center" }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#5F5F5F",
            fontWeight: "700",
            fontSize: "20px",
            pt: isMobile ? 4 : "",
          }}
        >
          Registrarse
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Especialidad</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              label="Especialidad"
              onChange={handleCategoryChange}
              sx={{ bgcolor: "rgba(131, 131, 131, 0.22)" }}
            >
              <MenuItem value="bioquimico">Bioquímico</MenuItem>
              <MenuItem value="radiografia">Radiografía</MenuItem>
              <MenuItem value="tomografia">Tomografía</MenuItem>
            </Select>
          </FormControl>
          <TextField
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            margin="normal"
            required
            fullWidth
            id="firstName"
            placeholder="Nombre"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            sx={{ bgcolor: "rgba(131, 131, 131, 0.22)" }}
          />
          <TextField
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            margin="normal"
            required
            fullWidth
            id="lastName"
            placeholder="Apellido"
            name="lastName"
            autoComplete="family-name"
            sx={{ bgcolor: "rgba(131, 131, 131, 0.22)" }}
          />
          <TextField
            onChange={(e) => validateAge(e.target.value)}
            value={age}
            margin="normal"
            required
            fullWidth
            id="age"
            placeholder="Edad"
            name="age"
            autoComplete="family-name"
            error={ageError}
            helperText={ageError ? "Edad inválida" : ""}
            sx={{ bgcolor: "rgba(131, 131, 131, 0.22)" }}
          />
          <TextField
            onChange={(e) => validateEmail(e.target.value)}
            value={email}
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Correo electrónico"
            name="email"
            autoComplete="email"
            error={emailError}
            helperText={
              emailError ? "Dirección de correo electrónico inválida" : ""
            }
            sx={{ bgcolor: "rgba(131, 131, 131, 0.22)" }}
          />
          <TextField
            onChange={(e) => validatePassword(e.target.value)}
            value={password}
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="Contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
            error={passwordError}
            helperText={passwordError ? "Se requiere una contraseña" : ""}
            sx={{ bgcolor: "rgba(131, 131, 131, 0.22)" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
              mb: 3,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "6rem",
                height: "2.5rem",
                borderRadius: "20px",
                bgcolor: "#145C6C",
                "&:hover": { bgcolor: "#145C6C" },
              }}
            >
              <SvgIcon component={ArrowForwardIosIcon}></SvgIcon>
            </Button>
          </Box>
          <Box
            sx={{
              pt: 2,
              pb: 2,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography>Tienes cuenta?</Typography>
            <Link
              href="/login"
              variant="body2"
              color={"#5F5F5F"}
              underline="none"
              fontWeight={"700"}
            >
              Iniciar Sesión
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
