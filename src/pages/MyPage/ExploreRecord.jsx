import styled from 'styled-components'
import checkIcon from '@/assets/check-icon.png'
import passIcon from '@/assets/pass-icon.png'
import BaseButton from '@/components/BaseButton.jsx'
import React from 'react'
import { useModal } from '@/context/ModalContext.jsx'
import { useMyPage } from '@/context/MyPageContext.jsx'

const Box = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 10px 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  width: 510px;
  height: 330px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  margin: 10px;
`
const ExploreRecordHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  margin: 5px;
`
const Title = styled.h3`
  font-size: 16px;
  font-family: 'Binggrae', serif;
  font-weight: 700;
  margin: 10px;
  padding: 5px;
  color: #051d2f;
`
const BaseButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 6px 10px;
`

const MypageResultContainer = styled.div`
  background: rgba(255, 255, 255, 0.75);
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  min-width: 450px;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //gap: 4px;
  align-content: center;
`

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 5px 10px;
  border-radius: 16px;
  box-shadow:
    0 2px 0 #d1d8ff,
    0 3px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: 6px;
  gap: 5px;
`

const IconWrapper = styled.div`
  flex: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IconCircle = styled.div`
  background-color: white;
  padding: 2px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.img`
  width: 10px;
  height: 10px;
`

const GrayBox = styled.div`
  flex: ${({ $flex }) => $flex};
  background-color: #e3e3e3;
  padding: 5px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ExploreRecords = () => {
  const { openModal } = useModal()
  const { myPageData, loading } = useMyPage()
  if (loading || !myPageData?.exploreRecords) return <div>Loading...</div>

  const problems = myPageData.exploreRecords

  const handleQueryExploreRecords = () => {
    console.log('탐험 기록 조회 버튼 클릭 및 모달 열기')
    openModal('record')
  }

  return (
    <Box>
      <ExploreRecordHeader>
        <Title>최근 탐험 기록</Title>
        <BaseButtonWrapper>
          <BaseButton onClick={handleQueryExploreRecords} $size="sm">
            탐험 기록 조회
          </BaseButton>
        </BaseButtonWrapper>
      </ExploreRecordHeader>
      <MypageResultContainer>
        {problems.length > 0 ? (
          problems.map((p) => (
            <ResultRow key={p.id}>
              <IconWrapper>
                <IconCircle>
                  <Icon
                    src={p.status === '성공' ? checkIcon : passIcon}
                    alt={p.status === '성공' ? 'solved' : 'pass'}
                  />
                </IconCircle>
              </IconWrapper>
              <GrayBox $flex="1">{p.tier}</GrayBox>
              <GrayBox $flex="1">{p.id}</GrayBox>
              <GrayBox $flex="2">{p.title}</GrayBox>
              <GrayBox $flex="1">{p.status}</GrayBox>
              <GrayBox $flex="1">{p.mainTagKo}</GrayBox>
            </ResultRow>
          ))
        ) : (
          <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '20px'}}>기록이 없습니다.</div>
        )}
      </MypageResultContainer>
    </Box>
  )
}

export default ExploreRecords
