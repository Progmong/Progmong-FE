// routes.jsx
import { createBrowserRouter, redirect } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import FindPwd from '../pages/Auth/FindPwd'
import InitProgmong from '../pages/Auth/InitProgmong'
import EmailVerifyForm from '../pages/Auth/EmailVerifyForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/verify-email',
    element: <EmailVerifyForm />,
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
