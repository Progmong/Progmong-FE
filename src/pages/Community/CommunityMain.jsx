import styled from 'styled-components'
import { useEffect, useState } from 'react'

import BaseContainer from '../../components/BaseContainer'
import useCommnunityApi from '../../Services/Community'
import FreePostEle from './FreePostEle'

import BaseButton from '@/components/BaseButton'

const MainBox = styled.div`
  width: 100%;
  background-color: #fff9ed;
`

const CateContainer = styled.div`
  padding-left: 60px;
  display: flex;
  padding-top: 20px;
  color: #543f25;
`

const CateBox = styled.div`
  display: inline-block;
  font-size: 48px;
  font-weight: 700;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 5px 50px 5px 50px;
  background-color: #ffd8af;
`

const HomeBox = styled.div`
  width: 100% - 30px;
  height: 100%;
  background-color: #ffd8af;
  border: 2px solid #d3a76b;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  padding: 30px 30px 0px 30px;
  display: flex;
`

const BoardContainer = styled.div`
  flex-grow: 1;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 25px;
`

const CompContainer = styled.div``

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
      <CateContainer>
        <CateBox>알고리즘</CateBox>
        <CateBox style={{ backgroundColor: '#FFBF9D' }}>자랑하기</CateBox>
        <CateBox style={{ backgroundColor: '#FFBF9D' }}>자유글</CateBox>
      </CateContainer>

      <HomeBox>
        <BoardContainer>
          <ListContainer>
            {posts.map((post) => (
              <FreePostEle key={post.id} post={post} />
            ))}
          </ListContainer>
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
