import styled from 'styled-components'
import ExpBar from './ExpBar'
import BaseButton from '@/components/BaseButton.jsx'

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
`

const PetInfo = ({ petData }) => {
  return (
    <>
      <LabelRow>
        <span>단계</span>
        <span>{petData.stage}</span>
      </LabelRow>
      <LabelRow>
        <span>레벨</span>
        <span>{petData.level}</span>
      </LabelRow>
      <LabelRow>
        <span>경험치</span>
        <ExpBar current={petData.exp} max={100} />
      </LabelRow>
      <LabelRow>
        <span>푼 문제</span>
        <span>{petData.solved}문제</span>
      </LabelRow>
      <LabelRow>
        <span>다음 성장까지</span>
        <ExpBar
          current={petData.growthProgress}
          max={10}
          label={`${petData.growthProgress}/10 레벨`}
        />
      </LabelRow>
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <BaseButton>애칭 수정</BaseButton>
      </div>
    </>
  )
}

export default PetInfo
