import styled from 'styled-components'

const Wrapper = styled.div`
  width: 180px;
  background: #e5e7eb;
  border-radius: 8px;
  height: 24px;
  overflow: hidden;
  position: relative;
`

const Fill = styled.div`
  border-radius: 10px;
  height: 100%;
  background: #a3e635;
  width: ${({ $percentage }) => $percentage}%;
  transition: width 0.3s ease;
`

const Label = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 14px;
  color: #333;
  line-height: 24px;
`

const ExpBar = ({ current, max, label }) => {
  const percentage = Math.min((current / max) * 100, 100)
  return (
    <Wrapper>
      <Fill $percentage={percentage} />
      <Label>{label ?? `${current}/${max}`}</Label>
    </Wrapper>
  )
}


export default ExpBar
