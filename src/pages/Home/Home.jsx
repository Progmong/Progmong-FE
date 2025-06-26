import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

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

// ✅ 배경 및 전체 레이아웃
const Container = styled.div`
  width: auto;
  height: 100vh;
  overflow: hidden;
  background: black;
  position: relative;
`

// ✅ PC용 배경: 배경 이미지 중앙 고정 + 꽉 차게 + 찌그러짐 없이 잘리게
const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-image: url(${mainImage2});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 0;
`

// ✅ 모바일 배경: 같은 원리 적용
const MobileBackground = styled.div`
  width: 100vw;
  height: 100vh;

  background-image: url(${mainMobile});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

// 휴식중 말풍선
const BubbleBox = styled.div`
  position: absolute;
  left: 50%;
  top: 34%;
  transform: translateX(-50%);
  width: 420px;
  height: 420px;

  font-family: 'Binggrae';
  z-index: 2;

  background: url(${thoughtbubble}) no-repeat center center;
  background-size: contain;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0px 40px 80px 30px;
  box-sizing: border-box;

  text-align: center;
  color: black;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.5;
  word-break: keep-all;
`

const FixedIconWrapper = styled.div`
  position: absolute;
  z-index: 10;
`

const IconOverlayContainer = styled.div`
  position: relative;
  width: 100%;
  display: inline-block;
`

const FixedIcon = styled.img`
  width: 100%;
  display: block;
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

const FixedMainIcon = styled.img`
  position: absolute;
  cursor: pointer;
  width: ${(props) => props.width || '300px'};

  @media (max-width: 767px) {
    width: 200px;
    left: 50%;
    top: 70%;
    transform: translateX(-50%);
    content: url(${progmong2});
  }
`

const MobileLayout = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  background: black;
`

const statusMap = {
  전투: {
    img: fightBubble,
    text: '전투 중 ...',
    position: { left: '11%', top: '53%' },
    textColor: 'red',
  },
  휴식: {
    img: sleepBubble,
    text: '자는 중...',
    position: { left: '15%', top: '54%' },
    width: '250px',
    textColor: 'black',
  },
}

const Home = () => {
  const [petData, setPetData] = useState(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

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

    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!petData) return <div>로딩 중...</div>

  const config = statusMap[petData.status]

  return (
    <Container>
      {windowWidth > 767 ? (
        <>
          <BackgroundWrapper />
          <BubbleBox>{petData.message || '...'}</BubbleBox>

          {config && (
            <FixedIconWrapper
              style={{
                left: config.position.left,
                top: config.position.top,
                width: config.width || '200px',
              }}
            >
              <IconOverlayContainer>
                <FixedIcon src={config.img} />
                <IconTextOverlay color={config.textColor}>{config.text}</IconTextOverlay>
              </IconOverlayContainer>
            </FixedIconWrapper>
          )}

          <Link to="/page1">
            <FixedMainIcon src={community} width="250px" style={{ left: '25%', top: '3%' }} />
          </Link>
          <Link to="/page2">
            <FixedMainIcon src={house} width="250px" style={{ left: '65%', top: '3%' }} />
          </Link>
          <Link to="/page3">
            <FixedMainIcon src={cave} width="320px" style={{ left: '15%', top: '49%' }} />
          </Link>
          <FixedMainIcon src={progmong} width="303px" style={{ left: '72%', top: '59%' }} />
        </>
      ) : (
        <MobileLayout>
          <MobileBackground />
          <BubbleBox>{petData.message || '...'}</BubbleBox>
          <FixedMainIcon src={progmong2} />
        </MobileLayout>
      )}
    </Container>
  )
}

export default Home
