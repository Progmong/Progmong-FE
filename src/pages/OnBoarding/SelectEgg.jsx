import React, { useState } from 'react'
import axios from 'axios'
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
  overflow: hidden;
`
const CustomContainer = styled(BaseContainer)`
  width: 60vw; /* 기존 69.7vw -> 60vw로 줄임 */
  max-width: 900px; /* 최대 너비도 줄임 */
  height: 76.2vh;
  max-height: 780px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 3vh 4vw;
  box-sizing: border-box;

  font-size: clamp(14px, 1.2vw, 18px);
`
const Title = styled.h2`
  font-size: 3em; /* 부모 font-size 기준으로 3배 */
  font-family: 'Binggrae';
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #fd3b40;

  -webkit-text-stroke: 1px #e8e8e8;
  text-stroke: 1px black;
  text-shadow: 0 2px 0 rgba(136, 8, 0, 1);
`

const EggSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0;
  gap: 2em;
  height: 10em; /* 최대 높이 제한 */
  max-height: 15vh; /* 화면 대비 최대 높이 제한 */
  overflow: hidden; /* 넘치는 부분 숨김 */
`

const EggImage = styled.img`
  width: 5em;
  max-height: 100%; /* 부모 높이 내에서만 크기 조절 */
  object-fit: contain;
`
const Arrow = styled.img`
  width: 2.5em;
  height: auto;
  cursor: pointer;

  &.left {
    margin-right: 3em;
  }
  &.right {
    margin-left: 3em;
  }
`

const IndicatorDots = styled.div`
  margin-bottom: 1.5rem;

  .dot {
    font-size: 1em;
    color: #ccc;
    margin: 0 0.25em;
  }

  .active {
    color: #333;
  }
`

const NicknameInput = styled(BaseInput)`
  width: 12em;
  height: 2.5em;
  padding: 0 10px;
  margin-bottom: 1.5rem;
  font-size: 1em;
  text-align: center;
`

const CustomButton = styled(BaseButton)`
  width: 10em;
  height: 2.5em;
  font-size: 1em;
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
        'http://localhost:8100/api/v1/pet/register',
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
          onChange={(e) => {
            const input = e.target.value
            if (input.length <= 12) {
              setNickname(input)
            } else {
              alert('닉네임은 최대 12자까지 입력할 수 있어요!')
            }
          }}
        />

        <CustomButton variant="secondary" size="mg" onClick={handleEvent}>
          결정
        </CustomButton>
      </CustomContainer>
    </Background>
  )
}

export default EggSelect
