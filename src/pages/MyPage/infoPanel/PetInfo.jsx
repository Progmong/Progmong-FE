import styled from 'styled-components'
import ExpBar from './ExpBar'
import BaseButton from '@/components/BaseButton.jsx'
import { useMyPage } from '@/context/MyPageContext'

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
`

const PetInfo = () => {
  const { myPageData, loading } = useMyPage()
  if (loading || !myPageData) return <div>로딩 중...</div>

  const pet = myPageData.pet || {
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

  const growthProgress = pet.level % 5
  const growthMax = 5
  const growthLabel = `${pet.level} / ${Math.floor(pet.level / 5) * 5 + 5} 레벨`

  return (
    <>
      <LabelRow>
        <div>단계</div>
        <div>{pet.stage === 1 ? '알' : pet.stage === 2 ? '성장기' : '성인기'}</div>
      </LabelRow>
      <LabelRow>
        <div>레벨</div>
        <div>{pet.level}</div>
      </LabelRow>
      <LabelRow>
        <div>경험치</div>
        <ExpBar current={pet.exp} max={pet.expMax} />
      </LabelRow>
      <LabelRow>
        <div>다음 성장까지</div>
        <ExpBar current={growthProgress} max={growthMax} label={growthLabel} />
      </LabelRow>
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <BaseButton>애칭 수정</BaseButton>
      </div>
    </>
  )
}

export default PetInfo
