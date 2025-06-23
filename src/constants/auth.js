import axios from './axiosInstance'

export const useAuthApi = () => {
  const register = async (email, nickname, password) => {
    return await axios.post('/users/register', {
      email,
      nickname,
      password,
    })
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

  return {
    register,
    login,
    sendEmail,
    verifyEmail,
    sendResetEmail,
    verifyResetEmail,
    getUserInfo,
  }
}

export default useAuthApi
