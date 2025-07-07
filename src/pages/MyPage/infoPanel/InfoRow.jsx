import styled from 'styled-components'
import { useMyPage } from '@/context/MyPageContext.jsx'
import ExpBar from '@/pages/MyPage/infoPanel/ExpBar.jsx'

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
`
const InfoRow = ({ label, value, expData: expData }) => {
  const { loading } = useMyPage()
  if (loading) return <div>로딩 중...</div>
  return (
    <LabelRow>
      <div>{label}</div>
      {expData ? (
        <ExpBar current={expData.exp} max={expData.expMax} label={expData.label} />
      ) : (
        <div>{value}</div>
      )}
    </LabelRow>
  )
}

export default InfoRow
