import styled from 'styled-components'

import InfoPanel from '../../pages/MyPage/InfoPanel.jsx'
import CharacterStage from '../../pages/MyPage/CharacterStage.jsx'
import ExploreRecords from '../../pages/MyPage/ExploreRecord.jsx'
import InterestTags from '../../pages/MyPage/InterestTags.jsx'

const BackgroundContainer = styled.div`
  background-color: #fff5db;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  width: 100%;
  max-height: 100vh;
  padding: 24px;
  display: flex;
`

const Wrapper = styled.div`
  margin: 5px auto;
  display: flex;
  gap: 20px;
`

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const BottomContents = styled.section`
  display: flex;
  width: 100%;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
`

const MyPageLayout = () => {
  return (
    <BackgroundContainer>
      <Container>
        <Wrapper>
          <InfoPanel />
          <MainContent>
            <CharacterStage />
            <BottomContents>
              <ExploreRecords />
              <InterestTags />
            </BottomContents>
          </MainContent>
        </Wrapper>
      </Container>
    </BackgroundContainer>
  )
}

export default MyPageLayout
