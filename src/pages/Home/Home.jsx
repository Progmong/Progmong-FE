import styled from 'styled-components'
import mainImage from '../../assets/main.png'
import community from '../../assets/shop.png'
import house from '../../assets/house.png'
import cave from '../../assets/cave.png'
import progmong from '../../assets/progmong.png'
import bubble from '../../assets/tbubble.svg'
import thoughtbubble from '../../assets/ttbubble.png'
import { Link } from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ImageWrapper = styled.div`
  position: fixed;
  width: 1440px; /* ✅ 원본 이미지 크기 고정 */
  height: 1024px;
`

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`

const FixedIcon = styled.img`
  position: absolute;
  cursor: pointer;
`
const BubbleBox = styled.div`
  position: absolute;
  left: 45%;
  top: 34%; /* 여기서 조정하면 됨 */
  width: 420px;
  height: 420px;

  z-index: 2;

  background: url(${thoughtbubble}) no-repeat center center;
  background-size: contain;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px 50px 100px 30px;
  box-sizing: border-box;

  text-align: center;
  color: black;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.5;
  word-break: keep-all;
`

// % 좌표는 배경 이미지 내 위치 기준
const Home = () => {
  return (
    <Container>
      <ImageWrapper>
        <BackgroundImage src={mainImage} />
        <BubbleBox>오늘은 어떤 모험을 떠날까</BubbleBox>
        <Link to="/page1">
          <FixedIcon
            src={community}
            width="380px"
            style={{ left: '16.7%', top: '11%' }} // 214px / 1280px, 80px / 720px
          />
        </Link>
        <Link to="/page2">
          <FixedIcon
            src={house}
            width="415px"
            style={{ left: '70.3%', top: '7.9%' }} // 900px / 1280px, etc.
          />
        </Link>
        <Link to="/page3">
          <FixedIcon src={cave} width="373px" style={{ left: '12%', top: '63%' }} />
        </Link>
        <Link to="/page4">
          <FixedIcon src={progmong} width="303px" style={{ left: '72%', top: '59%' }} />
        </Link>
      </ImageWrapper>
    </Container>
  )
}

export default Home
