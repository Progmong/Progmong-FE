import styled from 'styled-components'

import BaseButton from '../../components/BaseButton.jsx'
import { useModal } from '@/context/ModalContext.jsx'
import pet1_stage1 from '@/assets/pets/pet1_stage1.png'
import pet1_stage2 from '@/assets/pets/pet1_stage2.png'
import pet1_stage3 from '@/assets/pets/pet1_stage3.png'
import pet2_stage1 from '@/assets/pets/pet2_stage1.png'
import pet2_stage2 from '@/assets/pets/pet2_stage2.png'
import pet2_stage3 from '@/assets/pets/pet2_stage3.png'
import pet3_stage1 from '@/assets/pets/pet3_stage1.png'
import pet3_stage2 from '@/assets/pets/pet3_stage2.png'
import pet3_stage3 from '@/assets/pets/pet3_stage3.png'
import { useMyPage } from '@/context/MyPageContext.jsx'
import { memo } from 'react'

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

const petImagesMap = {
  1: {
    1: pet1_stage1,
    2: pet1_stage2,
    3: pet1_stage3,
  },
  2: {
    1: pet2_stage1,
    2: pet2_stage2,
    3: pet2_stage3,
  },
  3: {
    1: pet3_stage1,
    2: pet3_stage2,
    3: pet3_stage3,
  },
}
const mockMessage = ' message'
const mockPetData = {
  type: 2, // pet2
  stage: 3, // stage3
  name: '에라그몽프로그몽',
}

const CharacterStage = () => {
  const { openModal } = useModal()
  const { myPageData, loading } = useMyPage()

  if (loading || !myPageData) return <div>로딩 중...</div>

  const { pet, message } = myPageData
  const petImage = petImagesMap[pet.type]?.[pet.stage]

  return (
    <Stage>
      <section>
        <CharacterImage src={petImage} alt={`pet${pet.type}_stage${pet.stage}`} />

        <MessageBox>
          <MessageText>{message}</MessageText>
          <BaseButton onClick={() => openModal('text-edit', { title: '오늘의 한마디 수정' } )}>
            수정하기
          </BaseButton>
        </MessageBox>
      </section>
    </Stage>
  )
}

export default memo(CharacterStage)
