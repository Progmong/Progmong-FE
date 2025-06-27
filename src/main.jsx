import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Contexts
import { AuthProvider } from './constants/AuthContext'
import { ModalProvider } from './context/ModalContext'

// Route guards
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

// Pages
import Login from './pages/Auth/Login'
import FindPwd from './pages/Auth/FindPwd'
import Register from './pages/Auth/Register'
import SelectEgg from './pages/OnBoarding/SelectEgg'
import SelectExploreTag from './pages/Home/War/SelectExploreTag'
import MyPageLayout from './layouts/mypage/MypageLayout'
import ExplorePage from './pages/Explore/ExplorePage'
import MainPage from './pages/Main/MainPage'
import ExploreResultPage from './pages/Explore/ExploreResultPage'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <AuthProvider>
    <ModalProvider>
      <Router>
        <Routes>
          {/* 🟢 Public Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/findpwd"
            element={
              <PublicRoute>
                <FindPwd />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* 🔐 Protected Routes */}
          <Route
            path="/selectEgg"
            element={
              <ProtectedRoute>
                <SelectEgg />
              </ProtectedRoute>
            }
          />
          <Route
            path="/selectExploreTag"
            element={
              <ProtectedRoute>
                <SelectExploreTag />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPageLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <ExplorePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore/result"
            element={
              <ProtectedRoute>
                <ExploreResultPage />
              </ProtectedRoute>
            }
          />

          {/* 🛑 Catch-All: 잘못된 경로는 로그인으로 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ModalProvider>
  </AuthProvider>,
)
