// InfoPanel.jsx
import React, { memo, useState } from 'react'
import styled from 'styled-components'
import BaseButton from '@/components/BaseButton.jsx'
import PetInfo from '@/pages/MyPage/infoPanel/PetInfo.jsx'
import UserInfo from '@/pages/MyPage/infoPanel/UserInfo.jsx'
import { useMyPage } from '@/context/MyPageContext.jsx'

const Panel = styled.div`
  min-width: 280px;
  max-width: 700px;
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 10px;
`

const Title = styled.div`
  font-family: Binggrae, serif;
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
  margin-left: 10px;
`

const ToggleGroup = styled.div`
  display: flex;
  gap: 10px;

  & > * {
    flex: 1;
  }
`

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  min-height: 330px;
  font-size: 14px;
`

const InfoPanel = () => {
  const [mode, setMode] = useState('pet')
  const { myPageData, loading } = useMyPage()

  if (loading || !myPageData) return <div>로딩 중...</div>

  const { user, pet } = myPageData

  return (
    <Panel>
      <Title>내 정보</Title>
      <ToggleGroup>
        <BaseButton
          $variant={mode === 'pet' ? 'secondary' : 'pass'}
          size="sm"
          onClick={() => setMode('pet')}
        >
          프로그몽
        </BaseButton>
        <BaseButton
          $variant={mode === 'user' ? 'secondary' : 'pass'}
          size="sm"
          onClick={() => setMode('user')}
        >
          유저정보
        </BaseButton>
      </ToggleGroup>
      <ContentBox>{mode === 'pet' ? <PetInfo /> : <UserInfo />}</ContentBox>
    </Panel>
  )
}

export default memo(InfoPanel)
