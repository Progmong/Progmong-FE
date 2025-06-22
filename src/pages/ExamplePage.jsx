// 컴포넌트의 상태관리를 hooks 폴더에 분리
import { useNeonColor } from '../hooks/useNeonColor'

// styled-components가 적용된 버튼 구조 생성 == Vue의 template
import BaseButton from '../components/BaseButton'
import BaseButton2 from '../components/BaseButton2'
import styled from 'styled-components'

// styled-component
const Box = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 10px;
`

const FontBox = styled.div`
  font-family: 'Binggrae';
`

const Title = styled.div`
  font-family: 'Binggrae';
  font-weight: 700;
  font-size: large;

  margin-bottom: 3px;
  border-bottom: 2px;
  border-color: black;
`

const ExamplePage = () => {
  // BaseButton의 분리된 상태를 인스턴스화
  const { currentColor, handleHover, handleLeave } = useNeonColor(
    '#f148fb', // 기본 네온
    '#00ccff', // hover 시 네온
  )

  // 리액트 기본 상태
  const [count, setCount] = useState(0)

  // 페이지구성
  return (
    // styled-component로 만든 Div
    <Box>
      <BaseButton
        currentColor={currentColor}
        handleHover={handleHover}
        handleLeave={handleLeave}
        onClick={() => setCount((count) => count + 1)}
      >
        네온 버튼
      </BaseButton>
      <FontBox>빙그레체 입니다</FontBox>
      <div>클릭 횟수 : {count}</div>

      <Title>공통 넘포넌트화</Title>
      <Title>버튼</Title>
      <BaseButton2>기본</BaseButton2>

      <Title>Div(컨테이너)</Title>

      <Title>Input(인풋)</Title>
    </Box>
  )
}
export default ExamplePage
