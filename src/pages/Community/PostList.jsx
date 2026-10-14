import FreePostEle from './FreePostEle'

import BaseButton from '@/components/BaseButton'

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ElementContainer = styled.div`
  transition: all 0.2s ease; /* 부드러운 트랜지션 */

  &:hover {
    transform: translateY(-2px) scale(1.02); /* 살짝 띄우고 확대 */
    cursor: pointer; /* 클릭 가능 커서 */
  }
`
const BottomContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  white-space: nowrap;
`

// 목록을 불러오는 동안 게시글 카드 높이만큼 자리를 잡아 글쓰기 버튼이 밀리지 않게 함
const SkeletonItem = styled.div`
  height: 64px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #e5e5e5;
`

const WriteButtonContainer = styled.div`
  display: inline-block;
  text-align: end;
`
const PostList = () => {
  const { posts, loading } = useOutletContext()
  const navigate = useNavigate()

  const isCickWrite = () => {
    navigate(`posts/new`)
  }
  return (
    <div>
      <ListContainer>
        {loading
          ? Array.from({ length: 3 }, (_, i) => <SkeletonItem key={i} />)
          : posts.map((post) => (
              <ElementContainer key={post.postId}>
                <FreePostEle post={post} />
              </ElementContainer>
            ))}
      </ListContainer>
      <BottomContainer>
        <WriteButtonContainer>
          <BaseButton onClick={isCickWrite}>글쓰기</BaseButton>
        </WriteButtonContainer>
      </BottomContainer>
    </div>
  )
}
export default PostList
