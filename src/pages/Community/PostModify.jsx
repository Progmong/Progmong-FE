import DOMPurify from 'dompurify'

import BaseEditor from '@/components/BaseEditor'
import BaseButton from '@/components/BaseButton'
import useCommnunityApi from '@/constants/Community'
import { toast } from 'react-toastify'

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
  const { modify, postDetail } = useCommnunityApi()
  const location = useLocation()
  const navigate = useNavigate()
  const { category, postId } = useParams()

  // 상세 페이지에서 넘어오면 state를 쓰고, 새로고침·직접 접근이면 API로 불러옴
  const [post, setPost] = useState(location.state?.post ?? null)
  const [title, setTitle] = useState(post?.title ?? '')
  const [content, setContent] = useState(post?.content ?? '')

  useEffect(() => {
    if (post) return
    const fetchPost = async () => {
      try {
        const res = await postDetail(postId)
        setPost(res.data.data)
        setTitle(res.data.data.title)
        setContent(res.data.data.content)
      } catch (err) {
        console.error('게시글 불러오기 오류', err)
        toast.error('게시글을 불러오지 못했어요.')
        navigate(`/community/${category}`, { replace: true })
      }
    }
    fetchPost()
  }, [postId])

  const handleContentChange = (html) => {
    setContent(html)
  }

  const isClickModify = async () => {
    if (!title.trim()) {
      toast.warning('제목을 입력해주세요.')
      return
    }

    // HTML 상에서 JS 공격을 방지
    // const safeHtml = DOMPurify.sanitize(content)

    try {
      await modify(postId, title, content)
      navigate(`/community/${category}/posts/${postId}`, { replace: true })
    } catch (err) {
      console.error('글 수정 오류', err)
      toast.error('게시글을 수정하지 못했어요.')
    }
  }

  if (!post) {
    return (
      <Container style={{ alignItems: 'center', fontSize: '3rem' }}>
        <IconLineMdLoadingTwotoneLoop />
      </Container>
    )
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
