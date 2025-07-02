import styled from 'styled-components'
import checkIcon from '@/assets/check-icon.png'
import passIcon from '@/assets/pass-icon.png'
import BaseButton from '@/components/BaseButton.jsx'
import { useModal } from '@/context/ModalContext.jsx'
import { useMyPage } from '@/context/MyPageContext.jsx'

const Box = styled.div`
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  align-content: center;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
`

const MypageResultContainer = styled.div`
  background-color: #cccccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //background: rgba(255, 255, 255, 0.75);
  padding: ${({ $isMobile }) => ($isMobile ? '8px' : '10px')};
  max-width: 400px;
  border-radius: 20px;
  width: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

`

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: ${({ $isMobile }) => ($isMobile ? '10px 8px' : '12px 8px')};
  border-radius: 16px;
  box-shadow: 0 2px 0 #d1d8ff,
  0 3px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '6px' : '8px')};
  gap: ${({ $isMobile }) => ($isMobile ? '8px' : '12px')};
`

const IconWrapper = styled.div`
  flex-shrink: 0;
  width: ${({ $isMobile }) => ($isMobile ? '20px' : '24px')};
  display: flex;
  justify-content: center;
  align-items: center;
`

const IconCircle = styled.div`
  background-color: white;
  padding: ${({ $isMobile }) => ($isMobile ? '3px' : '4px')};
  border-radius: 50%;
  box-shadow: 0 0 0 2px black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.img`
  width: ${({ $isMobile }) => ($isMobile ? '10px' : '12px')};
  height: ${({ $isMobile }) => ($isMobile ? '10px' : '12px')};
`

const GrayBox = styled.div`
  flex: none;
  min-width: ${({ $isMobile }) => ($isMobile ? '80px' : '100px')};
  max-width: ${({ $isMobile }) => ($isMobile ? '100px' : '120px')};
  background-color: #e3e3e3;
  padding: ${({ $isMobile }) => ($isMobile ? '5px' : '6px')};
  border-radius: 8px;
  font-size: ${({ $isMobile }) => ($isMobile ? '11px' : '12px')};
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ExploreTitleWrapper = styled.div`
  display: flex;
  min-width: 370px;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 14px;
  gap: 8px;
`
const EmptyMessage = styled.div`
  max-width: 250px;
  color: #555;
  font-size: ${({ $isMobile }) => ($isMobile ? '13px' : '14px')};
  padding: 20px 10px;
  text-align: center;
`

const ExploreRecords = ({ isMobile }) => {
  const { openModal } = useModal()
  const { mypageData } = useMyPage()
  const records = mypageData?.exploreRecords?.records ?? []

  return (
    <Box>
      <ExploreTitleWrapper>
        <Title $isMobile={$isMobile}>최근 탐험 기록</Title>
        <BaseButton
          onClick={() =>
            openModal('record', {
              title: '최근 탐험 기록',
              message: '돌아가!',
            })
          }
        >
          전체 조회
        </BaseButton>
      </ExploreTitleWrapper>

      <MypageResultContainer $isMobile={$isMobile}>
        {records.length === 0 ? (
          <EmptyMessage $isMobile={isMobile}>
            최근 탐험 기록이 없습니다.
          </EmptyMessage>
        ) : (
          records.map((p) => (
            <ResultRow key={p.problemId} $isMobile={$isMobile}>
              <IconWrapper $isMobile={$isMobile}>
                <IconCircle $isMobile={$isMobile}>
                  <Icon
                    src={p.result === '성공' ? checkIcon : passIcon}
                    alt={p.result === '성공' ? 'solved' : 'pass'}
                    $isMobile={$isMobile}
                  />
                </IconCircle>
              </IconWrapper>
              <GrayBox $isMobile={$isMobile}>{p.tier}</GrayBox>
              <GrayBox $isMobile={$isMobile}>{p.id}</GrayBox>
            </ResultRow>
          ))
        )}
      </MypageResultContainer>
    </Box>
  )
}

export default ExploreRecords