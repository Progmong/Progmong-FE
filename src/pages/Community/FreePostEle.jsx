import styled from 'styled-components'

import BaseContainer from '../../components/BaseContainer'
import formatRelativeTime from '../../utils/formatRelativeTime'

const Container = styled.div`
  display: grid; /* 그리드 레이아웃 활성화 */
  grid-template-columns: 3fr 1fr 1fr; /* 3개의 컬럼을 각각 1fr씩 */
  grid-gap: 16px;
  font-family: 'Binggrae';
  padding: 10px;
`

const TitleBox = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
`

const AuthorBox = styled.div``

const AuthorTextBox = styled.div`
  display: inline-block;
  background-color: #f7f8fa;
  padding: 4px;
  border-radius: 5px;
  box-shadow: 0 1px 0 #19213d1a;
`

const CreatedBox = styled.div`
  display: flex;
  align-items: center;
`

const FreePostEle = (props) => {
  const navigate = useNavigate()

  const formatedTime = formatRelativeTime(props.post.createdAt)

  const isClick = () => {
    console.log('postId : ' + props.post.postId + ' 클릭됨')
    navigate(`posts/${props.post.postId}`)
  }
  return (
    <BaseContainer style={{ border: '1px solid #ccc' }} onClick={isClick}>
      <Container>
        <TitleBox>{props.post.title}</TitleBox>
        <AuthorBox>
          <AuthorTextBox>{props.post.nickname}</AuthorTextBox>
        </AuthorBox>

        <CreatedBox>{formatedTime}</CreatedBox>
      </Container>
    </BaseContainer>
  )
}
export default FreePostEle
