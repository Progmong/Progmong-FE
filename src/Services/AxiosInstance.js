import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8100/api/v1',
  //withCredentials: true,
})

AxiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem('accessToken')
  const dummyToken =
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzUxMTEwMTMzfQ.cTLLHTmG_ohhpy47tUjQx-nbgeBgDS-jiFxqMea4iJiD6pyt9VIqwPKcdWueHnEbCzsUTQXFgAtj89DGQcn97Q'

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
