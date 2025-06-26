import styled from 'styled-components'
import BaseButton from '@/components/BaseButton.jsx'
import UserInfo from '@/pages/MyPage/infoPanel/UserInfo.jsx'
import PetInfo from '@/pages/MyPage/infoPanel/PetInfo.jsx'

const Panel = styled.div`
  min-width: 200px;
  max-width: 400px;
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Title = styled.h2`
  font-family: Binggrae;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`

const ToggleGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`

// const BaseButton = styled.button`
//   flex: 1;
//   padding: 8px 12px;
//   border-radius: 8px;
//   border: 1px solid #ccc;
//   background-color: #f3f4f6;
//   font-weight: 500;
//   cursor: pointer;
//
//   &:hover {
//     background-color: #e5e7eb;
//   }
// `

const ContentBox = styled.div`
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 12px;
  min-height: 100px;
  font-size: 14px;
`

const InfoPanel = () => {
  const [mode, setMode] = useState('pet')

  const mockPet = {
    name: '에라그몽프로그몽',
    stage: '알',
    level: 20,
    exp: 70,
    expMax: 100,
    growthProgress: 5,
    growthMax: 10,
    solved: 120,
  }

  const mockUser = {
    nickname: '애라모르겠다',
    email: 'progmong@gmail.com',
    baekjoonId: 'progmong',
  }

  return (
    <Panel>
      <Title>내 정보</Title>
      <ToggleGroup>
        <BaseButton
          variant={mode === 'pet' ? 'secondary' : 'pass'}
          size="sm"
          onClick={() => setMode('pet')}
        >
          프로그몽
        </BaseButton>
        <BaseButton
          variant={mode === 'user' ? 'secondary' : 'pass'}
          size="sm"
          onClick={() => setMode('user')}
        >
          유저정보
        </BaseButton>
      </ToggleGroup>
      <ContentBox>
        {mode === 'pet' ? <PetInfo pet={mockPet} /> : <UserInfo user={mockUser} />}
      </ContentBox>
    </Panel>
  )
}

export default InfoPanel
