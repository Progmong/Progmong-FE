import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../constants/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { state } = useAuth()

  if (state.loading) {
    // 로딩 중일 때 스피너 또는 빈 화면 처리
    return <div>Loading...</div>
  }

  return state.user ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
