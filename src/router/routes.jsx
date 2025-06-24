// routes.jsx
import { createBrowserRouter, redirect } from 'react-router-dom'
import ExamplePage from '../pages/ExamplePage'
import EggSelect from '../pages/OnBoarding/EggSelect'
import ExploreTagSelect from '../pages/Home/War/ExploreTagSelect'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExamplePage />,
  },
  {
    path: '/EggSelect',
    element: <EggSelect />,
  },
  {
    path: '/ExploreTagSelect',
    element: <ExploreTagSelect />,
  },
])

export default router
