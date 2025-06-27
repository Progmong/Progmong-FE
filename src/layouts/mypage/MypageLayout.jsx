import styled from 'styled-components'

import InfoPanel from '../../pages/MyPage/infoPanel/InfoPanel.jsx'
import CharacterStage from '../../pages/MyPage/CharacterStage.jsx'
import ExploreRecords from '../../pages/MyPage/ExploreRecord.jsx'
import InterestTags from '../../pages/MyPage/InterestTags.jsx'

const BackgroundContainer = styled.div`
  background-color: #fff5db;
  //min-height: 100vh;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: Binggrae;
`

const Container = styled.div`
  width: 100%;
  //max-height: 100vh;
  padding: 24px;
  display: flex;
`

const Wrapper = styled.div`
  margin: 5px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const UpperContents = styled.div`
  //  모바일에서 felx => block
  display: flex;
  flex-direction: row;
`

const BottomContents = styled.div`
  //  모바일에서 felx => block
  display: flex;
  width: 100%;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
`

const MyPageLayout = () => {
  const mockData = {
    pet: {
      type: 2, // pet2
      stage: 3, // stage3
      name: '에라그몽프로그몽',
    },
    user: {
      nickname: '애라모르겠다',
      email: 'progmong@gmail.com',
      bjId: 'progmong',
    },
    interestTags: [1, 2, 5],
    message: '애라 모르겠다~!',
    exploreRecords: [
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
    ],
  }

  return (
    <BackgroundContainer>
      <Container>
        <Wrapper>
          <UpperContents>
            <InfoPanel />
            <MainContent>
              <CharacterStage />
            </MainContent>
          </UpperContents>
          <BottomContents>
            <ExploreRecords />
            <InterestTags />
          </BottomContents>
        </Wrapper>
      </Container>
    </BackgroundContainer>
  )
}

export default MyPageLayout
