import FreePostEle from './FreePostEle'

import BaseButton from '@/components/BaseButton'

const BaseContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

  const goWrite = () => {
    navigate('/community/write', { state: { mode: '쓰기' } })
  }
  return (
    <BaseContainer>
      <ListContainer>
        {posts.map((post) => (
          <FreePostEle key={post.postId} post={post} />
        ))}
      </ListContainer>
      <BottomContainer>
        <div></div>
        <div></div>
        <WriteButtonContainer>
          <BaseButton onClick={goWrite}>글쓰기</BaseButton>
        </WriteButtonContainer>
      </BottomContainer>
    </BaseContainer>
  )
}
export default PostList
