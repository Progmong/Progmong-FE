import React, { createContext, useContext, useEffect, useState } from 'react'
import AxiosInstance from '@/constants/axiosInstance.js'

// Mock 데이터
const mockData = {
  pet: {
    type: 2, // pet2
    stage: 3, // stage3
    name: '에라그몽프로그몽',
  },
  user: {
    nickname: '애라모르겠다',
    email: 'progmong@gmail.com',
    bjId: 'progmong',
  },
  interestTags: [1, 2, 5],
  message: '애라 모르겠다~!',
  exploreRecords: [
    {
      id: 1001,
      tier: 'Gold V',
      title: '부분 수열의 합',
      status: '성공',
    },
    {
      id: 2020,
      tier: 'Silver I',
      title: 'LCS',
      status: '패스',
    },
    {
      id: 3010,
      tier: 'Bronze II',
      title: 'DFS와 BFS',
      status: '성공',
    },
    {
      id: 4040,
      tier: 'Silver III',
      title: '토마토',
      status: '패스',
    },
    {
      id: 5050,
      tier: 'Gold IV',
      title: '다익스트라',
      status: '성공',
    },
  ],
}

// Context 생성
const MyPageContext = createContext()

// Context 접근 훅
export const useMyPage = () => useContext(MyPageContext)

const formatMyPageData = (data) => ({
  pet: {
    type: data.userPet.petId,
    stage: Math.floor(data.userPet.level / 5) + 1, // 1: 알, 2: 성장기, 3: 성인기
    name: data.userPet.nickname,
    level: data.userPet.level,
    exp: data.userPet.currentExp,
    expMax: data.userPet.maxExp,
    status: data.userPet.status,
    message: data.userPet.message,
    proud: data.userPet.proud,
  },
  user: {
    id: data.user.id,
    nickname: data.user.nickname,
    email: data.user.email,
    bjId: data.user.bojId,
  },
  interestTags: data.interestTags ?? [],
  message: data.userPet.message,
  exploreRecords: data.recentExplores?.recommendProblems ?? [],
})

// Provider 컴포넌트
export const MyPageProvider = ({ children }) => {
  const [myPageData, setMyPageData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMyPageData = async () => {
    try {
      const res = await AxiosInstance.get('/mypage')
      console.log("[AxiosInstance] - get('/mypage')")
      console.log(res.data ? '마이페이지 데이터 가져오기 성공' : '마이페이지 데이터 가져오기 실패')
      console.log(res)

      const data = res.data
      if (!data) {
        throw new Error('마이페이지-응답 데이터 없음')
      }
      if (!res.data || !res.data.data) {
        throw new Error('마이페이지-응답 데이터 구조 오류')
      }
      return formatMyPageData(data?.data)
    } catch (error) {
      console.error('마이페이지 데이터 가져오기 실패:', error)
      return formatMyPageData(mockData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const init = async () => {
      const data = await fetchMyPageData()
      console.log('마이페이지 데이터 초기화')
      setMyPageData(data)
    }
    init()
  }, [])

  const refreshMyPageData = async () => {
    const data = await fetchMyPageData()
    setMyPageData(data)
  }

  return (
    <MyPageContext.Provider
      value={{
        myPageData: myPageData,
        setMyPageData: setMyPageData,
        loading,
        refreshMyPageData,
      }}
    >
      {children}
    </MyPageContext.Provider>
  )
}
