import BaseContainer from '@/components/BaseContainer'
import useCommentApi from '@/constants/comment'
import formatRelativeTime from '@/utils/formatRelativeTime'
import getPetImage from '@/utils/petImageUrl'
import { useState } from 'react'

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
  position: relative;
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

const MenuButton = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
`
const DropdownMenu = styled.div`
  position: absolute;
  bottom: 32px;
  right: 8px;
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

  const [openMenuId, setOpenMenuId] = useState(null)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editText, setEditText] = useState('')

  const { commentModify, commentDelete } = useCommentApi()
  const { postId } = useParams()

  const handleEdit = (id) => {
    const commentToEdit = comments.find((item) => item.id === id)
    setEditText(commentToEdit ? commentToEdit.content : '')
    setEditingCommentId(id)
    setOpenMenuId(null)
  }
  const handleDelete = async (id) => {
    console.log('Delete comment', id)
    const res = await commentDelete(postId, id)
    if (res.status === 200) {
      console.log('댓글 삭제 성공')
    } else {
      console.log('삭제실패')
    }
    setOpenMenuId(null)
  }

  const handleCancelEdit = () => {
    setEditingCommentId(null)
    setEditText('')
  }
  const handleSaveEdit = async (id) => {
    console.log('Save edited comment', id, editText)
    const res = await commentModify(postId, id, editText)
    if (res.status === 200) {
      console.log('댓글 수정 성공')
    } else {
      console.log('수정실패')
    }
    setEditingCommentId(null)
    setEditText('')
  }

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
            {editingCommentId === c.id ? (
              <>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{
                    width: '100%',
                    fontSize: '15px',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
                <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleSaveEdit(c.id)}>저장</button>
                  <button onClick={handleCancelEdit}>취소</button>
                </div>
              </>
            ) : (
              <CommentText>{c.content}</CommentText>
            )}
          </Content>
          {c.writer && (
            <>
              <MenuButton onClick={() => setOpenMenuId(openMenuId === c.id ? null : c.id)}>
                ···
              </MenuButton>
              {openMenuId === c.id && (
                <DropdownMenu>
                  <DropdownItem onClick={() => handleEdit(c.id)}>수정하기</DropdownItem>
                  <DropdownItem onClick={() => handleDelete(c.id)}>삭제하기</DropdownItem>
                </DropdownMenu>
              )}
            </>
          )}
        </CommentCard>
      ))}
    </ListWrapper>
  )
}
export default CommentList
