import styled from 'styled-components'

const FontBox = styled.div`
  font-family: 'Binggrae';
`
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 24px;
`

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 24px;
`

const SideBar = styled.aside`
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const CharacterStage = styled.section`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`

const BottomGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`

const Box = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`

const MyPageLayout = () => {
  return (
    <Container>
      <Wrapper>
        <SideBar>좌측 정보 영역</SideBar>
        <MainContent>
          <CharacterStage>캐릭터 무대 영역</CharacterStage>
          <BottomGrid>
            <Box>최근 탐험 기록</Box>
            <Box>관심 태그 영역</Box>
          </BottomGrid>
        </MainContent>
      </Wrapper>
    </Container>
  )
}

export default MyPageLayout
