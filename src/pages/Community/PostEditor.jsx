import React from 'react'

import { useQuill } from 'react-quilljs'
import MagicUrl from 'quill-magic-url' // Babel·TypeScript 환경
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css' // Add css for snow theme
import 'quill/dist/quill.bubble.css' // Add css for bubble theme

const PostEditor = (props) => {
  const { quill, quillRef, Quill } = props.state

  // if (Quill && !quill) {
  //   // For execute this line only once.
  //   Quill.register('modules/magicUrl', MagicUrl)
  // }

  // Insert Image(selected by user) to quill
  const insertToEditor = (url) => {
    const range = quill.getSelection()
    quill.insertEmbed(range.index, 'image', url)
  }

  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file) => {
    const body = new FormData()
    body.append('file', file)

    const res = await fetch('Your Image Server URL', { method: 'POST', body })
    insertToEditor(res.uploadedImageUrl)
  }

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = () => {
      const file = input.files[0]
      saveToServer(file)
    }
  }

  React.useEffect(() => {
    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule('toolbar').addHandler('image', selectLocalImage)
    }
  }, [quill])

  return (
    <div style={{ height: '100%' }}>
      <div ref={quillRef} />
    </div>
  )
}

export default PostEditor
