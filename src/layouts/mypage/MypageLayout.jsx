import styled from 'styled-components'

import InfoPanel from '../../pages/MyPage/infoPanel/InfoPanel.jsx'
import CharacterStage from '../../pages/MyPage/CharacterStage.jsx'
import ExploreRecords from '../../pages/MyPage/ExploreRecord.jsx'
import InterestTags from '../../pages/MyPage/InterestTags.jsx'
import { MyPageProvider } from '@/context/MyPageContext.jsx'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

const BackgroundContainer = styled.div`
  background-color: #fff5db;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: Binggrae;
  padding-bottom: 50px;
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
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`

const UpperContents = styled.div`
  //  모바일에서 felx => block
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const BottomContents = styled.div`
  //  모바일에서 felx => block
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  min-height: 310px;
`
const MyPageNav = styled.div`
  background-image: url('/src/assets/modalBackground.png');
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 14px;
  padding: 20px 20px;
  border-radius: 8px;
`

const MyPageTitle = styled.div`
  padding: 10px 0;
  font-size: 40px;
  background-color: white;
  border-radius: 16px;
  width: 400px;
  font-weight: bold;
  color: #051d2f;
  font-family: Binggrae, serif;
  text-align: center;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px; /* 제목의 최대 너비 설정 */
`

const GoToMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  background-color: white;
  width: 80px;
  height: 40px;
  cursor: default;
  font-size: 16px;
  font-weight: bold;
  color: #051d2f;
  padding: 3px 10px;
  border-radius: 20px;

  &:hover {
    text-decoration: underline;
  }
`
const LogOut = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  background-color: white;
  width: 80px;
  height: 40px;
  padding: 3px 10px;
  cursor: pointer;
  border-radius: 20px;
  color: #051d2f;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`

const MyPageLayout = () => {
  const navigate = useNavigate()
  const handleGoToMain = () => {
    console.log('마이페이지에서 메인으로 이동')
    navigate('/main')
  }
  const handleLogOut = () => {
    // 로그아웃 로직 구현
    console.log('로그아웃')
  }
  return (
    // 마이페이지 컨텍스트 제공자 => 사용시 useMyPage 훅을 통해 데이터 접근 가능(컨슈머 대신  커스텀 훅 방식 사용)
    <MyPageProvider>
      <BackgroundContainer>
        <Container>
          <Wrapper>
            <MyPageNav>
              <GoToMain onClick={handleGoToMain}>메인페이지</GoToMain>
              <MyPageTitle>마이페이지</MyPageTitle>
              <LogOut onClick={handleLogOut}>로그아웃</LogOut>
            </MyPageNav>
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
