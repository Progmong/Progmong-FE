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

const BottomContents = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
`

const UpperContents = styled.div`
  display: flex;
  flex-direction: row;
`

const MyPageLayout = () => {
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
