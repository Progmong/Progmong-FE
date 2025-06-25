import React from 'react'

import BaseModal from '../components/BaseModal'
import BaseInput from '../components/BaseInput'
import BaseButton from '../components/BaseButton'
import { useModal } from '../context/ModalContext'

const TagEditModal = () => {
  const { closeModal } = useModal()

  return (
    <BaseModal onClose={closeModal}>
      <h2>관심 태그 수정</h2>
      <BaseInput placeholder="예: JavaScript, 알고리즘" />
      <BaseButton onClick={closeModal}>저장</BaseButton>
    </BaseModal>
  )
}

export default TagEditModal
