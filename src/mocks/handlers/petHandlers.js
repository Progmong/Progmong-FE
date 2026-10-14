import { http, HttpResponse } from 'msw'
import { mockPet, globalPetStatus } from '../store'

const baseURL = 'https://api-progmong.shop/api/v1'

export const petHandlers = [
  http.post(`${baseURL}/pet/register`, async ({ request }) => {
    const { petId, nickname } = await request.json()
    // 새로 고른 알로 펫 정보 초기화
    Object.assign(mockPet, {
      petId,
      nickname,
      level: 1,
      currentExp: 0,
      evolutionStage: 1,
    })
    return HttpResponse.json({ status: 200, message: "펫 등록 성공" })
  }),

  http.get(`${baseURL}/pet/all`, () => {
    return HttpResponse.json({
      status: 200,
      message: '사용자 펫 정보가 있습니다.',
      data: {
        id: 1,
        name: mockPet.nickname,
        nickname: mockPet.nickname, // 탐험 화면은 nickname 필드를 읽음
        type: 'BASIC',
        level: mockPet.level,
        experience: mockPet.currentExp,
        currentExp: mockPet.currentExp,
        maxExp: mockPet.maxExp,
        status: globalPetStatus,
        message: mockPet.message,
        petId: mockPet.petId,
        evolutionStage: mockPet.evolutionStage,
        proud: mockPet.proud,
      },
    })
  }),

  http.patch(`${baseURL}/pet/message`, async ({ request }) => {
    const newMsg = await request.text()
    if (newMsg !== undefined) mockPet.message = newMsg
    return HttpResponse.json({ status: 200, message: "상태메시지 변경 성공" })
  }),

  http.patch(`${baseURL}/pet/nickname`, async ({ request }) => {
    const newName = await request.text()
    if (newName !== undefined) mockPet.nickname = newName
    return HttpResponse.json({ status: 200, message: "펫 닉네임 변경 성공" })
  }),

  http.patch(`${baseURL}/pet/proud`, async ({ request }) => {
    const isProud = await request.json()
    mockPet.proud = isProud
    return HttpResponse.json({ status: 200, message: "펫 자랑 상태 변경 성공" })
  })
]
