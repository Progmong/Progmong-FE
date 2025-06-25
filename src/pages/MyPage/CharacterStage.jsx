import styled from 'styled-components'

import progmongImage from '../../assets/progmong.png'
import BaseButton from '../../components/BaseButton.jsx' // 예시용

const Stage = styled.section`
  background-color: white;
  border-radius: 16px;

  padding: 24px;
  text-align: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`

const CharacterImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 16px;
`

const MessageBox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

const MessageText = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  color: #333;
  flex: 1;
  text-align: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

// const EditButton = styled.button`
//   padding: 6px 12px;
//   font-size: 14px;
//   border-radius: 6px;
//   background-color: #f3f4f6;
//   border: 1px solid #ccc;
//   cursor: pointer;
//   transition: background-color 0.2s;
//   &:hover {
//     background-color: #e5e7eb;
//   }
// `

const CharacterStage = () => {
  return (
    <Stage>
      <section>
        <CharacterImage src={progmongImage} alt="프로그몽" />

        <MessageBox>
          <MessageText>애라 모르겠다~!</MessageText>
          {/*<EditButton>수정하기</EditButton>*/}
          <BaseButton>수정하기</BaseButton>
        </MessageBox>
      </section>
    </Stage>
  )
}

export default CharacterStage
