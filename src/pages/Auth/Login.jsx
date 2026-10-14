import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import logo from '../../assets/progmong-logo.webp'
import BaseButton from '../../components/BaseButton'
import BaseInput from '../../components/BaseInput/'
import BaseContainer from '../../components/BaseContainer'
import useAuthApi from '../../constants/auth'
import { useModal } from '@/context/ModalContext'
import { useAuth } from '../../constants/AuthContext'
import { IS_DEMO, DEMO_ACCOUNT } from '../../constants/demo'
import { toast } from 'react-toastify'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    font-family: 'Binggrae';
  }
`
const introBackground = new URL('../../assets/background-img1.webp', import.meta.url).href

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

// JWT 디코딩 함수
const decodeJWT = (token) => {
  try {
    if (!token) return null
    const rawToken = token.includes(' ') ? token.split(' ')[1] : token
    const base64Url = rawToken.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join(''),
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('JWT 디코딩 실패:', error)
    return null
  }
}

const Login = () => {
  const { login, checkPet } = useAuthApi()
  const { openModal } = useModal()
  const navigate = useNavigate()
  const { dispatch } = useAuth()
  const [email, setEmail] = useState(IS_DEMO ? DEMO_ACCOUNT.email : '')
  const [password, setPassword] = useState(IS_DEMO ? DEMO_ACCOUNT.password : '')

  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  })

  const handleLogin = async () => {
    // 데모 모드에서는 빈 칸이어도 체험 계정으로 로그인
    const loginEmail = email || (IS_DEMO ? DEMO_ACCOUNT.email : '')
    const loginPassword = password || (IS_DEMO ? DEMO_ACCOUNT.password : '')

    if (!loginEmail || !loginPassword) {
      openModal('alert', { title: '로그인 오류', message: '아이디 또는 비밀번호를 입력하세요.' })
      return
    }
    try {
      const response = await login(loginEmail, loginPassword)
      const accessToken = response.data.data.accessToken

      if (!accessToken) {
        openModal('alert', { message: `${response.data.message}` })
        return
      }

      localStorage.setItem('accessToken', accessToken)

      // 펫 보유 여부를 먼저 확인한 뒤 로그인 상태로 전환해야
      // PublicRoute의 /main 리다이렉트와 /selectEgg 이동이 겹치지 않음
      const res = await checkPet()
      const hasPet = res.data.message !== '사용자 펫 정보가 없습니다.'

      // 유저 정보 디코딩 후 전역 상태에 저장
      const userInfo = decodeJWT(accessToken)
      if (userInfo) {
        dispatch({ type: 'LOGIN', payload: userInfo })
      }

      if (hasPet) {
        toast.success(response.data.message)
        navigate('/main', { replace: true })
      } else {
        toast.info('신규 사용자는 알을 선택해주세요.')
        navigate('/selectEgg', { replace: true })
      }
    } catch (error) {
      console.error(error)
      openModal('alert', { message: `${error.response?.data?.message || '로그인 실패'}` })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin()
  }

  return (
    <>
      <GlobalStyle />
      <Background>
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
            as="form"
            onSubmit={handleSubmit}
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

            {IS_DEMO && (
              <div
                style={{
                  backgroundColor: '#fff0f0',
                  color: '#e53e3e',
                  border: '1px solid #fc8181',
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  marginTop: '15px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(252, 129, 129, 0.2)',
                }}
              >
                포트폴리오 체험 모드
                <br />
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 'normal',
                    color: '#c53030',
                    display: 'inline-block',
                    marginTop: '4px',
                  }}
                >
                  체험 계정이 채워져 있어요. <b>LOGIN</b>만 누르세요!
                  <br />
                  (아무 이메일/비밀번호를 입력해도 접속됩니다)
                </span>
              </div>
            )}

            <BaseButton $variant="secondary" type="submit" style={{ marginTop: '15px' }}>
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
      </Background>
    </>
  )
}

export default Login
