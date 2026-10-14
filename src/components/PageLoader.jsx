import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

// 화면 전체를 차지해 페이지가 들어올 때 레이아웃이 튀지 않게 함
const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: #fff5db;
  font-family: 'Binggrae', sans-serif;
  color: #543f25;
`

const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border: 5px solid #ffedb6;
  border-top-color: #f2a93b;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`

const PageLoader = () => (
  <Wrapper role="status" aria-live="polite">
    <Spinner />
    <span>불러오는 중...</span>
  </Wrapper>
)

export default PageLoader
