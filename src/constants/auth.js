import axios from './axiosInstance'

export const useAuthApi = () => {
  const register = async (email, bojId, nickname, password) => {
    return await axios.post('/users/register', {
      email,
      bojId,
      nickname,
      password,
    })
  }

  const checkAuth = async () => {
    return await axios.get('/health-data')
  }

  const login = async (email, password) => {
    return await axios.post('/users/login', {
      email,
      password,
    })
  }

  const sendEmail = async (email) => {
    return await axios.post('/users/verify-email', { email })
  }

  const verifyEmail = async (code) => {
    return await axios.post('/users/verification-email-code', { code })
  }

  const sendResetEmail = async (email) => {
    return await axios.post('/users/reset-password/request', { email })
  }

  const verifyResetEmail = async (code, newPassword) => {
    return await axios.post('/users/reset-password/confirm', { code, newPassword })
  }

  const getUserInfo = async () => {
    return await axios.get('/users/user-info')
  }

  const getBojId = async (bojId) => {
    return await axios.get(`/solvedac/${bojId}`)
  }

  const generateBojCode = async (bojId) => {
    return axios.get(`/solvedac/generate/${bojId}`)
  }
  const verifyBojCode = async (bojId) => {
    return axios.get(`/solvedac/verify/${bojId}`)
  }
  const checkPet = async () => {
    return axios.get(`/pet/all`)
  }
  return {
    register,
    login,
    sendEmail,
    verifyEmail,
    sendResetEmail,
    verifyResetEmail,
    getUserInfo,
    getBojId,
    generateBojCode,
    verifyBojCode,
    checkPet,
    checkAuth,
  }
}

export default useAuthApi
