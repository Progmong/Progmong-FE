import React from 'react'

import TextEditModal from '../modals/TextEditModal.jsx'
import AlertModal from '@/modals/AlertModal.jsx'
// import RecordModal from '@/modals/RecordModal.jsx'

const ModalRenderer = ({ name, props }) => {
  if (!name) return null

  const modalMap = {
    'text-edit': TextEditModal,
    'tag-edit': TextEditModal,
    'alert': AlertModal,
    // 'record': RecordModal,
  }

  const ModalComponent = modalMap[name]
  return ModalComponent ? <ModalComponent {...props} /> : null
}

export default ModalRenderer
