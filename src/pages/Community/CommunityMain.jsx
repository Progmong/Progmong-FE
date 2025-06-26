import styled from 'styled-components'
import { useEffect, useState } from 'react'

import BaseContainer from '../../components/BaseContainer'
import useCommnunityApi from '../../Services/Community'
import FreePostEle from './FreePostEle'
import PostList from './PostList'

import BaseButton from '@/components/BaseButton'
import BackgroundImg from '@/assets/community/community_background3.png'

const MainBox = styled.div`
  /* background-color: #b4e0d9; */
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
  font-size: 2.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  cursor: pointer;
`

const CateContainer = styled.div`
  padding-left: 60px;
  display: flex;
  padding-top: 20px;
  color: #543f25;
`

const CateBox = styled.div`
  display: inline-block;
  font-size: 1.7rem;
  font-weight: 700;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 5px 50px 5px 50px;
  background-color: #ffedb6;
`

const HomeBox = styled.div`
  /* width: calc(100% - 30px); */
  height: 100%;
  background-color: #ffd48b;
  border: 2px solid #d3a76b;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  padding: 30px 30px 0px 30px;
  display: flex;
  min-height: 100vh;
`

const BoardContainer = styled.div`
  flex-grow: 1;
  background-color: white;
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
  const communityApi = useCommnunityApi()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await communityApi()
        console.log(res.data.data)
        setPosts(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  return (
    <MainBox>
      <BackBox>
        <IconMdiKeyboardBackspace />
        <div>메인으로</div>
      </BackBox>
      <CateContainer>
        <CateBox style={{ backgroundColor: '#ffd48b' }}>알고리즘</CateBox>
        <CateBox>자랑하기</CateBox>
        <CateBox>자유글</CateBox>
      </CateContainer>

      <HomeBox>
        <BoardContainer>
          <PostList posts={posts} />
          <BottomContainer>
            <div></div>
            <div></div>
            <WriteButtonContainer>
              <BaseButton>글쓰기</BaseButton>
            </WriteButtonContainer>
          </BottomContainer>
        </BoardContainer>
      </HomeBox>
    </MainBox>
  )
}
export default CommunityMain
