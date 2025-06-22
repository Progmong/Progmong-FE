// ConvexDecisionButton.jsx
// ------------------------
// 리액트 + styled-components 1-파일 구현
import React from 'react'
import styled, { css } from 'styled-components'

/* --------------------------------------------------
   1) 디자인 토큰: 색상·사이즈 사전 정의
   -------------------------------------------------- */
// 색상 팔레트(Variant)
const COLOR_SET = {
  primary: { front: '#C3F154', back: '#4EC306', text: '#5db536' },
  secondary: { front: '#FD3B40', back: '#880800', text: '#FCFCFC' },
  success: { front: '#FFB52C', back: '#AC6E04', text: '#2B1900' },
  pass: { front: '#4CDAFE', back: '#08B9FF', text: '#FCFCFC' },
}

// 사이즈 팔레트(Size)
const SIZE_SET = {
  sm: { padY: 8, padX: 16, font: '0.875rem', shadow: 4 },
  md: { padY: 14, padX: 28, font: '1rem', shadow: 6 },
  lg: { padY: 20, padX: 48, font: '1.25rem', shadow: 8 },
}

/* --------------------------------------------------
   2) 볼록 효과 Mixin
   -------------------------------------------------- */
const convexMixin = ({ c, s }) => css`
  /* 사이즈별 여백·글꼴·그림자 설정 */
  padding: ${s.padY}px ${s.padX}px;
  font-size: ${s.font};
  box-shadow: 0 ${s.shadow}px 0 ${c.back};

  margin-bottom: ${s.shadow}px; /* 그람자를 보장하기 위한 최소한의 margin */

  /* Hover: 깊이 ½, Active: 그림자 제거 */
  &:hover {
    transform: translateY(${s.shadow / 2}px);
    box-shadow: 0 ${s.shadow / 2}px 0 ${c.back};
  }
  &:active {
    transform: translateY(${s.shadow}px);
    box-shadow: 0 0 0 ${c.back};
  }
`

/* --------------------------------------------------
   3) 스타일드 버튼
   -------------------------------------------------- */
const ConvexBtn = styled.button.attrs(({ variant = 'primary', size = 'md' }) => ({
  c: COLOR_SET[variant] || COLOR_SET.primary,
  s: SIZE_SET[size] || SIZE_SET.md,
}))`
  /* 기본 레이아웃 */
  display: inline-block;
  /* padding: 20px 48px; */
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  user-select: none;
  outline: none;

  font-family: 'Binggrae'; // 기본 버튼 폰트는 빙그레로
  overflow: hidden;
  text-overflow: ellipsis;

  /* 애니메이션 부드럽게 */
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease;

  /* 팔레트 색상 적용 */
  color: ${({ c }) => c.text};
  background: ${({ c }) => c.front};

  /* 볼록 효과 삽입 */
  ${({ c, s }) => convexMixin({ c, s })};

  /* 비활성 상태 */
  &:disabled {
    /* filter: grayscale(0.5); */
    background-color: #ccc;
    color: #999;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

/* ========================================
   재사용 컴포넌트
   ======================================== */
const ConvexButton = ({
  children = 'Example',
  buttonColor = '#C3F154',
  buttonBackColor = '#4EC306',
  textColor = '#5db536',
  ...rest
}) => (
  <ConvexBtn
    style={{
      '--button-color': buttonColor,
      '--button-back-color': buttonBackColor,
      '--text-color': textColor,
    }}
    {...rest}
  >
    {children}
  </ConvexBtn>
)

export default ConvexButton
