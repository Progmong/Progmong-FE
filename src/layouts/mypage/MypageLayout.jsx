import styled from 'styled-components'

import InfoPanel from '../../pages/MyPage/infoPanel/InfoPanel.jsx'
import CharacterStage from '../../pages/MyPage/CharacterStage.jsx'
import ExploreRecords from '../../pages/MyPage/ExploreRecord.jsx'
import InterestTags from '../../pages/MyPage/InterestTags.jsx'
import { MyPageProvider } from '@/context/MyPageContext.jsx'
import { memo } from 'react'

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
  return (
    // 마이페이지 컨텍스트 제공자 => 사용시 useMyPage 훅을 통해 데이터 접근 가능(컨슈머 대신  커스텀 훅 방식 사용)
    <MyPageProvider>
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
    </MyPageProvider>
  )
}

export default memo(MyPageLayout)
