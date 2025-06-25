import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import BaseContainer from '../../../components/BaseContainer'
import BaseButton from '../../../components/BaseButton'

const fightBackground = new URL('../../../assets/fight.png', import.meta.url).href

const Background = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(${fightBackground}) no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  // overflow: hidden;
`

const CustomContainer = styled(BaseContainer)`
  width: 988.69px;
  height: 784px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // opacity: 0.7; //자식에게 영향줌
  background-color: rgba(255, 255, 255, 0.7);
`

const Title = styled.h2`
  font-size: 48px;
  font-family: 'Binggrae';
  font-weight: 700;
  margin-bottom: 7rem;
  color: #051d2f;
`

const FontBox = styled.div`
  font-size: 48px;
  font-family: 'Binggrae';
  font-weight: 700;
  color: #0a3047;
  margin-bottom: 4rem;
`

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px; /* 행 간 간격 */
  align-items: center;
  padding: 10px 9px; /* 위아래 10px, 좌우 9px */
  margin-bottom: 8rem;
`

const Row = styled.div`
  display: flex;
  gap: 30px; /* 버튼 간 간격 */
`

const TagButton = styled.button`
  width: 105px;
  height: 50px;
  background-color: ${({ selected }) => (selected ? '#1C445C' : '#ffffff')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#000000')};
  font-family: 'Binggrae';
  font-weight: 700;
  border: none;
  border-radius: 21px;
  /* Drop shadow */
  box-shadow: 0 4.5px 0 rgba(74, 74, 74, 0.4);
  cursor: pointer;
`

const CustomButton = styled(BaseButton)`
  width: 185.46px;
  height: 54.24px;
  font-size: 20px;
`
const TAGS = {
  1: '수학',
  2: '구현',
  3: '그리디',
  4: '문자열',
  5: '자료구조',
  6: '그래프',
  7: 'DP',
  8: '기하학',
}

const ExploreTagSelect = () => {
  const [selectedTags, setSelectedTags] = useState(new Set())

  useEffect(() => {
    // const token = localStorage.getItem('accessToken')

    //하드코딩으로 테스트
    const token =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwiZXhwIjoxNzUwNzU4NDQ4fQ.aWcvqyvcwtDMMu7B2Uh4wg56vYMkaob-o4XJ8lAK8N6UqF8vLNUaFScx-54WVdF84jg1hjJ8HZWfhQOM9pMNNQ'

    if (!token) {
      console.warn('🚫 accessToken이 없습니다. 로그인 먼저 하세요.')
      return
    }

    axios
      .get('http://localhost:8100/api/v1/tag', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const tagIds = res.data.data.map((tag) => tag.id)
        setSelectedTags(new Set(tagIds))
      })
      .catch((err) => {
        console.error('❌ 관심 태그 불러오기 실패:', err)
      })
  }, [])

  const toggleTag = (id) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleSubmit = () => {
    const selectedArray = Array.from(selectedTags) // 선택된 태그 id 배열

    const token = localStorage.getItem('accessToken')

    //하드코딩으로 테스트
    //const token =
    //  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwiZXhwIjoxNzUwNzU4NDQ4fQ.aWcvqyvcwtDMMu7B2Uh4wg56vYMkaob-o4XJ8lAK8N6UqF8vLNUaFScx-54WVdF84jg1hjJ8HZWfhQOM9pMNNQ'

    axios
      .put(
        'http://localhost:8100/api/v1/tag',
        {
          tagIds: selectedArray, // ✅ userId 제거
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ 인증 헤더 넣기
          },
        },
      )
      .then((res) => {
        alert('관심 태그가 성공적으로 갱신되었습니다!')
      })
      .catch((err) => {
        alert('갱신 중 오류가 발생했습니다.')
        console.error(err)
      })
  }

  return (
    <Background>
      <CustomContainer>
        <Title>전투 준비중...</Title>
        <FontBox>태그 선택</FontBox>

        <BtnContainer>
          <Row>
            {[1, 2, 3].map((id) => (
              <TagButton key={id} selected={selectedTags.has(id)} onClick={() => toggleTag(id)}>
                {TAGS[id]}
              </TagButton>
            ))}
          </Row>
          <Row>
            {[4, 5, 6].map((id) => (
              <TagButton key={id} selected={selectedTags.has(id)} onClick={() => toggleTag(id)}>
                {TAGS[id]}
              </TagButton>
            ))}
          </Row>
          <Row style={{ justifyContent: 'center' }}>
            {[7, 8].map((id) => (
              <TagButton key={id} selected={selectedTags.has(id)} onClick={() => toggleTag(id)}>
                {TAGS[id]}
              </TagButton>
            ))}
          </Row>
        </BtnContainer>

        <CustomButton variant="secondary" size="sm" onClick={handleSubmit}>
          전투 개시
        </CustomButton>
      </CustomContainer>
    </Background>
  )
}

export default ExploreTagSelect
