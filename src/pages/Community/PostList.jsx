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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

const WriteButtonContainer = styled.div`
  display: inline-block;
  text-align: end;
`
const PostList = () => {
  const { posts } = useOutletContext()
  const navigate = useNavigate()

  const isCickWrite = () => {
    navigate(`posts/new`)
  }
  return (
    <div>
      <ListContainer>
        {posts.map((post) => (
          <ElementContainer key={post.postId}>
            <FreePostEle post={post} />
          </ElementContainer>
        ))}
      </ListContainer>
      <BottomContainer>
        <div></div>
        <div></div>
        <WriteButtonContainer>
          <BaseButton onClick={isCickWrite}>글쓰기</BaseButton>
        </WriteButtonContainer>
      </BottomContainer>
    </div>
  )
}
export default PostList
