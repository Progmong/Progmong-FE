import axios from './axiosInstance'

export const usePetApi = () => {
  // 펫 등록 (SelectEgg에서 사용)
  const registerPet = async (petId, nickname) => {
    return await axios.post('/pet/register', {
      petId,
      nickname,
    })
  }

  // 펫 정보 조회 (Home, Explore 등에서 사용)
  const getPetInfo = async () => {
    return await axios.get('/pet/all')
  }

  return {
    registerPet,
    getPetInfo,
  }
}

export default usePetApi
