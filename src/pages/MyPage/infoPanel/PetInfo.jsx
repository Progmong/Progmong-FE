import styled from 'styled-components'
import ExpBar from './ExpBar'
import BaseButton from '@/components/BaseButton.jsx'
import { useModal } from '@/context/ModalContext.jsx'
import { useMyPage } from '@/context/MyPageContext.jsx'
import AxiosInstance from '@/constants/axiosInstance.js'

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
`
const InfoRowLeft = styled.div`
  min-width: 80px;
  text-align: center;
  background-color: rgba(204, 204, 204, 0.5);
`
const InfoRowRight = styled.div``

const PetButtonContainer = styled.div`
  gap: 10px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const PetInfo = () => {
  const { mypageData, refetchMypageData } = useMyPage()
  const pet = mypageData?.userPet
  const { openModal } = useModal()

  if (!pet) return <div>펫 정보를 불러오는 중입니다...</div>

  const handleEditNickname = () => {
    openModal('text-edit', {
      title: '펫 애칭 수정',
      message: '새 애칭을 입력해주세요.',
      value: pet.nickname,
      onSubmit: async (newNickname) => {
        try {
          await AxiosInstance.patch('/pet/nickname', { nickname: newNickname })
          await refetchMypageData()
          openModal('alert', {
            title: '성공',
            message: '애칭이 변경되었습니다.',
            confirmText: '확인',
          })
        } catch (err) {
          console.error(err)
          openModal('alert', {
            title: '오류',
            message: '애칭 변경에 실패했습니다.',
            confirmText: '닫기',
          })
        }
      },
    })
  }

  const handlePetProud = () => {
    const isPetProud = pet.proud
    openModal('alert', {
      title: '펫 공개 설정 변경',
      message: isPetProud
        ? '펫을 비공개로 변경하시겠습니까?'
        : '펫을 공개로 변경하시겠습니까?',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: async () => {
        try {
          await AxiosInstance.patch('/pet/proud', { proud: !isPetProud })
          await refetchMypageData()
          openModal('alert', {
            title: '성공',
            message: '공개 여부가 변경되었습니다.',
            confirmText: '확인',
          })
        } catch (err) {
          console.error(err)
          openModal('alert', {
            title: '오류',
            message: '공개 여부 변경에 실패했습니다.',
            confirmText: '닫기',
          })
        }
      },
    })
  }

  return (
    <>
      <LabelRow>
        <InfoRowLeft>애칭</InfoRowLeft>
        <InfoRowRight>{pet.nickname}</InfoRowRight>
      </LabelRow>
      <LabelRow>
        <InfoRowLeft>단계</InfoRowLeft>
        <InfoRowRight>{pet.evolutionStage}</InfoRowRight>
      </LabelRow>
      <LabelRow>
        <InfoRowLeft>레벨</InfoRowLeft>
        <InfoRowRight>{pet.level}</InfoRowRight>
      </LabelRow>
      <LabelRow>
        <InfoRowLeft>경험치</InfoRowLeft>
        <ExpBar current={pet.currentExp} max={pet.maxExp} />
      </LabelRow>
      <LabelRow>
        <InfoRowLeft>상태</InfoRowLeft>
        <InfoRowRight>{pet.status}</InfoRowRight>
      </LabelRow>
      <LabelRow>
        <InfoRowLeft>공개 여부</InfoRowLeft>
        <InfoRowRight>{pet.proud ? '공개' : '비공개'}</InfoRowRight>
      </LabelRow>

      <PetButtonContainer>
        <BaseButton onClick={handlePetProud}>펫 공개</BaseButton>
        <BaseButton onClick={handleEditNickname}>애칭 수정</BaseButton>
      </PetButtonContainer>
    </>
  )
}

export default PetInfo