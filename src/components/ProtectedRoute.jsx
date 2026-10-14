import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../constants/AuthContext'
import PageLoader from './PageLoader'

const ProtectedRoute = ({ children }) => {
  const { state } = useAuth()

  // 인증 확인(autoLogin)이 끝날 때까지만 로딩을 보여줌
  // (확인이 실패해 유저가 없으면 로딩에 갇히지 않고 아래 분기로 넘어감)
  if (state.loading) {
    return <PageLoader />
  }

  return state.user ? children : <Navigate to="/" replace />
}

export default ProtectedRoute
