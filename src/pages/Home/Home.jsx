import React, { useState, useEffect, useMemo } from 'react'
import usePetApi from '../../constants/pet'
import styled, { keyframes } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import { media } from '@/utils/breakpoints.js'

// 이미지 리소스들
import communityImg from '../../assets/shop.png'
import desktopBg from '../../assets/home_background.png'
import mobileBg from '../../assets/home_background_mobile.png'
import baseBackground from '../../assets/base-background.png'
import dungeonImg from '../../assets/main_dungeon.png'
import mypageImg from '../../assets/main_mypage.png'
import boardImg from '../../assets/main_board.png'
import progmongImg from '../../assets/progmong.png'
import thoughtbubble from '../../assets/ttbubble.png'
import fightBubble from '../../assets/fightbubble.png'
import sleepBubble from '../../assets/sleepbubble.png'
import LeftArrowImg from '../../assets/left-arrow2.png'
import RightArrowImg from '../../assets/right-arrow2.png'

//걷기 테스트
import walking from '../../assets/walking22.gif'
import standing from '../../assets/defaultstand.png'

const DESIGN_WIDTH = 1536
const DESIGN_HEIGHT = 1024

const BackgroundContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: -2;
  background-image: url(${baseBackground});
`

const BackgroundImage = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  user-select: none;
  width: 100vw;
  height: 100vh;
  object-fit: contain;
`

const ScalingStage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(${(props) => props.scale});
  transform-origin: center center;
  width: ${DESIGN_WIDTH}px;
  height: ${DESIGN_HEIGHT}px;
  overflow: hidden;
`

const StageContent = styled.div`
  position: relative;
  width: ${DESIGN_WIDTH}px;
  height: ${DESIGN_HEIGHT}px;
`

const BackgroundImageInStage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: ${DESIGN_WIDTH}px;
  height: ${DESIGN_HEIGHT}px;
  object-fit: cover;
  z-index: -1;
  user-select: none;
`

const DesktopMenuIcon = styled.img`
  position: absolute;
  width: ${(props) => props.$size}px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05) translateY(-5px);
  }
`

const jumpAnimation = keyframes`
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
`

const PetImageWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  width: ${(props) => props.size}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  transition: transform 0.2s ease;
  z-index: 10;
  &:hover {
    transform: scale(1.05) translateY(-5px);
  }
`

const PetImage = styled.img`
  width: 100%;
  display: block;
  animation-fill-mode: forwards;
  &.jump {
    animation: ${jumpAnimation} 0.6s ease;
  }
`

const PetBubble = styled.div`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  padding: 15px;
  background: url(${thoughtbubble}) no-repeat center;
  background-size: contain;
  font-family: 'Binggrae';
  font-weight: bold;
  font-size: 1.4rem;
  line-height: 1.5;
  text-align: center;
  color: black;
  pointer-events: none; /* 말풍선 클릭 안 되게 */
`

const ThoughtBubble = styled.img`
  position: absolute;
  width: 200px;
  top: 440px;
  left: 670px;
  font-family: 'Binggrae';
  animation: fadeIn 0.4s ease-in-out;
`

const ThoughtText = styled.div`
  position: absolute;
  top: 470px;
  left: 700px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  width: 120px;
  text-align: center;
  line-height: 1.2;
  animation: fadeIn 0.4s ease-in-out;
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  z-index: 10;
  cursor: pointer;
  transform: translateY(-50%);
  &.custom-swiper-button-prev {
    left: 10px;
  }
  &.custom-swiper-button-next {
    right: 10px;
  }
  img {
    width: 50px;
    height: 50px;
  }
`

const MobileSliderWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`

const MobileMenuIcon = styled.img`
  position: relative;
  width: 40vw;
  max-width: 200px;
  cursor: pointer;
  transition: transform 0.2s;
`

const MobileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const statusMap = {
  전투: {
    img: fightBubble,
    text: '전투 중 ...',
    position: { left: '620px', top: '45px' }, // ← 원하는 위치로 수정
    size: '235px', // ← 원하는 크기
    textColor: 'red',
  },
  휴식: {
    img: sleepBubble,
    text: '자는 중...',
    position: { left: '640px', top: '45px' },
    size: '190px',
    textColor: 'black',
  },
}
const progmongPosition = {
  top: 700,
  left: 1070,
  size: 200,
}

const allItems = [
  {
    name: '커뮤니티',
    src: communityImg,
    top: 250,
    left: 330,
    size: 270,
    route: '/community/알고리즘',
  },
  { name: '던전', src: dungeonImg, top: 30, left: 670, size: 350, route: '/levelselect' },
  { name: '마이페이지', src: mypageImg, top: 280, left: 970, size: 310, route: '/mypage' },
  { name: '게시판', src: boardImg, top: 650, left: 210, size: 310, route: '/main' },
]

//걷기 테스트
const MobilePetWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MobilePetImage = styled.img`
  width: 100px;
  height: auto;
  transform: ${({ $direction }) => ($direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)')};
`

const MobilePetBubble = styled.div`
  width: 160px;
  padding: 10px;
  background: url(${thoughtbubble}) no-repeat center;
  background-size: contain;
  font-family: 'Binggrae';
  font-weight: bold;
  font-size: 1.1rem;
  line-height: 1.4;
  text-align: center;
  margin-bottom: 10px;
`

const Home = () => {
  const [petData, setPetData] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767)
  const [scale, setScale] = useState(1)
  const [isJumping, setIsJumping] = useState(false)
  const navigate = useNavigate()

  //걷기 테스트
  const [isWalking, setIsWalking] = useState(false)
  const [direction, setDirection] = useState('right') // 타입 지정 없이

  const handleJump = () => {
    if (isJumping) return
    setIsJumping(true)
    setTimeout(() => setIsJumping(false), 600)
  }

  const handleCaveClick = () => {
    if (!petData) return
    if (petData.status === '전투') navigate('/explore')
    else navigate('/levelselect')
  }

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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767)
      setScale(window.innerHeight / DESIGN_HEIGHT)
    }

    const { getPetInfo } = usePetApi()

    const loadPetStatus = async () => {
      try {
        const res = await getPetInfo()
        const { status, message, petId, evolutionStage } = res.data.data
        setPetData({ status, message, petId, evolutionStage })
      } catch (err) {
        console.error('❌ 펫 정보 로드 실패:', err)
      }
    }

    loadPetStatus()
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!petData) return <div>로딩 중...</div>

  const backgroundImage = isMobile ? mobileBg : desktopBg
  const config = statusMap[petData.status]

  return (
    <BackgroundContainer>
      <BackgroundImage src={backgroundImage} alt="background" />
      {isMobile ? (
        <MobileSliderWrapper>
          <ArrowButton className="custom-swiper-button-prev">
            <img src={LeftArrowImg} alt="이전" />
          </ArrowButton>
          <ArrowButton className="custom-swiper-button-next">
            <img src={RightArrowImg} alt="다음" />
          </ArrowButton>
          <Swiper
            loop
            navigation={{
              nextEl: '.custom-swiper-button-next',
              prevEl: '.custom-swiper-button-prev',
            }}
            modules={[Navigation]}
            //걷기 테스트
            onSlideChangeTransitionStart={(swiper) => {
              const current = swiper.activeIndex
              const previous = swiper.previousIndex
              setDirection(current > previous ? 'right' : 'left') // 방향 결정
              setIsWalking(true) // 걷기 시작
            }}
            onSlideChangeTransitionEnd={() => {
              setIsWalking(false) // 걷기 멈춤
            }}
          >
            {allItems.map((item) => (
              <SwiperSlide key={item.name}>
                <MobileMenuWrapper>
                  <MobileMenuIcon
                    src={item.src}
                    alt={item.name}
                    onClick={() => navigate(item.route)}
                  />
                </MobileMenuWrapper>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* 걷기 테스트 */}
          {/* 👇 여기 추가하면 됨 */}
          <MobilePetWrapper>
            <MobilePetImage src={isWalking ? walking : standing} alt="펫" $direction={direction} />
          </MobilePetWrapper>
        </MobileSliderWrapper>
      ) : (
        <ScalingStage scale={scale}>
          <StageContent>
            <BackgroundImageInStage src={backgroundImage} alt="bg" />
            {allItems.map((item) => (
              <DesktopMenuIcon
                key={item.name}
                src={item.src}
                alt={item.name}
                $size={item.size}
                style={{ top: `${item.top}px`, left: `${item.left}px` }}
                onClick={() => {
                  if (item.name === '던전') handleCaveClick()
                  else navigate(item.route)
                }}
              />
            ))}

            {petImage && (
              <PetImageWrapper
                style={{
                  position: 'absolute',
                  top: '700px', // 프로그몽 위치 top
                  left: '1070px', // 프로그몽 위치 left
                  width: '200px',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
                onClick={handleJump}
              >
                <PetImage
                  src={petImage || progmongImg}
                  alt="pet"
                  className={isJumping ? 'jump' : ''}
                />

                {/* 💬 말풍선 이미지 */}
                <img
                  src={thoughtbubble}
                  alt="bubble"
                  style={{
                    position: 'absolute',
                    top: '-195px', // 펫 이미지 위쪽
                    left: '-330px',
                    width: '290px',
                    pointerEvents: 'none',
                  }}
                />

                {/* 💬 말풍선 텍스트 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-110px',
                    left: '-290px',
                    width: '200px',
                    fontSize: '25px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    fontFamily: 'Binggrae', // 이 부분 중요!
                    color: '#333',
                    pointerEvents: 'none',
                  }}
                >
                  {petData.message || '...'}
                </div>
              </PetImageWrapper>
            )}

            {config && (
              <>
                <img
                  src={config.img}
                  alt="status bubble"
                  style={{
                    position: 'absolute',
                    top: config.position.top,
                    left: config.position.left,
                    width: config.size,
                    zIndex: 10,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: `calc(${config.position.top} + 29px)`,
                    left: `calc(${config.position.left} + 10px)`,
                    width: '190px',
                    color: config.textColor,
                    fontSize: '25px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    zIndex: 11,
                    fontFamily: 'Binggrae',
                    pointerEvents: 'none', // 클릭 막기
                  }}
                >
                  {config.text}
                </div>
              </>
            )}
          </StageContent>
        </ScalingStage>
      )}
    </BackgroundContainer>
  )
}

export default Home
