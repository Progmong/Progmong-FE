import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: 'http://192.168.200.205:8100/api/v1',
  //withCredentials: true,
})

AxiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem('accessToken')
  const dummyToken =
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzUxMzQ4MjU4fQ.NhrQAbgkKtmBISREezansN8IlVKf0B6-Js_baEEfDQ3zo-QkinAWobJQhiu72BAgAf6wEL36_7wvSnoy8Kf71Q'

  if (dummyToken) {
    config.headers.Authorization = `Bearer ${dummyToken}`
  }
  return config
})

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log(error.response)
      // alert("서버에러"); // SPA 방식으로 이동
    }
    return Promise.reject(error)
  },
)

export default AxiosInstance
