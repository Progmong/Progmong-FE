import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: 'http://192.168.201.97:8100/api/v1',
  //withCredentials: true,
})

AxiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem('accessToken')
  const dummyToken =
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzUxMjU0MTgwfQ.fpPQegZgtqRIP1VvYNF8o83DVt5jqhUXhS6bwBXiIXSbH-gbNNTaUVr47MizdLoqU7s8AS76ii4pN7NoLKDISA'

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
