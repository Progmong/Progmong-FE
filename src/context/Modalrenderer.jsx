import React from 'react'

import TagEditModal from '../modals/TagEditModal'

const ModalRenderer = ({ name, props }) => {
  if (!name) return null

  switch (name) {
    case 'tag-edit':
      return <TagEditModal {...props} />
    default:
      return null
  }
}

export default ModalRenderer
