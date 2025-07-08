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
  justify-content: center;
`

const MessageContainer = styled.div`
  text-align: center;
`

const TextEditModal = ({
  title,
  message,
  onConfirm,
  placeholder = '',
  buttonText = '적용',
  inputType = 'text',
  containCancel = true,
}) => {
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
        {message && <MessageContainer>{message}</MessageContainer>}
        <InputWrapper>
          <StyledInput
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            type={inputType}
          />
        </InputWrapper>
        <ButtonWrapper>
          <BaseButton onClick={handleClick} $variant="secondary">{buttonText}</BaseButton>
          {containCancel && (
            <BaseButton onClick={closeModal}  style={{ marginLeft: '1rem' }}>
              취소
            </BaseButton>
          )}

          {/*<BaseButton*/}
          {/*  style={{*/}
          {/*    padding: '0.6rem 1.5rem',*/}
          {/*    fontSize: '1rem',*/}
          {/*  }}*/}
          {/*  $variant="secondary"*/}
          {/*  onClick={handleClick}*/}
          {/*>*/}
          {/*  {buttonText}*/}
          {/*</BaseButton>*/}
          {/*{containCancel && (*/}
          {/*  <BaseButton*/}
          {/*    onClick={closeModal}*/}
          {/*    style={{*/}
          {/*      padding: '0.6rem 1.5rem',*/}
          {/*      fontSize: '1rem',*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    취소*/}
          {/*  </BaseButton>*/}
          {/*)}*/}
        </ButtonWrapper>
      </ContentWrapper>
    </BaseModal>
  )
}

export default TextEditModal
