import DOMPurify from 'dompurify'

import BaseEditor from '@/components/BaseEditor'
import BaseButton from '@/components/BaseButton'
import useCommnunityApi from '@/constants/Community'

// styled-components 정의
const Container = styled.div`
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

const PostModify = () => {
  const { modify } = useCommnunityApi()
  const location = useLocation()
  const { post } = location.state || {}
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const { category, postId } = useParams()
  const handleContentChange = (html) => {
    setContent(html)
  }

  useEffect(() => {
    if (post) {
      setTitle(post.title)
    }
  }, [])
  const isClickModify = async () => {
    console.log('제목 : ' + title)
    console.log('=========내용========')
    console.log(content)

    // HTML 상에서 JS 공격을 방지
    // const safeHtml = DOMPurify.sanitize(content)

    const res = await modify(postId, title, content)
    if (res.status === 200) {
      console.log('글 수정 성공')
      navigate(`/community/${category}/posts/${postId}`, { replace: true })
    } else {
      console.log(res)
    }
  }

  return (
    <Container>
      <TitleInput
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <BaseEditor
          style="height:100%"
          onContentChange={handleContentChange}
          content={post.content}
        />
      </div>
      <div style={{ display: 'inline-block', textAlign: 'right', marginTop: '1rem' }}>
        <BaseButton variant="pass" onClick={isClickModify}>
          완료
        </BaseButton>
      </div>
    </Container>
  )
}
export default PostModify
