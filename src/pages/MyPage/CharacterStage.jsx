import styled from 'styled-components'
import BaseButton from '../../components/BaseButton.jsx'
import { useModal } from '@/context/ModalContext.jsx'
import { useMyPage } from '@/context/MyPageContext.jsx'
import { useMediaQuery } from 'react-responsive'
import { memo } from 'react'
import stageImage from '@/assets/mypage/stage_background.png'

// 펫 이미지 맵
import pet1_stage1 from '@/assets/pets/pet1_stage1.png'
import pet1_stage2 from '@/assets/pets/pet1_stage2.png'
import pet1_stage3 from '@/assets/pets/pet1_stage3.png'
import pet2_stage1 from '@/assets/pets/pet2_stage1.png'
import pet2_stage2 from '@/assets/pets/pet2_stage2.png'
import pet2_stage3 from '@/assets/pets/pet2_stage3.png'
import pet3_stage1 from '@/assets/pets/pet3_stage1.png'
import pet3_stage2 from '@/assets/pets/pet3_stage2.png'
import pet3_stage3 from '@/assets/pets/pet3_stage3.png'
import pet4_stage1 from '@/assets/pets/pet4_stage1.png'
import pet4_stage2 from '@/assets/pets/pet4_stage2.png'
import pet4_stage3 from '@/assets/pets/pet4_stage3.png'
import AxiosInstance from '@/constants/axiosInstance.js'
import { toast } from 'react-toastify'

const Stage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 16px;
  margin: 10px;
  padding: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  min-width: 600px;
  gap: 8px;
`

const Title = styled.div`
  font-family: Binggrae, serif;
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
  margin-left: 10px;
`

const StageContainer = styled.div`
  width: ${({ $isMobile }) => ($isMobile ? '360px' : '100%')};
  //max-width: ${({ $isMobile }) => ($isMobile ? '380px' : '500px')};
  height: ${({ $isMobile }) => ($isMobile ? '220px' : '350px')};
  position: relative;
  background-image: url(${stageImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  margin-bottom: 12px;
`
const PetName = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: Binggrae, serif;
  font-size: 24px;
  font-weight: bold;
  color: rgba(5, 29, 47, 0.9);
  text-align: center;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CharacterImage = styled.img`
  position: absolute;
  top: 55%;
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
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const petImagesMap = {
  1: { 1: pet1_stage1, 2: pet1_stage2, 3: pet1_stage3 },
  2: { 1: pet2_stage1, 2: pet2_stage2, 3: pet2_stage3 },
  3: { 1: pet3_stage1, 2: pet3_stage2, 3: pet3_stage3 },
  4: { 1: pet4_stage1, 2: pet4_stage2, 3: pet4_stage3 },
}

const CharacterStage = () => {
  const isMobile = useMediaQuery({ query: '(max-width:767px)' })
  const { openModal } = useModal()
  const { myPageData, loading, refreshMyPageData } = useMyPage()

  if (loading || !myPageData) return <div>로딩 중...</div>

  const { pet, message } = myPageData
  const petImage = petImagesMap[pet.type]?.[pet.stage]

  const handelEditMessage = () => {
    openModal('text-edit', {
      title: '오늘의 메시지 변경',
      message: '새 메시지를 입력하세요!',
      initialValue: message,
      onConfirm: async (newMessage) => {
        if (!newMessage) {
          console.error('메시지는 비워둘 수 없습니다.')
          toast.error('메시지는 비워둘 수 없습니다.')
          return
        }
        try {
          const res = await AxiosInstance.patch('/pet/message', newMessage, {
            headers: {
              'Content-Type': 'text/plain',
            },
          })
          console.log('메시지 변경 완료:', res.data)
          toast.success('메세지가 변경되었습니다.')
          refreshMyPageData()
        } catch (error) {
          console.error('메시지 변경 실패:', error)
          toast.error('메시지 변경에 실패했습니다. 다시 시도해주세요.')
          // 에러 핸들링 로직 추가
        }
      },
    })
  }

  return (
    <Stage>
      <Title>나의 프로그몽</Title>

      <StageContainer $isMobile={isMobile}>
        <PetName>{pet.name}</PetName>
        <CharacterImage
          src={petImage}
          alt={`pet${pet.type}_stage${pet.stage}`}
          $isMobile={isMobile}
        />
      </StageContainer>

      <MessageBox $isMobile={isMobile}>
        <MessageText $isMobile={isMobile}>{message}</MessageText>
        <BaseButton
          style={{ width: '80px', padding: '5px 3px', fontSize: '14px' }}
          onClick={handelEditMessage}
        >
          수정하기
        </BaseButton>
      </MessageBox>
    </Stage>
  )
}

export default memo(CharacterStage)
