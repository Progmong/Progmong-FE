import BaseEditor from '@/components/BaseEditor'
import BaseButton from '@/components/BaseButton'

// styled-components 정의
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  display: flex;
  flex-direction: column;
  height: 100%;
`

const TitleText = styled.div`
  font-size: 2rem;
`
const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  margin-bottom: 12px;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid #ddd;
  font-weight: 600;

  &:focus {
    outline: none;
    border-bottom-color: #333;
  }
`
const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
  background: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
`
const ToolbarButton = styled.button`
  border: none;
  background: ${(props) => (props.active ? '#333' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
const EditorArea = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 300px;
  padding: 12px;
`
const SubmitButton = styled.button`
  margin-top: 16px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`

const PostWrite = () => {
  const [title, setTitle] = useState('')

  return (
    <Container>
      <TitleInput
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div style={{ height: '100%' }}>
        <BaseEditor style="height:100%" />
      </div>
      <div style={{ display: 'inline-block', textAlign: 'right' }}>
        <BaseButton>글쓰기</BaseButton>
      </div>
    </Container>
  )
}
export default PostWrite
