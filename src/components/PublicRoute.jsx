// PublicRoute.js
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../constants/AuthContext'

const PublicRoute = ({ children }) => {
  const { state } = useAuth()

  if (state.loading) {
    return <div>Loading...</div> // 또는 스피너 컴포넌트
  }

  return state.user ? <Navigate to="/main" replace /> : children
}

export default PublicRoute
