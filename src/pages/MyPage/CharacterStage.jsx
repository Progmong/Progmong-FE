import styled from 'styled-components'

import progmongImage from '../../assets/progmong.png'
import BaseButton from '../../components/BaseButton.jsx'
import { useModal } from '@/context/ModalContext.jsx' // 예시용

const Stage = styled.section`
  background-color: white;
  border-radius: 16px;
  margin: 4px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`

const CharacterImage = styled.img`
  width: 200px;
  height: 300px;
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

const CharacterStage = () => {
  const { openModal } = useModal()
  return (
    <Stage>
      <section>
        <CharacterImage src={progmongImage} alt="프로그몽" />

        <MessageBox>
          <MessageText>애라 모르겠다~!</MessageText>
          <BaseButton onClick={() => openModal('tag-edit', { title: '오늘의 한마디 수정' })}>
            수정하기
          </BaseButton>
        </MessageBox>
      </section>
    </Stage>
  )
}

export default CharacterStage
