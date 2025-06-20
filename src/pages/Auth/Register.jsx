import styled, { createGlobalStyle } from 'styled-components'
import bgImage from '../../assets/background-img1.png'
import { Link } from 'react-router-dom'
import BaseButton from '../../components/BaseButton'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
  font-family: 'NEXON Bazzi Code', 'Comic Sans MS';

      

  }
  @font-face {
  font-family: 'NEXON Bazzi Code';
  src: url('../assets/Bazzi.woff') format('woff2');
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
const ButtonWrapper = styled.div`
  border: 3px solid #fcfcfc;
  border-radius: 7px;
  margin: 30px 0 10px 0;
  background-color: #880800;
  padding-bottom: 6px;
  overflow: hidden;
`

const Button = styled.button`
  width: 100%;
  padding: 20px;
  border-radius: 0 0 7px 7px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  border-style: none;
  background-color: #fd3b40;
  color: white;
`

const Register = () => {
  return (
    <>
      <GlobalStyle />
      <Bg>
        <MainContainer>
          <LoginContainer>
            <Label>닉네임 입력</Label>
            <Input type="text" placeholder="닉네임"></Input>
            <Label>새 비밀번호</Label>
            <Input type="password" placeholder="새 비밀번호"></Input>

            <Label>새 비밀번호 확인</Label>
            <Input type="password" placeholder="새 비밀번호 확인"></Input>
            <BaseButton>회원가입</BaseButton>
          </LoginContainer>
        </MainContainer>
      </Bg>
    </>
  )
}

export default Register
