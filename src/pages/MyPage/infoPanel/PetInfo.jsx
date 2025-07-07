import styled from 'styled-components'
import BaseButton from '@/components/BaseButton.jsx'
import { useMyPage } from '@/context/MyPageContext'
import InfoRow from '@/pages/MyPage/infoPanel/InfoRow.jsx'
import { memo } from 'react'

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`

const PetInfo = () => {
  const { myPageData, loading } = useMyPage()
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
  }

  const handlePetProudChange = () => {
    // 추후 펫 자랑하기/비공개 토글 기능 구현
    console.log('펫 자랑하기/비공개 토글')
    // Alert 모달로 변경되었음을 알림
    // 상태 관리를 이용해 전체 페이지 전부 다시 렌더링
  }

  const growthProgress = pet.level % 5
  const growthMax = 5
  const growthLabel = `${pet.level} / ${Math.floor(pet.level / 5) * 5 + 5} 레벨`
  const expLabel = `${pet.exp} / ${pet.expMax}`

  return (
    <>
      <InfoRow
        label="단계"
        value={pet.stage === 1 ? '알' : pet.stage === 2 ? '성장기' : '성인기'}
      />
      <InfoRow label="레벨" value={pet.level} />
      <InfoRow label="경험치" expData={{ exp: pet.exp, expMax: pet.expMax, label: expLabel }} />
      <InfoRow
        label="다음 성장까지"
        expData={{ exp: growthProgress, expMax: growthMax, label: growthLabel }}
      />
      <InfoRow label="상태" value={pet.status} />
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <ButtonGroup>
          <BaseButton onClick={handlePetNameChange}>애칭 수정</BaseButton>
          <BaseButton onClick={handlePetProudChange} variant="secondary">
            {pet.proud ? '펫 비공개' : '펫 자랑하기'}
          </BaseButton>
        </ButtonGroup>
      </div>
    </>
  )
}

export default memo(PetInfo)
