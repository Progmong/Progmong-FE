// routes.jsx
import { createBrowserRouter, redirect } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import FindPwd from '../pages/Auth/FindPwd'
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
])

export default router
