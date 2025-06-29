import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import Home767 from '../../assets/home/background_767.png'
import Home1440 from '../../assets/home/background_1440.png'
import Home3000 from '../../assets/home/background_3000.png'

import community from '../../assets/shop.png'
import house from '../../assets/house.png'
import cave from '../../assets/dungeon.png'
import progmong from '../../assets/progmong.png'
import thoughtbubble from '../../assets/ttbubble.png'
import fightBubble from '../../assets/fightbubble.png'
import sleepBubble from '../../assets/sleepbubble.png'

// 브레이크포인트 헬퍼 (앞서 만든 media 객체를 쓴다)
import { media } from '@/utils/breakpoints.js'
import { useNavigate } from 'react-router-dom'

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
  // overflow: hidden;

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
  padding: 50px 40px 80px 30px;
  box-sizing: border-box;
  text-align: center;
  color: black;
  font-size: 1.4rem;
  line-height: 1.5;
  word-break: keep-all;

  /* 태블릿 이상 */
  ${media.tablet`
    width: 100%;
    height: 70%;

    font-size: 1.6rem;
    top: -60%;
    left: -70%;
  `}

  /* 노트북 이상 */
  ${media.notebook`
    width: 150%;
    height: 90%;
    font-size: 1.8rem;

    top: -70%;
    left: -130%;
  `}

  /* 데스크톱 이상 */
  ${media.desktop`
   width: 150%;
    height: 90%;
    font-size: 2rem;

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
  font-size: 1.2rem;
  font-family: 'Binggrae';
  font-weight: bold;

  ${media.mobile`
    font-size: 1.4rem;
    `}

  ${media.tablet`
    font-size: 1.6rem;
    `}

  ${media.notebook`
    font-size: 1.8rem;
    `}

  ${media.desktop`
    font-size: 2rem;
    `}
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

const JumpingIcon = styled(FixedMainIcon)`
  cursor: pointer;
  animation-fill-mode: forwards;

  &.jump {
    animation: jumpAnimation 0.6s ease;
  }

  @keyframes jumpAnimation {
    0% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-30px);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0);
    }
  }
`
const HoverableIcon = styled(FixedMainIcon)`
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05) translateY(-5px);
  }
`

const Home = () => {
  const [petData, setPetData] = useState(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [scale, setScale] = useState(1)

  const [isJumping, setIsJumping] = useState(false)

  const navigate = useNavigate()
  const handleCaveClick = () => {
    if (!petData) return

    if (petData.status === '전투') {
      navigate('/explore')
    } else {
      navigate('/levelselect')
    }
  }

  // 이미지 경로 생성 (동적 import 사용 불가하므로 URL 방식 사용)
  const petImage = useMemo(() => {
    if (!petData?.petId || !petData?.evolutionStage) return null

    try {
      return new URL(
        `../../assets/pets/pet${petData.petId}_stage${petData.evolutionStage}.png`,
        import.meta.url,
      ).href
    } catch (err) {
      console.error('❌ 펫 이미지 로드 실패:', err)
      return null
    }
  }, [petData])

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
        const { status, message, petId, evolutionStage } = res.data.data
        setPetData({ status, message, petId, evolutionStage })
      } catch (err) {
        console.error('❌ 에러 발생:', err)
      }
    }

    loadPetStatus()
  }, [])

  if (!petData) return <div>로딩 중...</div>

  // 현재 펫 상태를 풀러와 config에 저장
  // petData.status = ['전투', '휴식' ]
  const config = statusMap[petData.status]

  const handleJump = () => {
    if (isJumping) return // 이미 점프 중이면 무시
    setIsJumping(true)
    setTimeout(() => {
      setIsJumping(false)
    }, 600) // 애니메이션 시간과 동일하게 맞춤
  }

  return (
    <Container>
      <CenterBox>
        <>
          <BackgroundWrapper>
            {/* /page1 – 시장 아이콘 */}
            <Link to="/page1" style={{ display: 'contents' }}>
              <HoverableIcon
                $src={community}
                $w={{ mobile: '320px', tablet: '320px', notebook: '320px', desktop: '400px' }}
                $pos={{
                  mobile: { x: 'calc(50% - 160px)', y: 'calc(50% - 200px)' },
                  tablet: { x: 'calc(50% - 320px)', y: 'calc(50% - 390px)' },
                  notebook: { x: 'calc(50% - 300px)', y: 'calc(50% - 300px)' },
                  desktop: { x: 'calc(50% - 400px)', y: 'calc(50% - 390px)' },
                }}
              />
            </Link>
            {/* /page2 – 집 아이콘 */}
            <Link to="/mypage" style={{ display: 'contents' }}>
              <HoverableIcon
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
            <div
              onClick={handleCaveClick}
              style={{ display: 'contents', position: 'relative', cursor: 'pointer' }}
            >
              <HoverableIcon
                $src={cave}
                $w={{ mobile: '320px', tablet: '300px', notebook: '320px', desktop: '400px' }}
                $pos={{
                  mobile: { x: 'calc(50% - 170px)', y: 'calc(50% + 40px)' }, // 모바일
                  tablet: { x: 'calc(50% - 320px)', y: 'calc(50% + 150px)' }, // 태블릿
                  notebook: { x: 'calc(50% - 400px)', y: 'calc(50% + 40px)' }, // 노트북
                  desktop: { x: 'calc(50% - 500px)', y: 'calc(50% + 60px)' }, // 데스크톱
                }}
              >
                <div style={{ position: 'relative', height: '100%' }}>
                  {config && (
                    <FixedIconWrapper>
                      <IconOverlayContainer>
                        <FixedIcon src={config.img} />
                        <div style={{ color: config.textColor }}>{config.text}</div>
                      </IconOverlayContainer>
                    </FixedIconWrapper>
                  )}
                </div>
              </HoverableIcon>
            </div>

            {/* 펫(프로그몽) 아이콘 – 링크 없음 */}
            <div style={{ display: 'contents', position: 'relative' }} onClick={handleJump}>
              <JumpingIcon
                className={isJumping ? 'jump' : ''}
                $src={petImage || progmong} // 로드 실패 시 기본 이미지
                $w={{ mobile: '320px', tablet: '300px', notebook: '220px', desktop: '320px' }}
                $pos={{
                  mobile: { x: 'calc(50% + 10px)', y: 'calc(50% + 40px)' }, // 모바일
                  tablet: { x: 'calc(50% + 40px)', y: 'calc(50% + 100px)' }, // 태블릿
                  notebook: { x: 'calc(50% + 250px)', y: 'calc(50% + 110px)' }, // 노트북
                  desktop: { x: 'calc(50% + 350px)', y: 'calc(50% + 160px)' }, // 데스크톱
                }}
              >
                <BubbleBox>{petData.message || '...'}</BubbleBox>
              </JumpingIcon>
            </div>
          </BackgroundWrapper>
        </>
      </CenterBox>

      <OverBackgroundWrapper>
        <OverBackgroundGausian />
      </OverBackgroundWrapper>
    </Container>
  )
}

export default Home
