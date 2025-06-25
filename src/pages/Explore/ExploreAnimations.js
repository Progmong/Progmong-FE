import { keyframes } from 'styled-components'

// 몬스터 피격 애니메이션
export const monsterHit = keyframes`
  0%   { transform: translateY(0) rotate(0deg); }
  10%  { transform: translateY(-20px) rotate(-10deg); }
  20%  { transform: translateY(10px) rotate(8deg); }
  30%  { transform: translateY(-15px) rotate(-6deg); }
  40%  { transform: translateY(8px) rotate(4deg); }
  50%  { transform: translateY(-10px) rotate(-3deg); }
  60%  { transform: translateY(5px) rotate(2deg); }
  70%  { transform: translateY(-5px) rotate(-1deg); }
  80%  { transform: translateY(3px) rotate(1deg); }
  90%  { transform: translateY(-2px) rotate(0deg); }
  100% { transform: translateY(0) rotate(0deg); }
`

// 문제 박스 페이드 인
export const fadeTransition = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`

// 공격 이펙트
export const lightningReveal = keyframes`
  0% { clip-path: inset(0 0 100% 0); }
  100% { clip-path: inset(0 0 0 0); }
`

// MISS / KILL 효과
export const fadeInOut = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  20% { opacity: 1; transform: scale(1.2); }
  50% { opacity: 1; transform: scale(1); }
  80% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.8); }
`

// 결과 이미지 팝업
export const resultPop = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5) rotate(-10deg);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2) rotate(3deg);
  }
  40% {
    transform: translate(-50%, -50%) scale(1.1) rotate(0deg);
  }
  70% {
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`
