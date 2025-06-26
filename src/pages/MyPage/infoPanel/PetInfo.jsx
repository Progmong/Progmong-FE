import styled from 'styled-components'
import ExpBar from './ExpBar'
import BaseButton from '@/components/BaseButton.jsx'

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
`

const PetInfo = ({ pet }) => {
  return (
    <>
      <LabelRow>
        <div>단계</div>
        <div>{pet.stage}</div>
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
        <div>푼 문제</div>
        <div>{pet.solved}문제</div>
      </LabelRow>
      <LabelRow>
        <div>다음 성장까지</div>
        <ExpBar
          current={pet.growthProgress}
          max={pet.growthMax}
          label={`${pet.growthProgress}/${pet.growthMax} 레벨`}
        />
      </LabelRow>
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <BaseButton>애칭 수정</BaseButton>
      </div>
    </>
  )
}

export default PetInfo
