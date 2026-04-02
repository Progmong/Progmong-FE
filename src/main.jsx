import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import './Styles/reset.css'
import './Styles/base.css'

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
import MainPage from './pages/Home/Home'
import ExploreResultPage from './pages/Explore/ExploreResultPage'
import LevelSelectPage from './pages/Explore/LevelSelectPage'
import CommunityLayout from './layouts/CommunityLayout'
import PostList from './pages/Community/PostList'
import PostDetail from './pages/Community/PostDetail'
import PostWrite from './pages/Community/PostWrite'

// Toast 메시지
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PostModify from './pages/Community/PostModify'

const root = ReactDOM.createRoot(document.getElementById('root'))

async function enableMocking() {
  const { worker } = await import('./mocks/browser')

  // worker.start()는 브라우저의 서비스 워커가 
  // 백그라운드에 등록되고, API 요청을 가로챌 준비가 완전히 끝났을 때 
  // Promise 형식으로 발송 
  return worker.start({
    onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 경고 없이 통과
  })
}

enableMocking().then(() => {
  root.render(
    <AuthProvider>
      <ModalProvider>
        <Router>
          <ToastContainer position="top-center" autoClose={2000} />
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
            {/* 커뮤니티 전체 보호 */}
            <Route
              path="/community/:category"
              element={
                <ProtectedRoute>
                  <CommunityLayout />
                </ProtectedRoute>
              }
            >
              {/* /community 에서는 PostList */}
              <Route index element={<PostList />} />
              <Route path="posts/:postId" element={<PostDetail />} />
              <Route path="posts/new" element={<PostWrite />} />
              <Route path="posts/:postId/modify" element={<PostModify />} />
              {/* /community/postdetail 에서는 PostDetail */}
            </Route>

            <Route
              path="/explore/result"
              element={
                <ProtectedRoute>
                  <ExploreResultPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/levelselect"
              element={
                <ProtectedRoute>
                  <LevelSelectPage />
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
})
