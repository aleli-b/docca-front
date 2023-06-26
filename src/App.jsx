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
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {

  return (
    <>
      <AuthProvider>
      <CssBaseline />
        <Header />
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/especialistas/*" element={<Especialistas />} />
          <Route path="/admin/*" element={<UserAdmin />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  )
}

