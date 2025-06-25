import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import bgImage from '../../assets/background-img1.png'
import bgVideo from '../../assets/bg-video.mp4'

import BaseButton from '../../components/BaseButton'
import BaseInput from '../../components/BaseInput'
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
    src: url('../assets/Bazzi.woff') format('woff');
    font-weight: normal;
    font-style: normal;
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
  z-index: -1; /* 뒤로 보내기 */
`

const Title = styled.h1`
  text-align: center;
  font-size: 30px;
`
const LoginContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Label = styled.label`
  font-weight: bold;
  font-size: 18px;
`

const FindPwd = () => {
  const { sendResetEmail, verifyResetEmail } = useAuthApi()
  const [step, setStep] = useState('email') // 'email' | 'code' | 'done'
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const navigate = useNavigate()

  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  })

  const handleSendEmail = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.')
      return
    }
    try {
      await sendResetEmail(email)
      alert('인증 코드가 이메일로 전송되었습니다.')
      setStep('code')
    } catch (error) {
      console.error(error)
      alert('이메일 전송 실패')
    }
  }

  const handleVerifyCodeAndChangePwd = async () => {
    if (!code || !password || !confirmPwd) {
      alert('모든 항목을 입력해주세요.')
      return
    }
    if (password !== confirmPwd) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      await verifyResetEmail(code, password)
      alert('비밀번호가 변경되었습니다.')
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('비밀번호 변경 실패')
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
          }}
        >
          <LoginContainer>
            <Title>비밀번호 찾기</Title>

            {step === 'email' && (
              <>
                <Label>이메일</Label>
                <BaseInput
                  type="email"
                  placeholder="progmong@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <BaseButton
                  variant="secondary"
                  onClick={handleSendEmail}
                  style={{ marginTop: '15px' }}
                >
                  이메일 인증
                </BaseButton>
              </>
            )}

            {step === 'code' && (
              <>
                <Label>인증 코드</Label>
                <BaseInput
                  type="text"
                  placeholder="이메일로 받은 인증 코드를 입력하세요"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <Label>새 비밀번호</Label>
                <BaseInput
                  type="password"
                  placeholder="새 비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Label>비밀번호 확인</Label>
                <BaseInput
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                />
                <BaseButton
                  variant="secondary"
                  onClick={handleVerifyCodeAndChangePwd}
                  style={{ marginTop: '15px' }}
                >
                  비밀번호 변경
                </BaseButton>
              </>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: '#2c2c2c',
                  fontWeight: 'bold',
                  textAlign: 'right',
                }}
              >
                로그인
              </Link>
            </div>
          </LoginContainer>
        </BaseContainer>
      </Bg>
    </>
  )
}

export default FindPwd
