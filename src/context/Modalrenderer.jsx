import React from 'react'

import TextEditModal from '../modals/TextEditModal.jsx'
import AlertModal from '@/modals/AlertModal.jsx'

const ModalRenderer = ({ name, props }) => {
  if (!name) return null

  switch (name) {
    case 'tag-edit':
      return <TextEditModal {...props} />
    case 'alert':
      return <AlertModal {...props} />
    default:
      return null
  }
}

export default ModalRenderer
