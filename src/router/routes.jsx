// routes.jsx
import { createBrowserRouter } from 'react-router-dom'

import Login from '../pages/Auth/Login'
import FindPwd from '../pages/Auth/FindPwd'
import Register from '../pages/Auth/Register'
import SelectEgg from '../pages/OnBoarding/SelectEgg'
import SelectExploreTag from '../pages/Home/War/SelectExploreTag'
<<<<<<< HEAD
import MyPageLayout from '../layouts/mypage/MypageLayout.jsx'
import ExplorePage from '../pages/Explore/ExplorePage'
import MainPage from '../pages/Main/MainPage'
import ExploreResultPage from '../pages/Explore/ExploreResultPage'
=======
import Home from '../pages/Home/Home'
>>>>>>> 4cc1fcd (feat(main page): :sparkles: 메인페이지 제작중...)

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
<<<<<<< HEAD
    path: '/mypage',
    element: <MyPageLayout />,
  },
  {
    path: '/explore',
    element: <ExplorePage />,
  },
  {
    path: '/main',
    element: <MainPage />,
  },
  {
    path: '/explore/result',
    element: <ExploreResultPage />,
=======
    path: '/home',
    element: <Home />,
>>>>>>> 4cc1fcd (feat(main page): :sparkles: 메인페이지 제작중...)
  },
])

export default router
