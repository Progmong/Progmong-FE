import axios from './axiosInstance'

export const useExploreApi = () => {
  const startExplore = async (minLevel, maxLevel) => {
    return await axios.post('/explore', {
      minLevel,
      maxLevel,
    })
  }

  const currentExplore = async () => {
    return await axios.get('/explore')
  }

  const successProblem = async () => {
    return await axios.post('/explore/success')
  }

  const passProblem = async () => {
    return await axios.post('/explore/pass')
  }

  const checkProblem = async (problemId) => {
    return await axios.get(`/explore/check`, {
      params: { problemId },
    })
  }

  const getPetInfo = async () => {
    return await axios.get('/pet/all')
  }

  return {
    startExplore,
    currentExplore,
    successProblem,
    passProblem,
    checkProblem,
    getPetInfo,
  }
}

export default useExploreApi
