import styled from 'styled-components'
import { useMyPage } from '@/context/MyPageContext.jsx'
import ExpBar from '@/pages/MyPage/infoPanel/ExpBar.jsx'

const LabelRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
  padding: 5px;
`
const LabelName = styled.div`
  font-weight: bold;
  min-width: 60px;
  margin-left: 5px;
`
const LabelValue = styled.div`
  text-align: end;
  font-weight: bold;
  font-size: 12px;
  min-width: 150px;
  margin-right: 20px;
`
const ExpBarWrapper = styled.div`
  width: 100%;
  min-width: 150px;
  display: flex;
  justify-content: end;
  margin-right: 10px;
`

const InfoRow = ({ label, value, expData: expData }) => {
  const { loading } = useMyPage()
  if (loading) return <div>로딩 중...</div>
  return (
    <LabelRow>
      <LabelName>{label}</LabelName>
      {expData ? (
        <ExpBarWrapper><ExpBar current={expData.exp} max={expData.expMax} label={expData.label} /></ExpBarWrapper>
      ) : (
        <LabelValue>{value}</LabelValue>
      )}
    </LabelRow>
  )
}

export default InfoRow
