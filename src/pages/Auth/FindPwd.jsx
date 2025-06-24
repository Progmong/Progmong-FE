import styled, { createGlobalStyle } from 'styled-components'
import bgImage from '../../assets/background-img1.png'
import { Link } from 'react-router-dom'
import BaseButton from '../../components/BaseButton'
import useAuthApi from '../../constants/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    font-family: 'NEXON Bazzi Code', 'Comic Sans MS';
  }
  @font-face {
    font-family: 'NEXON Bazzi Code';
    src: url('../assets/Bazzi.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`

const Bg = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MainContainer = styled.div`
  width: 50%;
  background-color: #fffeffb3;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow:
    0 3px #d1d8ffb3,
    0 5px #6b0300b3;
`

const Title = styled.h1`
  text-align: center;
  font-size: 50px;
`

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 100px;
`

const Label = styled.label`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 8px;
`

const Input = styled.input`
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 30px;
  font-size: 20px;
  border-style: none;
  outline: none;
  box-shadow:
    0 3px #d1d8ffb3,
    0 5px #bfa385b3;
  background-color: white;
`

const FindPwd = () => {
  const { sendResetEmail, verifyResetEmail } = useAuthApi()
  const [step, setStep] = useState('email') // 'email' | 'code' | 'done'
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const navigate = useNavigate()

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
        <MainContainer>
          <Title>비밀번호 찾기</Title>
          <LoginContainer>
            {step === 'email' && (
              <>
                <Label>이메일</Label>
                <Input
                  type="email"
                  placeholder="progmong@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <BaseButton onClick={handleSendEmail}>이메일 인증</BaseButton>
              </>
            )}

            {step === 'code' && (
              <>
                <Label>인증 코드</Label>
                <Input
                  type="text"
                  placeholder="이메일로 받은 인증 코드를 입력하세요"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <Label>새 비밀번호</Label>
                <Input
                  type="password"
                  placeholder="새 비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Label>비밀번호 확인</Label>
                <Input
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                />
                <BaseButton onClick={handleVerifyCodeAndChangePwd}>비밀번호 변경</BaseButton>
              </>
            )}

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
          </LoginContainer>
        </MainContainer>
      </Bg>
    </>
  )
}

export default FindPwd
