import styled from 'styled-components'
import BaseButton from '@/components/BaseButton.jsx'
import { useMyPage } from '@/context/MyPageContext'
import InfoRow from '@/pages/MyPage/infoPanel/InfoRow.jsx'
import { memo } from 'react'
import AxiosInstance from '@/constants/axiosInstance.js'
import { useModal } from '@/context/ModalContext.jsx'
import { toast } from 'react-toastify'

const InfoWrapper = styled.div`
  width: 90%;
  background-color: #f4f4f4;
  border-radius: 12px;
  padding: 10px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
  width: 270px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PetInfo = () => {
  const { myPageData, loading, refreshMyPageData } = useMyPage()
  const { openModal } = useModal()

  if (loading || !myPageData) return <div>로딩 중...</div>

  const pet = myPageData.pet || {
    // 에러 핸들링을 위한 기본값
    type: 1,
    stage: 1,
    name: '펫정보-기본',
    level: 1,
    exp: 0,
    expMax: 50,
    status: '휴식',
    message: '펫정보-기본 메시지',
    proud: false,
  }

  const handlePetNameChange = () => {
    // 추후 애칭 변경 모달 열기
    console.log('애칭 수정')
    // Alert 모달로 변경되었음을 알림
    openModal('text-edit', {
      title: '애칭 변경',
      message: '새 애칭을 입력하세요.',
      onConfirm: async (newNickname) => {
        // 서버에 닉네임 변경 요청
        console.log(`모달 컨펌 액션 새 닉네임: ${newNickname}`)
        // 상태 관리를 이용해 전체 페이지 전부 다시 렌더링
        if (!newNickname) {
          console.error('닉네임은 비워둘 수 없습니다.')
          toast.error('닉네임은 비워둘 수 없습니다.')
          return
        }
        if (newNickname.length > 12) {
          console.error('닉네임은 1자 이상 12자 이하로 입력해주세요.')
          toast.error('닉네임은 1자 이상 12자 이하로 입력해주세요.')
          return
        }
        try {
          const res = await AxiosInstance.patch('/pet/nickname', newNickname, {
            headers: {
              'Content-Type': 'text/plain',
            },
          })
          console.log('닉네임 변경 완료:', res.data)
          refreshMyPageData()
          toast.success('애칭이 변경되었습니다.')
        } catch (error) {
          console.error('닉네임 변경 실패:', error)
          toast.error(error?.response?.data?.message)
        }
      },
    })
  }

  const handlePetProudChange = () => {
    // AlertModal로 펫 자랑하기/비공개 변경
    console.log('프로그몽 자랑하기/비공개 변경 모달 열기')
    openModal('alert', {
      title: '프로그몽 자랑하기',
      message: pet.proud ? '펫을 비공개로 전환하시겠습니까?' : '펫을 자랑하시겠습니까?',
      onConfirm: async () => {
        try {
          const res = await AxiosInstance.patch('/pet/proud', !pet.proud)
          console.log('펫 자랑하기 상태 변경 완료:', res.data)
          refreshMyPageData()
          toast.success(`펫을 ${!pet.proud ? '자랑하기' : '비공개'}로 전환했습니다.`)
        } catch (error) {
          console.error('펫 자랑하기 상태 변경 실패:', error)
          toast.error('펫 자랑하기 상태 변경에 실패했습니다. 다시 시도해주세요.')
        }
      },
      containCancel: true,
    })
  }

  const growthProgress = pet.level % 5
  const growthMax = 5
  const growthNextStage = Math.floor(pet.level / 5) + 1
  const growthLabel = `${growthProgress} / ${growthMax} (Lv.${growthNextStage * 5})`
  const expLabel = `${pet.exp} / ${pet.expMax}`

  return (
    <InfoContainer>
      <InfoWrapper>
        <InfoRow
          label="단계"
          value={pet.stage === 1 ? '알' : pet.stage === 2 ? '성장기' : '성인기'}
        />
        <InfoRow label="레벨" value={'Lv.' + pet.level} />
        <InfoRow label="경험치" expData={{ exp: pet.exp, expMax: pet.expMax, label: expLabel }} />
        <InfoRow
          label="다음성장"
          expData={{ exp: growthProgress, expMax: growthMax, label: growthLabel }}
        />
        <InfoRow label="상태" value={pet.status} />
      </InfoWrapper>
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <ButtonGroup>
          <BaseButton onClick={handlePetNameChange} $size="sm">
            애칭 수정
          </BaseButton>
          <BaseButton onClick={handlePetProudChange} $variant="secondary" $size="sm">
            {pet.proud ? '프로그몽 비공개' : '프로그몽 자랑하기'}
          </BaseButton>
        </ButtonGroup>
      </div>
    </InfoContainer>
  )
}

export default memo(PetInfo)
