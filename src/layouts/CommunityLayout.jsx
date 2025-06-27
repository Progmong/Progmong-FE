import { Outlet } from 'react-router-dom'

import CommunityMain from '@/pages/Community/CommunityMain'

const CommunityLayout = () => {
  return (
    <CommunityMain>
      <Outlet />
    </CommunityMain>
  )
}
export default CommunityLayout
