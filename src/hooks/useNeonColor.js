// 버튼에 사용할 네온 색상 상태 관리
import { useState } from 'react'

export const useNeonColor = (defaultColor = '#00f0ff', hoverColor = '#00b8ff') => {
  const [currentColor, setCurrentColor] = useState(defaultColor)

  const handleHover = () => setCurrentColor(hoverColor)
  const handleLeave = () => setCurrentColor(defaultColor)

  return {
    currentColor,
    handleHover,
    handleLeave,
  }
}