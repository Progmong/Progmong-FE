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

const Register = () => {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const { sendEmail, verifyEmail, register, generateBojCode, verifyBojCode } = useAuthApi()
  const [code, setCode] = useState('')
  const [bojCode, setBojCode] = useState('')
  const [step, setStep] = useState('boj')
  const [bojId, setBojId] = useState('')
  const navigate = useNavigate()
  const [isEmailSending, setIsEmailSending] = useState(false) // 버튼 잠금 상태

  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  })

  const handleGenerateBojCode = async () => {
    if (!bojId) {
      alert('아이디를 입력해주세요.')
      return
    }
    try {
      const res = await generateBojCode(bojId)
      const code = res.data.verificationCode
      setBojCode(code)
      setStep('boj_verify')
    } catch (err) {
      if (err.response.data === '이미 인증된 사용자입니다.') {
        alert(err.response.data)
      } else {
        alert('인증코드 생성 실패')
      }
    }
  }

  const handleVerifyBojCode = async () => {
    try {
      const res = await verifyBojCode(bojId)
      if (res.data.verified) {
        alert('인증 성공')
        setStep('email')
      }
    } catch (error) {
      alert(error.response.data)
    }
  }

  const handleSendEmail = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.')
      return
    }

    try {
      setIsEmailSending(true)
      await sendEmail(email)
      alert('인증 코드가 해당 이메일로 전송되었습니다.')
      setStep('code')
    } catch (error) {
      alert('서버 오류로 이메일을 전송하지 못했습니다.')
    } finally {
      setIsEmailSending(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!code) {
      alert('인증 코드를 입력해주세요.')
      return
    }
    try {
      await verifyEmail(code)
      alert('인증 완료')
      setStep('register')
    } catch (error) {
      alert('서버 오류')
    }
  }

  const handleRegister = async () => {
    if (!email || !password || !confirmPwd) {
      alert('모든 항목을 입력해주세요.')
      return
    }
    if (password !== confirmPwd) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    try {
      await register(email, bojId, nickname, password)
      alert('회원가입 완료')
      navigate('/') // 로그인 페이지로 이동
    } catch (error) {
      alert(error.response.data.message)
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
            {step === 'boj' ? (
              <>
                <Title>Solved.ac 인증</Title>
                <Label>solved.ac 아이디</Label>
                <BaseInput
                  type="text"
                  placeholder="solved.ac 아이디"
                  value={bojId}
                  onChange={(e) => setBojId(e.target.value)}
                />
                <BaseButton
                  variant="secondary"
                  onClick={handleGenerateBojCode}
                  style={{ marginTop: '15px' }}
                >
                  인증코드 생성
                </BaseButton>
              </>
            ) : step === 'boj_verify' ? (
              <>
                <Title>인증 코드 검증</Title>
                <p style={{ textAlign: 'center' }}>
                  아래 코드를 solved.ac 자기소개에 붙여넣은 후, 인증 확인 버튼을 눌러주세요.
                </p>
                <code
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    margin: '1rem 0',
                    backgroundColor: '#eee',
                    padding: '1rem',
                    borderRadius: '10px',
                  }}
                >
                  {bojCode}
                </code>

                <BaseButton
                  variant="secondary"
                  onClick={handleVerifyBojCode}
                  style={{ marginTop: '15px' }}
                >
                  인증 확인
                </BaseButton>
              </>
            ) : step === 'email' ? (
              <>
                <Title>이메일 인증</Title>
                <Label>이메일</Label>
                <BaseInput
                  type="email"
                  placeholder="progmong@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    margin: '1rem 0',
                  }}
                />
                <BaseButton
                  variant="secondary"
                  onClick={handleSendEmail}
                  style={{ marginTop: '15px' }}
                  disabled={isEmailSending}
                >
                  이메일 인증
                </BaseButton>
              </>
            ) : step === 'code' ? (
              <>
                <Title>코드 인증</Title>
                <Label>인증코드</Label>
                <BaseInput
                  type="text"
                  placeholder="인증코드 입력"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <BaseButton
                  variant="secondary"
                  onClick={handleVerifyCode}
                  style={{ marginTop: '15px' }}
                >
                  코드 확인
                </BaseButton>
              </>
            ) : (
              <>
                <Title>회원가입</Title>
                {/* <Label>EMAIL</Label>
                <BaseInput type="email" placeholder="email" value={email} disabled />

                <Label>Solved.ac 아이디</Label>
                <BaseInput type="text" placeholder="solved.ac 아이디" value={bojId} disabled /> */}
                <Label>닉네임</Label>
                <BaseInput
                  type="text"
                  placeholder="닉네임"
                  value={nickname}
                  onChange={(e) => {
                    const input = e.target.value
                    if (input.length <= 12) {
                      setNickname(input)
                    } else {
                      alert('닉네임 12자 초과')
                    }
                  }}
                />
                <Label>비밀번호</Label>
                <BaseInput
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Label>비밀번호 확인</Label>
                <BaseInput
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                />
                <BaseButton
                  variant="secondary"
                  onClick={handleRegister}
                  style={{ marginTop: '15px' }}
                >
                  가입
                </BaseButton>
              </>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: step === 'boj_verify' ? 'space-between' : 'flex-end',
              }}
            >
              {step === 'boj_verify' && (
                <StyleLink
                  to={`https://solved.ac/profile/${bojId}`}
                  target="_blank"
                  style={{
                    textDecoration: 'none',
                    color: '#2c2c2c',
                    fontWeight: 'bold',
                  }}
                >
                  Solved.ac 프로필 바로가기
                </StyleLink>
              )}
              <StyleLink
                to={'/'}
                style={{
                  textDecoration: 'none',
                  color: '#2c2c2c',
                  fontWeight: 'bold',
                }}
              >
                로그인
              </StyleLink>
            </div>
          </LoginContainer>
        </BaseContainer>
      </Bg>
    </>
  )
}

export default Register
