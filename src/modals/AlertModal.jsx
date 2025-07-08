import React from 'react'
import styled from 'styled-components'

import BaseModal from '../components/BaseModal'
import BaseButton from '../components/BaseButton'
import { useModal } from '../context/ModalContext'

/**
 * 알림용 모달
 * @param title : 모달 제목
 * @param message : 모달에 표시할 메시지
 * @param onConfirm : 버튼 클릭시 진행할 이벤트나 동작
 * @param buttonText : 버튼 문구
 */

const Message = styled.p`
  text-align: center;
  font-size: 1.1rem;
  margin: 1.5rem 0 2rem;
  white-space: pre-wrap; /* 줄바꿈 지원 */
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const AlertModal = ({ title = '알림', message, onConfirm, buttonText = '확인', containCancel=null }) => {
  const { closeModal } = useModal()

  const handleClick = () => {
    if (onConfirm) {
      onConfirm()
    }
    closeModal()
  }

  return (
    <BaseModal title={title} onClose={closeModal}>
      <Message>{message}</Message>
      <ButtonWrapper>
        <BaseButton onClick={handleClick} $variant="secondary">{buttonText}</BaseButton>
        {containCancel && (
          <BaseButton onClick={closeModal}  style={{ marginLeft: '1rem' }}>
            취소
          </BaseButton>
        )}
      </ButtonWrapper>
    </BaseModal>
  )
}

export default AlertModal
