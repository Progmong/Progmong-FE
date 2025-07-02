import AxiosInstance from '@/constants/axiosInstance'

/**
 * 마이페이지 데이터 조회
 * GET /mypage
 */
export const fetchMypageData = () => AxiosInstance.get('/mypage')

/**
 * 펫 애칭 변경
 * PATCH /pet/nickname
 * @param {string} nickname - 변경할 애칭
 */
export const updatePetNickname = (nickname) =>
  AxiosInstance.patch('/pet/nickname', { nickname })

/**
 * 펫 메시지 변경
 * PATCH /pet/message
 * @param {string} message - 변경할 메시지
 */
export const updatePetMessage = (message) =>
  AxiosInstance.patch('/pet/message', { message })

/**
 * 펫 자랑 토글 (공개/비공개)
 * PATCH /pet/proud
 */
export const togglePetProud = () => AxiosInstance.patch('/pet/proud')
