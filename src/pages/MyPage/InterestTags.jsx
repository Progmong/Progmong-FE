import styled from 'styled-components'

import BaseButton from '../../components/BaseButton.jsx'
import { useModal } from '../../context/ModalContext.jsx'
import React, { useEffect, useState } from 'react'
import { useMyPage } from '@/context/MyPageContext.jsx'

const Box = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`

const Title = styled.div`
  font-size: 20px;
  font-family: 'Binggrae', serif;
  font-weight: 700;
  margin: 10px;
  padding: 5px;
  color: #051d2f;
`

const BtnContainer = styled.div`
  background-color: #cccccc;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 30px; /* 행 간 간격 */
  align-items: center;
  padding: 25px 9px; /* 위아래 10px, 좌우 9px */
  margin-top: 30px; /* 상단 여백 */
`

const Row = styled.div`
  display: flex;
  gap: 10px; /* 버튼 간 간격 */
`

const TagButton = styled.button`
  width: 80px;
  height: 50px;
  background-color: ${({ selected }) => (selected ? '#1C445C' : '#ffffff')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#000000')};
  font-family: 'Binggrae';
  font-weight: 700;
  border: none;
  border-radius: 21px;
  /* Drop shadow */
  box-shadow: 0 4px 0 rgba(74, 74, 74, 0.4);
  cursor: default;
`
const InterestTagsHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-content: space-around;
  margin: 5px;
`
const BasButtonWrapper = styled.div``

const TAGS = {
  1: '수학',
  2: '구현',
  3: '그리디',
  4: '문자열',
  5: '자료구조',
  6: '그래프',
  7: 'DP',
  8: '기하학',
}

const InterestTags = () => {
  const { openModal } = useModal()
  const { mypageData } = useMyPage()
  const interestTags = mypageData?.interestTags ?? []
  const [selectedTags, setSelectedTags] = useState(new Set())

  const stableInterestTags = useMemo(() => JSON.stringify(interestTags), [interestTags])

  useEffect(() => {
    setSelectedTags(new Set(JSON.parse(stableInterestTags)))
  }, [stableInterestTags])


  return (
    <Box>
      <InterestTagsHeader>
        <Title>관심 태그</Title>
        <BasButtonWrapper>
          <BaseButton
            onClick={() =>
              openModal('alert', {
                title: '관심 태그 수정',
                message: '돌아가!',
              })
            }
          >
            태그 수정
          </BaseButton>
        </BasButtonWrapper>
      </InterestTagsHeader>
      <BtnContainer>
        <Row>
          {[1, 2, 3].map((id) => (
            <TagButton key={id} selected={selectedTags.has(id)}>
              {TAGS[id]}
            </TagButton>
          ))}
        </Row>
        <Row>
          {[4, 5, 6].map((id) => (
            <TagButton key={id} selected={selectedTags.has(id)}>
              {TAGS[id]}
            </TagButton>
          ))}
        </Row>
        <Row>
          {[7, 8].map((id) => (
            <TagButton key={id} selected={selectedTags.has(id)}>
              {TAGS[id]}
            </TagButton>
          ))}
        </Row>
      </BtnContainer>
    </Box>
  )
}

export default InterestTags