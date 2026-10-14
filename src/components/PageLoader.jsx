import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

// 짧게 끝나는 로딩에서는 아무것도 보이지 않도록 잠깐 기다렸다가 서서히 나타남
const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

// 화면 전체를 차지해 페이지가 들어올 때 레이아웃이 튀지 않게 함
const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff5db;
  opacity: 0;
  animation: ${appear} 0.2s ease-out 0.4s forwards;
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #ffedb6;
  border-top-color: #f2a93b;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`

const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
`

const PageLoader = () => (
  <Wrapper role="status" aria-live="polite">
    <Spinner />
    <SrOnly>불러오는 중</SrOnly>
  </Wrapper>
)

export default PageLoader
