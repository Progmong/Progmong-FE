import React from 'react'

import TextEditModal from '../modals/TextEditModal.jsx'

const ModalRenderer = ({ name, props }) => {
  if (!name) return null

  switch (name) {
    case 'tag-edit':
      return <TextEditModal {...props} />
    default:
      return null
  }
}

export default ModalRenderer
