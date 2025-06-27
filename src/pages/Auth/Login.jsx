import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import logo from '../../assets/progmong-logo.png'
import bgImage from '../../assets/bg-img.gif'
import bgVideo from '../../assets/bg-video.mp4'
import BaseButton from '../../components/BaseButton'
import BaseInput from '../../components/BaseInput/'
import BaseContainer from '../../components/BaseContainer'
import useAuthApi from '../../constants/auth'
import { useMediaQuery } from 'react-responsive'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
  /* font-family: 'NEXON Bazzi Code', 'Comic Sans MS'; */
  font-family: 'Binggrae';
      

  }
  @font-face {
  font-family: 'NEXON Bazzi Code';
  src: url('../../assets/Bazzi.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
`

// const Bg = styled.div`
//   height: 100vh; /* 화면 전체 높이 */
//   width: 100%; /* 가로 100% */
//   background-image: url(${bgVideo});
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: cover;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `
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
  z-index: -1; /* 뒤로 보내기 */
`

const Logo = styled.div`
  position: absolute;
  top: -200px;
  width: 500px;
  height: 500px;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 2;

  /* 강렬한 효과 */
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

// const MainContainer = styled.div`
//   width: 50%;
//   background-color: #fffeffb3; /* 배경만 투명 */
//   border-radius: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   box-shadow:
//     0 3px #d1d8ffb3,
//     0 5px #6b0300b3;
// `
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
// const Input = styled.input`
//   border-radius: 20px;
//   padding: 15px;
//   margin-bottom: 30px;
//   font-size: 20px;
//   border-style: none;
//   outline: none;
//   box-shadow:
//     0 3px #d1d8ffb3,
//     0 5px #bfa385b3;
//   background-color: white;
// `

const Login = () => {
  const { login } = useAuthApi()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  })

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일 또는 비밀번호를 입력하세요.')
      return
    }
    try {
      const response = await login(email, password)
      const accessToken = response.data.data.accessToken
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken) // 토큰 저장
        alert('로그인 성공')
      } else {
        alert('액세스 토큰이 응답에 없습니다.')
      }
    } catch (error) {
      console.error(error)
      alert('로그인 실패')
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
            minWidth: isMobile ? '280px' : '360px',
            display: 'flex',
            justifyContent: 'center',
            padding: isMobile ? '1.5rem' : '2rem',
            position: 'relative', // 중요: 자식 absolute 기준이 됨
            paddingTop: '6rem', // 로고 겹침 여유 공간 확보
          }}
        >
          <Logo />
          <LoginContainer style={{ marginTop: '100px' }}>
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
