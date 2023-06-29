import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import './App.css'
import { Header } from "./layout/Header/Header";
import { Home } from "./pages/Home/Home";
import { Footer } from "./layout/Footer/Footer";
import { Login } from "./pages/Login/Login";
import { AuthProvider } from "./components/context/AuthContext";
import { Especialistas } from "./pages/Especialistas/Especialistas";
import { Error } from "./pages/Error/Error";
import { UserAdmin } from "./pages/Admin/UserAdmin/UserAdmin";
import { Perfil } from "./pages/Perfil/Perfil"
import { Consulta } from "./pages/Consulta/Consulta"
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Turnos } from "./pages/Turnos/Turnos";

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);


export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  const darkTheme = createTheme({
    palette: {
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
      <ThemeProvider theme={darkTheme}>
        <AuthProvider>
          <CssBaseline />
          <Header />
          <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
            <Route path="/especialistas/*" element={<Especialistas />} />
            <Route path="/admin/*" element={<UserAdmin />} />
            <Route path="/perfil/*" element={<Perfil />} />
            <Route path="/consulta/*" element={<Consulta />} />
            <Route path="/turnos/*" element={<Turnos />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

