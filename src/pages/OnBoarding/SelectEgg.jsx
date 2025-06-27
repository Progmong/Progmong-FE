import React, { useState } from 'react'
import axios from '@/constants/axiosInstance'
import styled from 'styled-components'
import LeftArrow from '../../assets/left-arrow.svg'
import RightArrow from '../../assets/right-arrow.svg'
import BaseContainer from '../../components/BaseContainer'
import BaseInput from '../../components/BaseInput'
import BaseButton from '../../components/BaseButton'

const ProgmongEggs = [
  new URL('../../assets/egg1.svg', import.meta.url).href,
  new URL('../../assets/egg2.svg', import.meta.url).href,
  new URL('../../assets/egg3.svg', import.meta.url).href,
]

const introBackground = new URL('../../assets/background-img1.png', import.meta.url).href

const Background = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(${introBackground}) no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  // overflow: hidden;
`
const CustomContainer = styled(BaseContainer)`
  width: 1003.82px;
  height: 780.32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h2`
  font-size: 48px;
  font-family: 'Binggrae';
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #fd3b40;

  /* Stroke (텍스트 외곽선 흉내) */
  -webkit-text-stroke: 1px #e8e8e8; /* 바깥쪽 외곽선 효과 */
  text-stroke: 1px black;

  /* Drop shadow */
  text-shadow: 0 2px 0 rgba(136, 8, 0, 1);
`

const EggSelector = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
`

const Arrow = styled.img`
  width: 122px;
  height: 122px;
  cursor: pointer;

  &.left {
    margin-right: 205px;
  }
  &.right {
    margin-left: 205px;
  }
`

const EggImage = styled.img`
  width: 275px;
  height: 351px;
`

const IndicatorDots = styled.div`
  margin-bottom: 1.5rem;

  .dot {
    font-size: 1.2rem;
    color: #ccc;
    margin: 0 4px;
  }

  .active {
    color: #333;
  }
`

const NicknameInput = styled(BaseInput)`
  width: 500px;
  height: 71px;
  padding: 0 10px;
  margin-bottom: 1.5rem;
  font-size: 24px;
  text-align: center;
`

const CustomButton = styled(BaseButton)`
  width: 212px;
  height: 62px;
  font-size: 24px;
`

const EggSelect = () => {
  const [currentEgg, setCurrentEgg] = useState(0)

  const handlePrev = () => {
    setCurrentEgg((prev) => (prev - 1 + ProgmongEggs.length) % ProgmongEggs.length)
  }
  const handleNext = () => {
    setCurrentEgg((prev) => (prev + 1) % ProgmongEggs.length)
  }

  const [nickname, setNickname] = useState('') // ⬅️ 상태 선언
  const handleEvent = async () => {
    const token = localStorage.getItem('accessToken')

    try {
      const response = await axios.post(
        '/pet/register',
        {
          petId: currentEgg + 1, // ✅ 선택한 알 ID
          nickname: nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ 인증 정보 추가
          },
        },
      )

      console.log('서버 응답:', response.data)
    } catch (error) {
      console.error('에러 발생:', error)
    }
  }

  return (
    <Background>
      <CustomContainer>
        <Title>프로그몽 선택</Title>

        <EggSelector>
          <Arrow src={LeftArrow} alt="left" className="left" onClick={handlePrev} />
          <EggImage src={ProgmongEggs[currentEgg]} alt="egg" />
          <Arrow src={RightArrow} alt="right" className="right" onClick={handleNext} />
        </EggSelector>

        <IndicatorDots>
          {ProgmongEggs.map((_, idx) => (
            <span key={idx} className={idx === currentEgg ? 'dot active' : 'dot'}>
              ●
            </span>
          ))}
        </IndicatorDots>

        <NicknameInput
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <CustomButton variant="secondary" size="mg" onClick={handleEvent}>
          결정
        </CustomButton>
      </CustomContainer>
    </Background>
  )
}

export default EggSelect
