import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../constants/AuthContext'
import PageLoader from './PageLoader'

const PublicRoute = ({ children }) => {
  const { state } = useAuth()
  const accessToken = localStorage.getItem('accessToken')

  if (state.loading || (accessToken && !state.user)) {
    return <PageLoader />
  }

  return state.user ? <Navigate to="/main" replace /> : children
}

export default PublicRoute
