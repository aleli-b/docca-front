import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import './App.css'
import { AuthProvider } from "./components/context/AuthContext";
import { ThemeProvider } from "@emotion/react";
import { MessageProvider } from './components/context/MessageContext.jsx';
import { Header } from "./layout/Header/Header";
import { Home } from "./pages/Home/Home";
import { Footer } from "./layout/Footer/Footer";
import { Login } from "./pages/Login/Login";
import { Especialistas } from "./pages/Especialistas/Especialistas";
import { Error } from "./pages/Error/Error";
import { UserAdmin } from "./pages/Admin/UserAdmin/UserAdmin";
import { PerfilDoctores } from "./pages/Perfil/PerfilDoctores/PerfilDoctores";
import { PerfilPacientes } from "./pages/Perfil/PerfilPacientes/PerfilPacientes";
import { PerfilLaboratorios } from "./pages/Perfil/PerfilLaboratorios/PerfilLaboratorios";
import { ProfileRoute } from "./components/guard/ProfileRoute";
import { createTheme, CssBaseline } from "@mui/material";
import { Turnos } from "./pages/Turnos/Turnos";
import { Register } from "./pages/Register/Register";
import { AdminRoute } from "./components/guard/AdminRoute";
import { Messages } from "./pages/Messages/Messages";
import { RegisterDoctor } from "./pages/Register/RegisterDoctor";
import { RegisterLab } from "./pages/Register/RegisterLab";
import { RegRoute } from "./components/guard/RegRoute";

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);


export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {

  const darkTheme = createTheme({
    palette: {
      background: {
        default: '#e6e6e6'
      },
      mode: 'light',
      primary: {
        main: '#ff4400',
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        contrastText: '#ffcc00',
      },
    },
  });

  return (
    <>
      <AuthProvider>
        <MessageProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header />
            <Routes>
              <Route path="*" element={<Error />} />
              <Route path="/" element={<Home />} />
              <Route path="/login/*" element={<Login />} />
              <Route path="/register-paciente" element={<RegRoute> <Register /> </RegRoute>} />
              <Route path="/register-doctor" element={<RegRoute> <RegisterDoctor /> </RegRoute>} />
              <Route path="/register-laboratorio" element={<RegRoute> <RegisterLab /> </RegRoute>} />
              <Route path="/especialistas" element={<Especialistas />} />
              <Route path="/admin/*" element={<AdminRoute> <UserAdmin /> </AdminRoute>} />
              <Route path="/perfil/*" element={<ProfileRoute> <PerfilDoctores /> <PerfilLaboratorios /> <PerfilPacientes /> </ProfileRoute>} />
              <Route path="/consulta/*" element={<Error />} />
              <Route path="/turnos/*" element={<Turnos />} />
              <Route path="/messages/*" element={<Messages />} />
            </Routes>
            <Footer sx={{mp:"auto" }} />
          </ThemeProvider>
        </MessageProvider>
      </AuthProvider>
    </>
  )
}

