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

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: black;
  z-index: -1;
`

const ScaledWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform-origin: center center;
`

const FixedStage = styled.div`
  position: relative;
  width: 1440px;
  height: 100vh;
  overflow: hidden;
`

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 1440px;
  height: 1100px;
  transform: translateX(-50%);
  background-image: url(${mainImage2});
  background-repeat: no-repeat;
  background-size: 1440px 1100px;
  background-position: center;
  z-index: 0;
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
  left: 510px;
  top: 300px;
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
  width: ${(props) => props.width || '300px'};
  z-index: 1;
`

const MobileLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: black;
`

const statusMap = {
  전투: {
    img: fightBubble,
    text: '전투 중 ...',
    position: { left: '160px', top: '530px' },
    textColor: 'red',
  },
  휴식: {
    img: sleepBubble,
    text: '자는 중...',
    position: { left: '200px', top: '540px' },
    width: '250px',
    textColor: 'black',
  },
}

const Home = () => {
  const [petData, setPetData] = useState(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [scale, setScale] = useState(1)

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

    const handleResize = () => {
      const newWidth = window.innerWidth
      const newScale = newWidth / 1440
      setWindowWidth(newWidth)
      setScale(newScale)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!petData) return <div>로딩 중...</div>

  const config = statusMap[petData.status]

  return (
    <Container>
      {windowWidth > 767 ? (
        <ScaledWrapper style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
          <FixedStage>
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
              <FixedMainIcon
                src={community}
                width="380px"
                style={{ left: '240px', top: '110px' }}
              />
            </Link>
            <Link to="/page2">
              <FixedMainIcon src={house} width="415px" style={{ left: '1010px', top: '79px' }} />
            </Link>
            <Link to="/page3">
              <FixedMainIcon src={cave} width="373px" style={{ left: '180px', top: '630px' }} />
            </Link>
            <FixedMainIcon src={progmong} width="303px" style={{ left: '1030px', top: '590px' }} />
          </FixedStage>
        </ScaledWrapper>
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
