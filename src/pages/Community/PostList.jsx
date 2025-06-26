import useCommnunityApi from '../../Services/Community'
import FreePostEle from './FreePostEle'

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const PostList = (props) => {
  return (
    <ListContainer>
      {props.posts.map((post) => (
        <FreePostEle key={post.id} post={post} />
      ))}
    </ListContainer>
  )
}
export default PostList
