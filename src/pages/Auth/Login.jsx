import styled, { createGlobalStyle } from 'styled-components'
import bgImage from '../../assets/bg-img.gif'
import { Link } from 'react-router-dom'
import BaseButton from '../../components/BaseButton'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
  font-family: 'NEXON Bazzi Code', 'Comic Sans MS';

      

  }
  @font-face {
  font-family: 'NEXON Bazzi Code';
  src: url('../../assets/Bazzi.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
`

const Bg = styled.div`
  height: 100vh; /* 화면 전체 높이 */
  width: 100%; /* 가로 100% */
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
  background-color: #fffeffb3; /* 배경만 투명 */
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

const Login = () => {
  return (
    <>
      <GlobalStyle />
      <Bg>
        <MainContainer>
          <Title>PROGMONG</Title>
          <LoginContainer>
            <Label>EMAIL</Label>
            <Input type="email" placeholder="progmong@example.com" />
            <Label>PASSWORD</Label>
            <Input type="password" placeholder="비밀번호를 입력하세요" />
            <BaseButton>LOGIN</BaseButton>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#2c2c2c',
                fontWeight: 'bold',
              }}
            >
              <Link
                to="/findpwd"
                style={{ textDecoration: 'none', color: '#2c2c2c', fontWeight: 'bold' }}
              >
                비밀번호 찾기
              </Link>
              <Link
                to="/register"
                style={{ textDecoration: 'none', color: '#2c2c2c', fontWeight: 'bold' }}
              >
                회원가입
              </Link>
            </div>
          </LoginContainer>
        </MainContainer>
      </Bg>
    </>
  )
}

export default Login
