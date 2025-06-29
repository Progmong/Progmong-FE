import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(0deg);
  transform-origin: center;
`

const Circle = styled.circle`
  fill: none;
  stroke-width: 10;
  stroke-linecap: round;
  transition: ${({ animate }) => (animate ? 'stroke-dashoffset 1s linear' : 'none')};
`

const CooldownText = styled.text`
  font-size: 24px;
  font-weight: bold;
  fill: white;
  text-anchor: middle;
  dominant-baseline: middle;
`

const CooldownCircle = ({ cooldown }) => {
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const percent = cooldown / 60
  const offset = circumference * percent

  return (
    <Svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet">
      {/* 중심 좌표로 이동하고 전체 회전 */}
      <g transform="translate(60, 60) rotate(-90)">
        <Circle r={radius} stroke="#333" strokeDasharray={circumference} strokeDashoffset={0} />
        <Circle
          r={radius}
          stroke="white"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </g>

      {/* 텍스트는 회전 없이 그대로 중앙 배치 */}
      <CooldownText x="60" y="60">
        {cooldown}
      </CooldownText>
    </Svg>
  )
}

export default CooldownCircle
