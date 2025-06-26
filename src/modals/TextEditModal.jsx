import React from 'react'

import BaseModal from '../components/BaseModal'
import BaseInput from '../components/BaseInput'
import BaseButton from '../components/BaseButton'
import { useModal } from '../context/ModalContext'

const TextEditModal = (props) => {
  const { closeModal } = useModal()

  const handleClick = () => {
    if (props.onSubmit) {
      props.onSubmit()
    }
    closeModal()
  }

  return (
    <BaseModal title={props.title} onClose={closeModal}>
      <BaseInput placeholder={props.placeholder} onChange={props.onChange} value={props.value} />
      <BaseButton onClick={closeModal}> {props.buttonText || '저장'} </BaseButton>
    </BaseModal>
  )
}

export default TextEditModal

// 사용 예시

// <TextEditModal
// title="오늘의 한마디 수정"
// placeholder="오늘의 상태를 입력하세요"
// value={text}
// onChange={(e) => setText(e.target.value)}
// buttonText="수정 완료"
// onSubmit={() => {
//   updateTodayMessage(text)
// }}
// />
