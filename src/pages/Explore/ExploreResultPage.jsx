import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import bgImage from '../../assets/explore-bg.png'
import checkIcon from '../../assets/check-icon.png'
import passIcon from '../../assets/pass-icon.png'
import ConvexButton from '@/components/BaseButton'

const Background = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ResultContainer = styled.div`
  font-family: 'Binggrae';
  background: rgba(255, 255, 255, 0.75);
  padding: 40px;
  border-radius: 20px;
  width: 720px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`

const TotalExpText = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 24px;
  font-family: 'Binggrae';

  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 12px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const HeaderCol = styled.div`
  flex: ${({ flex }) => flex};
  text-align: center;
`

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 12px 20px;
  border-radius: 16px;
  box-shadow:
    0 4px 0 #d1d8ff,
    0 6px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: 12px;
`

const IconWrapper = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IconCircle = styled.div`
  background-color: white;
  padding: 6px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
`

const GrayBox = styled.div`
  flex: ${({ flex }) => flex};
  background-color: #e3e3e3;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 6px; /* ✅ 좌우 여백 추가 */
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const ExitButton = styled.button`
  display: block;
  margin: 30px auto 0;
  background-color: #a8ff3e;
  padding: 14px 32px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 0 #80cc33;

  &:hover {
    background-color: #92e632;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

const ExploreResultPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const problems = location.state?.problems || []
  const totalExp = location.state?.totalExp ?? null

  if (!problems.length) {
    return (
      <Background>
        <ResultContainer>
          <p>결과 데이터가 없습니다.</p>
          <ExitButton onClick={() => navigate('/main')}>홈으로</ExitButton>
        </ResultContainer>
      </Background>
    )
  }

  return (
    <Background>
      <ResultContainer>
        {totalExp !== null && <TotalExpText>총 획득 경험치 +{totalExp} EXP</TotalExpText>}

        <HeaderRow>
          <HeaderCol flex="0.5" />
          <HeaderCol flex="0.8">티어</HeaderCol>
          <HeaderCol flex="1">번호</HeaderCol>
          <HeaderCol flex="2">이름</HeaderCol>
        </HeaderRow>

        {problems.map((p) => (
          <ResultRow key={p.id}>
            <IconWrapper>
              <IconCircle>
                <Icon
                  src={p.status === '성공' ? checkIcon : passIcon}
                  alt={p.status === '성공' ? 'solved' : 'pass'}
                />
              </IconCircle>
            </IconWrapper>
            <GrayBox flex="0.8">{p.tier}</GrayBox>
            <GrayBox flex="1">{p.id}</GrayBox>
            <GrayBox flex="2">{p.title}</GrayBox>
          </ResultRow>
        ))}
        <ButtonWrapper>
          <ConvexButton
            variant="secondary" // primary · secondary · success · pass
            size="md" // sm · md · lg
            onClick={() => navigate('/home', { replace: true })}
          >
            나가기
          </ConvexButton>
        </ButtonWrapper>
      </ResultContainer>
    </Background>
  )
}

export default ExploreResultPage
