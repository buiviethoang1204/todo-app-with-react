import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({ children }) {
    if (!localStorage.getItem("Token")) {
        return <Navigate to='/sign_in' />
    }
    return children
}

export default ProtectedRoutes;;
