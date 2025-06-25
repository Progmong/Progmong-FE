// routes.jsx
import { createBrowserRouter } from 'react-router-dom'
import CommunityMain from '../pages/Community/CommunityMain'

const router = createBrowserRouter([
  {
    path: '/community',
    Component: CommunityMain,
  },
])

export default router
