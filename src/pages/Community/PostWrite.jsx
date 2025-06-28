import React, { useState, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link' // 설치된 확장
import Underline from '@tiptap/extension-underline' // 설치된 확장
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight, all } from 'lowlight' // core 대신 createLowlight
import javascript from 'highlight.js/lib/languages/javascript.js'
import cpp from 'highlight.js/lib/languages/cpp.js'
import axios from 'axios'
import styled from 'styled-components'

// lowlight 인스턴스 생성 및 언어 등록
const lowlight = createLowlight(all)

// …(이하 이전 예시와 동일한 코드)…

// styled-components 정의
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`
const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  margin-bottom: 12px;
  box-sizing: border-box;
`
const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
  background: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
`
const ToolbarButton = styled.button`
  border: none;
  background: ${(props) => (props.active ? '#333' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
const EditorArea = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 300px;
  padding: 12px;
`
const SubmitButton = styled.button`
  margin-top: 16px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`

// 툴바 버튼 렌더링
const MenuBar = ({ editor }) => {
  if (!editor) return null
  return (
    <Toolbar>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
      >
        Bold
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
      >
        Italic
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
      >
        Strike
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive('code')}
      >
        Code
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          const url = prompt('URL 입력')
          if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        }}
        active={editor.isActive('link')}
      >
        Link
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()}>
        Bullet
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        List
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
      >
        Quote
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive('codeBlock')}
      >
        CodeBlock
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>Undo</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>Redo</ToolbarButton>
    </Toolbar>
  )
}

export default function SimpleEditor() {
  const [title, setTitle] = useState('')
  const fileInputRef = useRef(null)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: '내용을 입력하세요...' }),
      Link.configure({ openOnClick: false }),
      Underline,
      Image,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: '',
  })

  // 이미지 업로드 후 에디터에 삽입
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file || !editor) return
    const form = new FormData()
    form.append('image', file)
    try {
      const { data } = await axios.post('/api/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      editor.chain().focus().setImage({ src: data.url }).run()
    } catch (err) {
      console.error('이미지 업로드 실패', err)
    }
  }

  // 제목·내용을 서버로 전송
  const handleSubmit = async () => {
    if (!editor) return
    try {
      await axios.post('/api/posts', {
        title,
        content: editor.getHTML(),
      })
      alert('게시글 등록 완료')
      setTitle('')
      editor.commands.clearContent()
    } catch (err) {
      console.error('게시글 등록 실패', err)
    }
  }

  return (
    <Container>
      <TitleInput
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <MenuBar editor={editor} />
      <EditorArea>
        <EditorContent editor={editor} />
      </EditorArea>

      {/* 이미지 업로드 버튼 */}
      <Toolbar>
        <ToolbarButton onClick={() => fileInputRef.current.click()}>이미지 업로드</ToolbarButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </Toolbar>

      <SubmitButton onClick={handleSubmit}>등록하기</SubmitButton>
    </Container>
  )
}
