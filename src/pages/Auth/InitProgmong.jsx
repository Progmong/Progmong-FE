import styled, { createGlobalStyle } from 'styled-components'
import bgImage from '../../assets/bg-img.gif'
import { Link } from 'react-router-dom'
import BaseButton from '../../components/BaseButton'
import EggImg1 from '../../assets/egg1.png'

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
const Egg1 = styled.div`
  background-image: url(${EggImg1});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  max-width: 200px;
  aspect-ratio: 1 / 1; /* 정사각형 비율 유지 */
  margin: 0 auto;
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
    0 5px #00000080;
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
  text-align: center;

  &::placeholder {
    text-align: center;
  }
  &:focus::placeholder {
    opacity: 0;
  }
`

const InitProgmong = () => {
  return (
    <>
      <GlobalStyle />
      <Bg>
        <MainContainer>
          <Title>Choice Eggmong</Title>
          <LoginContainer>
            <div
              style={{
                width: '100%',
                backgroundColor: '#fffeffb3',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 3px #d1d8ffb3,0 5px #6b0300b3',
                marginBottom: '30px',
              }}
            >
              <Egg1 />
            </div>
            <Input type="text" placeholder="프로그몽의 이름을 지어주세요" />
            <BaseButton>결정</BaseButton>
          </LoginContainer>
        </MainContainer>
      </Bg>
    </>
  )
}

export default InitProgmong
