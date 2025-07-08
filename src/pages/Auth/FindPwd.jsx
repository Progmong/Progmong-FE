import styled, { createGlobalStyle } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import bgVideo from '../../assets/bg-video.mp4'

import BaseButton from '../../components/BaseButton'
import BaseInput from '../../components/BaseInput'
import BaseContainer from '../../components/BaseContainer'
import useAuthApi from '../../constants/auth'
import { useMediaQuery } from 'react-responsive'
import { useModal } from '@/context/ModalContext'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    font-family: 'Binggrae';
  }
`

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
const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
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
const StyleLink = styled(Link)`
  text-decoration: none;
  color: #2c2c2c;
  font-weight: bold;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`

const FindPwd = () => {
  const { sendResetEmail, verifyResetEmail } = useAuthApi()
  const [step, setStep] = useState('email') // 'email' | 'code' | 'done'
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [isEmailSending, setIsEmailSending] = useState(false) // 버튼 잠금 상태
  const { openModal } = useModal()

  const navigate = useNavigate()

  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  })

  const handleSendEmail = async () => {
    if (!email) {
      openModal('alert', { message: '이메일을 입력해주세요.' })
      return
    }
    try {
      setIsEmailSending(true)
      const res = await sendResetEmail(email)
      console.log(res)
      openModal('alert', {
        message: `${res.data.message}`,
      })
      setStep('code')
    } catch (error) {
      openModal('alert', {
        message: `${error.response.data.message}`,
      })
    } finally {
      setIsEmailSending(false)
    }
  }

  const handleVerifyCodeAndChangePwd = async () => {
    if (!code || !password || !confirmPwd) {
      openModal('alert', { message: '모든 항목을 입력해주세요.' })
      return
    }
    if (password !== confirmPwd) {
      openModal('alert', { message: '비밀번호가 일치하지 않습니다.' })
      return
    }

    try {
      const res = await verifyResetEmail(code, password)
      openModal('alert', { message: `${res.data.message}` })
      navigate('/')
    } catch (error) {
      console.error(error)
      openModal('alert', { message: `${error.response.data.message}` })
    }
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
            position: 'relative', // 중요: 자식 absolute 기준이 됨
            paddingTop: '2rem', // 로고 겹침 여유 공간 확보
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
                  $variant="secondary"
                  onClick={handleSendEmail}
                  style={{ marginTop: '15px' }}
                  disabled={isEmailSending}
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
                  $variant="secondary"
                  onClick={handleVerifyCodeAndChangePwd}
                  style={{ marginTop: '15px' }}
                >
                  비밀번호 변경
                </BaseButton>
              </>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <StyleLink
                to="/"
                style={{
                  textDecoration: 'none',
                  color: '#2c2c2c',
                  fontWeight: 'bold',
                  textAlign: 'right',
                }}
              >
                로그인
              </StyleLink>
            </div>
          </LoginContainer>
        </BaseContainer>
      </Background>
    </>
  )
}

export default FindPwd
