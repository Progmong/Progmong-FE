import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: 'https://api-progmong.shop/api/v1',
})

// 요청 인터셉터
// 모든 요청에 대해 로컬 스토리지에 저장된 accessToken이 있으면 요청 헤더에 Authorization: Bearer {token} 형태로 자동 추가.
AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 응답 인터셉터
AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config

    // 토큰 만료 시 처리
    if (error.response?.data?.message === '토큰이 만료되었습니다.') {
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          throw new Error('리프레시 토큰이 없습니다.')
        }

        // 리프레시 토큰이 있다면 엑세스 토큰 재발급 요청
        const { data } = await axios.post(
          'http://localhost:8100/api/v1/users/reissue',
          {}, // 빈 객체로 POST 요청
          {
            headers: {
              Authorization_refresh: refreshToken,
            },
          },
        )

        const newAccessToken = data.data.accessToken
        localStorage.setItem('accessToken', newAccessToken)

        // 새 액세스 토큰 받으면 원래 실패한 요청 재시도
        originalConfig.headers.Authorization = `Bearer ${newAccessToken}`
        return axios(originalConfig)
      } catch (refreshError) {
        console.error('토큰 재발급 실패:', refreshError)

        // 토큰 재발급 실패 시, 로컬스토리지 정리 및 리디렉션
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        alert('세션이 만료되었습니다. 다시 로그인해주세요.')
        window.location.href = '/'
        return new Promise(() => {})
      }
    }

    // 그 외 에러는 그대로 처리
    return Promise.reject(error)
  },
)

export default AxiosInstance
