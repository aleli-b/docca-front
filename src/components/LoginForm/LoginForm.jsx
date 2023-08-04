import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../context/AuthContext";
import {
  SvgIcon,
  Checkbox,
  FormControlLabel,
  Box,
  Link,
  TextField,
  CssBaseline,
  Button,
} from "@mui/material";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);
  
  const auth = useAuth();

  const isMobile = useMediaQuery("(max-width:600px)");
  const validateEmail = (value) => {
    const emailRegex = /.+@.+\..+/;
    setEmail(value);
    setEmailError(!emailRegex.test(value));
  };

  const validatePassword = (value) => {
    setPassword(value);
    setPasswordError(value.length === 0);
  };
  
  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      if (!emailError && !passwordError) {
        const formData = new FormData(event.currentTarget);
        const data = {
          email: formData.get("email"),
          password: formData.get("password"),
        };
        auth.login(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPasswordLinkClick = () => {
    setShowForgotPassword(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ color: "#5F5F5F", fontWeight: "700", fontSize: "20px" }}
        >
          Inicio de Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            onChange={(e) => validateEmail(e.target.value)}
            sx={{ borderRadius: "5px", bgcolor: "rgba(131, 131, 131, 0.22)" }}
            value={email}
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Email"
            name="email"
            autoComplete="email"
            autoFocus
            error={emailError}
            helperText={emailError ? "Invalid email address" : ""}
          />
          <TextField
            onChange={(e) => validatePassword(e.target.value)}
            sx={{ borderRadius: "5px", bgcolor: "rgba(131, 131, 131, 0.22)" }}
            value={password}
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordError}
            helperText={passwordError ? "Password is required" : ""}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              mt:2,
              mb:3
            }}
          >
            <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { color: "#145C6C" } }} />} label="Recuérdame" />
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
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              gap: isMobile ? "" : 1,
            }}
          >
            <Link onClick={handleForgotPasswordLinkClick} variant="body2" color={"#5F5F5F"}>
              ¿Olvidaste la contraseña?
            </Link>

            <Link href="/register-paciente" variant="body2" color={"#5F5F5F"}>
              {"¿No tienes cuenta? Registrarme"}
            </Link>
          </Box>
        </Box>
      </Box>
      {showForgotPassword && (
        <ForgotPasswordForm onClose={() => setShowForgotPassword(false)} />
      )}
    </Container>
  );
}