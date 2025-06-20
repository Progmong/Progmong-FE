// routes.jsx
import { createBrowserRouter, redirect } from 'react-router-dom'
import ExamplePage from '../pages/ExamplePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExamplePage />,
  },
])

export default router
