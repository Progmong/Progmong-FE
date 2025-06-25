// routes.jsx
import { createBrowserRouter } from 'react-router-dom'

import Login from '../pages/Auth/Login'
import FindPwd from '../pages/Auth/FindPwd'
import Register from '../pages/Auth/Register'
import MyPageLayout from '../layouts/mypage/MypageLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/findpwd',
    element: <FindPwd />,
  },
  {
    path: '/mypage',
    element: <MyPageLayout />,
  },
])

export default router
