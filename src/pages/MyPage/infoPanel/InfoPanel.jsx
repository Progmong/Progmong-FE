// InfoPanel.jsx
import React, { useState } from 'react'
import styled from 'styled-components'
import BaseButton from '@/components/BaseButton.jsx'
import PetInfo from '@/pages/MyPage/infoPanel/PetInfo.jsx'
import UserInfo from '@/pages/MyPage/infoPanel/UserInfo.jsx'

const Panel = styled.div`
  min-width: 300px;
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

const ContentBox = styled.div`
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 12px;
  min-height: 100px;
  font-size: 14px;
`
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

const InfoPanel = ({ user, pet }) => {
  const [mode, setMode] = useState('pet')

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
      <ContentBox>{mode === 'pet' ? <PetInfo pet={pet} /> : <UserInfo user={user} />}</ContentBox>
    </Panel>
  )
}

export default InfoPanel
