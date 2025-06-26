// routes.jsx
import { createBrowserRouter } from 'react-router-dom'

import CommunityMain from '../pages/Community/CommunityMain'
import PostDetail from '../pages/Community/PostDetail'

const router = createBrowserRouter([
  {
    path: '/community',
    children: [
      {
        index: true,
        element: <CommunityMain />,
      },
      {
        path: '/community/postdetail',
        element: <PostDetail />,
      },
    ],
  },
])

export default router
