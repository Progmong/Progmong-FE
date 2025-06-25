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
  background-image: url('/src/assets/modalBackground.png');
  padding: 2rem;
  border-radius: 12px;
  width: 600px;
  height: 400px;
  font-family: Binggrae;
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
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: max-content;
  flex-direction: column;
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
