import styled from 'styled-components'

const Box = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
`

const ExploreRecords = () => {
  return (
    <Box>
      <Title>최근 탐험 기록</Title>
      <div>최근 5개의 문제 기록이 여기에 표시됩니다.</div>
    </Box>
  )
}

export default ExploreRecords
