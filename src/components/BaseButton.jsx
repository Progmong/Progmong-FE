/* 네온 효과 공통 버튼 컴포넌트 */
import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 3px solid #fcfcfc;
  border-radius: 7px;
  margin: 30px 0 10px 0;
  background-color: #661111;
  padding-bottom: 6px;
  overflow: hidden;
`

const StyledButton = styled.button`
  width: 100%;
  padding: 20px;
  border-radius: 0 0 7px 7px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  border-style: none;
  background-color: #fd3b40;
  color: white;
  box-shadow:
    0 6px #880800,
    0 0 10px #fd3b40;
  transition: all 0.15s ease-in-out;

  &:hover {
    transform: translateY(2px);
    border-radius: 7px;
    box-shadow:
      0 4px #880800,
      0 0 12px #ff6a6a;
  }

  &:active {
    transform: translateY(3px) scale(0.98);
    border-radius: 7px;
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.2),
      0 2px #661111;
    filter: brightness(1.05);
  }
`

const BaseButton = ({ children, currentColor, handleHover, handleLeave, ...rest }) => {
  return (
    <Container>
      <StyledButton onMouseOver={handleHover} onMouseLeave={handleLeave} {...rest}>
        {children}
      </StyledButton>
    </Container>
  )
}

export default BaseButton
