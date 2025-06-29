import PostEditor from './PostEditor'

import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'

import { useQuill } from 'react-quilljs'
import MagicUrl from 'quill-magic-url' // Babel·TypeScript 환경
import useCommnunityApi from '@/constants/Community'
import PostDetail from './PostDetail'

import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const TitleInput = styled.input`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  border: none;
  border-bottom: 2px solid #e0e0e0;
  padding: 12px 0;
  margin-bottom: 32px;
  outline: none;

  &::placeholder {
    color: #b0b0b0;
  }

  &:focus {
    border-bottom-color: #d3a76b;
  }

  &:disabled {
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const BottomContainer = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

const WriteButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`

const PostWrite = () => {
  const { write, modify, deletePost } = useCommnunityApi()

  const { state } = useLocation()
  const navigate = useNavigate()

  // 제목
  const [title, setTitle] = useState('')

  // 자식(텍스트에디터)의 상태를 부모가 가지게 함
  const modules = { magicUrl: true }
  const theme = state.theme || 'snow'
  const readOnly = state.readOnly || false
  const { quill, quillRef, Quill } = useQuill({ theme, modules, readOnly })

  //onMound작업
  // mode == 수정 일경우
  // quill 은 보기 모드로

  // if (Quill && !quill) {
  //   // For execute this line only once.
  //   Quill.register('modules/magicUrl', MagicUrl)
  // }

  // ① quill 이 준비되면
  useEffect(() => {
    if (!quill) return // quill 인스턴스가 아직 없으면 탈출

    if (state.mode === '보기') {
      // ② 제목 세팅
      setTitle(state.detail.title)

      // ③ Delta JSON 형태로 보관된 본문 불러오기
      const delta = JSON.parse(state.detail.content)
      console.log(delta)
      console.log('본문 불러옴')
      quill.setContents(delta, 'api') // Delta 그대로 주입

      // 또는 HTML 형태로 저장했다면
      // quill.clipboard.dangerouslyPasteHTML(state.detail.html)

      // ④ 읽기 전용 모드이면 비활성화
      quill.enable(false)
    }
  }, [quill, state.mode, state.detail])

  useEffect(() => {
    if (!quill) return

    console.log('다른곳에서옴')
    if (state.mode === '보기') {
      // 여기에 실제 로직 넣기
    }
  }, [quill, state.postId, state.mode])

  const isCickWrite = async (mode) => {
    console.log(quill.getLength())
    quill.disable()
    // 수정 버튼을 누르면 수정 가능하게 모드 변경

    // 삭제를 누르면 확인 후 삭제 >> 전 페이지로 이동

    // 제목 검증
    if (title.length === 0) {
      console.log('제목을 입력')
      return
    }

    if (title.length > 50) {
      console.log('제목이 너무 깁니다 (< 50자)')
      return
    }

    // 본문
    if (quill.getLength() === 1) {
      console.log('본문을 입력')
      return
    }

    if (mode === '쓰기') {
      // 서버로 글 보내기
      const res = await write(title, JSON.stringify(quill.getContents()), '알고리즘')
      if (res.status === 200) {
        console.log('게시글 쓰기 성공')
        console.log(res.data.data)
        navigate('/community/write', {
          replace: true,
          state: { mode: '보기', detail: res.data.data, theme: 'bubble' },
        })
      } else {
        console.log('게시글 쓰기 실패')
      }
    } else {
      // 수정
      const res = await modify(state.postId, title, JSON.stringify(quill.getContents()))
      if (res.status === 200) {
        console.log('게시글 쓰기 성공')
        handleFinish()
      } else {
        console.log('게시글 쓰기 실패')
      }
    }
  }

  const handleFinish = () => {
    // 1) 뒤로 가기
    navigate(-1)
    // 2) 이전 페이지 강제 새로고침
    window.location.reload()
  }

  const isCickDelete = async () => {
    // 삭제
    const res = await deletePost(state.postId)
    if (res.status === 200) {
      console.log('게시글 삭제 성공')
      handleFinish()
    } else {
      console.log('게시글 삭제 실패')
    }
  }

  return (
    <Wrapper key={theme}>
      <TitleInput
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={state.mode === '보기'}
      />
      <div style={{ flexGrow: 1 }}>
        <PostEditor state={{ quill, quillRef, Quill }} />
      </div>
      <BottomContainer>
        <div>
          {state.mode === '수정' ? (
            <BaseButton variant="secondary" onClick={isCickDelete}>
              삭제
            </BaseButton>
          ) : null}
        </div>
        <div></div>
        <WriteButtonContainer>
          {state.mode === '수정' ? (
            <BaseButton
              variant="pass"
              onClick={() => {
                isCickWrite('수정')
              }}
            >
              수정
            </BaseButton>
          ) : state.mode === '쓰기' ? (
            <BaseButton
              onClick={() => {
                isCickWrite('쓰기')
              }}
            >
              글쓰기
            </BaseButton>
          ) : null}
        </WriteButtonContainer>
      </BottomContainer>
    </Wrapper>
  )
}
export default PostWrite
