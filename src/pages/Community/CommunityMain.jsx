import styled from 'styled-components'

import BaseContainer from '../../components/BaseContainer'
import useCommnunityApi from '../../Services/Community'

const MainBox = styled.div`
  height: 100vh;
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

const ListContainer = styled.div``

const CommunityMain = () => {
  const communityApi = useCommnunityApi()

  const fetchData = async () => {
    try {
      const res = await communityApi()
      console.log(res.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  fetchData()

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
            <BaseContainer></BaseContainer>
          </ListContainer>
        </BoardContainer>
      </HomeBox>
    </MainBox>
  )
}
export default CommunityMain
