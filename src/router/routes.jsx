// routes.jsx
import { createBrowserRouter, redirect } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import FindPwd from '../pages/Auth/FindPwd'
import InitProgmong from '../pages/Auth/InitProgmong'

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
    path: '/initprogmong',
    element: <InitProgmong />,
  },
])

export default router
