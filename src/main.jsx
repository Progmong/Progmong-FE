import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import './Styles/reset.css'
import './Styles/base.css'

// Contexts
import { AuthProvider } from './constants/AuthContext'
import { ModalProvider } from './context/ModalContext'
import { IS_DEMO } from './constants/demo'

// Route guards
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

import PageLoader from './components/PageLoader'

// Pages
// 첫 화면인 로그인만 바로 불러오고, 나머지는 해당 경로에 들어갈 때 받도록 분리
// (에디터·수식·코드 하이라이터가 로그인 화면 번들에 섞이지 않게 함)
import Login from './pages/Auth/Login'
const FindPwd = lazy(() => import('./pages/Auth/FindPwd'))
const Register = lazy(() => import('./pages/Auth/Register'))
const SelectEgg = lazy(() => import('./pages/OnBoarding/SelectEgg'))
const SelectExploreTag = lazy(() => import('./pages/Home/War/SelectExploreTag'))
const MyPageLayout = lazy(() => import('./layouts/mypage/MypageLayout'))
const ExplorePage = lazy(() => import('./pages/Explore/ExplorePage'))
const loadMainPage = () => import('./pages/Home/Home')
const MainPage = lazy(loadMainPage)
const ExploreResultPage = lazy(() => import('./pages/Explore/ExploreResultPage'))
const LevelSelectPage = lazy(() => import('./pages/Explore/LevelSelectPage'))
const CommunityLayout = lazy(() => import('./layouts/CommunityLayout'))
const PostList = lazy(() => import('./pages/Community/PostList'))
const PostDetail = lazy(() => import('./pages/Community/PostDetail'))
const PostWrite = lazy(() => import('./pages/Community/PostWrite'))
const PostModify = lazy(() => import('./pages/Community/PostModify'))

// Toast 메시지
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

async function enableMocking() {
  // 데모 모드가 아니면 MSW를 켜지 않고 그대로 리턴
  if (!IS_DEMO) {
    return
  }

  const { startMocking, restartMocking } = await import('./mocks/browser')

  // Safari 등은 뒤로/앞으로 이동 시 페이지를 bfcache 에서 그대로 되살리는데,
  // 떠날 때 MSW 가 이 탭을 비활성화해 두어 요청이 실제(죽은) 서버로 나간다.
  // 새로고침(로딩 화면) 없이 MSW 만 다시 켜서 이어서 쓰게 한다.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) restartMocking()
  })

  return startMocking()
}

// 자주 가는 가벼운 페이지는 브라우저가 한가할 때 미리 받아 둔다.
// (처음 들어갈 때 코드 내려받기를 기다리지 않게. 에디터·상세처럼 무거운 페이지는 제외)
const prefetchMainPage = () => {
  const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1500))
  idle(() => {
    loadMainPage()
    import('./layouts/CommunityLayout')
    import('./pages/Community/PostList')
    import('./layouts/mypage/MypageLayout')
    import('./pages/Explore/LevelSelectPage')
  })
}

enableMocking().then(() => {
  prefetchMainPage()
  root.render(
    <AuthProvider>
      <ModalProvider>
        <Router>
          <ToastContainer position="top-center" autoClose={2000} />
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
        </Router>
      </ModalProvider>
    </AuthProvider>,
  )
})
