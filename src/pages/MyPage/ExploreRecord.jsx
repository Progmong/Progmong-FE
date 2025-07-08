import styled from 'styled-components'
import checkIcon from '@/assets/check-icon.png'
import passIcon from '@/assets/pass-icon.png'

const Box = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  width: 510px;
  height: 330px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  margin: 10px;
`

const Title = styled.h3`
  font-size: 16px;
  font-family: 'Binggrae', serif;
  font-weight: 700;
  margin: 10px;
  padding: 5px;
  color: #051d2f;
`

const MypageResultContainer = styled.div`
  background: rgba(255, 255, 255, 0.75);
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  min-width: 450px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //gap: 4px;
  align-content: center;
`

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 5px 10px;
  border-radius: 16px;
  box-shadow:
    0 2px 0 #d1d8ff,
    0 3px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: 6px;
  gap: 5px;
`

const IconWrapper = styled.div`
  flex: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IconCircle = styled.div`
  background-color: white;
  padding: 2px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.img`
  width: 10px;
  height: 10px;
`

const GrayBox = styled.div`
  flex: ${({ $flex }) => $flex};
  background-color: #e3e3e3;
  padding: 5px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const mockExploreRecords = [
  {
    id: 1001,
    tier: 'Gold V',
    title: '부분 수열의 합',
    status: '성공',
  },
  {
    id: 2020,
    tier: 'Silver I',
    title: 'LCS',
    status: '패스',
  },
  {
    id: 3010,
    tier: 'Bronze II',
    title: 'DFS와 BFS',
    status: '성공',
  },
  {
    id: 4040,
    tier: 'Silver III',
    title: '토마토',
    status: '패스',
  },
  {
    id: 5050,
    tier: 'Gold IV',
    title: '다익스트라',
    status: '성공',
  },
]

const ExploreRecords = ({ problems = mockExploreRecords }) => {
  return (
    <Box>
      <Title>최근 탐험 기록</Title>
      <MypageResultContainer>
        {problems.map((p) => (
          <ResultRow key={p.id}>
            <IconWrapper>
              <IconCircle>
                <Icon
                  src={p.status === '성공' ? checkIcon : passIcon}
                  alt={p.status === '성공' ? 'solved' : 'pass'}
                />
              </IconCircle>
            </IconWrapper>
            <GrayBox $flex="1.5">{p.tier}</GrayBox>
            <GrayBox $flex="1">{p.id}</GrayBox>
            <GrayBox $flex="2">{p.title}</GrayBox>
            <GrayBox $flex="1">{p.status}</GrayBox>
          </ResultRow>
        ))}
      </MypageResultContainer>
    </Box>
  )
}

export default ExploreRecords
