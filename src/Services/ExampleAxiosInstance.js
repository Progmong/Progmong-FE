import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://api.ddalkkug.kro.kr/api/v1",
  //withCredentials: true,
});

AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log(error.response);
      // alert("서버에러"); // SPA 방식으로 이동
    }
    return Promise.reject(error);
  },
);

export default AxiosInstance;
