import React from 'react'
import styled from 'styled-components'

import BaseModal from '../components/BaseModal'
import BaseButton from '../components/BaseButton'
import { useModal } from '../context/ModalContext'

const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`
const TagContainer = styled.div`
  width: 360px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`


const TagModal = ({ title = '알림' }) => {
  const { closeModal } = useModal()

  const handleUpdateTag = () => {
    console.log('handleUpdateTag')
  }

  return (
    <BaseModal title={title} onClose={closeModal}>
      <TagContainer>
      </TagContainer>
      <BottomWrapper>
        <BaseButton onClick={handleUpdateTag} $variant="secondary">
          적용
        </BaseButton>
      </BottomWrapper>
    </BaseModal>
  )
}

export default TagModal
