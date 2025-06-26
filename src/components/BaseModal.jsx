import React from 'react'
import styled from 'styled-components'

import BaseContainer from './BaseContainer.jsx'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url('/src/assets/modalBackground.png');
  padding: 2rem;
  border-radius: 12px;
  width: 600px;
  max-width: 70vw;
  max-height: 75vh; /* 고정 높이 제거 */
  font-family: Binggrae;
  overflow-y: auto;
`

const ModalTitle = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;

  font-size: 1.7rem;
  text-align: center;
  font-weight: bold;
  flex-grow: 0;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const BaseModal = ({ title, children, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <BaseContainer style={{ flexGrow: 1 }}>
          {title && <ModalTitle>{title}</ModalTitle>}
          <ModalContent>{children}</ModalContent>
        </BaseContainer>
      </ModalContainer>
    </Overlay>
  )
}

export default BaseModal
