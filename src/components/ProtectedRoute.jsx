import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../constants/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { state } = useAuth()
  const accessToken = localStorage.getItem('accessToken')

  if (state.loading || (accessToken && !state.user)) {
    return <div>Loading...</div>
  }

  return state.user ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
