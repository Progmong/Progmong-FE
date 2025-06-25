// routes.jsx
import { createBrowserRouter, redirect } from 'react-router-dom'

import Login from '../pages/Auth/Login'
import FindPwd from '../pages/Auth/FindPwd'
import Register from '../pages/Auth/Register'
import SelectEgg from '../pages/OnBoarding/SelectEgg'
import SelectExploreTag from '../pages/Home/War/SelectExploreTag'
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
    path: '/SelectEgg',
    element: <SelectEgg />,
  },
  {
    path: '/SelectExploreTag',
    element: <SelectExploreTag />,
  },
])

export default router
