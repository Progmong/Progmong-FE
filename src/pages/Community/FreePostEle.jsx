import styled from 'styled-components'

import BaseContainer from '../../components/BaseContainer'
import formatRelativeTime from '../../utils/formatRelativeTime'

const Container = styled.div`
  display: grid; /* 그리드 레이아웃 활성화 */
  grid-template-columns: 3fr 1fr 1fr; /* 3개의 컬럼을 각각 1fr씩 */
  grid-gap: 16px;
  font-family: 'Binggrae';
  padding: 10px;
  @media (max-width: 767px) {
    /* 모바일: 제목 한 줄 전체, 작성자·시간은 아래 줄 */
    grid-template-columns: 1fr auto;
    grid-gap: 8px;
  }
`

const TitleBox = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  min-width: 0;
  overflow-wrap: anywhere;
  @media (max-width: 767px) {
    grid-column: 1 / -1;
  }
`

const AuthorBox = styled.div`
  white-space: nowrap;
`

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
  white-space: nowrap;
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
