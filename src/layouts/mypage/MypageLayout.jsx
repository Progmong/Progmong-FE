import styled from 'styled-components'
import InfoPanel from '../../pages/MyPage/infoPanel/InfoPanel.jsx'
import CharacterStage from '../../pages/MyPage/CharacterStage.jsx'
import ExploreRecords from '../../pages/MyPage/ExploreRecord.jsx'
import InterestTags from '../../pages/MyPage/InterestTags.jsx'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState, useCallback } from 'react'
import { fetchMypageData } from '@/pages/MyPage/mypage.js'
import { useMyPage } from '@/context/MyPageContext.jsx'

// fallback mock data
const fallbackMockData = {
  pet: {
    userPetId: 2,
    userId: 2,
    petId: 3,
    level: 1,
    currentExp: 0,
    maxExp: 0,
    status: '휴식',
    message: '안녕! 난 한번바꾼애라모르프로그몽!',
    nickname: '애라모르프로그몽',
    evolutionStage: 2,
    proud: false,
  },
  user: {
    id: 2,
    bojId: 'hyeonhc328',
    email: 'hyeonhc328@gmail.com',
    nickname: '한번바꾼닉네임',
  },
  interestTags: [1, 2, 5],
  message: '애라 모르겠다~!',
  exploreRecords: {
    records: [
      {
        recordId: 126,
        problemId: 1014,
        title: '컨닝',
        level: 17,
        mainTag: 'dp',
        result: '실패',
      },
      {
        recordId: 125,
        problemId: 9345,
        title: '디지털 비디오 디스크(DVDs)',
        level: 18,
        mainTag: 'data_structures',
        result: '실패',
      },
      {
        recordId: 124,
        problemId: 1067,
        title: '이동',
        level: 20,
        mainTag: 'math',
        result: '실패',
      },
      {
        recordId: 123,
        problemId: 23289,
        title: '온풍기 안녕!',
        level: 16,
        mainTag: 'implementation',
        result: '실패',
      },
      {
        recordId: 122,
        problemId: 10815,
        title: '숫자 카드',
        level: 6,
        mainTag: 'data_structures',
        result: '실패',
      },
    ],
    totalCount: 73,
  },
}

const BackgroundContainer = styled.div`
  background-color: #fff5db;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: Binggrae;
  width: 100vw;
`

const Container = styled.div`
  width: 100%;
  padding: ${({ $isMobile }) => ($isMobile ? '24px' : '16px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1024px;
  margin: 0 auto;
`

const Wrapper = styled.div`
  margin: 5px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  min-height: ${({ $isMobile }) => ($isMobile ? '240px' : '300px')};
`

const UpperContents = styled.div`
  display: ${({ $isMobile }) => ($isMobile ? 'block' : 'flex')};
  align-content: center;
  flex-direction: row;
  gap: ${({ $isMobile }) => ($isMobile ? '16px' : '20px')};
`

const BottomContents = styled.div`
  display: ${({ $isMobile }) => ($isMobile ? 'block' : 'flex')};
  width: 100%;
  gap: 24px;
  align-items: stretch;
  justify-content: center;

  & > div {
    flex: 1;
    min-width: 280px;
    max-width: 380px;
  }
`

const CardBox = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 14px;
  margin: 5px 0 10px 0;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  font-family: Binggrae;
`

const MyPageLayout = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const { mypageData, setMypageData } = useMyPage()
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetchMypageData()
      if (res.data?.data) {
        setMypageData(res.data.data)
      } else {
        console.warn('API 응답 없음, mockData 사용')
        setMypageData(fallbackMockData)
      }
    } catch (err) {
      console.error('API 호출 실패:', err)
      setMypageData(fallbackMockData)
    } finally {
      setIsLoading(false)
    }
  }, [setMypageData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isLoading) return <div>로딩 중...</div>
  if (!mypageData) return <div>데이터가 없습니다.</div>

  return (
    <BackgroundContainer>
      <Container $isMobile={isMobile}>
        <Wrapper>
          <UpperContents $isMobile={isMobile}>
            <InfoPanel isMobile={isMobile} />
            <MainContent $isMobile={isMobile}>
              <CharacterStage isMobile={isMobile} />
            </MainContent>
          </UpperContents>
          <BottomContents $isMobile={isMobile}>
            <CardBox>
              <ExploreRecords isMobile={isMobile} />
            </CardBox>
            <CardBox>
              <InterestTags isMobile={isMobile} />
            </CardBox>
          </BottomContents>
        </Wrapper>
      </Container>
    </BackgroundContainer>
  )
}

export default MyPageLayout
