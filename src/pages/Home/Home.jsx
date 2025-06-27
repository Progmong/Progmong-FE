import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import Home767 from '../../assets/home/background_767.png'
import Home1440 from '../../assets/home/background_1440.png'
import Home3000 from '../../assets/home/background_3000.png'
import mainImage2 from '../../assets/mainWeb.png'
import mainMobile from '../../assets/mainmobile.png'
import community from '../../assets/shop.png'
import house from '../../assets/house.png'
import cave from '../../assets/cave.png'
import progmong from '../../assets/progmong.png'
import thoughtbubble from '../../assets/ttbubble.png'
import fightBubble from '../../assets/fightbubble.png'
import sleepBubble from '../../assets/sleepbubble.png'
import progmong2 from '../../assets/progmong2.png'

// 브레이크포인트 헬퍼 (앞서 만든 media 객체를 쓴다)
import { media } from '@/utils/breakpoints.js'

const Container = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: black;
  /* z-index: -1; */
`

const CenterBox = styled.div`
  // 모바일 폰 이상에서는 가운데 정렬이 필요해서 추가함
  ${media.tablet`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); /* 가로·세로 모두 중앙 */
    `}
`

const ScaledWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform-origin: center center;
`

const FixedStage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 0;
`

const BackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: url(${Home767}) center / cover no-repeat;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  place-items: center;

  inset: 0;
  overflow: hidden;

  @media (min-width: 767px) {
    width: 767px;
    height: 1000px;
    background-size: contain;
    background-image: url(${Home767});
  }

  @media (min-width: 1024px) {
    width: 1024px;
    height: 1100px;
    background-image: url(${Home1440});
  }

  @media (min-width: 1440px) {
    width: 1440px;
    height: 1100px;
    background-image: url(${Home3000});
  }

  @media (min-width: 2560px) {
    width: 3000px;
    height: 1700px;
    background-image: url(${Home3000});
  }
`

const MobileBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${mainMobile});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const BubbleBox = styled.div`
  position: absolute;

  /* width: 380px;
  height: 380px;

  top: -250px;
  left: -380px; */

  width: 45%;
  height: 25%;

  top: 40%;
  left: 25%;

  font-family: 'Binggrae';
  font-weight: bold;
  z-index: 2;

  background: url(${thoughtbubble}) no-repeat center;
  background-size: 100% 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  // 패딩 크기도 추후 아래 반응형을 보내야됨
  padding: 0px 40px 80px 30px;
  box-sizing: border-box;
  text-align: center;
  color: black;
  font-size: 30px;
  line-height: 1.5;
  word-break: keep-all;

  /* 태블릿 이상 */
  ${media.tablet`
    width: 100%;
    height: 70%;

    top: -60%;
    left: -70%;
  `}

  /* 노트북 이상 */
  ${media.notebook`
    width: 150%;
    height: 90%;

    top: -70%;
    left: -130%;
  `}

  /* 데스크톱 이상 */
  ${media.desktop`
   width: 150%;
    height: 90%;

    top: -70%;
    left: -130%;
  `}
`

// 동굴위에 전투중 표시
// config의 position
const FixedIconWrapper = styled.div`
  position: absolute;
  z-index: 10;
  width: 80%;

  // 원래 font-size : 30px
  font-size: 2rem;
  font-weight: bold;

  ${media.mobile``}

  ${media.tablet``}

  ${media.notebook`
    `}

  ${media.desktop``}
`

const IconOverlayContainer = styled.div`
  position: relative;
  width: 100%;
  display: inline-block;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
`

const FixedIcon = styled.img`
  width: 100%;
  display: block;
  position: absolute;
  z-index: -50;
`

const IconTextOverlay = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${(props) => props.color || 'black'};
  font-size: 30px;
  font-family: 'Binggrae';
  pointer-events: none;
`

// ✅ 이미지 대신 div (JSX 버전)
const FixedMainIcon = styled.div`
  /* 공통 배경 설정 */
  background-image: ${({ $src }) => `url(${$src})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain; /* 종횡비 유지 */

  /* 모바일 기본값 */
  width: 80%;
  aspect-ratio: 1 / 1; /* 높이 확보 */
  justify-self: center;
  align-self: center;

  /* 태블릿 이상 */
  ${media.tablet`
    position: absolute;
    width: ${({ $w }) => $w.tablet};
    left: ${({ $pos }) => $pos.tablet.x};
    top:  ${({ $pos }) => $pos.tablet.y};
  `}

  /* 노트북 이상 */
  ${media.notebook`
    width: ${({ $w }) => $w.notebook};
    left: ${({ $pos }) => $pos.notebook.x};
    top:  ${({ $pos }) => $pos.notebook.y};
  `}

  /* 데스크톱 이상 */
  ${media.desktop`
    width: ${({ $w }) => $w.desktop};
    left: ${({ $pos }) => $pos.desktop.x};
    top:  ${({ $pos }) => $pos.desktop.y};
  `}
`

const MobileLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`

const statusMap = {
  전투: {
    img: fightBubble,
    text: '전투 중 ...',
    position: { left: '0px', top: '0px' },
    textColor: 'red',
  },
  휴식: {
    img: sleepBubble,
    text: '자는 중...',
    position: { left: '0px', top: '0px' },
    width: '250px',
    textColor: 'black',
  },
}

const OverBackgroundWrapper = styled.div`
  position: 'fixed';
  inset: 0;
  z-index: -500;
`

const OverBackgroundGausian = styled.div`
  position: fixed;
  z-index: -100;
  background-image: url(${Home767});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vw;
  filter: blur(10px);

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.6);

  ${media.notebook`
      transform : translate(-50%, -50%) scale(1.1);
    `}

  ${media.notebook`
      background-image: url(${Home3000});
      background-size: cover;
      transform : translate(-50%, -50%) scale(1.2);
    `}

  ${media.desktop`
      background-image: url(${Home3000});
      background-size: cover;
      transform : translate(-50%, -50%) scale(1.1);
    `}
`

// const OverBackgroundImg = styled.img`
//   src: url(${Home1440});
//   width: 100%;
//   height: 100%;
// `

const Home = () => {
  const [petData, setPetData] = useState(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    // later : 더미토큰 다시 정상화 필요
    const accessToken =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzUxMjc2ODcwfQ.Q32sbAXJExOyqIANdeHoVEEJl-TYlbZuWhggh3Zb4d7QESXTpSqGA_BfAG1WQtTBwfZGfAd3-TzkzIUxuh6gNg'

    const api = axios.create({
      baseURL: 'http://localhost:8100/api/v1',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const loadPetStatus = async () => {
      try {
        const res = await api.get('/pet/all')
        const { status, message } = res.data.data
        setPetData({ status, message })
      } catch (err) {
        console.error('❌ 에러 발생:', err)
      }
    }

    loadPetStatus()

    // later : 이게 없어도 될 것 같아 캡셔닝
    // const handleResize = () => {
    //   const newWidth = window.innerWidth
    //   const newScale = newWidth / 1440
    //   setWindowWidth(newWidth)
    //   setScale(newScale)
    // }

    // handleResize()
    // window.addEventListener('resize', handleResize)
    // return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!petData) return <div>로딩 중...</div>

  // 현재 펫 상태를 풀러와 config에 저장
  // 펫의 상태는 아래와 같음
  // petData.status = ['전투', '휴식' ]
  const config = statusMap[petData.status]

  return (
    <Container>
      <CenterBox>
        {/* {windowWidth > 767 ? ( */}
        <>
          <BackgroundWrapper>
            {/* /page1 – 시장 아이콘 */}
            <Link to="/page1" style={{ display: 'contents' }}>
              <FixedMainIcon
                $src={community}
                $w={{ mobile: '320px', tablet: '320px', notebook: '320px', desktop: '400px' }}
                $pos={{
                  mobile: { x: 'calc(50% - 160px)', y: 'calc(50% - 200px)' }, // 모바일
                  tablet: { x: 'calc(50% - 320px)', y: 'calc(50% - 390px)' }, // 태블릿
                  notebook: { x: 'calc(50% - 320px)', y: 'calc(50% - 330px)' }, // 노트북
                  desktop: { x: 'calc(50% - 400px)', y: 'calc(50% - 390px)' }, // 데스크톱
                }}
              />
            </Link>
            {/* /page2 – 집 아이콘 */}
            <Link to="/page2" style={{ display: 'contents' }}>
              <FixedMainIcon
                $src={house}
                $w={{ mobile: '320px', tablet: '320px', notebook: '320px', desktop: '400px' }}
                $pos={{
                  mobile: { x: 'calc(50% +  10px)', y: 'calc(50% - 200px)' },
                  tablet: { x: 'calc(50% + 10px)', y: 'calc(50% - 390px)' },
                  notebook: { x: 'calc(50% + 160px)', y: 'calc(50% - 330px)' }, // 노트북
                  desktop: { x: 'calc(50% + 250px)', y: 'calc(50% - 390px)' },
                }}
              />
            </Link>
            {/* /page3 – 동굴 아이콘 */}
            <Link to="/page3" style={{ display: 'contents', position: 'relative' }}>
              <FixedMainIcon
                $src={cave}
                $w={{ mobile: '320px', tablet: '300px', notebook: '320px', desktop: '400px' }}
                $pos={{
                  mobile: { x: 'calc(50% - 170px)', y: 'calc(50% + 40px)' }, // 모바일
                  tablet: { x: 'calc(50% - 320px)', y: 'calc(50% + 150px)' }, // 태블릿
                  notebook: { x: 'calc(50% - 400px)', y: 'calc(50% + 60px)' }, // 노트북
                  desktop: { x: 'calc(50% - 500px)', y: 'calc(50% + 120px)' }, // 데스크톱
                }}
              >
                <div style={{ position: 'relative', height: '100%' }}>
                  {config && (
                    <FixedIconWrapper>
                      <IconOverlayContainer>
                        <FixedIcon src={config.img} />
                        <div>{config.text}</div>
                      </IconOverlayContainer>
                    </FixedIconWrapper>
                  )}
                </div>
              </FixedMainIcon>
            </Link>

            {/* 펫(프로그몽) 아이콘 – 링크 없음 */}
            <div style={{ display: 'contents', position: 'relative' }}>
              <FixedMainIcon
                $src={progmong}
                $w={{ mobile: '320px', tablet: '300px', notebook: '220px', desktop: '320px' }}
                $pos={{
                  mobile: { x: 'calc(50% + 10px)', y: 'calc(50% + 40px)' }, // 모바일
                  tablet: { x: 'calc(50% + 40px)', y: 'calc(50% + 100px)' }, // 태블릿
                  notebook: { x: 'calc(50% + 250px)', y: 'calc(50% + 110px)' }, // 노트북
                  desktop: { x: 'calc(50% + 350px)', y: 'calc(50% + 160px)' }, // 데스크톱
                }}
              >
                <BubbleBox>{petData.message || '...'}</BubbleBox>
              </FixedMainIcon>
            </div>
          </BackgroundWrapper>
        </>
      </CenterBox>
      )
      {/* // : (
      //   <MobileLayout>
      //     <MobileBackground />
      //     <BubbleBox>{petData.message || '...'}</BubbleBox>
      //     <FixedMainIcon src={progmong2} />
      //   </MobileLayout>
      // )} */}
      <OverBackgroundWrapper>
        <OverBackgroundGausian />
      </OverBackgroundWrapper>
    </Container>
  )
}

export default Home
