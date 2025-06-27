import { createContext, useContext, useEffect, useReducer } from 'react'
import AxiosInstance from '@/constants/axiosInstance'

// 초기 상태: user는 null, 로딩 상태는 true로 시작
const initialState = { user: null, loading: true }

// React Context 생성: 인증 상태를 전역으로 관리하기 위한 컨텍스트
const AuthContext = createContext()

// 상태 변경을 처리하는 리듀서 함수
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // 로그인 성공 시 유저 정보 저장, 로딩 상태 false로 변경
      return { ...state, user: action.payload, loading: false }
    case 'LOGOUT':
      // 로그아웃 시 유저 정보 초기화, 로딩 상태 false로 변경
      return { ...state, user: null, loading: false }
    case 'STOP_LOADING':
      // 로딩 완료 상태만 변경 (예: 인증 실패나 토큰 없을 때)
      return { ...state, loading: false }
    default:
      return state
  }
}

// JWT 토큰을 안전하게 디코딩하는 함수
const decodeJWT = (token) => {
  try {
    if (!token) return null

    // Bearer 토큰 형식일 경우 토큰만 추출
    const rawToken = token.includes(' ') ? token.split(' ')[1] : token

    // JWT 토큰의 페이로드 부분(Base64Url 인코딩)을 디코딩
    const base64Url = rawToken.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join(''),
    )

    // JSON 문자열을 객체로 변환하여 반환
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('JWT 디코딩 실패:', error)
    return null
  }
}

// 토큰 기반 자동 로그인 시도
const autoLogin = async (token, dispatch) => {
  try {
    // 인증 확인용 API 호출 (토큰 유효성 확인용)
    const res = await AxiosInstance.get('/health-data')

    if (res.status === 200) {
      // 토큰이 유효하면 디코딩 후 로그인 상태로 dispatch
      const decodedToken = decodeJWT(token)
      if (decodedToken) {
        // sub 값을 기준으로 로그인 정보 저장
        dispatch({ type: 'LOGIN', payload: decodedToken })
        return
      }
    }
    // 토큰이 유효하지 않을 경우 로딩 종료 상태로 변경
    dispatch({ type: 'STOP_LOADING' })
  } catch (error) {
    console.error('자동 로그인 실패:', error)
    // 리프레시 토큰 로직이 인터셉터에 있으면 여기선 무시 가능
    // 에러 발생 시에도 로딩 상태 false 처리
    dispatch({ type: 'STOP_LOADING' })
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // 컴포넌트 마운트 시 자동 로그인 시도
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      autoLogin(token, dispatch) // 토큰 있으면 자동 로그인 시도
    } else {
      dispatch({ type: 'STOP_LOADING' }) // 토큰 없으면 바로 로딩 종료
    }
  }, [])

  // context provider로 state, dispatch 제공
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}

// AuthContext 사용을 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext)
