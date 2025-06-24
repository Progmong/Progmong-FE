// routes.jsx
import { createBrowserRouter, redirect } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import FindPwd from '../pages/Auth/FindPwd'
import Register from '../pages/Auth/Register'
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
])

export default router
