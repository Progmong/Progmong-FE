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
 *
 * @param buttonText : 버튼 문구
 */

const Message = styled.p`
  text-align: center;
  font-size: 1.1rem;
  white-space: pre-wrap; /* 줄바꿈 지원 */
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const RecordContainer = styled.div``
const AlertModal = ({
  title = '알림',
  message,
  onConfirm,
  confirmText,
  cancelText,
  buttonText = '확인',
}) => {
  const { closeModal } = useModal()

  const callGetRecordApi = () => {
    // API 호출 로직
    console.log('getRecord API 호출')
  }

  const handleClick = (ac) => {
    if (onConfirm) {
      callGetRecordApi()
    }
    closeModal()
  }

  return (
    <BaseModal title={title} onClose={closeModal}>
      <Message>{message}</Message>
      <RecordContainer></RecordContainer>
      <ButtonWrapper>
        {/*buttons for page move*/}
        <BaseButton variant="secondary"
                    onClick={handleClick(before)}>
          이전</BaseButton>

        <BaseButton onClick={handleClick(next)} style={{ marginLeft: '10px' }}>
          다음</BaseButton>
      </ButtonWrapper>
    </BaseModal>
  )
}

export default AlertModal
