import React from 'react'

import BaseModal from '../components/BaseModal'
import BaseInput from '../components/BaseInput'
import BaseButton from '../components/BaseButton'
import { useModal } from '../context/ModalContext'

const TagEditModal = (props) => {
  const { closeModal } = useModal()

  return (
    <BaseModal title={props.title} onClose={closeModal}>
      <BaseInput placeholder="예: JavaScript, 알고리즘" />
      <BaseButton onClick={closeModal}>저장</BaseButton>
    </BaseModal>
  )
}

export default TagEditModal
