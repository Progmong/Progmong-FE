// 컴포넌트의 상태관리를 hooks 폴더에 분리
import { useNeonColor } from '../hooks/useNeonColor'

// styled-components가 적용된 버튼 구조 생성 == Vue의 template
import BaseButton from '../components/BaseButton'
import BaseButton2 from '../components/BaseButton2'
import BaseContainer from '../components/BaseContainer'
import BaseInput from '../components/BaseInput'
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
  overflow-y: auto;
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

const ListBox = styled.div`
  display: flex;
  gap: 10px;
`

const ExamplePage = () => {
  // BaseButton의 분리된 상태를 인스턴스화
  const { currentColor, handleHover, handleLeave } = useNeonColor(
    '#f148fb', // 기본 네온
    '#00ccff', // hover 시 네온
  )

  // 리액트 기본 상태
  const [count, setCount] = useState(0)

  const handleEvent = () => {
    alert('눌림')
  }

  // 페이지구성
  return (
    // styled-component로 만든 Div
    <Box>
      <BaseButton
        currentColor={currentColor} // fdsf
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
      <ListBox>
        <BaseButton2
          variant="primary"
          size="sm"
          onClick={handleEvent} // 버튼에 대한 이벤트 처리 가능
        >
          기본색상/sm
        </BaseButton2>
        <BaseButton2 variant="primary" size="mg">
          기본색상/md
        </BaseButton2>
        <BaseButton2 variant="primary" size="lg">
          기본색상/lg
        </BaseButton2>
      </ListBox>
      <ListBox>
        <BaseButton2 variant="secondary" size="sm">
          2nd색상/sm
        </BaseButton2>
        <BaseButton2 variant="secondary" size="mg">
          2nd색상/md
        </BaseButton2>
        <BaseButton2 variant="secondary" size="lg">
          2nd색상/lg
        </BaseButton2>
      </ListBox>
      <ListBox>
        <BaseButton2 variant="pass" size="sm">
          3rd색상/sm
        </BaseButton2>
        <BaseButton2 variant="pass" size="mg">
          3rd색상/md
        </BaseButton2>
        <BaseButton2 variant="pass" size="lg">
          3rd색상/lg
        </BaseButton2>
      </ListBox>
      <BaseButton2 disabled>비활성화</BaseButton2>

      <Title>Div(컨테이너)</Title>
      <div
        style={{
          backgroundColor: '#ccc',
          padding: '10px',
          width: '800px',
          height: '100px',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <BaseContainer size="sm">텍스트가 sm인 컨테이너</BaseContainer>
        <BaseContainer size="md">텍스트가 md인 컨테이너</BaseContainer>
        <BaseContainer size="lg">텍스트가 lg인 컨테이너</BaseContainer>
      </div>
      <Title>Input(인풋)</Title>
      <ListBox>
        {/* 기본 text */}
        <BaseInput placeholder="이름" />

        {/* password */}
        <BaseInput type="password" placeholder="비밀번호" />

        {/* number */}
        <BaseInput type="number" />

        {/* email */}
        <BaseInput type="email" placeholder="example@example.com" />
      </ListBox>
    </Box>
  )
}
export default ExamplePage
