import useCommnunityApi from '@/constants/Community'
import formatRelativeTime from '../../utils/formatRelativeTime'
import BaseContainer from '@/components/BaseContainer'
import ContentViewer from '@/components/ContentView'
import BasePetInfo from '@/components/BasePetInfo'
import BaseCommentInput from '@/components/BaseCommentInput'
import CommentList from './CommentList'
import useCommentApi from '@/constants/comment'
import { useState } from 'react'

const Wrapper = styled.div``

const LoadingWrapper = styled.div`
  text-align: center;
  font-size: 5rem;
  color: var(--bg-community);
`

const PostContainer = styled(BaseContainer)`
  padding: 2rem;
  position: relative;
  min-height: 60vh;
`

const Header = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  font-family: 'Binggrae';
  font-size: var(--font-size-md);
  gap: var(--spacing-lg);
  margin-top: var(--spacing-sm);
`

const MetaTitleContainer = styled.span`
  opacity: 0.6;
  margin-right: var(--spacing-sm);
`

const TitleContainer = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: bold;
`

const ContentContainer = styled.div`
  margin-top: var(--spacing-lg);
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

// 초기 더미 댓글
const initialComments = [
  {
    id: 1,
    author: { name: '홍길동' }, // 작성자 이름
    content: '첫 번째 댓글입니다.\n두 줄 테스트.', // 줄바꿈 포함 예시
    createdAt: '1시간 전',
  },
  {
    id: 2,
    author: { name: '김개발' },
    content: '두 번째 댓글.\nReact + styled-components 굿!',
    createdAt: '45분 전',
  },
  {
    id: 3,
    author: { name: '추추' },
    content: '세 번째 댓글.\nTextarea 자동 리사이즈 확인 완료.',
    createdAt: '10분 전',
  },
]

const PostDetail = () => {
  // 필요한것
  // 닉네임, 펫데이터[알종류(이미지로), 레벨, 단계]
  // 조회수, 추천, 댓글 수
  // 내용
  // 댓글

  // 라우터로 부터 게시글 번호를 받아온다
  // const { postId } = useParams()
  const { postId } = useParams()

  const { postDetail, deletePost } = useCommnunityApi()
  const { commentAll, commentWrite } = useCommentApi()

  const [post, setPost] = useState(null)
  const [postLoading, setPostLoading] = useState(true)

  const [comments, setComments] = useState(initialComments)
  const [commentsLoading, setCommentsLoading] = useState(true)

  const navigate = useNavigate()

  const fetchCmtData = () => {}

  // 게시글 불러오기
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await postDetail(postId)
        setPost(res.data.data)

        console.log('불러온 게시글 목록')
        console.log(res.data.data)

        // 해당 post를 불러올 때 까지 loading 찾을 띄움
        setPostLoading(false)
      } catch (err) {
        console.log('글 불러오기 오류')
      }
    }

    fetchPostData()
  }, [])

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

  const fetchComments = useCallback(async () => {
    try {
      setCommentsLoading(true) // 스피너 표시
      const res = await commentAll(postId)
      setComments(res.data.data)
    } catch (err) {
      console.error('댓글 불러오기 오류', err)
    } finally {
      setCommentsLoading(false)
    }
  }, [postId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const onPostSubmit = async (comment) => {
    try {
      await commentWrite(postId, comment) // 등록
      await fetchComments() // 최신 목록 다시 불러오기
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
    const res = await deletePost(postId)
    if (res.status === 200) {
      console.log('글 삭제 성공')
      navigate(-1)
    } else {
      console.log('글 삭제 실패')
    }
    setPostMenuOpen(false)
  }

  return postLoading === false ? (
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
        {commentsLoading ? <IconLineMdLoadingTwotoneLoop /> : <CommentList comments={comments} />}
      </CommentWrapper>
    </Wrapper>
  ) : (
    <LoadingWrapper>
      <IconLineMdLoadingTwotoneLoop />
    </LoadingWrapper>
  )
}
export default PostDetail
