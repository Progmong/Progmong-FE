// BaseInput.jsx
// --------------
// 공통 입력 컴포넌트 (스타일만 래핑)

import React from 'react'
import styled from 'styled-components'

// 사이즈 팔레트(Size)
const SIZE_SET = {
  sm: { font: '0.875rem' },
  md: { font: '1rem' },
  lg: { font: '1.25rem' },
}

/* 실제 input 요소 */
const InputBase = styled.input.attrs(({ $size = 'md' }) => ({
  $s: SIZE_SET[$size] || SIZE_SET.md,
}))`
  /* 기본 레이아웃 */
  display: block;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 14px;
  box-shadow:
    0 4px 0 #d1d8ff,
    0 6px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: 6px; /* 그람자를 보장하기 위한 최소한의 margin */
  border: 1.5px solid #e8e8e8;
  font-size: ${({ $s }) => $s.font};

  /* number 타입 스핀 버튼 제거 */
  &[type='number'] {
    appearance: none;
    -moz-appearance: textfield;
  }
  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus-visible {
    outline: 2px solid #4d7fff; /* 접근성 포커스 링 */
  }

  &:disabled {
    background: #f4f4f4;
    color: #9e9e9e;
    cursor: not-allowed;
  }
`

/* ref 전달까지 지원 */
const BaseInput = React.forwardRef(({ ...rest }, ref) => <InputBase ref={ref} {...rest} />)
BaseInput.displayName = 'BaseInput'
export default BaseInput
