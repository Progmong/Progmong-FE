import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

// Quill Syntax 모듈이 highlight.js를 전역에서 찾기 때문에 등록
if (typeof window !== 'undefined') {
  window.hljs = hljs
}

// App.js
import React from 'react'
import { Navigate } from 'react-router-dom'

const App = () => {
  return <Navigate to="/" replace />
}

export default App
