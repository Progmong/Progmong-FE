import styled from 'styled-components'

import BaseButton from '../../components/BaseButton.jsx'
import { useModal } from '../../context/ModalContext.jsx'
import React, { useEffect, useState } from 'react'

const Box = styled.div`
  background-color: white;
  border-radius: 16px;
  min-height: 330px;
  min-width: 380px;
  padding: 10px 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  margin: 10px;
`

const Title = styled.div`
  font-size: 16px;
  font-family: 'Binggrae',serif;
  font-weight: 700;
  margin: 10px;
  padding: 5px;
  color: #051d2f;
`

const BtnContainer = styled.div`
  background: #e3e3e3;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 230px;
  padding: 10px 9px; /* 위아래 10px, 좌우 9px */
  justify-content: space-around;
  box-shadow: 0 3px 0 rgba(74, 74, 74, 0.4);
  
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  //gap: 10px; /* 버튼 간 간격 */'
  margin: 5px;
`

const TagButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: ${({ selected }) => (selected ? '#1C445C' : '#ffffff')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#000000')};
  font-family: 'Binggrae';
  font-weight: 700;
  border: none;
  border-radius: 21px;
  box-shadow: 0 3px 0 rgba(74, 74, 74, 0.4);
  cursor: pointer;
`
const InterestTagsHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-content: space-between;
  margin: 5px;
`
const BaseButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2px 10px 6px 10px;`

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
  const [selectedTags, setSelectedTags] = useState(new Set())
  const mockTagIds = [1, 2, 5, 8]

  useEffect(() => {
    setSelectedTags(new Set(mockTagIds))
  }, [])

  return (
    <Box>
      <InterestTagsHeader>
        <Title>관심 태그</Title>
        <BaseButtonWrapper>
          <BaseButton
            onClick={() => openModal('tag-edit', { title: '관심 태그 수정', message: '돌아가!' })}
            $size="sm"
          >
            태그 수정
          </BaseButton>
        </BaseButtonWrapper>
      </InterestTagsHeader>
      <BtnContainer>
        <Row>
          {[1, 2, 3].map((id) => (
            <TagButton key={id} selected={selectedTags.has(id)} onClick={() => toggleTag(id)}>
              {TAGS[id]}
            </TagButton>
          ))}
        </Row>
        <Row>
          {[4, 5, 6].map((id) => (
            <TagButton key={id} selected={selectedTags.has(id)} onClick={() => toggleTag(id)}>
              {TAGS[id]}
            </TagButton>
          ))}
        </Row>
        <Row>
          {[7, 8].map((id) => (
            <TagButton key={id} selected={selectedTags.has(id)} onClick={() => toggleTag(id)}>
              {TAGS[id]}
            </TagButton>
          ))}
        </Row>
      </BtnContainer>
    </Box>
  )
}

export default InterestTags
