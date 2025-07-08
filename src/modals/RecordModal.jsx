import React from 'react'
import styled from 'styled-components'

import BaseModal from '../components/BaseModal'
import BaseButton from '../components/BaseButton'
import { useModal } from '../context/ModalContext'

const MypageResultContainer = styled.div`
  background: rgba(255, 255, 255, 0.75);
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  min-width: 480px;
  min-height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //gap: 4px;
  align-content: center;
`
const ExploreModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 10px;
`

const ModalTitle = styled.div`
  margin: 0 60px 0 150px;
  display: flex;
  justify-content: center;


  font-size: 1.7rem;
  text-align: center;
  font-weight: bold;
  flex-grow: 0;
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

const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`
const ExploreCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  font-size: 16px;
  font-weight: bold;
`

const RecordModal = ({ title = '탐험 기록' }) => {
  const { closeModal } = useModal()

  const handleClickBefore = () => {
    console.log('handleClickBefore')
  }
  const handleClickAfter = () => {
    console.log('handleClickAfter')
  }

  // const problems = myPageData.exploreRecords || []

  const exploreText = '1 / 10'
  return (
    <BaseModal onClose={closeModal}>
      <ExploreModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <BaseButton onClick={closeModal} $size="sm" style={{ width: '80px', height: '40px' }}>
          {' '}
          닫기{' '}
        </BaseButton>
      </ExploreModalHeader>
      <MypageResultContainer>
        {/*problems&&{problems.map((p) => (*/}
        {/*  <ResultRow key={p.id}>*/}
        {/*    <IconWrapper>*/}
        {/*      <IconCircle>*/}
        {/*        <Icon*/}
        {/*          src={p.status === '성공' ? checkIcon : passIcon}*/}
        {/*          alt={p.status === '성공' ? 'solved' : 'pass'}*/}
        {/*        />*/}
        {/*      </IconCircle>*/}
        {/*    </IconWrapper>*/}
        {/*    <GrayBox $flex="1">{p.tier}</GrayBox>*/}
        {/*    <GrayBox $flex="1">{p.id}</GrayBox>*/}
        {/*    <GrayBox $flex="2">{p.title}</GrayBox>*/}
        {/*    <GrayBox $flex="1">{p.status}</GrayBox>*/}
        {/*    <GrayBox $flex="1">{p.mainTagKo}</GrayBox>*/}
        {/*  </ResultRow>*/}
        {/*))}*/}
      </MypageResultContainer>
      <BottomWrapper>
        <BaseButton onClick={handleClickBefore} $variant="secondary">
          이전
        </BaseButton>
        <ExploreCount>{exploreText}</ExploreCount>
        <BaseButton onClick={handleClickAfter} $variant="secondary">
          다음
        </BaseButton>
      </BottomWrapper>
    </BaseModal>
  )
}

export default RecordModal
