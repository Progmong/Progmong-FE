import React, { useState } from 'react'
import usePetApi from '../../constants/pet'
import styled from 'styled-components'
import LeftArrow from '../../assets/left-arrow.svg'
import RightArrow from '../../assets/right-arrow.svg'
import BaseContainer from '../../components/BaseContainer'
import BaseInput from '../../components/BaseInput'
import BaseButton from '../../components/BaseButton'
import { useModal } from '@/context/ModalContext'
import { useNavigate } from 'react-router-dom'

const ProgmongEggs = [
  new URL('../../assets/pets/pet1_stage1.png', import.meta.url).href,
  new URL('../../assets/pets/pet2_stage1.png', import.meta.url).href,
  new URL('../../assets/pets/pet3_stage1.png', import.meta.url).href,
  new URL('../../assets/pets/pet4_stage1.png', import.meta.url).href,
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
  width: 48vw;
  height: 76.2vh;
  max-width: 900px;
  min-width: 320px; // ✅ 너무 작아지지 않게
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
  font-size: 2.4em;
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
  margin: 1rem 0;
  gap: clamp(0.3em, 2vw, 1.5em);
  height: 30em;
  max-height: 30vh;
  overflow: hidden;
`

const EggImage = styled.img`
  width: 13em;
  max-height: 100%;
  object-fit: contain;
`

const Arrow = styled.img`
  width: 4em;
  height: auto;
  cursor: pointer;

  &.left {
    margin-right: 1em;
  }
  &.right {
    margin-left: 1em;
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
  width: 18em;
  height: 2.3em;
  padding: 0 10px;
  margin-bottom: 1.5rem;
  font-size: 1em;
  text-align: center;
`

const CustomButton = styled(BaseButton)`
  width: 10em;
  height: 2.5em;
  font-size: 1em;
  padding: 0 10px;
`

const SelectEgg = () => {
  const [currentEgg, setCurrentEgg] = useState(0)
  const [nickname, setNickname] = useState('')
  const { openModal } = useModal()
  const navigate = useNavigate()
  const { registerPet } = usePetApi()

  const handlePrev = () => {
    setCurrentEgg((prev) => (prev - 1 + ProgmongEggs.length) % ProgmongEggs.length)
  }

  const handleNext = () => {
    setCurrentEgg((prev) => (prev + 1) % ProgmongEggs.length)
  }

  const handleEvent = async () => {
    const trimmed = nickname.trim()
    //const token = localStorage.getItem('accessToken')

    // ✅ 닉네임 유효성 검사
    if (trimmed.length === 0) {
      openModal('alert', {
        title: '닉네임 입력 오류',
        message: '닉네임은 공백 없이, 한 글자 이상 입력해 주세요.',
      })
      return
    }

    if (trimmed.length > 12) {
      openModal('alert', {
        title: '닉네임 입력 오류',
        message: '닉네임은 최대 12자까지 입력할 수 있어요!',
      })
      return
    }

    try {
      const response = await registerPet(currentEgg + 1, trimmed)

      openModal('alert', {
        title: '등록 완료',
        message: '프로그몽이 성공적으로 등록되었습니다!',
        onConfirm: () => navigate('/home'),
      })
    } catch (error) {
      const message = error?.response?.data?.message

      if (typeof message === 'string') {
        if (message.includes('닉네임')) {
          openModal('alert', {
            title: '닉네임 중복',
            message: '이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요.',
          })
        } else if (message.includes('등록된 펫')) {
          openModal('alert', {
            title: '등록 실패',
            message: '이미 등록된 펫이 있습니다.',
          })
        } else {
          openModal('alert', {
            title: '에러',
            message: message || '등록 중 문제가 발생했습니다.',
          })
        }
      } else {
        openModal('alert', {
          title: '서버 오류',
          message: '서버와의 연결에 실패했습니다.',
        })
      }
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
            setNickname(e.target.value)
          }}
        />

        <CustomButton $variant="secondary" $size="mg" onClick={handleEvent}>
          결정
        </CustomButton>
      </CustomContainer>
    </Background>
  )
}

export default SelectEgg
