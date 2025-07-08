import BaseContainer from '@/components/BaseContainer'
import formatRelativeTime from '@/utils/formatRelativeTime'
import getPetImage from '@/utils/PetImageUrl'

// 전체 목록 래퍼
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* 댓글 사이 간격 */
  padding: 0;
  margin: 0;
  list-style: none;
`

// 개별 댓글 카드
const CommentCard = styled(BaseContainer)`
  display: flex;
  gap: 12px; /* 아바타와 내용 간 간격 */
  border: 1px solid #ccc;
  padding: 14px 16px;
`

const AvatarCircle = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #6c7ae0; /* 기본 배경색 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
`

// 내용 래퍼
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

// 작성자 이름 + 시각 한 줄
const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  font-size: 14px;
`

const AuthorName = styled.span`
  font-weight: 700;
  color: #222;
`

const CreatedAt = styled.span`
  font-weight: 400;
  color: #888;
`

// 실제 댓글 본문
const CommentText = styled.p`
  margin: 0;
  white-space: pre-wrap; /* 줄바꿈/여러 줄 유지 */
  font-size: 15px;
  color: #333;
`

const PetInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const PetImageContainer = styled.div`
  margin-left: 2rem;
`

const PetInfoText = styled.div`
  text-align: center;
  font-family: 'Binggrae';
`

const CommentList = ({ comments = [] }) => {
  // 이름에서 첫 글자(한글 음절·알파벳 등) 추출
  // const getInitial = (name) => (name ? name.trim().charAt(0).toUpperCase() : '?')

  // axios 통신을 기다려야함
  console.log('댓글 Props 결과')
  console.log(comments)
  return (
    <ListWrapper>
      {comments.map((c) => (
        <CommentCard key={c.id}>
          {/* <AvatarCircle>{getInitial(c.authorName)}</AvatarCircle> */}
          <div>
            <PetImageContainer>
              <img src={getPetImage(c.userPet.petId, c.userPet.evolutionStage)} width={100}></img>
              <PetInfoText>
                LV.{c.userPet.level} {c.userPet.nickname}
              </PetInfoText>
            </PetImageContainer>
          </div>
          <Content>
            <MetaRow>
              <AuthorName>{c.authorName}</AuthorName>
              <CreatedAt>{formatRelativeTime(c.createdAt)}</CreatedAt>
            </MetaRow>
            <CommentText>{c.content}</CommentText>
          </Content>
        </CommentCard>
      ))}
    </ListWrapper>
  )
}
export default CommentList
