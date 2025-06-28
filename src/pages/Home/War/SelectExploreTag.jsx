import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from '../../../constants/axiosInstance'
import BaseContainer from '../../../components/BaseContainer'
import BaseButton from '../../../components/BaseButton'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

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
  overflow: hidden;
`

const CustomContainer = styled(BaseContainer)`
  width: 50vw;
  max-width: 988.69px;
  aspect-ratio: 988.69 / 784;
  background-color: rgba(255, 255, 255, 0.7);
  width: 50vw; // 🔽 크기 줄임
  max-width: 988.69px; // ✅ 원래 최대 너비 유지
  aspect-ratio: 988.69 / 784; // ✅ 원래 비율 유지
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3vh 4vw; // 🔹 위아래, 좌우 여백 추가
  box-sizing: border-box; // 🔹 패딩 포함한 전체 너비로 계산
`

const Title = styled.h2`
  font-size: clamp(20px, 3vw, 36px);
  font-family: 'Binggrae';
  font-weight: 700;
  margin-bottom: 8vh;
  color: #051d2f;
`

const FontBox = styled.div`
  font-size: clamp(18px, 2.5vw, 32px);
  font-family: 'Binggrae';
  font-weight: 700;
  color: #0a3047;
  margin-bottom: 6vh;
`

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vh;
  align-items: center;
  margin-bottom: 8vh;
`

const Row = styled.div`
  display: flex;
  gap: 2vw;
  justify-content: center;
  flex-wrap: wrap;
`

const TagButton = styled.button`
  width: min(20vw, 105px);
  height: min(7vh, 49px);
  background-color: ${({ selected }) => (selected ? '#1C445C' : '#ffffff')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#000000')};
  font-family: 'Binggrae';
  font-weight: 700;
  font-size: calc(11px + 0.5vw);
  border: none;
  border-radius: 21px;
  box-shadow: 0 4.5px 0 rgba(74, 74, 74, 0.4);
  cursor: pointer;
`

const CustomButton = styled(BaseButton)`
  width: min(30vw, 178px);
  height: min(7vh, 50px);
  font-size: calc(12px + 0.4vw);
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
  const location = useLocation() // ✅ 함수 내부에서 선언
  const navigate = useNavigate()
  const [selectedTags, setSelectedTags] = useState(new Set())
  const { minLevel, maxLevel } = location.state || {}

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      console.warn('🚫 accessToken이 없습니다. 로그인 먼저 하세요.')
      return
    }

    axios
      .get('/tag', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const tagIds = res.data.data.map((tag) => tag.id)
        setSelectedTags(new Set(tagIds))
      })
      .catch((err) => {
        console.error('❌ 관심 태그 불러오기 실패:', err)``
      })
  }, [])

  const startExplore = async (minLevel, maxLevel, token) => {
    try {
      const res = await axios.post(
        'http://localhost:8100/api/v1/explore',
        { minLevel, maxLevel },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      const problems = res.data.data.recommendProblems
      const totalExp = res.data.data.totalExp

      // ✅ 다음 페이지로 이동 (useNavigate 사용)
      navigate('/explore/')
    } catch (err) {
      console.error('❌ 탐험 시작 실패:', err)
      const errorMessage = err?.response?.data?.message
      console.log('에러메시지 : ', errorMessage)

      switch (errorMessage) {
        case '이미 추천 문제가 있습니다':
          toast.info('이미 진행 중인 탐험이 있어요!')
          navigate('/explore') // 기존 탐험으로 이동
          break

        case '추천할 문제가 없습니다.':
          toast.info(
            <>
              조건에 맞는 문제가 없어요. <br />
              태그를 다시 설정해주세요.
            </>,
          )
          break

        default:
          toast.error(errorMessage || '알 수 없는 오류가 발생했어요.')
      }
    }
  }
  const toggleTag = (id) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return newSet
    })
  }

  const handleSubmit = () => {
    const selectedArray = Array.from(selectedTags)
    const token = localStorage.getItem('accessToken')

    axios
      .put(
        '/tag',
        {
          tagIds: selectedArray, // ✅ userId 제거
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        startExplore(minLevel, maxLevel, token)
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
          <Row>
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
