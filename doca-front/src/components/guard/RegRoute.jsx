import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RegRoute = ({ children }) => {
    const auth = useAuth();
  return (
    auth.user ? <Navigate to='/' replace /> : children
  )
}
