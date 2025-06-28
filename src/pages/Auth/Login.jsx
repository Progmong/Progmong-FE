import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import logo from '../../assets/progmong-logo.png'
import bgVideo from '../../assets/bg-video.mp4'
import BaseButton from '../../components/BaseButton'
import BaseInput from '../../components/BaseInput/'
import BaseContainer from '../../components/BaseContainer'
import useAuthApi from '../../constants/auth'
import { useModal } from '@/context/ModalContext'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    font-family: 'Binggrae';
  }
`

const Bg = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`
const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: -1;
`
const Logo = styled.div`
  position: absolute;
  top: -220px;
  width: 100%;
  height: 100%;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 2;
  animation: glow 2.5s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 10px #ff4b4b) drop-shadow(0 0 20px #ff7e7e);

  @keyframes glow {
    0% {
      transform: scale(1);
      filter: drop-shadow(0 0 5px #ff4b4b);
    }
    100% {
      transform: scale(1.08);
      filter: drop-shadow(0 0 20px #ff4b4b) drop-shadow(0 0 30px #ffaaaa);
    }
  }
`
const LoginContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
`
const Label = styled.label`
  font-weight: bold;
  font-size: 18px;
`
const StyleLink = styled(Link)`
  text-decoration: none;
  color: #2c2c2c;
  font-weight: bold;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`

const Login = () => {
  const navigate = useNavigate();
  const { login, checkPet } = useAuthApi()
  const { openModal } = useModal()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  })

  const handleLogin = async () => {
    if (!email || !password) {
      openModal('alert', { title: '로그인 오류', message: '아이디 또는 비밀번호를 입력하세요.' })
      return
    }
    try {
      const response = await login(email, password)
      const accessToken = response.data.data.accessToken
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken) // 토큰 저장
        console.log(response)
        const loginSuccess = response.data.message

        const res = await checkPet()
        console.log(res.data.message)
         
          openModal('alert', {
            message: `${response.data.message}`,
            onConfirm: () => navigate('/home'),
          })
        
      } else {
        openModal('alert', { message: `${response.data.message}` })
      }
    } catch (err) {
      const errMsg = err.response?.data?.message
      if (errMsg === '해당 유저의 펫 정보가 없습니다.') {
        openModal('alert', {
          message: ` 신규 사용자는 알을 선택해주세요.`,
          onConfirm: () => navigate('/selectEgg'),
        })
      } else {
        openModal('alert', {
          title: '에러',
          message: errMsg || '알 수 없는 오류',
        })
      }
    }
  }

  return (
    <>
      <GlobalStyle />
      <Bg>
        <BackgroundVideo autoPlay muted loop>
          <source src={bgVideo} type="video/mp4" />
        </BackgroundVideo>

        <BaseContainer
          style={{
            backgroundColor: '#ffffffb9',
            width: '40%',
            maxWidth: '700px',
            minWidth: isMobile ? '280px' : '360px',
            display: 'flex',
            justifyContent: 'center',
            padding: isMobile ? '1.5rem' : '2rem',
            position: 'relative',
            paddingTop: '6rem',
          }}
        >
          <Logo />

          <LoginContainer
            style={{
              marginTop: isMobile ? '100px' : '160px',
            }}
          >
            <Label>EMAIL</Label>
            <BaseInput
              type="email"
              placeholder="progmong@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label>PASSWORD</Label>
            <BaseInput
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <BaseButton variant="secondary" onClick={handleLogin} style={{ marginTop: '15px' }}>
              LOGIN
            </BaseButton>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <StyleLink to="/findpwd">비밀번호 찾기</StyleLink>
              <StyleLink to="/register">회원가입</StyleLink>
            </div>
          </LoginContainer>
        </BaseContainer>
      </Bg>
    </>
  )
}

export default Login
