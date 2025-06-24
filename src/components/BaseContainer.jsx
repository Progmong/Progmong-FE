// LayeredPanel.jsx
// ----------------
// 리액트 + styled-components 구현본

import React from 'react'
import styled from 'styled-components'

// 사이즈 팔레트(Size)
const SIZE_SET = {
  sm: { font: '0.875rem' },
  md: { font: '1rem' },
  lg: { font: '1.25rem' },
}

/* 회색 테두리(가장 바깥 프레임) */
const Frame = styled.div.attrs(({ size = 'md' }) => ({
  s: SIZE_SET[size] || SIZE_SET.md,
}))`
  display: block;
  background-color: #ffffff;
  padding: 6px;
  border-radius: 14px;
  box-shadow:
    0 4px 0 #d1d8ff,
    0 6px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: 6px; /* 그람자를 보장하기 위한 최소한의 margin */

  font-size: ${({ s }) => s.font};
`

/* 공통 컴포넌트 */
const LayeredPanel = ({ children, ...rest }) => <Frame {...rest}>{children}</Frame>

export default LayeredPanel
