import useCommnunityApi from '@/constants/Community'
import formatRelativeTime from '../../utils/formatRelativeTime'
import BaseContainer from '@/components/BaseContainer'
import ContentViewer from '@/components/ContentView'
import BasePetInfo from '@/components/BasePetInfo'
import BaseCommentInput from '@/components/BaseCommentInput'
import CommentList from './CommentList'
import useCommentApi from '@/constants/comment'
import BaseButton from '@/components/BaseButton'
import { toast } from 'react-toastify'

const Wrapper = styled.div``

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  padding: 4rem 1rem;
  font-family: 'Binggrae';
  font-size: var(--font-size-lg);
`

const LoadingWrapper = styled.div`
  text-align: center;
  font-size: 5rem;
  color: var(--bg-community);
`

const PostContainer = styled(BaseContainer)`
  padding: 2rem;
  position: relative;
  min-height: 60vh;
  @media (max-width: 767px) {
    padding: 1.25rem 1rem;
  }
`

const Header = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  font-family: 'Binggrae';
  font-size: var(--font-size-md);
  gap: var(--spacing-lg);
  margin-top: var(--spacing-sm);
  flex-wrap: wrap;
  @media (max-width: 767px) {
    gap: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-sm);
  }
`

const MetaTitleContainer = styled.span`
  opacity: 0.6;
  margin-right: var(--spacing-sm);
`

const TitleContainer = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: bold;
  overflow-wrap: anywhere;
  padding-right: 2rem; /* 우측 상단 메뉴 버튼과 겹치지 않게 */
  @media (max-width: 767px) {
    font-size: var(--font-size-xl);
  }
`

const ContentContainer = styled.div`
  margin-top: var(--spacing-lg);
  overflow-wrap: anywhere;

  /* 본문 이미지·코드 블록이 화면 폭을 넘지 않도록 */
  img {
    max-width: 100%;
    height: auto;
  }
  pre {
    overflow-x: auto;
  }
`

const PetInfoWrapper = styled.div`
  margin-top: var(--spacing-lg);
`

const CommentWrapper = styled(BaseContainer)`
  margin-top: var(--spacing-lg);
  display: flex;
  flex-direction: column;

  gap: var(--spacing-lg);

  padding: 14px;
`

const MenuButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  user-select: none;
`
const DropdownMenu = styled.div`
  position: absolute;
  top: 3rem;
  right: 1rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 10;
`
const DropdownItem = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`

const PostDetail = () => {
  // 필요한것
  // 닉네임, 펫데이터[알종류(이미지로), 레벨, 단계]
  // 조회수, 추천, 댓글 수
  // 내용
  // 댓글

  // 라우터로 부터 게시글 번호를 받아온다
  // const { postId } = useParams()
  const { category, postId } = useParams()

  const { postDetail, deletePost } = useCommnunityApi()
  const { commentAll, commentWrite } = useCommentApi()

  const [post, setPost] = useState(null)
  const [postLoading, setPostLoading] = useState(true)

  const [postError, setPostError] = useState(null)

  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(true)

  const navigate = useNavigate()

  const fetchCmtData = () => {}

  // 게시글 불러오기 (다른 글로 이동하면 다시 불러옴)
  useEffect(() => {
    let ignore = false
    const fetchPostData = async () => {
      setPostLoading(true)
      setPostError(null)
      try {
        const res = await postDetail(postId)
        if (ignore) return
        if (!res.data?.data) throw new Error('게시글 없음')
        setPost(res.data.data)
      } catch (err) {
        if (ignore) return
        setPostError(
          err.response?.status === 404 || err.message === '게시글 없음'
            ? '게시글을 찾을 수 없습니다.'
            : '게시글을 불러오지 못했습니다.',
        )
      } finally {
        if (!ignore) setPostLoading(false)
      }
    }

    fetchPostData()
    return () => {
      ignore = true
    }
  }, [postId])

  // // 댓글 불러오기
  // useEffect(() => {
  //   const fetchCmtData = async () => {
  //     try {
  //       const res = await commentAll(postId)
  //       setComments(res.data.data)

  //       console.log('불러온 댓글 목록')
  //       console.log(res.data.data)

  //       // 해당 post를 불러올 때 까지 loading 찾을 띄움
  //       setCommentsLoading(false)
  //     } catch (err) {
  //       console.log('댓글 불러오기 오류')
  //     }
  //   }

  //   fetchCmtData()
  // }, [])

  // const onPostSubmit = async (comment) => {
  //   const res = await commentWrite(postId, comment)
  //   console.log(res)
  // }

  // silent: 작성/수정/삭제 후 갱신할 때는 스피너 없이 목록만 교체 (레이아웃 깜빡임 방지)
  const fetchComments = useCallback(
    async (silent = false) => {
      try {
        if (!silent) setCommentsLoading(true) // 스피너 표시
        const res = await commentAll(postId)
        setComments(res.data.data)
      } catch (err) {
        console.error('댓글 불러오기 오류', err)
      } finally {
        setCommentsLoading(false)
      }
    },
    [postId],
  )

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const onPostSubmit = async (comment) => {
    try {
      await commentWrite(postId, comment) // 등록
      await fetchComments(true) // 최신 목록 다시 불러오기
    } catch (err) {
      console.error('댓글 등록 오류', err)
    }
  }

  const [postMenuOpen, setPostMenuOpen] = useState(false)
  const handlePostEdit = () => {
    console.log('Edit post', postId)
    navigate('modify', { state: { post } })

    setPostMenuOpen(false)
  }
  const handlePostDelete = async () => {
    console.log('Delete post', postId)
    setPostMenuOpen(false)
    try {
      await deletePost(postId)
      toast.success('게시글을 삭제했어요.')
      // 진입 경로와 상관없이 해당 카테고리 목록으로 이동
      navigate(`/community/${category}`, { replace: true })
    } catch (err) {
      console.error('글 삭제 오류', err)
      toast.error('게시글을 삭제하지 못했어요.')
    }
  }

  if (postLoading) {
    return (
      <LoadingWrapper>
        <IconLineMdLoadingTwotoneLoop />
      </LoadingWrapper>
    )
  }

  if (postError) {
    return (
      <ErrorWrapper>
        <p>{postError}</p>
        <BaseButton onClick={() => navigate(`/community/${category}`, { replace: true })}>
          목록으로
        </BaseButton>
      </ErrorWrapper>
    )
  }

  return (
    <Wrapper>
      <PostContainer>
        {post.writer && (
          <>
            <MenuButton onClick={() => setPostMenuOpen(!postMenuOpen)}>···</MenuButton>
            {postMenuOpen && (
              <DropdownMenu>
                <DropdownItem onClick={handlePostEdit}>수정하기</DropdownItem>
                <DropdownItem onClick={handlePostDelete}>삭제하기</DropdownItem>
              </DropdownMenu>
            )}
          </>
        )}
        <TitleContainer>{post.title}</TitleContainer>
        <Header>
          <span>
            <MetaTitleContainer>작성자</MetaTitleContainer>
            <span>{post.nickname}</span>
          </span>
          <span>
            <MetaTitleContainer>경과시간</MetaTitleContainer>
            <span>{formatRelativeTime(post.createdAt)}</span>
          </span>
          <span>
            <MetaTitleContainer>조회수</MetaTitleContainer>
            <span>{post.viewCount}</span>
          </span>
        </Header>
        <div style={{ border: '1px #ccc solid', marginTop: '1rem' }}></div>
        <ContentContainer>
          <ContentViewer html={post.content} />
        </ContentContainer>
      </PostContainer>
      <PetInfoWrapper>
        <BasePetInfo nickname={post.nickname}></BasePetInfo>
      </PetInfoWrapper>
      <CommentWrapper>
        <BaseCommentInput onSubmit={onPostSubmit}></BaseCommentInput>
        {commentsLoading ? (
          <IconLineMdLoadingTwotoneLoop />
        ) : (
          <CommentList comments={comments} onChanged={() => fetchComments(true)} />
        )}
      </CommentWrapper>
    </Wrapper>
  )
}
export default PostDetail
