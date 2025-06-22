// ConvexDecisionButton.jsx
// ------------------------
// 리액트 + styled-components 1-파일 구현
import React from 'react'
import styled from 'styled-components'

/* ========================================
   스타일 정의
   ======================================== */
const ConvexBtn = styled.button`
  /* 기본 레이아웃 */
  display: inline-block;
  padding: 20px 48px;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-color);
  background: var(--button-color); /* 상판 밝은 빨강 */
  border: none;
  border-radius: 14px;
  cursor: pointer;
  user-select: none;
  outline: none;
  margin-bottom: 8px;
  font-family: 'Binggrae'; // 기본 버튼 폰트는 빙그레로
  overflow: hidden;
  text-overflow: ellipsis;

  /* 볼록 두께 표현 ─ 아래쪽으로 두꺼운 그림자 */
  box-shadow: 0 8px 0 var(--button-back-color); /* y-offset 8px, 같은 크기의 짙은 빨강 */

  /* 애니메이션 부드럽게 */
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease;

  /* 마우스를 올렸을 때: 상판이 내려가고 그림자가 사라져 오목해짐 */
  &:hover {
    transform: translateY(4px); /* 두께만큼 내려감 */
    box-shadow: 0 4px 0 var(--button-back-color); /* 그림자 제거 → 두께 사라짐 */
  }
  /* 눌렀을 때: 상판이 내려가고 그림자가 사라져 오목해짐 */
  &:active {
    transform: translateY(8px); /* 두께만큼 내려감 */
    box-shadow: 0 0 0 var(--button-back-color); /* 그림자 제거 → 두께 사라짐 */
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
