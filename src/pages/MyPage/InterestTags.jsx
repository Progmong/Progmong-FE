import styled from 'styled-components'

import BaseButton from '../../components/BaseButton.jsx'
import { useModal } from '../../context/ModalContext.jsx'

const Box = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
`

const InterestTags = () => {
  const { openModal } = useModal()

  return (
    <Box>
      <Title>관심 태그</Title>
      <div>선택한 관심 분야 태그가 여기에 표시됩니다.</div>
      <BaseButton
        onClick={() => openModal('alert', { title: '관심 태그 수정', message: '돌아가!' })}
      >
        태그 수정
      </BaseButton>
    </Box>
  )
}

export default InterestTags
