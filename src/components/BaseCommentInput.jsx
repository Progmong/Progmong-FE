import BaseContainer from '@/components/BaseContainer'
import BaseButton from '@/components/BaseButton'

const Wrapper = styled(BaseContainer)`
  border: 1px solid #ccc;
`

// 전체 입력 박스
const CommentBox = styled.form`
  display: flex;
  align-items: flex-end; /* textarea가 늘어나면 버튼을 아래에 맞춤 */
  gap: 12px;
  padding: 14px 16px;
  background: #ffffff;
  border-radius: 12px;
`

// textarea: 다중 줄 입력, 오토 리사이즈, 테두리·배경 투명
const CommentTextarea = styled.textarea`
  flex: 1;
  min-height: 55px; /* 기본 높이 */
  max-height: 160px; /* 너무 커지지 않도록 제한 */
  border: none;
  outline: none;
  resize: none; /* 사용자가 수동으로 늘리는 것 방지 */
  font-size: 15px;
  line-height: 1.4;
  border-radius: 14px;
  padding: 10px;
  color: #333;
  &::placeholder {
    color: #bbb;
  }
  /* 스크롤바 숨김 (webkit 계열) */
  &::-webkit-scrollbar {
    display: none;
  }

  border: 1px var(--border-light) solid;
`

// 등록 버튼
const SubmitButton = styled.button`
  flex-shrink: 0;
  padding: 8px 20px;
  background: #ffc107;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: var(--font-size-lg);
  color: #fff;
  cursor: pointer;
  transition: transform 0.15s ease;
  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`

const BaseCommentInput = ({ onSubmit }) => {
  // 입력 상태
  const [comment, setComment] = useState('')
  const textareaRef = useRef(null)

  // textarea 높이를 내용에 맞게 자동 조절
  const autoResize = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto' // 높이 초기화
    el.style.height = `${el.scrollHeight}px`
  }

  // 입력 변경 처리
  const handleChange = (e) => {
    setComment(e.target.value)
    autoResize()
  }

  // 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    onSubmit?.(comment.trim())
    setComment('')
    autoResize() // 입력 초기화 후 높이 복원
  }

  return (
    <Wrapper>
      <CommentBox onSubmit={handleSubmit}>
        <CommentTextarea
          ref={textareaRef}
          value={comment}
          placeholder="댓글 추가…"
          onChange={handleChange}
        />
        <BaseButton size="md" type="submit">
          등록
        </BaseButton>
      </CommentBox>
    </Wrapper>
  )
}
export default BaseCommentInput
