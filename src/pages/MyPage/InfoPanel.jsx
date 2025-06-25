import styled from 'styled-components'

const Panel = styled.aside`
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`

const ToggleGroup = styled.div`
  display: flex;
  gap: 8px;
`

const ToggleButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f3f4f6;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #e5e7eb;
  }
`

const ContentBox = styled.div`
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 12px;
  min-height: 100px;
  font-size: 14px;
`

const InfoPanel = () => {
  return (
    <Panel>
      <Title>내 정보</Title>
      <ToggleGroup>
        <ToggleButton>프로그몽</ToggleButton>
        <ToggleButton>유저</ToggleButton>
      </ToggleGroup>
      <ContentBox>정보 표시 영역 (추후 모드별 전환)</ContentBox>
    </Panel>
  )
}

export default InfoPanel
