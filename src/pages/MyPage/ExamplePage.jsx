// 컴포넌트의 상태관리를 hooks 폴더에 분리
import { useNeonColor } from '../hooks/useNeonColor'

// styled-components가 적용된 버튼 구조 생성 == Vue의 template
import BaseButton from '../components/BaseButton'
import styled from 'styled-components'

// styled-component
const Box = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const FontBox = styled.div`
  font-family: 'Binggrae';
`

const ExamplePage = () => {
  // BaseButton의 분리된 상태를 인스턴스화
  const { currentColor, handleHover, handleLeave } = useNeonColor(
    '#f148fb', // 기본 네온
    '#00ccff', // hover 시 네온
  )

  // 페이지구성
  return (
    // styled-component로 만든 Div
    <Box>
      <BaseButton
        currentColor={currentColor}
        handleHover={handleHover}
        handleLeave={handleLeave}
        onClick={() => alert('클릭됨')}
      >
        네온 버튼
      </BaseButton>
      <FontBox>빙그레체 입니다</FontBox>
    </Box>
  )
}
export default ExamplePage
