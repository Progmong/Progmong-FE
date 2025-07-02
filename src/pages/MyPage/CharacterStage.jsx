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
import stageImage from '@/assets/mypage/stage_background.png'
import AxiosInstance from '@/constants/axiosInstance.js'
import { useMyPage } from '@/context/MyPageContext.jsx'

const Stage = styled.div`
  display: flex;
  align-content: center;
  flex-direction: column;
  background-color: white;
  border-radius: 16px;
  margin: 4px;
  padding: 14px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  min-width: 280px;
`

const StageContainer = styled.div`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '360px')};
  max-width: ${({ $isMobile }) => ($isMobile ? '380px' : '500px')};
  height: ${({ $isMobile }) => ($isMobile ? '220px' : '300px')};
  position: relative;
  background-image: url(${stageImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
`

const Title = styled.h2`
  font-family: Binggrae;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`

const CharacterImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ $isMobile }) => ($isMobile ? '60%' : '70%')};
  max-height: 200px;
  object-fit: contain;
  height: auto;
`

const MessageBox = styled.div`
  display: ${({ $isMobile }) => ($isMobile ? 'block' : 'flex')};
  gap: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`

const MessageText = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 5px;
  font-size: 14px;
  color: #333;
  flex: 1;
  text-align: center;
  max-width: ${({ $isMobile }) => ($isMobile ? '300px' : '280px')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const petImagesMap = {
  1: { 1: pet1_stage1, 2: pet1_stage2, 3: pet1_stage3 },
  2: { 1: pet2_stage1, 2: pet2_stage2, 3: pet2_stage3 },
  3: { 1: pet3_stage1, 2: pet3_stage2, 3: pet3_stage3 },
}

const CharacterStage = ({ isMobile }) => {
  const { openModal } = useModal()
  const { mypageData, refetchMypageData } = useMyPage()
  const pet = mypageData?.pet
  const message = mypageData?.message?.message ?? ''

  if (!pet || !pet.petId || !pet.evolutionStage) {
    return <div>펫 데이터를 불러오는 중입니다...</div>
  }

  const petImage = petImagesMap[pet.petId]?.[pet.evolutionStage]

  return (
    <Stage $isMobile={isMobile}>
      <Title>프로그몽</Title>
      <StageContainer $isMobile={isMobile}>
        {petImage ? (
          <CharacterImage
            src={petImage}
            alt={`pet${pet.petId}_stage${pet.evolutionStage}`}
            $isMobile={isMobile}
          />
        ) : (
          <div>이미지를 불러올 수 없습니다.</div>
        )}
      </StageContainer>
      <MessageBox $isMobile={isMobile}>
        <MessageText $isMobile={isMobile}>{message}</MessageText>
        <BaseButton
          style={{ width: '80px', padding: '5px 3px', fontSize: '14px' }}
          onClick={() =>
            openModal('text-edit', {
              title: '오늘의 한마디 수정',
              message: '펫에게 하고 싶은 말을 적어주세요.',
              value: message,
              onSubmit: async (newMessage) => {
                try {
                  await AxiosInstance.patch('/pet/message', {
                    message: newMessage,
                  })

                  openModal('alert', {
                    title: '수정 완료',
                    message: '오늘의 한마디가 수정되었습니다.',
                    confirmText: '확인',
                    onClose: () => refetchMypageData(),
                  })
                } catch (err) {
                  console.error(err)
                  openModal('alert', {
                    title: '오류',
                    message: '오늘의 한마디 수정에 실패했습니다.',
                    confirmText: '닫기',
                  })
                }
              },
            })
          }
        >
          수정하기
        </BaseButton>
      </MessageBox>
    </Stage>
  )
}

export default CharacterStage
