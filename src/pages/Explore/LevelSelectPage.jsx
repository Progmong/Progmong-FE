import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

// 배경 이미지
import backgroundImage from '../../assets/levelselecet-bg.png'
import mobileBackgroundImage from '../../assets/levelselectmobile-bg.png'

// 성 이미지
import bronzeCastle from '../../assets/castles/bronze_castle.png'
import silverCastle from '../../assets/castles/silver_castle.png'
import goldCastle from '../../assets/castles/gold_castle.png'
import platinumCastle from '../../assets/castles/platinum_castle.png'
import diamondCastle from '../../assets/castles/diamond_castle.png'
import baseBackground from '../../assets/base-background.png' // 흐릿한 하늘색 배경

// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules' // 추가
import 'swiper/css'
import 'swiper/css/navigation' // 추가

import LeftArrowImg from '../../assets/left-arrow2.png'
import RightArrowImg from '../../assets/right-arrow2.png'

const BaseWrapper = styled.div`
  position: fixed;
  inset: 0; /* top, right, bottom, left: 0 */
  background-image: url(${baseBackground});
  background-size: cover;
  background-position: center;
  z-index: -1; /* 가장 아래에 깔기 */

  display: flex;
  justify-content: center;
  align-items: center;
`

// 스타일 정의
const BackgroundWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => (props.$isMobile ? mobileBackgroundImage : backgroundImage)});
  background-size: ${(props) => (props.$isMobile ? 'cover' : 'contain')};

  border-radius: 32px;
  overflow: hidden;

  ${(props) =>
    props.$isMobile
      ? `
    width: 100vw;
    height: 100vh;
  `
      : `
    width: 100%;
    max-width: 1440px;
    aspect-ratio: 1440 / 1000;
  `}
`

const Castle = styled.img`
  width: 10vw;
  max-width: 150px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1);
  }
  @media (max-width: 768px) {
    width: 30%; // 예시로 140px로 확대
  }
`

const CastleWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);

  &:hover img {
    transform: scale(1.1);
  }

  &:hover div {
    transform: scale(1.1);
  }
`

const CastleName = styled.div`
  margin-top: 10px;
  padding: 4px 12px;
  background-color: #ffffff;
  color: #000000;
  font-size: 14px;
  font-family: 'Binggrae';
  font-weight: 700;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  @media (max-width: 768px) {
    padding: 10px 20px; // ✅ 더 넓고 높게
    font-size: 16px;
    border-radius: 16px; // ✅ 둥글게
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25); // ✅ 그림자 강조
  }
`

const MobileSliderWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const MobileCastleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

// 성 정보 배열
const castles = [
  { name: '브론즈', src: bronzeCastle, level: 'BRONZE', top: '62%', left: '33%' },
  { name: '실버', src: silverCastle, level: 'SILVER', top: '53%', left: '53%' },
  { name: '골드', src: goldCastle, level: 'GOLD', top: '28%', left: '39%' },
  { name: '플래티넘', src: platinumCastle, level: 'PLATINUM', top: '27%', left: '60%' },
  { name: '다이아', src: diamondCastle, level: 'DIAMOND', top: '27%', left: '88%' },
]

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

// 컴포넌트
const LevelSelectPage = () => {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleClick = (level) => {
    const levelRange = {
      BRONZE: { minLevel: 1, maxLevel: 5 },
      SILVER: { minLevel: 6, maxLevel: 10 },
      GOLD: { minLevel: 11, maxLevel: 15 },
      PLATINUM: { minLevel: 16, maxLevel: 20 },
      DIAMOND: { minLevel: 21, maxLevel: 25 },
    }

    navigate('/SelectExploreTag', { state: levelRange[level] })
  }

  return (
    <BaseWrapper>
      <BackgroundWrapper $isMobile={isMobile}>
        {isMobile ? (
          <MobileSliderWrapper>
            <ArrowButton className="custom-swiper-button-prev">
              <img src={LeftArrowImg} alt="이전" />
            </ArrowButton>
            <ArrowButton className="custom-swiper-button-next">
              <img src={RightArrowImg} alt="다음" />
            </ArrowButton>
            <Swiper
              loop={true}
              navigation={{
                nextEl: '.custom-swiper-button-next',
                prevEl: '.custom-swiper-button-prev',
              }}
              modules={[Navigation]}
            >
              {castles.map((castle) => (
                <SwiperSlide key={castle.level}>
                  <MobileCastleWrapper>
                    <Castle src={castle.src} onClick={() => handleClick(castle.level)} />
                    <CastleName>{castle.name}</CastleName>
                  </MobileCastleWrapper>
                </SwiperSlide>
              ))}
            </Swiper>
          </MobileSliderWrapper>
        ) : (
          castles.map((castle) => (
            <CastleWrapper key={castle.level} style={{ top: castle.top, left: castle.left }}>
              <CastleName>{castle.name}</CastleName>
              <Castle src={castle.src} onClick={() => handleClick(castle.level)} />
            </CastleWrapper>
          ))
        )}
      </BackgroundWrapper>
    </BaseWrapper>
  )
}

export default LevelSelectPage
