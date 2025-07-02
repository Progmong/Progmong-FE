import React, { useEffect, useState } from 'react'
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
const Message = styled.p`
  text-align: center;
  font-size: 1.1rem;
  margin: 1.5rem 0 2rem;
  white-space: pre-wrap; /* 줄바꿈 지원 */
`

const TextEditModal = ({ title, message, placeholder, value, onSubmit, buttonText }) => {
  const { closeModal } = useModal()
  const [inputValue, setInputValue] = useState(value ?? '')

  useEffect(() => {
    setInputValue(value ?? '')
  }, [value])

  const handleClick = async () => {
    if (onSubmit) {
      try {
        await onSubmit(inputValue)
        closeModal()
      } catch (err) {
        console.error(err)
        alert('요청 실패')
      }
    } else {
      closeModal()
    }
  }

  return (
    <BaseModal title={title} onClose={closeModal}>
      <ContentWrapper>
        {message && <Message>{message}</Message>}
        <InputWrapper>
          <StyledInput
            placeholder={placeholder}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            autoFocus
          />
        </InputWrapper>
        <ButtonWrapper>
          <StyledButton onClick={handleClick}>{buttonText || '저장'}</StyledButton>
        </ButtonWrapper>
      </ContentWrapper>
    </BaseModal>
  )
}

export default TextEditModal
