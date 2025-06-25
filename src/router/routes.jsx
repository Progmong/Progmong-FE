// routes.jsx
import { createBrowserRouter, redirect } from 'react-router-dom'

import Login from '../pages/Auth/Login'
import FindPwd from '../pages/Auth/FindPwd'
import Register from '../pages/Auth/Register'
import SelectEgg from '../pages/OnBoarding/SelectEgg'
import SelectExploreTag from '../pages/Home/War/SelectExploreTag'
import Home from '../pages/Home/Home'

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
    path: '/selectEgg',
    element: <SelectEgg />,
  },
  {
    path: '/selectExploreTag',
    element: <SelectExploreTag />,
  },
  {
    path: '/home',
    element: <Home />,
  },
])

export default router
