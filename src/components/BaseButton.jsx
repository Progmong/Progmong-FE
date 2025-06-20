/* 네온 효과 공통 버튼 컴포넌트 */
import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: inline-block;
  padding: 0.75rem 0.75rem; /* px-3 py-3 */
`

const StyledButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  border-radius: 0.5rem; /* rounded-md */
  padding: 0.75rem 0.75rem; /* px-3 py-3 */
  font-weight: 700;
  color: #000;
  font-size: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-xs */
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow:
    0 0 5px var(--neon-color),
    0 0 10px var(--neon-color),
    0 0 15px var(--neon-color),
    0 0 20px var(--neon-color),
    inset 0 0 10px var(--neon-color),
    inset 0 0 20px var(--neon-color);
  background: transparent;
  &:disabled {
    color: #d1d5db; /* text-gray-500 */
    cursor: not-allowed;
  }
`

const BaseButton = ({ children, currentColor, handleHover, handleLeave, ...rest }) => {
  return (
    <Container>
      <StyledButton
        style={{ '--neon-color': currentColor }}
        onMouseOver={handleHover}
        onMouseLeave={handleLeave}
        {...rest}
      >
        {children}
      </StyledButton>
    </Container>
  )
}

export default BaseButton
