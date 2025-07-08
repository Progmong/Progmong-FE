import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import BaseContainer from '../../components/BaseContainer'
import useCommnunityApi from '@/constants/Community'
import FreePostEle from './FreePostEle'
import PostList from './PostList'

import BaseButton from '@/components/BaseButton'
import BackgroundImg from '@/assets/community/community_background5.png'

const MainBox = styled.div`
  /* background-color: #b4e0d9; */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* 백그라운드 이미지 선정 */
  background-image: url(${BackgroundImg});
  background-size: auto;
  background-repeat: repeat;
  background-attachment: fixed;
  overflow: hidden;
`

const BackBox = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  font-family: 'Binggrae';
  font-size: var(--font-size-xl);
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  cursor: pointer;

  transition: gap 0.3s ease;

  &:hover {
    gap: calc(var(--spacing-md) * 1.5);
  }
`

const CateContainer = styled.div`
  position: relative;
  padding-left: 60px;
  display: flex;
  padding-top: var(--spacing-md);
  color: #543f25;
`

const CateBox = styled.div`
  display: inline-block;
  font-size: var(--font-size-lg);
  font-weight: 700;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 5px 40px 5px 40px;
  background-color: #ffedb6;

  transition: transform ease 0.3s;

  &:hover {
    transform: translateY(-0.6rem);
  }
`

const CateText = styled.div`
  margin-bottom: 30px;
  &:hover {
    cursor: default;
  }
`

const HomeBox = styled.div`
  flex-grow: 1;
  /* width: calc(100% - 30px); */
  position: relative;
  background-color: var(--bg-community);
  border: 2px solid var(--bg-community-accent);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 10px 10px 0px 10px;
  display: flex;
  margin-top: -30px;

  z-index: 1; // 카테고리 길어진거 가리기 위해 삽입
`

const BoardContainer = styled.div`
  flex-grow: 1;
  background-color: var(--bg-community-post);
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 25px;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const BottomContainer = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

const WriteButtonContainer = styled.div`
  display: inline-block;
  text-align: end;
`

const CommunityMain = () => {
  const { all, categoryAll } = useCommnunityApi()

  const { category, postId } = useParams()

  const [posts, setPosts] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!postId) {
          const res = await categoryAll(category)
          console.log(res.data.data)
          setPosts(res.data.data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [category, postId])

  const onCateClick = (selectedCate) => {
    switch (selectedCate) {
      case '알고리즘':
        console.log(selectedCate)
        if (category === selectedCate) {
          navigate('/community/알고리즘', { replace: true })
        } else {
          navigate('/community/알고리즘')
        }
        break
      case '자유글':
        console.log(selectedCate)
        if (category === selectedCate) {
          navigate('/community/자유글', { replace: true })
        } else {
          navigate('/community/자유글')
        }
        break
    }
  }

  return (
    <MainBox>
      <BackBox>
        <IconMdiKeyboardBackspace />
        <div>메인으로</div>
      </BackBox>
      <CateContainer>
        <CateBox
          onClick={() => onCateClick('알고리즘')}
          style={
            category === '알고리즘'
              ? { backgroundColor: '#ffd48b' }
              : { backgroundColor: '#ffedb6' }
          }
        >
          <CateText>알고리즘</CateText>
        </CateBox>
        {/* <CateBox>
          <CateText>자랑하기</CateText>
        </CateBox> */}
        <CateBox
          onClick={() => onCateClick('자유글')}
          style={
            category === '자유글' ? { backgroundColor: '#ffd48b' } : { backgroundColor: '#ffedb6' }
          }
        >
          <CateText>자유글</CateText>
        </CateBox>
      </CateContainer>

      <HomeBox>
        <BoardContainer>
          <Outlet context={{ posts: posts }} />
        </BoardContainer>
      </HomeBox>
    </MainBox>
  )
}
export default CommunityMain
