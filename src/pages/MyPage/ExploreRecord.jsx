import styled from 'styled-components'
import checkIcon from '@/assets/check-icon.png'
import passIcon from '@/assets/pass-icon.png'

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

const MypageResultContainer = styled.div`
  background: rgba(255, 255, 255, 0.75);
  padding: 10px;
  border-radius: 20px;
  width: 30vw;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`

const MypageTotalExpText = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 24px;
  font-family: 'Binggrae';
`

const MyPageResultHeaderRow = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 12px;
`

const MyPageResultHeaderCol = styled.div`
  flex: ${({ flex }) => flex};
  text-align: center;
`

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 12px 20px;
  border-radius: 16px;
  box-shadow:
    0 4px 0 #d1d8ff,
    0 6px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: 12px;
`

const IconWrapper = styled.div`
  //flex: 0.5;
  //display: flex;
  //justify-content: center;
  //align-items: center;
`

const IconCircle = styled.div`
  background-color: white;
  padding: 5px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.img`
  width: 15px;
  height: 15px;
`

const GrayBox = styled.div`
  flex: ${({ flex }) => flex};
  background-color: #e3e3e3;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ExitButton = styled.button`
  display: block;
  margin: 30px auto 0;
  background-color: #a8ff3e;
  padding: 14px 32px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  box-shadow: 0 4px 0 #80cc33;

  &:hover {
    background-color: #92e632;
  }
`

const ExploreRecords = () => {
  const problems = [1, 2, 3, 4, 5] || []

  return (
    <Box>
      <Title>최근 탐험 기록</Title>
      <MypageResultContainer>
        <MyPageResultHeaderRow>
          <MyPageResultHeaderCol flex="0.5" />
          <MyPageResultHeaderCol flex="0.8">티어</MyPageResultHeaderCol>
          <MyPageResultHeaderCol flex="1">번호</MyPageResultHeaderCol>
          <MyPageResultHeaderCol flex="2">이름</MyPageResultHeaderCol>
        </MyPageResultHeaderRow>
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
            <GrayBox flex="0.8">{p.tier}</GrayBox>
            <GrayBox flex="1">{p.id}</GrayBox>
            <GrayBox flex="2">{p.title}</GrayBox>
          </ResultRow>
        ))}
      </MypageResultContainer>
    </Box>
  )
}

export default ExploreRecords
