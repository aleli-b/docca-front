import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))) || [];
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token'))) || [];
    const navigate = useNavigate();

    const svHost = import.meta.env.VITE_HOST;

    const register = async (data) => {
        try {
            await axios.post(`${svHost}/users`, data);
            const loginData = { email: data.email, password: data.password };
            login(loginData);
        } catch (error) {
            if (error.tokenInvalid) logout()
        }
    }

    const login = async (data) => {
        try {
            const loginData = await axios.post(`${svHost}/login`, data);
            localStorage.setItem('token', JSON.stringify(loginData.data.token));
            localStorage.setItem('user', JSON.stringify(loginData.data.user));
            toast.success('Ingreso exitoso! Redirigiendo...', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                navigate('/');
                setUser(loginData.data.user);
                setToken(loginData.data.token);
            }, 3600)
        } catch (error) {
            const status = error.response ? error.response.status : null;
            if (error.tokenInvalid) logout()
            if (status === 404) {
                toast.error('Usuario o contraseña incorrectos.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error('Ha habido un error.', {
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
        }
    }

    const logout = () => {
        navigate('/')
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    const auth = {
        register,
        login,
        logout,
        user,
        token
    }

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
