// import { createBrowserRouter } from 'react-router-dom'

// import Login from '../pages/Auth/Login'
// import FindPwd from '../pages/Auth/FindPwd'
// import Register from '../pages/Auth/Register'
// import SelectEgg from '../pages/OnBoarding/SelectEgg'
// import SelectExploreTag from '../pages/Home/War/SelectExploreTag'
// import MyPageLayout from '../layouts/mypage/MypageLayout.jsx'
// import ExplorePage from '../pages/Explore/ExplorePage'
// import MainPage from '../pages/Main/MainPage'
// import ExploreResultPage from '../pages/Explore/ExploreResultPage'
// import Home from '@/pages/Home/Home'
// import RequireAuth from '../components/RequireAuth'

// const router = createBrowserRouter([
//   // ❌ 인증 없이 접근 가능한 경로
//   {
//     path: '/',
//     element: <Login />,
//   },
//   {
//     path: '/register',
//     element: <Register />,
//   },
//   {
//     path: '/findpwd',
//     element: <FindPwd />,
//   },

//   // ✅ 인증이 필요한 모든 경로
//   {
//     path: '/auth',
//     element: <RequireAuth />,
//     children: [
//       { path: 'SelectEgg', element: <SelectEgg /> },
//       { path: 'SelectExploreTag', element: <SelectExploreTag /> },
//       { path: 'mypage', element: <MyPageLayout /> },
//       { path: 'explore', element: <ExplorePage /> },
//       { path: 'main', element: <MainPage /> },
//       { path: 'explore/result', element: <ExploreResultPage /> },
//     ],
//   },
// ])

// export default router
