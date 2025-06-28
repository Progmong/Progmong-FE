// routes.jsx
import { createBrowserRouter } from 'react-router-dom'

import CommunityMain from '../pages/Community/CommunityMain'
import PostDetail from '../pages/Community/PostDetail'
import PostWrite from '@/pages/Community/PostWrite'

import PostList from '@/pages/Community/PostList'
import CommunityLayout from '@/layouts/CommunityLayout'

const router = createBrowserRouter([
  {
    path: '/community',
    element: <CommunityLayout />,
    children: [
      {
        index: true,
        element: <PostList />,
      },
      {
        path: '/community/postdetail',
        element: <PostDetail />,
      },
      {
        path: '/community/write',
        element: <PostWrite />,
      },
    ],
  },
])

export default router
