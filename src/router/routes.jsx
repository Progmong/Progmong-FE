// routes.jsx
import { createBrowserRouter } from 'react-router-dom'

import Login from '../pages/Auth/Login'
import FindPwd from '../pages/Auth/FindPwd'
import Register from '../pages/Auth/Register'
import SelectEgg from '../pages/OnBoarding/SelectEgg'
import SelectExploreTag from '../pages/Home/War/SelectExploreTag'
import MyPageLayout from '../layouts/mypage/MypageLayout.jsx'
import ExplorePage from '../pages/Explore/ExplorePage'
import ExploreResultPage from '../pages/Explore/ExploreResultPage'
import LevelSelect from '../pages/Explore/LevelSelectPage'
import Home from '@/pages/Home/Home'

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
    path: '/mypage',
    element: <MyPageLayout />,
  },
  {
    path: '/explore',
    element: <ExplorePage />,
  },
  {
    path: '/explore/result',
    element: <ExploreResultPage />,
  },
  {
    path: '/levelselect',
    element: <LevelSelect />,
  },
  {
    path: '/home',
    element: <Home />,
  },
])

export default router
