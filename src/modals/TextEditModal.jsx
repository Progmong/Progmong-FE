import React, { useState } from 'react'
import styled from 'styled-components'
import BaseModal from '../components/BaseModal'
import BaseInput from '../components/BaseInput'
import BaseButton from '../components/BaseButton'
import { useModal } from '../context/ModalContext'

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 2rem 1.5rem;
  min-width: 320px;
  max-width: 480px;
`

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const StyledInput = styled(BaseInput)`
  width: 100%;
  max-width: 320px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledButton = styled(BaseButton)`
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
`

const TextEditModal = ({ title, message, onConfirm, placeholder = '', buttonText = '적용' }) => {
  const { closeModal } = useModal()
  const [value, setValue] = useState('')

  const handleClick = () => {
    if (onConfirm) {
      onConfirm(value)
    }
    closeModal()
  }

  return (
    <BaseModal title={title} onClose={closeModal}>
      <ContentWrapper>
        {message && <p>{message}</p>}
        <InputWrapper>
          <StyledInput
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
        </InputWrapper>
        <ButtonWrapper>
          <StyledButton onClick={handleClick}>{buttonText}</StyledButton>
        </ButtonWrapper>
      </ContentWrapper>
    </BaseModal>
  )
}

export default TextEditModal
