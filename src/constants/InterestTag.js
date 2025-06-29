import axios from './axiosInstance'

export const useInterestTagApi = () => {
  // 관심 태그 조회
  const getUserTags = async () => {
    return await axios.get('/tag')
  }

  // 관심 태그 갱신
  const updateUserTags = async (tagIds) => {
    return await axios.put('/tag', { tagIds })
  }

  return {
    getUserTags,
    updateUserTags,
  }
}

export default useInterestTagApi
