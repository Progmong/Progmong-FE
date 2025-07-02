// MyPageContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react'
import { fetchMypageData } from '@/pages/MyPage/mypage.js'
import AxiosInstance from '@/constants/axiosInstance.js'

const MyPageContext = createContext()

export const MyPageProvider = ({ children }) => {
  const [mypageData, setMypageData] = useState(null)
  const [loading, setLoading] = useState(false)

  // ⛳ 전역에서 재사용 가능한 fetch 함수
  const refetchMypageData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetchMypageData()
      if (res.data?.data) {
        setMypageData(res.data.data)
      }
    } catch (err) {
      console.error('데이터 다시 불러오기 실패:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateNickname = async (nickname) => {
    try {
      await AxiosInstance.patch('/user/nickname', { nickname })
      await refetchMypageData()
    } catch (err) {
      throw err
    }
  }

  return (
    <MyPageContext.Provider value={{
      mypageData,
      setMypageData,
      refetchMypageData,
      updateNickname, // 추가
      loading,
    }}>
      {children}
    </MyPageContext.Provider>
  )
}

export const useMyPage = () => {
  const context = useContext(MyPageContext)
  if (!context) {
    throw new Error('useMyPage must be used within a MyPageProvider')
  }
  return context
}
