// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from './providers/AuthProvider';
import useStore from './store.js'

const ProtectedRoute = ({ children }) => {
    const {currentUser} = useStore()
    console.log(currentUser)
    if (!currentUser) {
        return <Navigate to="/login"/>
    }

    return children
};

export default ProtectedRoute;
