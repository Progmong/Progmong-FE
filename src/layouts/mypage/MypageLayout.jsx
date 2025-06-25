import styled from 'styled-components'

import InfoPanel from '../../pages/MyPage/InfoPanel.jsx'
import CharacterStage from '../../pages/MyPage/CharacterStage.jsx'
import ExploreRecords from '../../pages/MyPage/ExploreRecord.jsx'
import InterestTags from '../../pages/MyPage/InterestTags.jsx'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fff5db;
  padding: 24px;
`

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 24px;
`

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const BottomGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`

const MyPageLayout = () => {
  return (
    <Container>
      <Wrapper>
        <InfoPanel />
        <MainContent>
          <CharacterStage />
          <BottomGrid>
            <ExploreRecords />
            <InterestTags />
          </BottomGrid>
        </MainContent>
      </Wrapper>
    </Container>
  )
}

export default MyPageLayout
