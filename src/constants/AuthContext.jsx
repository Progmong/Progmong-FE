import { createContext, useContext, useEffect, useReducer } from 'react'
import AxiosInstance from '@/constants/axiosInstance'

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

// 저장된 토큰으로 초기 상태를 바로 만든다.
// 서버 확인을 기다리며 로딩 화면을 띄우지 않고, 확인은 화면을 그린 뒤 뒤에서 한다.
const initAuthState = () => {
  const user = decodeJWT(localStorage.getItem('accessToken'))
  return { user, loading: false }
}

// 토큰 유효성 확인 (화면을 막지 않음)
// 서버가 토큰을 거절(401/403)했을 때만 로그아웃하고,
// 네트워크 오류 등은 로그인 상태를 유지한다.
const verifyToken = async (dispatch) => {
  try {
    await AxiosInstance.get('/health-data')
  } catch (error) {
    const status = error.response?.status
    if (status === 401 || status === 403) {
      localStorage.removeItem('accessToken')
      dispatch({ type: 'LOGOUT' })
    } else {
      console.error('토큰 확인 실패:', error)
    }
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, undefined, initAuthState)

  // 마운트 시 토큰이 있으면 뒤에서 유효성만 확인
  useEffect(() => {
    if (state.user) verifyToken(dispatch)
  }, [])

  // context provider로 state, dispatch 제공
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}

// AuthContext 사용을 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext)
