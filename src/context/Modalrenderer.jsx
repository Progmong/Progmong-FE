import React from 'react'

import TextEditModal from '../modals/TextEditModal.jsx'
import AlertModal from '@/modals/AlertModal.jsx'
import BaseModal from '@/components/BaseModal.jsx'
import RecordModal from '@/modals/RecordModal.jsx'
import TagModal from '@/modals/TagModal.jsx'

const ModalRenderer = ({ name, props }) => {
  if (!name) return null

  const modalMap = {
    'text-edit': TextEditModal,
    'tag-edit': TagModal,
    'alert': AlertModal,
    'base': BaseModal,
    'record': RecordModal,
  }

  const ModalComponent = modalMap[name]
  return ModalComponent ? <ModalComponent {...props} /> : null
}

export default ModalRenderer
