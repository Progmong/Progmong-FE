import React, { useState } from 'react'
import styled from 'styled-components'
import BaseButton from '@/components/BaseButton.jsx'
import PetInfo from '@/pages/MyPage/infoPanel/PetInfo.jsx'
import UserInfo from '@/pages/MyPage/infoPanel/UserInfo.jsx'
import { useMyPage } from '@/context/MyPageContext.jsx'

const Panel = styled.div`
  min-width: 200px;
  max-width: 300px;
  min-height: 200px;
  background-color: white;
  border-radius: 16px;
  padding: 14px;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`

const ContentBox = styled.div`
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 12px;
  min-height: 100px;
  font-size: 14px;
`

const InfoPanel = () => {
  const [mode, setMode] = useState('pet')
  const { mypageData } = useMyPage()
  const user = mypageData?.user
  const pet = mypageData?.userPet

  return (
    <Panel>
      <Title>내 정보</Title>
      <ToggleGroup>
        <BaseButton
          $variant={mode === 'pet' ? 'secondary' : 'pass'}
          size="sm"
          onClick={() => setMode('pet')}
          style={{ width: '120px' }}
        >
          프로그몽
        </BaseButton>
        <BaseButton
          $variant={mode === 'user' ? 'secondary' : 'pass'}
          size="sm"
          onClick={() => setMode('user')}
          style={{ width: '120px' }}
        >
          유저정보
        </BaseButton>
      </ToggleGroup>
      <ContentBox>
        {mode === 'pet' ? <PetInfo /> : <UserInfo />}
      </ContentBox>
    </Panel>
  )
}

export default InfoPanel
