import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { MathJax, MathJaxContext } from 'better-react-mathjax' // LaTeX 렌더

export default function ContentViewer({ html }) {
  // HTML 정제
  const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })

  // Html에서 리액트 컴포넌트로 변환
  const content = parse(clean, {
    replace(domNode) {
      // <pre><code class="language-js">...</code></pre> 매칭
      if (domNode.name === 'pre' && domNode.children?.[0]?.name === 'code') {
        const codeNode = domNode.children[0]
        const lang = (codeNode.attribs.class || '').replace('language-', '') || 'text'
        const codeString = codeNode.children[0]?.data || ''

        return (
          <SyntaxHighlighter language={lang} style={dracula} showLineNumbers>
            {codeString}
          </SyntaxHighlighter>
        )
      }
      // $...$ 또는 $$...$$ 는 MathJax가 처리하므로 그대로 둠
    },
  })

  // MathJaxContext 로 수식 렌더링
  return (
    <MathJaxContext
      // 한글 주석: MathJax 설정 (옵션)
      config={{
        tex: {
          inlineMath: [
            ['$', '$'],
            ['\\(', '\\)'],
          ],
        },
        svg: { fontCache: 'global' },
      }}
    >
      {/* 한글 주석: dynamic 옵션으로 리렌더 시 수식 다시 계산 */}
      <MathJax dynamic>{content}</MathJax>
    </MathJaxContext>
  )
}
