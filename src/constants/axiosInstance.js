import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: 'https://api-progmong.shop/api/v1',
  withCredentials: true, // 쿠키를 자동 포함하도록 설정
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
    if (
      error.response?.data?.message === '토큰이 만료되었습니다.' ||
      error.response?.data?.message === '유효하지 않은 토큰입니다.'
    ) {
      try {
        // 로컬스토리지에 refreshToken을 직접 읽지 말고 쿠키에서 자동으로 보내게 하기
        const { data } = await axios.post(
          'http://localhost:8100/api/v1/users/reissue',
          {},
          { withCredentials: true },
        )

        const newAccessToken = data.data.accessToken
        localStorage.setItem('accessToken', newAccessToken)

        // 재요청 헤더에 새 액세스토큰 넣기
        originalConfig.headers.Authorization = `Bearer ${newAccessToken}`
        return axios(originalConfig)
      } catch (refreshError) {
        console.error('토큰 재발급 실패:', refreshError)

        localStorage.removeItem('accessToken')
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
